const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/relationshipDBDemo');
    console.log("connected to mongoose");
}
const db = mongoose.connection;

const userSchema = new mongoose.Schema({
    username: String,
    age: Number
})

const tweetSchema = new mongoose.Schema({
    text: String,
    likes: Number,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

const User = mongoose.model('User', userSchema);
const Tweet = mongoose.model('Tweet', tweetSchema);

// const makeTweets = async () => {
//     //const u = new User({ username: 'chicken', age: 44 })
//     const u = await User.findOne({ username: 'chicken' })
//     const tweet1 = new Tweet({ text: 'omg chickens', likes: 0 })
//     tweet1.user = u;
//     //await u.save();
//     await tweet1.save();
// }

// makeTweets();

const findTweet = async () => {
    const t = await Tweet.findOne({}).populate('user', 'username')
    console.log(t);
}
findTweet()