import moment from 'moment';

export default function formatDate(date: string) {
  return moment(date, 'YYYY-MM-DD').format('MM-DD-YY');
}
