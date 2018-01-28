const SENTENCE_DELIMITERS = /[.\?\!]/;

function splitBySentence(text) {
  return text.split(SENTENCE_DELIMITERS).filter(s => s.length > 0).map(s => s.trim());
}

module.exports = splitBySentence;
