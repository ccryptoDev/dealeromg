export const changeCurrencyFormat = (value) => {
  const numValue = +value
  return `${numValue.toLocaleString("en-US")}`
}
export const changeStatusFormat = (value) => {
  if (value === 3) {
    return "SOLD"
  } else if (value === 2) {
    return "HOLD"
  }
}
export const changeDateFormat = (date) => {
  const newFormat = new Date(date)

  const pst = newFormat.toLocaleString("en-US", {
    timeZone: "America/Los_Angeles",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  })

  return pst
}
