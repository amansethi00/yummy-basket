const express = require('express');
const router = express.Router();
const Product = require('../model/products.model');
router.route('/')
  .get(async (req, res) => {
    try {
      const allProducts = await Product.find({});
      res.json({ success: true, message: "succesfully received products data", products: allProducts })
    }
    catch (error) {
      console.error(error);
      res.status(400).json({ success: false, message: error })
    }

  })

  module.exports = router;