const router=require('express').Router();
const categories=require('../modles/Category');
//create cat
router.post("/add", async(req,res)=>{
    const newCat=new categories({
        name:req.body.name
    })
    try{
        await newCat.save()
       res.status(200).json(newCat)
    }catch(err){
        res.status(500).json(err)
    }
   
})
//get all category
router.get('/getall', async (req,res)=>{
    try{
        const cat= await categories.find()
        res.status(200).json(cat)
    }catch(err){
        res.status(500).json(err)
    }
   
})
module.exports=router;