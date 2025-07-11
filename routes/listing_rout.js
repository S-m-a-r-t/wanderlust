const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapasync.js');
const listings_schema = require("../vali_schema.js");
const review = require('../models/review.js');
const Listing = require('../models/listing.js');


// Route to get all listings

router.get('/',  wrapAsync(async(req, res) => {
  const listings = await Listing.find({});
  res.render('listings/listing.ejs', { listings });
}));


// new listing route
router.get('/new', (req, res) => {
  res.render('listings/listing_new.ejs');
});

router.post('/', wrapAsync(async (req, res) => {
    const { title, description, image, price, location, country } = req.body;

    const listing = new Listing({
      title,
      description,
      image,
      price,
      location,
      country
    });

    await listing.save();
    req.flash("success", "New listing Created!")
    res.redirect('/listings');
}));


// show Route 
router.get('/:id', async (req, res) => {
  try{
    let {id}= req.params;
    const listing = await Listing.findById(id).populate("review");
    if(!listing){
      req.flash("error", "Listing doesn't exist");
       return res.redirect('/listings');
    }
    res.render('listings/show.ejs', { listing });
  }catch(err){
    console.log(err);
  }
});


// edit route
router.get('/:id/edit', wrapAsync(async (req, res) => {
  let {id} = req.params;
  const listing = await Listing.findById(id);
  res.render('listings/listings_edit.ejs', { listing });
}));


// update route
router.put('/:id', wrapAsync(async (req, res) => {
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
}));


// delete route
router.delete('/:id', wrapAsync(async (req, res) => {
  let {id} = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing deleted Successfully!")
  res.redirect('/listings');
}));



module.exports = router;