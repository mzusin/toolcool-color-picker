export const getUniqueId = () => {
  return Math.random().toString(16).slice(2);
};

export const round2places = (num: number) => {
  return Math.round((num + Number.EPSILON) * 100) / 100;
};
