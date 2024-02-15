const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/relationshipDBDemo');
    console.log("connected to mongoose");
}
const db = mongoose.connection;

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    season: {
        type: String,
        enum: ['Spring', 'Summer', 'Winter']
    }
});

const Product = mongoose.model('Product', productSchema);

// Product.insertMany([
//     { name: 'Goddess Melon', price: 4.99, season: 'Summer' },
//     { name: 'Sugar Baby Watermelon', price: 4.99, season: 'Summer' },
//     { name: 'Asparagus', price: 3.99, season: 'Spring' }

// ])

const farmSchema = new mongoose.Schema({
    name: String,
    city: String,
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
})

const Farm = mongoose.model('Farm', farmSchema);

// const makeFarm = async () => {
//     const farm = new Farm({ name: 'Full Belly Farms', city: 'Florida, NY' });
//     const melon = await Product.findOne({ name: 'Goddess Melon' });
//     farm.products.push(melon);
//     await farm.save();
// }

// makeFarm();


