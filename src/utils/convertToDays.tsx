import dayjs from "dayjs";

export function convertToDays(duration, type) {
 
  const startDate = dayjs(); // use the current date as a starting point

  switch (parseInt(type, 10)) {
    case 1:
      return duration;
    case 2:
      return startDate.add(duration, "week").diff(startDate, "day");
    case 3:
      return startDate.add(duration, "month").diff(startDate, "day");
    case 4:
      return startDate.add(duration, "year").diff(startDate, "day");
    default:
      throw new Error(
        "Invalid duration type. Supported types: days, weeks, months, years."
      );
  }
}
