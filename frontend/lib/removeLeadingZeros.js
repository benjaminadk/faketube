export default function removeLeadingZeros(str) {
  const re = /0/
  if (re.test(str[0])) {
    return removeLeadingZeros(str.slice(1))
  }
  return str
}
