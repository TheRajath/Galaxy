if (process.env.NODE_ENV !== "production") {

    require('dotenv').config();
}

const path = require('path');
const ejsMate = require('ejs-mate');
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Gadget = require('./models/gadget');

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

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {

    res.render('home');
});

app.get('/gadgets', async (req, res) => {

    const gadgets = await Gadget.find({});
    res.render('gadgets/index', { gadgets });
});

app.get('/gadgets/:id', async (req, res) => {

    const gadget = await Gadget.findById(req.params.id);
    res.render('gadgets/show', { gadget });
});

app.listen(3000, () => {

    console.log('Serving on port 3000');
});
