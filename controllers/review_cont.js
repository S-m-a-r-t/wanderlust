const Listing = require('../models/listing.js');
const Review = require('../models/review.js');


module.exports.addingreview = async(req, res) => {
  try{
    let listing = await Listing.findById(req.params.id);
    let newreview = new Review(req.body.review);
    newreview.author = res.locals.currentUser._id;

    listing.review.push(newreview);

    await newreview.save();
    await listing.save();
    req.flash("success", "review added Successfully!")
    res.redirect(`/listings/${req.params.id}`);

  }catch(err){
    console.log(err);
  }
};



module.exports.deletingreview =async(req, res) =>{
  let {id, reviewID} = req.params;
  await Listing.findByIdAndUpdate(id , {$pull: {review: reviewID}});
  await Review.findByIdAndDelete(reviewID);

  res.redirect(`/listings/${id}`);

};