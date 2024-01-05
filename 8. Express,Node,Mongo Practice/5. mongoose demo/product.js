const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/shopApp');
    console.log("connected");
}

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: Number
});

const Product = mongoose.model('Product', productSchema);

const bike = new Product({ name: 'Mountain Bike', price: 599, color: 'red' })
//color wont be saved
bike.save()
    .then(data => {
        console.log("It worked!")
        console.log(data);
    })
    .catch(err => {
        console.log("oh no error")
        console.log(err)
    })