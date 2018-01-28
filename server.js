const express = require('express');
const fetch = require('./fetchFromYoutube.js');
const parseXML = require('./parseXML.js');
const postAzure = require('./postToAzure.js');
const interpolateKeywords = require('./interpolateKeywords.js');
const getTimestamps = require('./getTimestamps.js');
const app = express();

app.use(express.static("download"));

app.get("/:videoid", (req, res) => {
    
  fetch(req.params.videoid, (xml) => {

    parseXML(xml, ts => {

      let sentences = ts.map(val => val.text);
      let documentJSON = {documents: []};

      for (let i = 0; i < sentences.length; i++) {

        documentJSON.documents.push({
          language: "en",
          id: i + 1,
          text: sentences[i]
        });
      }

      postAzure(req.params.videoid, documentJSON, result => {
        // res.send(JSON.parse(keywords));
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Content-Type', 'application/json');
        res.send(JSON.stringify(getTimestamps(ts, interpolateKeywords(JSON.parse(result).documents))));
      });
    });
  }, name=req.query.name);
});

app.listen(3000, () => console.log("Server on port 3000"));
