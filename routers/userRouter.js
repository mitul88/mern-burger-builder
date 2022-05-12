const express = require('express');
const bcrypt = require('bcrypt');

const { User, validate } = require('../models/user');


const router = express.Router();

router.route('/')
        .post();
        
router.route('/auth')
        .post();


module.exports = router;