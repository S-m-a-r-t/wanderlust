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
const upload = multer({ dest: 'uploads/' });



router.route('/')
.get(wrapAsync(listing_conteroller.indexlistings))
// .post(upload.single('listing.image'), listing_conteroller.newlisting);


.post(upload.single('image'), (req, res) => {
  try{
    console.log(req.file);
    console.log(req.body);
    res.send(req.file);
  }catch(err){
    console.log(err);
  }
});


// new listing route
router.get('/new', islogedin, listing_conteroller.rendernewForm);

router.route('/:id')
.get( listing_conteroller.showlisting )
.put( islogedin,isowner, wrapAsync(listing_conteroller.updatelisting) )
.delete( islogedin, wrapAsync( listing_conteroller.deletelisting ) );

// edit route
router.get('/:id/edit', islogedin, wrapAsync(listing_conteroller.editlisting));


module.exports = router;