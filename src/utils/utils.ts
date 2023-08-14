export const capitalizeWord = (string: string | null): string | null => {
  if (!string || string.length < 1) return null;
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};
