const express = require('express');
const app = express();

app.get("/:videoid", (req, res) => {
    console.log(req.params.videoid);
    res.send(req.params.videoid);
})

app.listen(666, () => console.log("Server on port 666"));