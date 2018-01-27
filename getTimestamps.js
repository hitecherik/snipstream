const MAX_TIME = 20;
const SENTENCE_TERMINATORS = ".;?!";
const SENTENCE_TERMINATORS = /[.;\?!]/;

class StartEnd {
  constructor(timestamps) {
    this.start = timestamps[0].start;
    this.end   = timestamps[timestamps.length-1].end;
  }

  get duration() {
    return this.end - this.start;
  }
}

function getTimestamps(timestamps, keywords, callback) {
  let results       = [],
      totalDuration = 0;
  
  for (let i = 0; i < keywords.length; i++) {
    if (totalDuration > MAX_TIME) break;

    let index              = -1,
        includedTimestamps = [];

    for (let j = 0; j < timestamps.length; timestamps++) {
      if (timestamps[j].keywordInText(keywords[i])) {
        index = j;
        break;
      }
    }

    if (index === -1) continue;
    
    includedTimestamps.push(timestamps[j]);
    j++;

    while (j < timestamps.length) {
      includedTimestamps.push(timestamps[j]);
      if (SENTENCE_TERMINATORS.test(timestamps[j].text) break;
      j++;
    }

    results.push(new StartEnd(includedTimestamps));
    totalDuration += results[results.length-1].duration;
  }
  
  return results;
}


