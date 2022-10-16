export const setLevel = (xp) => {
  if (xp <= 200) {
    return 1;
  } else if (xp <= 400) {
    return 2;
  } else if (xp <= 600) {
    return 3;
  } else if (xp <= 800) {
    return 4;
  } else if (xp <= 1000) {
    return 5;
  } else if (xp <= 1200) {
    return 6;
  } else if (xp <= 1400) {
    return 7;
  } else if (xp <= 1600) {
    return 8;
  } else if (xp <= 1800) {
    return 9;
  } else if (xp <= 2000) {
    return 10;
  } else if (xp <= 2200) {
    return 11;
  } else if (xp <= 2400) {
    return 12;
  } else if (xp <= 2600) {
    return 13;
  } else if (xp <= 2800) {
    return 14;
  } else if (xp <= 3000) {
    return 15;
  }
};

export const setTier = (xp) => {
  if (xp <= 200) {
    return "Servant";
  } else if (xp <= 400) {
    return "Yeomen";
  } else if (xp <= 600) {
    return "Freemen";
  } else if (xp <= 800) {
    return "Peasants";
  } else if (xp <= 1000) {
    return "Knight";
  } else if (xp <= 1200) {
    return "King";
  } else if (xp <= 1400) {
    return "Pope";
  }
};
