const mongoose = require('mongoose');
const Listing = require('../models/listing.js');
const innitdata = require('./data.js');



// connect to db 
main().then(() => {
  console.log('Connected to MongoDB');
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}



const initDB = async () => {
  await Listing.deleteMany({});
  innitdata.data = innitdata.data.map((Object) =>({
    ...Object,
    owner: '6877f5657e8886917bc7f004' 
  }));
  await Listing.insertMany(innitdata.data);
};

initDB().then(() => {
  console.log('Database initialized with test data');
});