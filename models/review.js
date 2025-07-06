const mongoose = require('mongoose');


const reviewSchema = mongoose.Schema({
    comment: String,
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


module.exports =  mongoose.model("Review" , reviewSchema);