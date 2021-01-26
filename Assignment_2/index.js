const express = require('express');
const bodyParser = require('body-parser');


const { PORT } = require("./config");
const { getCars, getCarsById } = require('./car/GetData');


const app = express();

//Add middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded(
    {
        extended: true
    }
));

app.get('/', (req, res) => {
    res.json({ info: 'Node.js, Express, and Postgres API' })
});

app.get('/cars', getCars);

app.get('/cars/:id', getCarsById);

app.listen(PORT,
    () => console.log(`the server is running on http://localhost:${PORT}`))
