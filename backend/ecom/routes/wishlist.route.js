const express = require('express');
const router = express.Router();
const Wishlist = require('../model/wishlist.model');

const User = require('../model/user.model');
router.route('/')
  .get(async (req, res) => {
    const productsInWishlist = await Wishlist.findOne({ _id: req.user.wishlistId }).populate('products');

    res.json({ success: true, message: "testing in progress", productsInWishlist })
  })
  .post(async (req, res) => {
    try {
      const { productId } = req.body;
      const wishlistId = req.user.wishlistId;
      const wishlist = await Wishlist.findOne({ _id: wishlistId });
      if (wishlist.products.indexOf(productId) === -1) {
        wishlist.products.push(productId);
        await wishlist.save();
        const updatedWishlist = await Wishlist.findOne({ _id: wishlistId });
        res.json({ success: true, message: "product added to wishlist", updatedWishlist })
      }
      else {
        res.status(400).json({ success: false, message: "product already in the wishlist" })
      }


    }
    catch (error) {
      console.log(error);
      res.status(400).json({ success: false, message: error });
    }

  })
  .delete(async (req, res) => {
    try {
      const { productId } = req.body;
      const wishlistId = req.user.wishlistId;
      await Wishlist.updateOne({"_id":wishlistId},{$pull:{"products":[productId]}});
      const updatedWishlist = await Wishlist.findOne({ _id: wishlistId }).populate('products');
      res.json({ success: true, message: "product removed from wishlist", updatedWishlist })
    }
    catch (error) {
      console.log(error);
      res.status(400).json({ success: false, message: error });
    }
  })

module.exports = router;