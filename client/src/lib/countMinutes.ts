export const countMinutes = (seconds: number) => {
  // Calculate the minutes by dividing seconds by 60
  const minutes = Math.floor(seconds / 60);

  // Calculate the remaining seconds
  const remainingSeconds = seconds % 60;

  // Return the result as a string in "minutes:seconds" format
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
};
