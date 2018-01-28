const parseString          = require("xml2js").parseString,
      fs                   = require("fs"),
      SENTENCE_TERMINATORS = /[.;\?\!]/;

class Sentence {
  constructor(phrases, content) {
    this.start = parseFloat(phrases[0].$.start);
    this.end   = parseFloat(phrases[phrases.length-1].$.start) + parseFloat(phrases[phrases.length-1].$.dur);
    this.text  = content.toLowerCase();
  }

  get duration() {
    return this.end - this.start;
  }

  keywordInText(keyword) {
    return this.text.indexOf(keyword) !== -1;
  }
}

function parseXML(xml, callback) {
  parseString(xml, (err, result) => {
    try {
      let phrases = result.transcript.text.filter(t => typeof t._ !== "undefined");
      let phraseAccumulator = [];
      let sentences = [];
      let textAccumulator = "";

      for (let i = 0; i < phrases.length; i++) {
        let subSentences = phrases[i]._.split(SENTENCE_TERMINATORS);

        switch(subSentences.length) {
          case 1:
            phraseAccumulator.push(phrases[i]);
            textAccumulator += phrases[i]._.replace("\n", " ") + " ";
            break;
          case 2:
            phraseAccumulator.push({_: subSentences[0], $: phrases[i].$});
            textAccumulator += subSentences[0].replace("\n", " ");
            sentences.push(new Sentence(phraseAccumulator, textAccumulator));
            phraseAccumulator = [{_: subSentences[1], $: phrases[i].$}];
            textAccumulator = subSentences[1].replace("\n", " ") + " ";
            break;
          default:
            phraseAccumulator.push({_: subSentences[0], $: phrases[i].$});
            textAccumulator += subSentences[0].replace("\n", " ");
            sentences.push(new Sentence(phraseAccumulator, textAccumulator));
            sentences.push(new Sentence([phrases[i]], phrases[i]._.replace("\n", " ")));
            phraseAccumulator = [{_: subSentences[subSentences.length - 1], $: phrases[i].$}];
            textAccumulator = subSentences[subSentences.length - 1].replace("\n", " ") + " ";
        }
      }

      sentences.push(new Sentence(phraseAccumulator, textAccumulator));

      callback(sentences);
    } catch (err) {
      console.log(err.message);
    }
  });
}

// Testing script
/*
 fs.readFile("sample.xml", (err, data) => {
   if (err) throw err;
   parseXML(data, ts => console.dir(ts));
 });
*/

module.exports = parseXML;
