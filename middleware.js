const Listing = require('./models/listing.js');
const Review = require('./models/review.js');




module.exports.islogedin = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirecturl = req.originalUrl;
    req.flash('error', 'You must be signed in first!');
    return res.redirect('/login');
  }
  next();
};





module.exports.saveredirecturl = (req, res, next) => {
  if (req.session.redirecturl) {
    res.locals.redirecturl = req.session.redirecturl;
  };
  next();
};



module.exports.isowner = async(req, res, next) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);

  if(!listing.owner.equals(res.locals.currentUser._id)){
    req.flash("error", "You are not authorized to edit this listing");
    return res.redirect(`/listings/${id}`);
  }
  next();
};


module.exports.isreviewauthor = async(req, res, next) => {
  let { id, reviewID } = req.params;
  let review = await Review.findById(reviewID);

  if(!review.author.equals(res.locals.currentUser._id)){
    req.flash("error", "You are not authorized to edit this review");
    return res.redirect(`/listings/${id}`);
  }
  next();
};