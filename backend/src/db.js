

const mongoose = require('mongoose');
 
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/instadb2');
    console.log(' Connecté à MongoDB');
  } catch (err) {
    console.error('Erreur MongoDB:', err);
  }
};
 
module.exports = connectDB;