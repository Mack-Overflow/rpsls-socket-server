const rpsls = require('./rpsls');
const User = require('./models/User');
const bcrypt = require('bcrypt');
const saltRounds = 10;

let myPlaintextPassword = 'pa$$wd';

let password = bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
        // Store hash in your password DB.
    });
});

console.log("running test script");
// console.log(typeof(User[0]));
let kev = User[0].create({_id: 4, username: 'kevthedev', wins: 0, losses: 0, hash: password });
// kev.win();
// console.log(User);
// console.log(rpsls.moreBitSet('10000000'));
// console.log(rpsls.determineCommandBits('100'));
// console.log(rpsls.processInput('110000000000001100000010'));

