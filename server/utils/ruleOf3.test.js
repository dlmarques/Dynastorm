const { increaseRuleOf3 } = require("./ruleOf3");

test("should return a number", () => {
  expect(increaseRuleOf3(5, 200, 10)).toBe(5120);
});
