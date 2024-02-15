const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/yelp-camp');
    console.log("connected to mongoose");
}
const db = mongoose.connection;

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 30 + 10)
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/483251',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque temporibus cum officia incidunt! Reprehenderit porro, sint rerum animi excepturi itaque, modi numquam cupiditate hic est consectetur ullam ea, id aliquid. Consequuntur nostrum sunt nisi, soluta natus ex saepe reiciendis, maxime inventore omnis officiis? Quasi beatae reiciendis, sunt consectetur nemo at sit adipisci distinctio amet, dolorum aspernatur dolor ad nobis laborum.',
            price
        })
        await camp.save();
    }
}

seedDB().then(() => {
    db.close()
});