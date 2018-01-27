const request = require('request');

function postToAzure(data, callback) {
  
  request.post({
    headers: {'Ocp-Apim-Subscription-Key': '55b2cd6ebc4d4649a0c54890ea74f468', 'Content-Type': 'application/json', 'Accept': 'applicatoin/json'},
    url: 'https://westeurope.api.cognitive.microsoft.com/text/analytics/v2.0/keyPhrases',
    body: JSON.stringify(data)
  }, (err, res, body) => {

    callback(body);

  });

}

module.exports = postToAzure;

