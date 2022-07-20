export const setLevel = (xp) => {
  if (xp <= 100) {
    return 1;
  } else if (xp <= 200) {
    return 2;
  } else if (xp <= 300) {
    return 3;
  } else if (xp <= 400) {
    return 4;
  } else if (xp <= 500) {
    return 5;
  } else if (xp <= 600) {
    return 6;
  } else if (xp <= 700) {
    return 7;
  }
};

export const setTier = (xp) => {
  if (xp <= 100) {
    return "Servant";
  } else if (xp <= 200) {
    return "Yeomen";
  } else if (xp <= 300) {
    return "Freemen";
  } else if (xp <= 400) {
    return "Peasants";
  } else if (xp <= 500) {
    return "Knight";
  } else if (xp <= 600) {
    return "King";
  } else if (xp <= 700) {
    return "Pope";
  }
};
