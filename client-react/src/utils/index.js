export const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
export const capitalizeWords = (str) => str.split(' ').map(capitalize).join(' ');

export const formatTime = (time) => {
  const seconds = Math.floor((new Date().getTime() - new Date(time).getTime()) / 1000),
    minutes = Math.floor(seconds / 60),
    hours = Math.floor(minutes / 60),
    days = Math.floor(hours / 24),
    weeks = Math.floor(days / 7),
    months = Math.floor(weeks / 4),
    years = Math.floor(months / 12);

  if (years) return `${years} ${years > 1 ? 'yrs' : 'yr'} ago`;
  if (months) return `${months} ${months > 1 ? 'mos' : 'mo'} ago`;
  if (weeks) return `${weeks} ${weeks > 1 ? 'wks' : 'wk'} ago`;
  if (days) return `${days} ${days > 1 ? 'dys' : 'dy'} ago`;
  if (hours) return `${hours} ${hours > 1 ? 'hrs' : 'hr'} ago`;
  if (minutes) return `${minutes} ${minutes > 1 ? 'mins' : 'min'} ago`;
  if (seconds) return `${seconds} ${seconds > 1 ? 'secs' : 'sec'} ago`;
}

export const stringCutoff = (str, length) => str.length > length ? `${str.slice(0, length)}...` : str;