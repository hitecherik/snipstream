const request = require('request');

function getXMLFromYoutube(id, callback, autogen=false) {
  let lang = 'en' + (autogen ? '&track=asr' : '');

  request.get(`http://video.google.com/timedtext?lang=${lang}&v=${id}`, (err, res, body) => {

    if (err) {
      console.log(err);
      callback(null);
    }

    if (body.trim().length == 0) {
      getXMLFromYoutube(id, callback, true);
    }

    callback(body);
  });

}

module.exports = getXMLFromYoutube;

