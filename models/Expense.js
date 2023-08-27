const mongoose = require("mongoose")
const {Schema} = mongoose
const ExpenseSchema = new Schema({
  user:{
    type : mongoose.Schema.Types.ObjectId,
    ref : 'user'
  },
  name : {
   type : String,
   required : true
  },
    money  : {
    type : Number,
    required : true
   },
  date:{
    type : Date,
    default : Date.now
  }
})

module.exports = mongoose.model("expense" , ExpenseSchema)