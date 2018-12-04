const expect = require('expect');
const utils = require('./helpers');

describe('TimeStamp', () => {
  const time = '12/31/16 11:59:59 PM';
  const timezone = 'US/Pacific';
  const resultTimeInPST = '2016-12-31T23:59:59-08:00';
  const resultTimeInEST = '2016-12-31T23:59:59-05:00';
  it('should be formatted in ISO-8601 format', () => {
    const result = utils.formatToISO8601(time, timezone);
    expect(result).toBe(resultTimeInPST);
  });
  it('should be assumed to be in US/Pacific time and be converted to US/Eastern.', () => {
    const result = utils.formatToISO8601(time);
    expect(result).toBe(resultTimeInEST);
  });
  it('should throw warning if date is not able to be parsed', () => {

  });
});

describe('ZIP Code', () => {
  it('should be formatted as 5 digits. If there are less than 5 digits, assume 0 as the prefix', () => {
    const zipCode1 = '123';
    const zipCode2 = '12345';
    const expectedResult1 = '00123';
    const expectedResult2 = '12345';

    const result1 = utils.formatZip(zipCode1);
    expect(result1).toBe(expectedResult1);

    const result2 = utils.formatZip(zipCode2);
    expect(result2).toBe(expectedResult2);
  });
});

describe('Duration', () => {
  it('should convert HH:MM:SS.MS into seconds format', () => {
    const duration1 = '31:23:32.1239';
    const expectedResult = '31:23:32';

    const result = utils.formatDuration(duration1);
    expect(result).toBe(expectedResult);
  });
});

describe('TotalDuration', () => {
  it('should be the sum of two durations', () => {
    const duration1 = '31:23:32.11';
    const duration2 = '01:01:01.129';
    const expectedResult = '32:24:33.239';

    const result = utils.addDurations(duration1, duration2);
    expect(result).toBe(expectedResult);
  });
});
