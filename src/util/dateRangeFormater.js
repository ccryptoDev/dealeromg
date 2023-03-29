export function getFormattedDate(date) {
  const day = String(date.getDate())
  const month = String(date.getMonth() + 1)
  const year = String(date.getFullYear())
  return month + "/" + day + "/" + year
}
