const mongoose = require('mongoose');

main().catch(err => console.error(err));

async function main() {
    // console.log("hello mongoose main");
    await mongoose.connect('mongodb://localhost:27017/test');
}

// Define Schema
const usersSchema = new mongoose.Schema({
    _id: Number,
    username: String,
    wins: Number,
    losses: Number,
    friends: Array,
})


// Define model methods
usersSchema.methods.win = function win() {
    this.wins += 1;
    this.save();
};



const User = mongoose.model('User', usersSchema);
let user1 = User.findById(1);
console.log(user1);
// const kevthedev = new User({ username: 'kevthedev', wins: 0, losses: 0, friends: [] });

// console.log(kevthedev);
// const testytester = new User({ username: 'testytester', wins: 0, losses: 0, friends: [] });
// testytester.win();

// console.log(testytester);
// kevthedev.win();
// kevthedev.save(); // Save model