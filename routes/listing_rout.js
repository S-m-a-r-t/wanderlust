const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapasync.js');
const listings_schema = require("../vali_schema.js");
const review = require('../models/review.js');
const Listing = require('../models/listing.js');
const { islogedin } = require('../middleware.js');
const { isowner } = require('../middleware.js');
const listing_conteroller = require('../controllers/Listing_cont.js');
const multer  = require('multer');
const { storage } = require('../cloudconfig.js');
const upload = multer({ storage });



router.route('/')
.get(wrapAsync(listing_conteroller.indexlistings))
.post(islogedin, upload.single('image'), listing_conteroller.newlisting);


// new listing route
router.get('/new', islogedin, listing_conteroller.rendernewForm);

router.route('/:id')
.get( listing_conteroller.showlisting )
.put( islogedin, isowner, upload.single('image'), wrapAsync(listing_conteroller.updatelisting) )
.delete( islogedin, wrapAsync( listing_conteroller.deletelisting ) );

// edit route
router.get('/:id/edit', islogedin, wrapAsync(listing_conteroller.editlisting));


module.exports = router;