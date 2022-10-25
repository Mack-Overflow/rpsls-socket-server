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

// Gets all the Courses
app.get('/api/v1/courses', (req, res, err) => {
    // const { courseId, uvuId } = req.query;
    
    res.send(`GET Courses: ${courseId} ${uvuId}`);
});

// Gets all the logs
app.get('/api/v1/logs', (req, res, err) => {
    const { courseId, uvuId } = req.query;
    res.send(`GET Logs: ${courseId} ${uvuId}`);
});

// app.get('/socket.io/', (req, res) => {
//     // console.log(req);
//     console.log("HITTINGGGGG HERRRREEEEE");
// });

// REST CALLS
app.post('/store', (req, res) => { 

}); // Create

app.post('/', (req, res) => {
    // Debug the request data
    // Alter DBa
    // Write to 
});

app.put('/update', (req, res) => {
    
}); // Update

httpServer.listen(3030);