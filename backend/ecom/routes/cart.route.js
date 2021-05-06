const express = require('express');
const router = express.Router();
const Product = require('../model/products.model');
const Cart = require('../model/cart.model');
const { extend } = require('lodash');
const mongoose = require('mongoose');
router.route('/')
  .get(async (req, res) => {
    try {
      const productsInCart = await Cart.findOne({ _id: req.user.cartId });
      res.json({ success: true, products: productsInCart.products })
    }
    catch (error) {
      console.log(error);
      res.status(401).json({ success: false, error: "unable to get products in cart" })

    }

  })
  .post(async (req, res) => {
    try {
      const { productId, quantity } = req.body;
      const cartInstance = await Cart.findOne({ _id: req.user.cartId });
      if (quantity === 0) {
        const {id} = req.body;
        //here productId is actually id of object in cart 
        await cartInstance.products.pull(id);
        await cartInstance.save();
        const updatedCartInstancee = await Cart.findOne({ _id: req.user.cartId });
        return res.json({ success: true, message: "updated the product in cart", updatedCartInstancee })
      }
      const productInCart = cartInstance.products.filter(prev => prev.productId == (productId));

      if (productInCart.length > 0) {
        updatedCartInstanceProduct = extend(productInCart[0], {
          productId,
          quantity
        });
        updatedCartInstanceProducts = extend(cartInstance.products, [cartInstance.products, updatedCartInstanceProduct]);
        const updatedCartInstance = extend(cartInstance, {
          products: updatedCartInstanceProducts
        })
        await updatedCartInstance.save();
        const updatedCartInstancee = await Cart.findOne({ _id: req.user.cartId });
        return res.json({ success: true, message: "updated the product in cart", updatedCartInstancee })
      }

      cartInstance.products.push({ productId, quantity });
      await cartInstance.save()
      const updatedCartInstance = await Cart.findOne({ _id: req.user.cartId });
      res.json({ success: true, updatedCartInstancee: updatedCartInstance });
    }
    catch (error) {
      console.log(error);
      res.status(401).json({ success: false, error: "unable to post products in cart" })
    }
  })
  .delete(async (req, res) => {
    try {
      const { productId, quantity } = req.body;
      if (quantity === 0) {
        const cartInstance = await Cart.findOne({ _id: req.user.cartId });
        const productInCart = cartInstance.products.filter(prev => prev.productId !== ((productId)));
        console.log(productInCart);
        cartInstance.products = productInCart;

        await cartInstance.save();
        res.json({ success: true, })
      }


    }
    catch (error) {
      console.log(error);
      res.json({ success: false, message: "not good" })
    }
  })


module.exports = router;