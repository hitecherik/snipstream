
function interpolateKeywords(keyPhrases) {
  let allKeyPhrases = keyPhrases.reduce((acc, cur) => acc.concat(cur.keyPhrases), []).map(p => p.toLowerCase()),
      occurences    = {};

  allKeyPhrases.forEach(phrase => {
    if (phrase in occurences) {
      occurences[phrase]++;
    } else {
      occurences[phrase] = 1;
    }
  });

  return keyPhrases.map(kp => {

    return kp.keyPhrases.reduce((acc, cur) => {
      return acc + occurences[cur];
    }, 0);

  });
  
}

module.exports = interpolateKeywords;
