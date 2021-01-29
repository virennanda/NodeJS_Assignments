const express = require('express');
const bodyParser = require('body-parser');


const { PORT } = require("./config");
const { getCars, getCarsById } = require('./car/GetData');
const { carExists, addCar } = require("./car/setData");

const app = express();

//Add middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded(
    {
        extended: true
    }
));

app.get('/', async (req, res) => {
    res.json({ info: 'Node.js, Express, and Postgres API' })
});
app.post('/car', addCar);


app.get('/cars', getCars);

app.get('/cars/:id', getCarsById);

app.listen(PORT,
    () => console.log(`the server is running on http://localhost:${PORT}`))
