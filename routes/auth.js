const express = require("express")
const router = express.Router()

const User = require("./../models/User")

router.post("/" ,async (req,res)=>{
  const user = User(req.body)
  await user.save()
  res.json(user)
})
router.get("/",(req,res)=>{
  res.send("hello pappu")
})

module.exports = router