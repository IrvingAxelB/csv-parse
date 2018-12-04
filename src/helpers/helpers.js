const moment = require('moment-timezone');

const DATE_FORMAT = 'MM/DD/YY hh:mm:ss A';
const TIMEZONE = 'US/Eastern';

/**
 * @param {Date} date - Date to be converted to ISO-8601
 * @param {string} timezone - Timezone to be converted to. Defaults to 'US/Eastern'
 * @returns {String} - ISO-8601 formatted Date
 */
const formatToISO8601 = (date, timezone = TIMEZONE) => {
  const formattedDate = moment.tz(date, DATE_FORMAT, timezone).format();
  if (formattedDate === 'Invalid date') {
    throw 'Invalid Date';
  }
  return formattedDate;
};

/**
 * @param {string} zipCode - zipCode to be formatted
 * @returns {String} - returns a zip code prefixed with 0's, if less than 5
 */
const formatZip = zipCode =>
  zipCode.padStart(5, 0);

/**
 * @param {string} duration - duration in HH:MM:SS.MS format
 * @returns {String} - returns duration in HH:MM:SS format
 */
const formatDuration = duration => {
  const [hours, minutes, seconds] = duration.split(':');
  return [hours, minutes, Math.trunc(seconds)].join(':');
};

/**
 * @param {string} duration1 - duration in HH:MM:SS.MS format
 * @param {string} duration2 - duration in HH:MM:SS.MS format
 * @returns {String} - returns total duration in HH:MM:SS format
 */
const addDurations = (duration1, duration2) => {
  const [hour1, minute1, seconds1] = duration1.split(':');
  const [hour2, minute2, seconds2] = duration2.split(':');

  return [
    Number(hour1) + Number(hour2),
    Number(minute1) + Number(minute2),
    Number(seconds1) + Number(seconds2),
  ].join(':');
};

module.exports = {
  formatToISO8601,
  formatZip,
  formatDuration,
  addDurations
};
