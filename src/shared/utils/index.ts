export const isExpiredToken = (dateNow: string | null, delta: string | null) => {
   if (dateNow && delta) {
      return Number(dateNow) + Number(delta) > Date.now();
   }
   return false;
};
