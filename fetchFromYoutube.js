const request = require('request');

function getXMLFromYoutube(id) {

  request.get('http://video.google.com/timedtext?lang=en&v=' + id, (err, res, body) => {

    if (err) {
      console.log(err);
      return "error";
    }

    console.log(body);


  });

}

module.exports = getXMLFromYoutube;

