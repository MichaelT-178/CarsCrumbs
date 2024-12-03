function pluralize(word, count) {
  return count === 1 ? word : `${word}s`;
}

export { pluralize }