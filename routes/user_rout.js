const express = require('express');
const router = express.Router({mergeParams: true});
const user_controller = require('../controllers/user_cont.js');

router.get('/signup', user_controller.signupform);

router.post('/signup', user_controller.signup);

router.get('/login', user_controller.loginform);

router.post('/login', user_controller.login);

router.get('/logout', user_controller.logout);

module.exports = router;