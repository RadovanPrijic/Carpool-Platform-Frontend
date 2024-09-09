export const addHours = (isoString: string, addedHours: number): string => {
  // Convert the ISO string to a Date object
  const date = new Date(isoString);

  // Add two hours to the date
  date.setHours(date.getHours() + addedHours);

  // Get the year, month, day, hours, minutes, and seconds separately
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const day = String(date.getUTCDate()).padStart(2, "0");
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const seconds = String(date.getUTCSeconds()).padStart(2, "0");
  const milliseconds = String(date.getUTCMilliseconds()).padStart(2, "0");

  // Return the manually formatted ISO string without time zone conversion issues
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`;
};
