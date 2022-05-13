const express = require('express');
const { Order } = require('../models/order');
const authorize = require('../middlewares/authorize');
const router = express.Router();

const newOrder = async (req, res) => {
    const order = new Order(req.body);
    try{
        await order.save();
        return res.status(201).send("Order places successfully");
    } catch(err) {
        return res.status(400).send(("Something went wrong !!"));
    }
}

router.route('/')
.get()
.post(authorize, newOrder)


module.exports = router;