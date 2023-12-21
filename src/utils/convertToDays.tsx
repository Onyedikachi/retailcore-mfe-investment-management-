import dayjs from "dayjs";

export function convertToDays(duration, type) {
  const startDate = dayjs(); // use the current date as a starting point

  switch (parseInt(type, 10)) {
    case 1: // Days
      return duration;
    case 2: // Weeks
      return startDate.add(duration * 7, "day").diff(startDate, "day");
    case 3: // Months
      return startDate.add(duration, "month").diff(startDate, "day");
    case 4: // Years
      return startDate.add(duration * 365, "day").diff(startDate, "day");
    default:
      throw new Error(
        "Invalid duration type. Supported types: days, weeks, months, years."
      );
  }
}
