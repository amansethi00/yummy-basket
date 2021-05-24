const express = require('express');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const addressSchema = new Schema({
  address: [
    {
      name: { type: String },
      pincode: {
        type: Number,
        min: 6,
        max: 6
      },
      fullAddress: {
        type: String,
      },
      mobNo: {
        type: Number,
        min: 10,
        max: 10,
      },
      tagAs: {
        type: String
      }
    }
  ]


}, { timestamps: true });

const Address = mongoose.model('Address', addressSchema)
module.exports = Address;