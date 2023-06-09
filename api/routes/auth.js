const router =require("express").Router();
const bcrypt = require("bcrypt")
const User= require("../models/User");


// REGISTER
router.post("/register",async (req,res)=>{
    try{
        const salt= await bcrypt.genSalt(10);
        const hashedpass = await bcrypt.hash(req.body.password,salt);
        const newUser= new User({
            username:req.body.username,
            email:req.body.email,
            password:hashedpass,
        })

        const user = await newUser.save();
        res.status(200).json(user)
    }catch(err){
        res.status(500).json(err);
    }
})

//LOGIN
router.post("/login", async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) {
        return res.status(400).json("Invalid username");
      }
  
      const validated = await bcrypt.compare(req.body.password, user.password);
      if (!validated) {
        return res.status(400).json("Invalid password");
      }
      const {password,...others}= user._doc;
      res.status(200).json(others);
    } catch (error) {
      res.status(500).json(error);
    }
  });
  

module.exports=router