export default function(str) {
  var p = str.split(':')
  var s = 0
  var m = 1

  while (p.length > 0) {
    s += m * parseInt(p.pop(), 10)
    m *= 60
  }

  return s
}
