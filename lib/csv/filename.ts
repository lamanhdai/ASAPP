import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
dayjs.extend(isoWeek);

export function generateCsvFilename(): string {
  const now = dayjs();
  const year = now.year();
  const week = now.isoWeek();
  return `${year}-${String(week).padStart(2, '0')}.csv`;
}
