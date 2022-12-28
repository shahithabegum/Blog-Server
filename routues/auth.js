const router=require('express').Router();

const User=require('../modles/User');
const bcrypt = require('bcrypt');
//register

//Create UserReg
 router.post("/register",async (req,res)=>{
    try{
        const salt=await bcrypt.genSalt(10);
        const hashpass= await bcrypt.hash(req.body.password,salt)
        const newUser=new User({
            username:req.body.username,
            email:req.body.email,
            password:hashpass
         });
         const user=await newUser.save();
         res.status(200).json(user)
    }catch(err){
        res.status(500).json(err)
    }
     
 })
//Login
router.post('/login',async (req,res)=>{
    try{
         const finduser=await User.findOne({email:req.body.email})
         !finduser && res.status(400).json("wrong Credentials!===")

         const Validated= await bcrypt.compare(req.body.password,finduser.password)
         !Validated && res.status(400).json("wrong Credentials!++++")
        const {password,...others}=finduser._doc;
         res.status(200).json(others)
    }catch(err){
        res.status(500).json(err)
    }
})
module.exports=router;