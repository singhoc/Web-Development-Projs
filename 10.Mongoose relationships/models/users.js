const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/relationshipDBDemo');
    console.log("connected to mongoose");
}
const db = mongoose.connection;

const userSchema = new mongoose.Schema({
    first: String,
    last: String,
    addresses: [
        {
            city: String,
            state: String,
            country: {
                type: String,
                required: true
            },
            street: String
        }
    ]
})

const User = mongoose.model('User', userSchema);

const makeUser = async () => {
    const u = new User({
        first: 'Harry',
        last: 'Potter'
    })
    u.addresses.push({
        street: '123 Sesame st.',
        city: 'Ny',
        state: 'ny',
        country: 'USA'
    })
    const res = await u.save()
    console.log(res)
}

makeUser() 