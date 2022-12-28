const router=require('express').Router();

const User=require('../modles/User');
const post=require('../modles/Post');
const bcrypt = require('bcrypt');
const { aggregate } = require('../modles/User');
//update
router.put('/update/:id', async (req,res)=>{
    try{
        const user= await User.findById(req.params.id)
        if(user.id === req.params.id){
            const salt=await bcrypt.genSalt(10);
            const hashpass= await bcrypt.hash(req.body.password,salt)
            const updateUser=await User.findByIdAndUpdate(req.params.id,{
                $set:{  username:req.body.username,
                email:req.body.email,
                password:hashpass,
                profilePic:req.body.profilePic
                
            }
            },{new:true})
            res.status(200).json(updateUser)
        }
       
    }catch(err){
        res.status(500).json("Only valid User Can Update!!"+err)
    }
})

//Delete
router.delete("/delete/:id", async (req,res)=>{
    try{
            const user= await User.findById(req.params.id)
            
        try{
            await post.deleteMany({username:user.username})
            const deleteUser= await User.findByIdAndDelete(req.params.id)
            res.status(200).json("deleted Successfully")
        }catch(err){
            res.status(500).json(err)
        }
       
    }catch(err){
        res.status(500).json("user not fount")
    }
})
//getbyid
router.get("/get/:id", async (req,res)=>{
    try{
         const user= await User.findById(req.params.id)
         const {password,...others}=user._doc;
         res.status(200).json(user)
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports=router;
