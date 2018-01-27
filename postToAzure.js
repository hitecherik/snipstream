const request = require('request');
const key     = require('./key.js');
const SQLite3 = require('better-sqlite3');


function postToAzure(id, data, callback) {
  let cache = new SQLite3('cache.db');
  let result = cache.prepare(`SELECT azure_data FROM cache WHERE video_id='${id}'`).get();

  if (result) {
    console.log("USING CACHE");
    callback(result["azure_data"]);
    return;
  }

  request.post({
    headers: {'Ocp-Apim-Subscription-Key': key, 'Content-Type': 'application/json', 'Accept': 'applicatoin/json'},
    url: 'https://westeurope.api.cognitive.microsoft.com/text/analytics/v2.0/keyPhrases',
    body: JSON.stringify(data)
  }, (err, res, body) => {
    console.log("REQUESTING FROM AZURE");
    cache.prepare(`INSERT INTO cache (video_id, azure_data) VALUES ('${id}', '${body}')`).run();

    callback(body);

  });

}

module.exports = postToAzure;

