

function interpolateKeywords(keyPhrases) {
  let allKeyPhrases = keyPhrases.reduce((acc, cur) => acc.concat(cur.keyPhrases), []).map(p => p.toLowerCase()),
      occurences    = {},
      keywords      = [];

  allKeyPhrases.forEach(phrase => {
    if (phrase in occurences) {
      occurences[phrase]++;
    } else {
      occurences[phrase] = 1;
      keywords.push(phrase);
    }
  });

  keywords.sort((k1, k2) => {
    if (occurences[k1] > occurences[k2]) return -1;
    else if (occurences[k1] < occurences[k2]) return 1;
    else return 0;
  });
  
  return keywords;
}

module.exports = interpolateKeywords;
