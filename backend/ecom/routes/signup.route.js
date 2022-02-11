const express = require('express');
const router = express.Router();
const Cart = require('../model/cart.model');
const Wishlist = require('../model/wishlist.model');
const Address = require('../model/address.model');
const User = require('../model/user.model');

router.route('/')
  .post(async (req, res) => {
    try {
      console.log(req.body);
      const { name, username,email, password } = req.body;
      const newCart = await Cart.create({});
            console.log({"cart":newCart});

      const newWishlist = await Wishlist.create({});
      const newAddresslist = await Address.create({});
      const newUser = await User.create({
        name,
        username,
        password,
        email,
        cartId:newCart._id,
        wishlistId:newWishlist._id,
        addressId:newAddresslist._id
      })
      res.json({ success: true, message: "testing ",user:newUser })

    }
    catch (error) {
      console.error(error);
      res.status(400).json({ success: false, message: "error on signup" });
    }

  })

module.exports = router;