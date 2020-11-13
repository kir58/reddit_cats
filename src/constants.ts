export const LIMIT = 6;
export const POST_HEIGHT = 512;

export const DATE_TEXT = {
  NOW_DATE: 'just now',
  DAYS: (days: number) => `${days} ${days === 1 ? 'day' : 'days'} ago`,
  HOURS: (hours: number) => `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`,
  MINUTES: (minutes: number) => `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`,
};
