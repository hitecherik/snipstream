const express = require('express');
const fetch = require('./fetchFromYoutube.js');
const parseXML = require('./parseXML.js');
const postAzure = require('./postToAzure.js');
const splitBySentence = require('./splitBySentence.js');
const app = express();

app.get("/:videoid", (req, res) => {
    
  fetch(req.params.videoid, (xml) => {

    parseXML(xml, ts => {

      let onlyText = ts.reduce((acc, curV) => `${acc} ${curV.text}`, "");
      let sentences = splitBySentence(onlyText);
      let documentJSON = {documents: []};

      for (i = 0; i < sentences.length; i++) {
        documentJSON.documents.push({
          language: "en",
          id: i + 1,
          text: sentences[i]
        });
      }

      postAzure(documentJSON, keywords => res.send(JSON.parse(keywords)));
    });
  });
});

app.listen(3000, () => console.log("Server on port 3000"));
