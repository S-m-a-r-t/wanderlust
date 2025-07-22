const Listing = require('../models/listing.js');
const { islogedin } = require('../middleware.js');
const { isowner } = require('../middleware.js');
const wrapAsync = require('../utils/wrapasync.js');
const axios = require('axios');


module.exports.indexlistings = async(req, res) => {
  const listings = await Listing.find({});
  res.render('listings/listing.ejs', { listings });
};

module.exports.rendernewForm = (req, res) => {
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
    const query = encodeURIComponent(listing.location + ', ' + listing.country);
    const apiKey = process.env.MAP_KEY; // store it safely in .env
    const geoURL = `https://api.maptiler.com/geocoding/${query}.json?key=${apiKey}`;

    const geoResponse = await axios.get(geoURL);
    const coordinates = geoResponse.data?.features?.[0]?.geometry?.coordinates;
    res.render('listings/show.ejs', { listing, coordinates });
  }catch(err){
    console.log(err);
  }
};


module.exports.newlisting = async (req, res) => {
    const { title, description, image, price, location, country } = req.body;
    let url = req.file.path;
    let filename = req.file.filename;
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
    listing.image = {url, filename};

    await listing.save();
    req.flash("success", "New listing Created!")
    res.redirect('/listings');
};



module.exports.editlisting =  async (req, res) => {
  let {id} = req.params;
  const listing = await Listing.findById(id);


  let org_url = listing.image.url;
  let final_url = org_url.replace("/upload", "/upload/h_300,w_250/");
  req.flash("error", "your listing doesn't exist");
  res.render('listings/listings_edit.ejs', { listing, final_url });
};

module.exports.updatelisting = async (req, res) => {
  let {id} = req.params;
  const { title, description, image, price, location, country } = req.body;

  
  let updatedlisting = await Listing.findByIdAndUpdate(id, {
    title,
    description,
    image,
    price,
    location,
    country
  }, {  new: true });

  if(typeof req.file !== 'undefined' && req.file !== null) {
    let url = req.file.path;
    let filename = req.file.filename;
    updatedlisting.image = {url, filename};
    await updatedlisting.save();
  }

  req.flash("success", "Listing Updated Successfully!")
  res.redirect(`/listings/${id}`);
};



module.exports.deletelisting = async (req, res) => {
  let {id} = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing deleted Successfully!")
  res.redirect('/listings');
};