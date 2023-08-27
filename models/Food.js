const mongoose = require("mongoose")
const {Schema} = mongoose
const FoodSchema = new Schema({
  nameofFood : {
   type : String,
   required : true
  },
  calories  : {
    type : Number,
    required : true
   },
  protein  : {
    type : Number,
    required : true
   },
  carbohydrates : {
    type : Number,
    required : true
   } ,
  fat  : {
    type : Number,
    required : true
   }
})

module.exports = mongoose.model("food" , FoodSchema)