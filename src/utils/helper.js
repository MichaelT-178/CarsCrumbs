function pluralize(word, count) {
  return count === 1 ? word : `${word}s`;
}

function convertToSubcurrency(amount, factor = 100) {
  return Math.round(amount * factor);
}

export { pluralize, convertToSubcurrency }