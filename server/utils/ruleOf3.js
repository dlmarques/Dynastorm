const decreaseRuleOf3 = (stat, boost) => {
  return (stat * 100) / boost;
};

const increaseRuleOf3 = (stat, boost, quantity) => {
  let finalStat = stat;
  for (let i = 0; i < quantity; i++) {
    finalStat = (finalStat * boost) / 100;
  }
  return finalStat;
};

module.exports.decreaseRuleOf3 = decreaseRuleOf3;
module.exports.increaseRuleOf3 = increaseRuleOf3;
