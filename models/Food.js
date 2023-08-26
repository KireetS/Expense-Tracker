const mongoose = require("mongoose")

const FoodSchema = new Schema({
  nameofFood : string,
  calories : number,
  protein : number,
  carbohydrates : number ,
  fat : number 
})

module.exports = mongoose.model("food" , FoodSchema)