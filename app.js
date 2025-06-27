const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const ejs = require('ejs');
const path = require('path');
const Listing = require('./models/listing.js');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));



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

// Route to get a single listing by ID