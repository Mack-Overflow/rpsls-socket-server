// const { Server } = require('socket.io');
// const httpServer = require("http").createServer(app);
// const io = require("socket.io")(httpServer, {
//     // ...
// });

// function handleConnection() {

//     io.on('connection', (socket) => {
//         // Fat arrow will eliminate global var usage
//         console.log('user connected');
//         socket.emit("hello", "world");
//         socket.on('disconnect', () => {
//             console.log('user disconnect');
//         });
    
//         socket.on('chatMsg', (msg) => {
//             const view = new DataView();
//             view.getUint8(0); // Get value at offset 0
//             // console.log(view);
//         })
//         // socket.on('chatMsg', (msg) => {
//         //     if (msg.startsWith('command:')) {
//         //         console.log("message: " + msg);
//         //         socket.emit('chatMsg', msg);
//         //         // change other players background color
//         //         // const color = msg.split(':')[1];
//         //     }
//         //     // else if (msg.startsWith('decision:')) {
//         //     //     console.log("Player decision: "+ msg);
//         //     // }
//         //     else {
//         //         // just a text message
//         //     }
//         //     // console.log('chat message: ' + msg);
//         //     // socket.broadcast.emit('chat message', 'hi'); // Emits to all sockets
//         // });
//         socket.on('decision', (msg) => {
//             console.log(`Decision: ${msg}`);
//         })
    
//     })
// }