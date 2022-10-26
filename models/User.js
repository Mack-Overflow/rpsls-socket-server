const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    _id: {type: Number, required: true},
    username: String,
    wins: Number,
    losses: Number,
    // friends: Array,
    hash: String,
}, {timestamps: true});
// let counter = mongoose.model('counter', usersSchema);

// ----- D E F I N E  M O D E L  M E T H O D S --------------
usersSchema.methods.win = function win() {
    this.wins += 1;
    this.save();
};
usersSchema.methods.lose = function lose() {
    this.losses += 1;
    this.save();
}

const User = mongoose.model('User', usersSchema);

module.exports = [
    User
]
// let user1 = User.findById(1);
// console.log(user1);