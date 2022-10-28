// const mongoose = require('mongoose'); //

// const gameSchema = new mongoose.Schema({

// })

class Game {
    constructor(player1=null, player2=null) {
        this.player1 = player1;
        this.player2 = player2;
    }

    // get player1() { return this.player1; }
    // get player2() { return this.player2; }
    setPlayer1(player1) { this.player1 = player1;}
    setPlayer2(player2) { this.player2 = player2;}

    startGame() { 
        this.starttime = Date.now();
    }
}

let g = new Game("hi", "hello");
g.startGame();
console.log(g.starttime);