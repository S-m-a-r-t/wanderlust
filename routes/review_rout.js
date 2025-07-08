const express = require('express');
const router = express.Router({mergeParams: true});
const wrapAsync = require('../utils/wrapasync.js');
const listings_schema = require("../vali_schema.js");
const Listing = require('../models/listing.js');
const Review = require('../models/review.js');



//review add rout
router.post('/', async(req, res) => {
  try{
    let listing = await Listing.findById(req.params.id);
    let newreview = new Review(req.body.review);

    listing.review.push(newreview);

    await newreview.save();
    await listing.save();

    res.redirect(`/listings/${req.params.id}`);

  }catch(err){
    console.log(err);
  }
});



//reviews delete rout
router.delete('/:reviewID' , async(req, res) =>{
  let {id, reviewID} = req.params;
  await Listing.findByIdAndUpdate(id , {$pull: {review: reviewID}});
  await Review.findByIdAndDelete(reviewID);

  res.redirect(`/listings/${id}`);

});

module.exports = router;