const express = require('express');
const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
  name:{
    type:String,
    required:true
  },
  username:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  cartId:{
    type:mongoose.ObjectId,
    ref:'Cart',
  },
  wishlistId:{
    type:mongoose.ObjectId,
    ref:'Wishlist'
  },
  addressId:{
    type:mongoose.ObjectId,
    ref:'Address',
  }
},{timestamps:true})

const User = mongoose.model('User',userSchema);
module.exports = User;