const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    _id: Number,
    username: String,
    wins: Number,
    losses: Number,
    friends: Array,
    hash: String,
}, {timestamps: true});

const User = mongoose.model('User', usersSchema);
let user1 = User.findById(1);
console.log(user1);