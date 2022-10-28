// console.log('loading server!');
// const db = require('./db.json');
const express = require('express');
const logger = require('morgan');
const app = express();
// const socketConnection = require('./controllers/socketController');
const http = require('http');

// const server = http.createServer(app);
const httpServer = require("http").createServer(app);
const { Server } = require('socket.io');
// const io = new Server(server);
const io = require("socket.io")(httpServer, {
    // ...
});
const PORT = 3002;
const rpsls = require('./rpsls');

// M I D D L E  W A R E
app.use(logger('dev'));

// Internal Middleware
// app.use(express.static('public'));
// External Middleware
let connectionsQueue = [];

io.on('connection', (socket) => {
    // Fat arrow will elimate global var usage
    console.log('user connected');
    // socket.emit("hello", "changed response from hello emit");
    // push to connections array, look for matching connection

    // Set 5 second timer before connecting bot, calling botSpike.js
    socket.on('command', (s) => {
        let currentResponse = rpsls.processInput(s)
        // connections.push(currentResponse);
    })

    socket.on('login', (s) => {
        rpsls.handleLogin(s);
    })

    socket.on('joinGame', (s) => {
        // If a player is currently in connections queue, start game
        if (connectionsQueue.length === 1) {
            connectionsQueue.push(s);
            console.log('2 players are ready!');
            let handleGame = rpsls.handleStartGame(connectionsQueue);
            connectionsQueue = [];
        } else {
            console.log("1 player is ready");
            connectionsQueue.push(s)
            console.log(connectionsQueue);
        }
        // Otherwise, add player to queue and wait for 2nd connection
    })

    // socket.on('move', (s) =>{

    // });

    socket.on('disconnect', () => {
        console.log('user disconnect');
    });
    //     socket.on('chatMsg', (msg) => {
    //         const view = new DataView();
    //         view.getUint8(0); // Get value at offset 0
    //         // console.log(view);
    //     })
    // socket.on('chatMsg', (msg) => {
    //     if (msg.startsWith('command:')) {
    //         console.log("message: " + msg);
    //         socket.emit('chatMsg', msg);
    //         // change other players background color
    //         // const color = msg.split(':')[1];
    //     }
    //     // else if (msg.startsWith('decision:')) {
    //     //     console.log("Player decision: "+ msg);
    //     // }
    //     else {
    //         // just a text message
    //     }
    //     // console.log('chat message: ' + msg);
    //     // socket.broadcast.emit('chat message', 'hi'); // Emits to all sockets
    // });

})

// Run Server
app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
//   server.close();
});

// Handle shutdown and closing
function gracefulShutdown() {
    server.close(() => console.log(`Server is down`));
}

// process.on('SIGINT', gracefulShutdown);

/**
 * A P I  R O U T E S
 */

app.post('/api/register', (req, res, err) => {
    const { displayName, email, password } = req.query;
    // User model creation

    res.send({success: true, data: {} });
})
app.post('/api/login', (req, res, err) => {
    // User model retrieval

    const { email, password } = req.query;

    res.send({success: true, data: {player: Player }})
})
app.get('/api/game', (req, res, err) => {
    // Game model retrieval (all)
})
app.put('/api/game/join', (req, res, err) => {
    const { player, room } = req.query;
    // Add playerId to room
})
app.put('/api/game/watch', (req, res, err) => {
    const { player, room } = req.query;
    // Add playerId to room as commentator
})



httpServer.listen(3030);