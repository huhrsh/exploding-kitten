const express = require('express');
const port = 5000;
const http = require('http')
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser')
const db=require('./config/mongoose')
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

app.use(cors({
    origin: "https://exploding-kitten-rho.vercel.app",
    // origin: "https://print-easy.vercel.app",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
}));

app.use('/', require('./routes'))

app.listen(port, function (err) {
    if (err) {
        console.log("Error in listening.")
    }
})