function clean(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/\s-\s/g, '-')
    .replace(/\s/g, '-')
}

export default (folder, id, type, filename) => `${folder}/${clean(id)}/${type}/${clean(filename)}`
