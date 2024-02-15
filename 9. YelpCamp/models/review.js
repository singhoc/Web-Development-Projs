const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/yelp-camp');
    console.log("connected to mongoose");
}
const db = mongoose.connection;

const reviewSchema = new mongoose.Schema({
    body: String,
    rating: Number
})

module.exports = mongoose.model("Review", reviewSchema);