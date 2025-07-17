const Listing = require('../models/listing.js');
const { islogedin } = require('../middleware.js');
const { isowner } = require('../middleware.js');
const wrapAsync = require('../utils/wrapasync.js');


module.exports.indexlistings = async(req, res) => {
  const listings = await Listing.find({});
  res.render('listings/listing.ejs', { listings });
};

module.exports.rendernewForm = islogedin,(req, res) => {
  res.render('listings/listing_new.ejs');
};


module.exports.showlisting = async (req, res) => {
  try{
    let {id}= req.params;
    const listing = await Listing.findById(id).populate({path: "review", populate: {path: "author"} }).populate("owner");
    if(!listing){
      req.flash("error", "Listing doesn't exist");
       return res.redirect('/listings');
    }
    res.render('listings/show.ejs', { listing });
  }catch(err){
    console.log(err);
  }
};


module.exports.newlisting = async (req, res) => {
    const { title, description, image, price, location, country } = req.body;
    const userinfo = req.user._id;

    const listing = new Listing({
      title,
      description,
      image,
      price,
      location,
      country,
      owner: userinfo
    });

    await listing.save();
    req.flash("success", "New listing Created!")
    res.redirect('/listings');
};



module.exports.editlisting = islogedin, wrapAsync(async (req, res) => {
  let {id} = req.params;
  const listing = await Listing.findById(id);
  res.render('listings/listings_edit.ejs', { listing });
});

module.exports.updatelisting = islogedin,isowner, wrapAsync(async (req, res) => {
  let {id} = req.params;
  const { title, description, image, price, location, country } = req.body;

  
  await Listing.findByIdAndUpdate(id, {
    title,
    description,
    image,
    price,
    location,
    country
  }, {  new: true });
  req.flash("success", "Listing Updated Successfully!")
  res.redirect(`/listings/${id}`);
});



module.exports.deletelisting = islogedin, wrapAsync(async (req, res) => {
  let {id} = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing deleted Successfully!")
  res.redirect('/listings');
});