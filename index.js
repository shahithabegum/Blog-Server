const express= require('express');
const app=express();
const mongoose=require('mongoose')
const authRouter=require('./routues/auth')
const userRouter=require('./routues/user')
const postRouter=require('./routues/post')
const categoryrouter=require('./routues/categories')
const multer = require("multer");
const path = require("path");
const cors=require('cors');

require('dotenv/config');
app.use(express.json())
app.use(cors())
app.use(express.static(path.join(__dirname,'public')));
app.use('/images',express.static("images"))
mongoose.connect(process.env.MONGODB_URL) .then(() => {
    console.log('connected to db');
  })
  .catch((err) => {
    console.log(err.message);
  });

 const storage = multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,"images")
  },
  filename:(req,file,cb)=>{
    cb(null,file.originalname)
  }
 });

 const upload=multer({storage:storage});
 app.post('/api/upload',upload.single("img"),(req,res)=>{
  console.log(req)
  res.status(200).json(req.file);
 })
 
  app.use("/api/auth",authRouter)
  app.use('/api/user',userRouter)
  app.use("/api/post",postRouter)
  app.use('/api/cat',categoryrouter)

 module.exports=app;