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

export const getCurrentTime = () => {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();

  // Ensure the hours and minutes are two digits
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;

  return `${hours}:${minutes}`;
};

export const formatDateToNumber = (dateStr) => {
  // Split the date string into day, month, and year
  const [day, month, year] = dateStr.split("/");
  // Concatenate them into a single number
  return parseInt(day + month + year, 10);
};
