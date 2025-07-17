const express = require('express');
const router = express.Router({mergeParams: true});
const { islogedin ,isreviewauthor } = require('../middleware.js');
const review_controller = require('../controllers/review_cont.js');



//review add rout
router.post('/',islogedin, review_controller.addingreview);

//reviews delete rout
router.delete('/:reviewID' ,islogedin,isreviewauthor, review_controller.deletingreview);

module.exports = router;