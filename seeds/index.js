if (process.env.NODE_ENV !== "production") {

    require('dotenv').config();
}
const mongoose = require('mongoose');
const Gadget = require('../models/gadget');
const cloudinaryImages = require('./images');
const gadgetsList = require('./gadgetList');

mongoose.connect(process.env.DATA_SOURCE_LOCAL);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const seedDb = async () => {

    await Gadget.deleteMany({});

    for (let i = 0; i < gadgetsList.length; i++) {

        const gadgetSeedData = gadgetsList[i];
        console.log(gadgetSeedData.title);

        const seedImages = cloudinaryImages[i].images;

        const gadget = new Gadget({

            title: gadgetSeedData.title,
            category: gadgetSeedData.category,
            brand: gadgetSeedData.brand,
            price: gadgetSeedData.price,
            inStock: gadgetSeedData.inStock,
            description: gadgetSeedData.description,
            images: [seedImages[0], seedImages[1]]
        });

        await gadget.save();

        console.log(gadget.title);
    }
};

seedDb().then(() => {
    mongoose.connection.close();
});
