export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const capitalizeAll = (string) => {
  return string.toUpperCase()
}

export const lowerCaseAll = (string) => {
  return string.toLowerCase()
}

export const printDateToLocaleString = (date) => {
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export const printDateToLocaleStringWithoutDay = (date) => {
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
  })
}
