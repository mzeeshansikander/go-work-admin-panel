import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

/**
 * Formats a UTC date-time into a 12-hour time string with AM/PM in local timezone
 * @param {Date|string} utcDateTime - UTC date object or ISO string
 * @returns {string} Time in format "h:mm AM/PM"
 */
export function formatTime(utcDateTime: Date | string) {
  const dt =
    typeof utcDateTime === "string" ? utcDateTime : utcDateTime.toISOString();
  return dayjs.utc(dt).local().format("h:mm A");
}

/**
 * Formats a UTC date into "Tuesday, 24 June" format in local timezone
 * @param {Date|string} utcDateTime - UTC date object or ISO string
 * @returns {string} Date in format "Tuesday, 24 June"
 */
export function formatDate(utcDate: string): string {
  const localDate = dayjs.utc(utcDate).tz(dayjs.tz.guess());
  return localDate.format("MM/DD/YYYY"); // Outputs: 12/12/2001
}
/**
 * Formats a UTC date-time into a time string for input fields in local timezone
 * @param {string} utcDateTime - UTC ISO string
 * @returns {string} Time in format "HH:mm"
 */
export function formatTimeForInput(utcDateTime: string): string {
  return dayjs.utc(utcDateTime).local().format("HH:mm");
}

/**
 * Formats a UTC date into a date string for input fields in local timezone
 * @param {string|undefined} isoString - UTC ISO string or undefined
 * @returns {string} Date in format "YYYY-MM-DD" or empty string if invalid
 */
export function formatDateForInput(isoString: string | undefined): string {
  if (!isoString) return "";
  return dayjs.utc(isoString).local().format("YYYY-MM-DD");
}

/**
 * Converts a local date and optional time to a UTC ISO string
 * @param {string} date - Local date string (e.g., "2025-07-24")
 * @param {string} [time] - Optional local time string (e.g., "14:30")
 * @returns {string} UTC ISO string
 */
export function convertToUTC(date: string, time?: string): string {
  if (time) {
    return dayjs.tz(`${date}T${time}`, dayjs.tz.guess()).utc().toISOString();
  }
  return dayjs.tz(date, dayjs.tz.guess()).utc().toISOString();
}

/**
 * Converts a local date string to a UTC date string at start of day
 * @param {string|null} dateString - Local date string or null
 * @returns {string|null} UTC ISO string or null if invalid
 */
export function getUtcDate(dateString: string | null): string | null {
  if (!dateString) return null;
  const localDate = dayjs.tz(dateString, dayjs.tz.guess());
  if (!localDate.isValid()) return null;
  return localDate.utc().startOf("day").toISOString();
}

export const formatDateForDob = (dateString: string): string => {
  try {
    // Parse the date string
    const date = new Date(dateString);

    // Check if date is valid
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date");
    }

    // Define day and month names
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    // Get date components
    const dayName = days[date.getDay()];
    const monthName = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    // Return formatted string
    return `${dayName}, ${monthName} ${day}, ${year}`;
  } catch (error) {
    console.error("Error formatting date:", error);
    return dateString; // Return original string if parsing fails
  }
};
