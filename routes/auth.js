const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const User = require("./../models/User")
const jwt = require('jsonwebtoken');

const { body, validationResult } = require('express-validator');

router.post("/" ,[
  body('email').isEmail(),
  body('name').isLength({min:3}),
  body('password').isLength({min:5})
],async (req,res)=>{
  const result = validationResult(req);
  if (result.isEmpty()) {
    // const user = User(req.body)
    // await user.save()
    const existingUser = await User.findOne({ email: req.body.email });

    if(existingUser){
      return res.status(400).json({error:"user already created"})
    }else{
      try{
        const salt = await bcrypt.genSalt(10)

        let secPass = await bcrypt.hash(req.body.password , salt)
        const user  =await User({
          name : req.body.name , 
          email : req.body.email,
          password : secPass,
          age : req.body.age
        })
        const data = {
          user : {
            id : user.id
          }
        }
        var token = jwt.sign(data, '$love$eldenring');
        return res.json({token});
      }catch(err){
        return console.error("error fetching from mongoDb " ,err)
      }
    }
   
  }

  res.send({ errors: result.array() });
  
})
router.get("/",(req,res)=>{
  res.send("hello pappu")
})

module.exports = router