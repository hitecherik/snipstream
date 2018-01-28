const MAX_TIME = 20;
const SENTENCE_TERMINATORS = /[.;\?\!]/;

class StartEnd {
  constructor(sentence) {
    this.start = sentence.start;
    this.end   = sentence.end;
  }

  get duration() {
    return this.end - this.start;
  }
}

class SentenceWithWeight {

  constructor(sentence, weight) {
    this.start    = sentence.start;
    this.end      = sentence.end;
    this.duration = sentence.duration;
    this.weight   = weight / this.duration;
  }

}

function getTimestamps(sentences, weights) {
  
  sentencesWithWeight = [];

  for (let i = 0; i < weights.length; i++) {

    sentencesWithWeight.push(new SentenceWithWeight(sentences[i], weights[i]));

  }

  sentencesWithWeight.sort((s1, s2) => {

    if (s1.weight < s2.weight) return -1;
    else if (s1.weight > s2.weight) return 1;
    else return 0;

  });

  let totalDuration = 0;
  let output = [];

  while (totalDuration < MAX_TIME) {

    output.push(new StartEnd(sentencesWithWeight.pop()));
    totalDuration += output[output.length - 1].duration;

  }

  return output;

}

module.exports = getTimestamps;
