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
const session = require('express-session');
const flash = require('connect-flash');

const ExpressError = require('./utils/ExpressError.js'); // Importing the ExpressError class
const listings_schema = require("./vali_schema.js");



// middleware
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));



const sessionoption = {
  secret : "mysecretstring",
  resave : false,
  saveUninitialized : true,
  cookie: {
    expires: Date.now()  + 7*24*60*60*1000,
    maxAge: 7*24*60*60*1000,
    httpOnly: true
  }
};

app.use(session(sessionoption));
app.use(flash());





// connect to db 
main().then(() => {
  console.log('Connected to MongoDB');
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

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
  next();
})

//server code 
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.get('/', (req, res) => {
  res.send("running good");
});


//define routes
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
