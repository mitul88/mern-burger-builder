const express = require('express');
const _ = require('lodash');
const bcrypt = require('bcrypt');

const { User, validate } = require('../models/user');

const router = express.Router();

const newUser = async (req, res) => {
        const {error} = validate(req, res);
        if(error) {
                return res.status(400).send(error.details[0].message);
        }

        let user = await user.findOne({email: req.body.email});
        if(user) {
                return res.status(400).send("Email exist");
        }

        user = new User({
                email: req.body.email,
                password: req.body.password
        })
}

router.route('/')
        .post();
        
router.route('/auth')
        .post();


module.exports = router;