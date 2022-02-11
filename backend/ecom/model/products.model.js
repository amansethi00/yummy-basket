const express = require('express');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
  name: { type: String, required: true },
  image: {type:String, required:true},
  mrp:{type:Number,required:true},
  price: {type:Number,required:true},
  inStock: {type:Boolean,required:true},
  fastDelivery: {type:Boolean,required:true},
  ratings: {type:Number,required:true},
  offer: {type:String,required:true},
},{timestamps:true})

const Product = mongoose.model('Product',productSchema);

module.exports = Product;