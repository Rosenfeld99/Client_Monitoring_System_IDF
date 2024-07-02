export const generateID = () =>
  [...Array(30)].map(() => Math.random().toString(36)[2]).join("");

export const getCurrentDateFormaterHebrew = () => {
  const currentDate = new Date();

  // Extract the day, month, and year
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const year = currentDate.getFullYear();

  // Format the date as dd/mm/yyyy
  return `${day}/${month}/${year}`;
};
