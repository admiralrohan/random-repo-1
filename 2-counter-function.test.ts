import { counter } from "./2-counter-function";
import { expect, test } from "./jest-lightweight";

test("Counter function should work properly", () => {
  const [getA, nextA] = counter(1);
  expect(getA()).to.be(1);
  nextA();
  expect(getA()).to.be(2);

  const [getB, nextB] = counter(10);
  nextB();
  expect(getA()).to.be(2);
  expect(getB()).to.be(11);

  nextA();
  expect(getA()).to.be(3);
  expect(getB()).to.be(11);
});
