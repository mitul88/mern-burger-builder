const jwt = required('jsonwebtoken');
const { Schema, model} = require('mongoose');

const userSchema = Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        minLength: 5,
        maxLength: 255
    },
    password: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 1024
    }
});

