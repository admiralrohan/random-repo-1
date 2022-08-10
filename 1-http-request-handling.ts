import * as https from "https";

const ALL_EPISODES = "https://rickandmortyapi.com/api/episode";

interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

/** With Character details */
interface EpisodeWC extends Omit<Episode, "characters"> {
  characters: Character[];
}

/** API Response */
interface EpisodeList {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Episode[];
}

/** API Response */
interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

/**
 * Clone of node-fetch
 */
async function fetch<T>(url: string): Promise<T> {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        let data = [];

        res.on("data", (chunk) => {
          data.push(chunk);
        });

        res.on("end", () => {
          resolve(JSON.parse(Buffer.concat(data).toString()));
        });
      })
      .on("error", (err) => {
        reject(err);
      });
  });
}

(async function () {
  const episodes: EpisodeList = await fetch(ALL_EPISODES);
  const characterDetailsCache: { [key: string]: Character } = {};

  // Final array
  const episodesWithCharacters: EpisodeWC[] = [];
  for (const episode of episodes.results) {
    const characters: Character[] = [];

    for (const characterUrl of episode.characters) {
      const splittedUrl = characterUrl.split("/");
      const characterId = splittedUrl[splittedUrl.length - 1];

      if (characterDetailsCache[characterId]) {
        characters.push(characterDetailsCache[characterId]);
      } else {
        const characterDetails = await fetch<Character>(characterUrl);
        characterDetailsCache[characterId] = characterDetails;

        characters.push(characterDetails);
      }
    }

    episodesWithCharacters.push({ ...episode, characters });
  }

  console.log(episodesWithCharacters);
})();
