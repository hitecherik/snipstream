const request = require('request');

function getXMLFromYoutube(id, callback, name="") {

  let nameParam = (name.length > 0 ? `&name=${name}` : '').replace(" ", "+");

  console.log(`http://video.google.com/timedtext?lang=en&v=${id}${nameParam}`);

  request.get(`http://video.google.com/timedtext?lang=en&v=${id}${nameParam}`, (err, res, body) => {

    if (err) {
      console.log(err);
      callback(null);
    }

    callback(body);
  });

}

module.exports = getXMLFromYoutube;

