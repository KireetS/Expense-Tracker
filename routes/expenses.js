const express = require("express")
const router = express.Router()
const Expense = require('./../models/Expense')
const fetchUser = require("../middleware/fetchUser")
const { body, validationResult } = require('express-validator');
const { findById, findByIdAndUpdate } = require("../models/User");
//fetching all notes
router.get("/getnotes",fetchUser,async(req,res)=>{
  try{
    const user = req.user.id;
    let query = { user };

    if (req.query.year) {
      query.year = req.query.year;
    }

    if (req.query.month) {
      query.month = req.query.month;
    }
    const expenses = await Expense.find(query)
  res.json(expenses)
  }catch(error){
    console.error("error fetching expenses " ,error)
    res.json({error : err.message})
  }
})

router.post("/add" ,fetchUser, [
  body('name').exists(),
  body('money').exists()
],fetchUser , async (req , res) =>{
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    return res.status(400).json({error : errors.array()})
  }
  const {name ,date,month , year ,  money} = req.body
  try{
    let expense = new Expense({
      name ,date,month,year, money , user : req.user.id
    })

    let savedExpense = await expense.save()
    res.json(savedExpense)
  }catch(err){
    console.error("error posting expenses ", err)
    res.json({error : err.message})
  }
})

router.delete("/delete/:id",fetchUser , async(req,res)=>{
  let expenseId = req.params.id
  try{
    let deletedItem = await Expense.findByIdAndDelete(expenseId)
    if(!deletedItem){
      return res.json({msg : "this id for this item does not exist or is not available"})
    }
    res.json({msg : `item deleted with id : ${expenseId}`})
    

    
  }catch(err){
    console.error("error in deleting " , err)
    res.json({error : "error in deleting expense"})
  }
})

router.put("/update/:id"  , fetchUser , async(req,res) =>{
  let expenseId = req.params.id
  try{
    let {name , money , date,month,year} =  req.body
    let updatedExpense = {}
    if(name)updatedExpense.name = name
    if(money)updatedExpense.money = money
    if(date)updatedExpense.date = date
    if(month)updatedExpense.month = month
    if(year)updatedExpense.year = year
    let expense = await Expense.findById(expenseId)
    if(!expense){
      return res.json({msg : " NOT FOUND "})
    }

    if(req.user.id != expense.user.toString()){
      return res.status(401).json("Not found")
    }

    const updatedNote = await Expense.findByIdAndUpdate(expenseId , updatedExpense , {new : true})
    res.json(updatedNote)
  }catch(err){
    console.error("error in updating field " , err)
    res.json({msg : "updated the required field"})
  }
})

module.exports = router