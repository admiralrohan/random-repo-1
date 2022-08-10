export function test(testCaseDesc, testCaseRunner): void {
  try {
    testCaseRunner();
    console.log(`${testCaseDesc} - Success`);
  } catch (err) {
    console.log(`${testCaseDesc} - Failed`);
  }
}

export function expect(value): { to: { be: (expectedValue: any) => void } } {
  return {
    to: {
      be: (expectedValue) => {
        if (value !== expectedValue) throw new Error("Failed");
      },
    },
  };
}
