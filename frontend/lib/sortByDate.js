export default function(arr) {
  return arr.sort((a, b) => {
    if (b.createdAt > a.createdAt) return 1
    else if (b.createdAt < a.createdAt) return -1
    else return 0
  })
}
