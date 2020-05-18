// Imports
const express = require('express');


// Instantiate server
const app = express();

// Configure routes
app.get('/', (req, res) =>{
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('<h1>hello my test</h1>');
});

//  Lanch server
const PORT = process.env.PORT || '5000';

app.listen(PORT, () => console.log(`Server listening to port ${PORT}`));
