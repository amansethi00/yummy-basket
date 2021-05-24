const express= require('express');
const router = express.Router();

router.route('/')
  .get(async(req,res)=>{
    try {
      await req.user.populate("wishlistId cartId addressId").execPopulate();
       res.json({success:true,user: req.user});
    }
  catch (error) {
    res.status(401).json({success:false,message:"please login to perform this action"})
  }
  })

  module.exports = router;