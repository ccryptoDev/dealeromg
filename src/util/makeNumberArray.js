export const numArray = (limit, by) => {
  return [...Array(limit)].map((_, i) => i + by).filter((num) => num % by === 0)
}
