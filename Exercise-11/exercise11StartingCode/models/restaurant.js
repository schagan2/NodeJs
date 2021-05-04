const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
    name: {
        type: String,
        required: true,
    },

    yearFounded: {
        type: Number,
        required: true
    },

    owner: {
        type: String,
        required: true
    },

    imageURL: {
        type: String,
        default: 'https://www.signalconnect.com/wp-content/uploads/2018/02/DIRECTV-for-Fast-Food-Restaurants.jpg'
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;