if (process.env.NODE_ENV !== "production") {

    require('dotenv').config();
}

const path = require('path');
const ejsMate = require('ejs-mate');
const express = require('express');
const mongoose = require('mongoose');

mongoose.connect(process.env.DATA_SOURCE_LOCAL);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {

    res.render('home');
});

app.listen(3000, () => {

    console.log('Serving on port 3000');
});
