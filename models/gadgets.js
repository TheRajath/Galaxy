const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    url: String,
    filename: String
});

ImageSchema.virtual('thumbnail').get(function () {

    return this.url.replace('/upload', '/upload/w_200');
});

const opts = { toJSON: { virtuals: true } };

const GadgetSchema = new Schema({
    title: String,
    category: String,
    brand: String,
    price: Number,
    description: String,
    inStock: Boolean,    
    images: [ImageSchema],
}, opts);

module.exports = mongoose.model('Gadget', GadgetSchema);
