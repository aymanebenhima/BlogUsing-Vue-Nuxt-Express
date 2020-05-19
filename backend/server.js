// Imports
const express = require('express');
const bodyParser = require('body-parser');
const apiRouter = require('./apiRouter').router;

// Instantiate server
const app = express();

// Body Parser configuration
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configure routes
app.get('/', (req, res) =>{
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('<h1>hello my test</h1>');
});

app.use('/api/', apiRouter);

//  Lanch server
const PORT = process.env.PORT || '5000';
app.listen(PORT, () => console.log(`Server listening to port ${PORT}`));
