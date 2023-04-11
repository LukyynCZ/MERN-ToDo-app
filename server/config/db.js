const mongoose = require('mongoose');
const dbString = process.env.CONNECTION_STRING;

const connectDB = async () => {
  try {
    await mongoose.connect(dbString);
    console.log('MongoDB is connected!');
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
