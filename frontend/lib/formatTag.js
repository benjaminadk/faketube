export default function(str) {
  return str
    .trim()
    .toLowerCase()
    .replace(/\s\s+/g, ' ')
    .replace(/[^a-z0-9-_,\s]/g, '')
}
