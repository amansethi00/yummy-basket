const express = require('express');
const mongoose = require('mongoose');
const {Schema} = mongoose;

const cartSchema = new Schema({
  products:[{  productId:{
    type:mongoose.ObjectId,
    ref:'Product'  },
  quantity:{
    type:Number,
  }}]

},{timestamps:true})

const Cart = mongoose.model('Cart',cartSchema)
module.exports = Cart;