export const setLevel = (xp) => {
 if(xp<=100){
    return 1;
 }else if(xp<=200){
    return 2;
 }else if(xp<=300){
    return 3;
 }else if(xp<=400){
    return 4;
 }else if(xp<=500){
    return 5;
 }else if(xp<=600){
    return 6;
 }else if(xp<=700){
    return 7;
 }
};

export const setTier = (lvl) => {
   if(lvl === 1){
      return 'Servant';
   }else if(lvl === 2){
      return 'Yeomen';
   }else if(lvl === 3){
      return 'Freemen';
   }else if(lvl === 4){
      return 'Peasants';
   }else if(lvl === 5){
      return 'Knight';
   }else if(lvl === 6){
      return 'King';
   }else if(lvl === 7){
      return 'Pope';
   }
} 
