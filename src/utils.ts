import { DATE_TEXT } from "./constants";

/* eslint-disable import/prefer-default-export */
export const getDiffDate = (createdDate: number, startDate = new Date().valueOf()) : string => {
  const currentDate = startDate / 1000;
  const delta = Math.floor(currentDate - createdDate);
  const days = Math.floor(delta / 86400);

  if (days > 0) {
    return DATE_TEXT.DAYS(days);
  }

  const hours = Math.floor(delta / 3600) % 24;
  if (hours > 0) {
    return DATE_TEXT.HOURS(hours);
  }

  const minutes = Math.floor(delta / 60) % 60;
  if (minutes > 0) {
    return DATE_TEXT.MINUTES(minutes);
  }

  return DATE_TEXT.NOW_DATE;
};
