export default function(str) {
  return str
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-_,]/g, '')
}
