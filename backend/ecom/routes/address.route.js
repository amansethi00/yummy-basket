const express = require('express');
const router = express.Router();
const Address = require('../model/address.model');
const { extend } = require('lodash');

router.route('/')
  .get(async (req, res) => {
    try {
      const user = req.user;
      const userAddresses = await Address.findOne({ _id: user.addressId }).populate('address');
      res.json({ success: true, userAddresses });
    }
    catch (error) {
      res.status(401).json({ success: false, message: "error in catch block" })
    }

  })
  .post(async (req, res) => {
    try {
      const user = req.user;
      const userAddresses = await Address.findOne({ _id: user.addressId });
      userAddresses.address.push({ ...req.body });
      await userAddresses.save();
      const updatedUserAddresses = await Address.findOne({ _id: user.addressId }).populate('address');
      res.json({ success: true, updatedUserAddresses });
    }
    catch (error) {
      console.log(error);
      res.status(401).json({ success: false, message: "error in catch block" })
    }
  })

  module.exports = router;