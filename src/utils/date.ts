// convert epoch to week, month date format
// show weekday
export const convertEpochToDate = (epoch: number): string => {
  const date = new Date(epoch);
  return `${date.toLocaleString("default", {
    weekday: "long",
  })}, ${date.toLocaleString("default", {
    month: "long",
  })} ${date.getDate()}`;
};
