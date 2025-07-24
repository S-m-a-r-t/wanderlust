if(process.env.NODE_ENV != 'production') {
   require('dotenv').config();
}


const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const ejs = require('ejs');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const listings = require("./routes/listing_rout.js");
const reviews = require("./routes/review_rout.js");
const user_router = require("./routes/user_rout.js");
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user.js'); 
const MongoStore = require('connect-mongo');
const dbUrl = process.env.ATLAS_DB_URL; // MongoDB connection URL

const ExpressError = require('./utils/ExpressError.js'); // Importing the ExpressError class
const listings_schema = require("./vali_schema.js");



// middleware
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,// time in seconds
});

store.on("error", function(e){
  console.log("Session store error", e);
});


const sessionoption = {
  store: store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true
  }
};

app.use(session(sessionoption));
app.use(flash());


//passport configuration
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



//connect to db
async function main() {
  await mongoose.connect(dbUrl);
}


main().then(() => {
  console.log('Connected to MongoDB');
})
.catch(err => console.log(err));



// const validatelisting = (req , res , next)=>{
//   let result = listings_schema.validate(req.body);
//   console.log(result);
//   if(result.error){
//     throw next(err);
//   }
// }


app.use((req, res, next)=>{
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user;
  next();
})

//server code 
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/listings`);
});

// app.get('/', (req, res) => {
//   res.send("running good");
// });



app.get('/demouser', async(req, res) =>{
  let fakeuser = new User({
  username: "demoUser",
  email: "demouser@example.com"
  });
  let registeredUser = await User.register(fakeuser,"helloworld");
  res.send(registeredUser);
});


//define routes
app.use("/" , user_router);
app.use("/listings" , listings);
app.use("/listings/:id/reviews" , reviews);



// app.get('/testlistings', async (req, res) => {
//   let testlist = new Listing({
//     title: "Test Listing",
//     description: "This is a test listing",
//     image: "https://images.unsplash.com/photo-1750688650387-48fbdc7399b3?q=80&w=1106&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     price: 100,
//     location: "Test Location",
//     country: "Test Country"
//   });
//   await testlist.save();
//   res.send("Test listing created");
// });




app.use((err, req, res, next) => {
  let {statusCode = 500} = err;
  res.status(statusCode).render('listings/error.ejs');
});
