const mongoose = require('mongoose');
const Review = require('./review')
const Schema = mongoose.Schema;

const imageSchema = new Schema({
    url: String,
    filename: String,
});

//we dont need to store on the schema, its like a virtual property
imageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/c_fit,h_250,w_250')
})

imageSchema.virtual('display').get(function () {
    return this.url.replace('/upload', '/upload/c_scale,h_350,w_400')
})

const CampgroundSchema = new Schema({
    title: String,
    price: Number,
    description: String,
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    location: String,
    images: [imageSchema],
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
});

CampgroundSchema.post('findOneAndDelete', async function (data) {
    if (data) {
        await Review.deleteMany({
            _id: {
                $in: data.reviews
            }
        })
    }
})


module.exports = mongoose.model('Campground', CampgroundSchema); 