const express = require('express');
const fetch = require('./fetchFromYoutube.js');
const app = express();

app.get("/:videoid", (req, res) => {
    
  getXMLFromYoutube(videoid, (res) => {

    res.send(req.params.videoid);

  });
    
})

app.listen(666, () => console.log("Server on port 666"));