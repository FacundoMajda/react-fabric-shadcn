export enum Themes {
  LIGHT = "light",
  DARK = "dark",
  SYSTEM = "system",
}

export const ACCEPTED_FILE_TYPES = {
  "application/pdf": [".pdf"],
  "text/plain": [".txt"],
  "text/markdown": [".md"],
};

const SECONDS = 1000;
const MINUTES = 60 * SECONDS;
const HOURS = 60 * MINUTES;
const DAYS = 24 * HOURS;

export const TIME_UNITS = {
  seconds: SECONDS,
  minutes: MINUTES,
  hours: HOURS,
  days: DAYS,
};

export const BASE_API_URL = "http://localhost:3000/api";
