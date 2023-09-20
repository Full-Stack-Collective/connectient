const ONE_DAY_IN_MILLISECONDS = 86400000;
const ONE_HOUR_IN_MILLISECONDS = 3600000;

function getDaysBetweenDates(timeBetween: number) {
  const daysBetween = timeBetween / ONE_DAY_IN_MILLISECONDS;
  const days =
    daysBetween >= 0 ? Math.floor(daysBetween) : Math.ceil(daysBetween);

  if (days === 1) return `Requested 1 day ago`;
  return `Requested ${days} days ago`;
}

function getHoursBetweenDates(timeBetween: number) {
  const hoursBetween = timeBetween / ONE_HOUR_IN_MILLISECONDS;
  const hours =
    hoursBetween >= 0 ? Math.floor(hoursBetween) : Math.ceil(hoursBetween);

  if (hours > 24) return getDaysBetweenDates(timeBetween);

  if (hours < 1) return `Requested < 1 hour ago`;
  else if (hours === 1) return `Requested 1 hour ago`;
  return `Requested ${hours} hours ago`;
}

export function updateRequestCreatedTime(dateCreated: string) {
  const today = new Date();
  const requestCreated = new Date(dateCreated);
  const timeBetween = today.getTime() - requestCreated.getTime();

  return getHoursBetweenDates(timeBetween);
}
