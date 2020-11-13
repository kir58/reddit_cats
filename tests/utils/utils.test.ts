import { DATE_TEXT } from '../../src/constants';
import { getDiffDate } from '../../src/utils';

const START_DATE = 1604762839967;

describe.only.each([
  [START_DATE, DATE_TEXT.NOW_DATE, 'date now'],
  [1604762722, '1 minute ago', 'minute'],
  [1604759961, '47 minutes ago', 'minutes'],
  [1604755727, '1 hour ago', 'hour'],
  [1604750727, '3 hours ago', 'hours'],
  [1604600727, '1 day ago', 'day'],
  [1604500727, '3 days ago', 'days'],
])('getDiffDate test', (date: number, expected: string, text: string) => {
  test(text, () => expect(getDiffDate(date, START_DATE)).toBe(expected));
});
