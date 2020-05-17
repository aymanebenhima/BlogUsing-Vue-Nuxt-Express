const express = require('express');
const app = express();
var port = process.env.PORT || 5080;

// declaring routes
app.get("/", (req, res) => {
    res.send(`testing testing hello hello !!! c'est bon !`);
});

app.listen(port, () => {
    console.log(`Server is started at ${port}`);
});