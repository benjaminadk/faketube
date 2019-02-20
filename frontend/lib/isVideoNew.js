import { isAfter, subDays } from 'date-fns'

export default function(date) {
  return isAfter(new Date(date), subDays(new Date(), 7))
}
