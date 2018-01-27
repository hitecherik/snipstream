const parseString = require("xml2js").parseString,
      fs          = require("fs");

class TimeStamp {
  constructor(obj) {
    this.text     = obj._.replace("\n", " ");;
    this.start    = parseFloat(obj.$.start);
    this.duration = parseFloat(obj.$.dur);
  }

  get end() {
    return this.start + this.duration;
  }
}

function parseXML(xml, callback) {
  parseString(xml, (err, result) => {
    if (err) throw err;
    callback(result.transcript.text.map(t => new TimeStamp(t)));
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
