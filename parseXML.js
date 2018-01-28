const parseString = require("xml2js").parseString,
      fs          = require("fs");

class TimeStamp {
  constructor(obj) {
    this.text     = obj._.replace("\n", " ").toLowerCase();
    this.start    = parseFloat(obj.$.start);
    this.duration = parseFloat(obj.$.dur);
  }

  get end() {
    return this.start + this.duration;
  }

  keywordInText(keyword) {
    return this.text.indexOf(keyword) !== -1;
  }
}

function parseXML(xml, callback) {
  parseString(xml, (err, result) => {
    try {
      callback(result.transcript.text.filter(t => typeof t._ !== "undefined").map(t => new TimeStamp(t)));
    } catch (err) {
      console.log(err.message);
    }
  });
}

// Testing script
/*
 * fs.readFile("sample.xml", (err, data) => {
 *   if (err) throw err;
 *   parseXML(data, ts => console.dir(ts));
 * });
 */

module.exports = parseXML;
