const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");

const { PORT } = require("./config");
const { getCars, getCarsById } = require('./controllers/car/GetData');
const { addCar, updateCar, deleteCar, addCarImage } = require("./controllers/car/setData");
const upload = require("./util/imageUpload");

const app = express();

//Add middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.get('/', async (req, res) => {
    res.json({ info: 'Node.js, Express, and Postgres API' })
});
app.post('/car', addCar);

app.post('/car/:id', upload.single('car_image'), addCarImage);

app.put('/car', updateCar);

app.delete('/car/:id', deleteCar);


app.get('/cars', getCars);

app.get('/cars/:id', getCarsById);



//Upload route

app.listen(PORT,
    () => console.log(`the server is running on http://localhost:${PORT}`))
