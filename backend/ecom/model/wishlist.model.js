const express = require('express');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const wishlistSchema = new Schema({
  products: [{ type: mongoose.ObjectId, ref: 'Product' }]
}, { timestamps: true })

const Wishlist = mongoose.model('Wishlist', wishlistSchema);
module.exports = Wishlist;
