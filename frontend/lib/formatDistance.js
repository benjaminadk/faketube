import { formatDistance } from 'date-fns'

export default function(date) {
  return formatDistance(new Date(date), new Date())
    .replace(/about|almost|less than|over/, '')
    .trim()
}
