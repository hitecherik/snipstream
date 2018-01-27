const express = require('express');
const fetch = require('./fetchFromYoutube.js');
const parseXML = require('./parseXML.js');
const app = express();

app.get("/:videoid", (req, res) => {
    
  fetch(req.params.videoid, (xml) => {

    parseXML(xml, ts => {

      let onlyText = ts.reduce((acc, curV) => {

        return `${acc} ${curV.text}`;

      }, "");

      let nrSplits = (Math.floor(onlyText.length / 5000));

      let textToSend = [];

      if (nrSplits === 0) {

        textToSend.push(onlyText);

      } else {
        
        let words = onlyText.split(" ");
        let characterLimit = onlyText.length / (nrSplits + 1);

        let k = 0;

        for (i = 0; i <= nrSplits; i++){
          textToSend.push("");

          while (textToSend[i].length < characterLimit) {
            textToSend[i] += words[k] + " ";
            k++;

          }

        }


      }

      res.send(textToSend[0]);

    });

  });
    
})

app.listen(3000, () => console.log("Server on port 3000"));