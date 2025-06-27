const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const ejs = require('ejs');
const path = require('path');
const Listing = require('./models/listing.js');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');



// middleware
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));



// connect to db 
main().then(() => {
  console.log('Connected to MongoDB');
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}




//server code 
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.get('/', (req, res) => {
  res.send("running good");
});


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

// Route to get all listings
app.get('/listings',  async(req, res) => {
  const listings = await Listing.find({});
  res.render('listings/listing.ejs', { listings });
});



// new listing route
app.get('/listings/new', (req, res) => {
  res.render('listings/listing_new.ejs');
});

app.post('/listings', async (req, res) => {
  const { title, description, image, price, location, country } = req.body;

  const listing = new Listing({
    title,
    description,
    image,
    price,
    location,
    country
  });

  await listing.save();
  res.redirect('/listings');
});

// show Route 
app.get('/listings/:id', async (req, res) => {
  let {id}= req.params;
  const listing = await Listing.findById(id);
  res.render('listings/show.ejs', { listing });

});


// edit route
app.get('/listings/:id/edit', async (req, res) => {
  let {id} = req.params;
  const listing = await Listing.findById(id);
  res.render('listings/listings_edit.ejs', { listing });
});


// update route
app.put('/listings/:id', async (req, res) => {
  let {id} = req.params;
  const { title, description, image, price, location, country } = req.body;

  await Listing.findByIdAndUpdate(id, {
    title,
    description,
    image,
    price,
    location,
    country
  }, {  new: true });

  res.redirect(`/listings/${id}`);
});


// delete route
app.delete('/listings/:id', async (req, res) => {
  let {id} = req.params;
  await Listing.findByIdAndDelete(id);
  res.redirect('/listings');
});