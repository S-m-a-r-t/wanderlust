const mongoose = require('mongoose');


const reviewSchema = mongoose.Schema({
    comment: {
        type : String,
        required: true
    },
    rating :{
        type : Number,
        min : 1,
        max : 5
    },
    created_at:{
        type : Date,
        default: Date.now
    }
});

const reviews = mongoose.model("review" , reviewSchema);

module.exports = reviews;