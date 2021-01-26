const express = require('express');
const bodyParser = require('body-parser');


const { PORT } = require("./config");


const app = express();

//Add middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded(
    {
        extended: true
    }
))