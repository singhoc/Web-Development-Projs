const Product = require('./models/product');
const mongoose = require('mongoose');
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/farmApp');
    console.log("connected to mongoose");
}

/*   const p = new Product({
       name: 'Ruby',
       price: 1.99,
       category: 'fruit'
   })

   p.save()
       .then(p => {
           console.log(p)
       })*/

const seedProducts = [
    {
        name: 'Fairy Eggplant',
        price: 1.00,
        category: 'vegetable'
    },
    {
        name: 'Goddess Melon',
        price: 4.99,
        category: 'fruit'
    },
    {
        name: 'Mini Seedle',
        price: 3.99,
        category: 'fruit'
    },
    {
        name: 'Organic Celery',
        price: 1.50,
        category: 'vegetable'
    },
    {
        name: 'Chocolate milk',
        price: 2.69,
        category: 'dairy'
    }
]

Product.insertMany(seedProducts)
    .then(res => {
        console.log(res)
    })