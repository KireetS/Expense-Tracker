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
    type : Number,
    default : 1
  },
  month:{
    type : String,
    default : "January"
  },
  year:{
    type : Number,
    default : 2001
  }
})

module.exports = mongoose.model("expense" , ExpenseSchema)