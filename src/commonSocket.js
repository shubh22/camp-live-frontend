const io = require('socket.io-client');

// const socket = io("localhost:5000", {
//     transports: ['websocket']
// });
const socket = io("https://camp-live.herokuapp.com/", {
    transports: ['websocket']
});



export default socket