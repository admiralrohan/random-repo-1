export function counter(
  initialValue: number
): [getCurrentValue: () => number, increaseCounter: () => void] {
  let currentValue = initialValue;

  const getCurrentValue = () => currentValue;
  const increaseCounter = () => {
    currentValue++;
  };

  return [getCurrentValue, increaseCounter];
}
