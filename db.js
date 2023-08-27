const mongoose = require('mongoose');


async function connectToMongo() {
  try{
    await mongoose.connect('mongodb://127.0.0.1:27017/FitnessTracker');
    console.log("connected To Mongo now")
  }catch(err){
    console.log("error in connection with mongo",err)
  }
}

module.exports = connectToMongo