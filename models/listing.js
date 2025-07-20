const mongoose = require('mongoose');
const Review = require('./review.js');

const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    url: String,
    filename: String,
  },
  price: {
    type: Number,
    default: 0,
  },
  location: {
    type: String,
  },
  country: {
    type: String,
  },
  review : [{
    type : mongoose.Schema.Types.ObjectId,
    ref : "Review"
  }],
  owner :{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
});



listingSchema.post("findOneAndDelete" , async(Listing)=>{
  if(Listing){
    await Review.deleteMany({_id :{$in : Listing.review}});
  }
});


const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;