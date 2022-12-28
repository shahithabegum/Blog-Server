const router=require('express').Router();
const Post=require('../modles/Post');

//Create post
router.post("/add", async (req,res)=>{
  try{
    const createpost=new Post({
    title:req.body.title,
    desc:req.body.desc,
    username:req.body.username,
    photo:req.body.photo
    });
    await createpost.save();
    res.status(200).json(createpost)
  }catch(err){
    res.status(200).json(err)
  }
})
//update post
router.put("/:_id", async (req,res)=>{
    try{
        const findpost=await Post.findById(req.params._id)
        if(findpost.username === req.body.username)
        {
          const updatedPost= await Post.findByIdAndUpdate(req.params._id,{
            $set:{
                 title:req.body.title,
                 desc:req.body.desc,
                 username:req.body.username,
                 
            }
          },{new:true});
          res.status(200).json(updatedPost)
        }else{
            res.status(400).json("User Not found")
        }
    }catch(err){
        res.status(500).json(err)
    }
})
//All post
router.get("/all",async (req,res)=>{
  try{
    const getAll= await Post.find()
  res.status(200).json(getAll)
  }catch(err){
    res.status(500).json(err)
}
  
})
//get post
router.get("/:_id",async (req,res)=>{
    try{
        const fpost= await Post.findById(req.params._id)
        const {username,...others}=fpost;
        res.status(200).json(fpost)
    }catch(err){
        res.status(500).json(err)
    }
})
//find post
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    } 
    else {
      posts = await Post.find();
     }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }

});

router.delete("/:id", async (req, res) => {
 
    const post = await Post.findById(req.params.id);
   
      try {
        await post.delete();
        res.status(200).json("Post has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
  
});
module.exports=router;