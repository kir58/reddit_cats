/* eslint-disable import/prefer-default-export */
export const getDiffDate = (createdDate) => {
  const currentDate = new Date() / 1000;
  const delta = Math.floor(currentDate - createdDate);
  const days = Math.floor(delta / 86400);
  if (days > 0) {
    return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  }
  const hours = Math.floor(delta / 3600) % 24;
  if (hours > 0) {
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  }
  const minutes = Math.floor(delta / 60) % 60;
  if (minutes > 0) {
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
  }
  return 'just now';
};
