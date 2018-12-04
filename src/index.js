const fs = require('fs');
const csv = require('csv-parser');

const {
  formatToISO8601,
  formatZip,
  formatDuration,
  addDurations,
} = require('./helpers/helpers');

const csvFile = process.argv[2];

if (!csvFile) {
  throw new Error(
    'Please provide a CSV file.',
  );
}

const HEADERS = [
  'Timestamp',
  'Address',
  'ZIP',
  'FullName',
  'FooDuration',
  'BarDuration',
  'TotalDuration',
  'Notes',
];
let showHeaders = true;

fs.createReadStream(csvFile)
  .pipe(csv())
  .on(
    'data',
    ({ Timestamp, FullName, ZIP, FooDuration, BarDuration, Address, Notes }) => {
      if (showHeaders) {
        console.log(HEADERS.join(','));
        showHeaders = false;
      }

      try {
        const output = [
          formatToISO8601(Timestamp),
          Address,
          formatZip(ZIP),
          FullName.toUpperCase(),
          formatDuration(FooDuration),
          formatDuration(BarDuration),
          // TODO: should addDurations be the total of the formatted durations?
          addDurations(FooDuration, BarDuration),
          Notes,
        ];

        console.log(output.join(','));
      }
      catch(err) {
        console.warn('WARNING: ', err);
      }
    },
  )
  .on('end', function() {
    console.log('Finished');
  });
