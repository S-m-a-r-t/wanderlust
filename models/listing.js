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
    type: String,
    default: "https://images.unsplash.com/photo-1750688650387-48fbdc7399b3?q=80&w=1106&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    
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