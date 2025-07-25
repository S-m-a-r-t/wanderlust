const User = require('../models/user.js'); 
const passport = require('passport');
const {saveredirecturl} = require('../middleware.js');



module.exports.signupform =(req, res) => {
  res.render('users/signup.ejs');
};


module.exports.signup = async (req, res) => {
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
};


module.exports.loginform = (req, res) => {
  res.render('users/login.ejs');
};


module.exports.loginmain =  async(req, res) => {
  req.flash('success', 'Welcome to wanderlust!');
  res.redirect(res.locals.redirecturl || '/listings');
};


module.exports.logout = (req, res) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }
    req.flash('success', 'Logged out successfully!');
    res.redirect('/listings');
  });
};