export const removeDuplicates = arr => {
  const seen = new Set()
  const filteredArr = arr.filter(el => {
    const duplicate = seen.has(el.time)
    seen.add(el.time)
    return !duplicate
  })
  return filteredArr
}

export const compare = (a, b) => {
  // Use toUpperCase() to ignore character casing
  const timeA = a.time
  const timeB = b.time

  let comparison = 0
  if (timeA > timeB) {
    comparison = 1
  } else if (timeA < timeB) {
    comparison = -1
  }
  return comparison
}
