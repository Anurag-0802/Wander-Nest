const { builtinModules } = require('module');
const mongoose = require('mongoose');
const { type } = require('os');
const Schema = mongoose.Schema;


const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        type: String,
        default:
             "https://images.unsplash.com/photo-1741648711665-e1a8003b7891",
        set: (url) => url==="" 
        ? 
        "https://images.unsplash.com/photo-1741648711665-e1a8003b7891"
        : url
},
    price: Number,
    location: String,
    country: String,
});


const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;

