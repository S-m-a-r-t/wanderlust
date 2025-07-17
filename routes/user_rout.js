const express = require('express');
const router = express.Router({mergeParams: true});
const User = require('../models/user.js'); 
const passport = require('passport');
const {saveredirecturl} = require('../middleware.js');

router.get('/signup', (req, res) => {
  res.render('users/signup.ejs');
});

router.post('/signup', async (req, res) => {
  try {
    let { email, username, password } = req.body;
    let newUser = new User({ email, username });
    let registeredUser = await User.register(newUser, password);
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash('success', 'Welcome to Wanderlust!');
      res.redirect('/listings');
    });
  } catch (e) {
    req.flash('error', e.message);
    res.redirect('/signup');
  }
});


router.get('/login', (req, res) => {
  res.render('users/login.ejs');
});

router.post('/login', saveredirecturl, passport.authenticate('local',{failureRedirect: "/login", failureFlash: true}), async(req, res) => {
  req.flash('success', 'Welcome to wanderlust!');
  res.redirect(res.locals.redirecturl || '/listings');
});


router.get('/logout', (req, res) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }
    req.flash('success', 'Logged out successfully!');
    res.redirect('/listings');
  });
});

module.exports = router;