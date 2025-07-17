const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapasync.js');
const listings_schema = require("../vali_schema.js");
const review = require('../models/review.js');
const Listing = require('../models/listing.js');
const { islogedin } = require('../middleware.js');
const { isowner } = require('../middleware.js');
const listing_conteroller = require('../controllers/Listing_cont.js');


// Route to get all listings
router.get('/',  wrapAsync(listing_conteroller.indexlistings));

// new listing route
router.get('/new', islogedin, listing_conteroller.rendernewForm);
router.post('/', wrapAsync(listing_conteroller.newlisting));

// show Route 
router.get('/:id', listing_conteroller.showlisting );

// edit route
router.get('/:id/edit',listing_conteroller.editlisting);

// update route
router.put('/:id',listing_conteroller.updatelisting);

// delete route
router.delete('/:id',listing_conteroller.deletelisting);



module.exports = router;