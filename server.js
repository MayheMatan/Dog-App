const mongoose = require('mongoose');
const moment = require('moment');
const bodyParser = require("body-parser");
const path = require("path")
const express = require('express');
const app = express();
const server = require('http').createServer(app)
const io = require('socket.io').listen(server);
const user = require('./server/routes/user');
const event = require('./server/routes/event');
const dog = require('./server/routes/dog');
<<<<<<< HEAD
const Message = require('./server/models/Message');


const server = http.createServer(app);
const io = socketio(server);
=======
>>>>>>> e6da5c78f28202b218576c33a5dda6ccc9617390

mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://MayheMatan:Mayhematan123@cluster0-cp7uu.mongodb.net/<Dogs-app>?retryWrites=true&w=majority", { useFindAndModify: true });
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

io.on('connection', socket => {
    console.log('New WS Connection...');

    socket.broadcast.emit('bla', 'welcome to chatCord') // for a specific client

    // socket.broadcast.emit('messege', 'a user has join') // for all clients except the one which is on

    // io.emit() //for  all the clients

    socket.on('disconnect', () => {
            io.emit('blabla', 'user has left the chat')
        }) //run when client disconnects

    socket.on('chatMessage', msg => {
        let message = new Message(msg)
        message.save();
        io.emit('messege', msg)
    })


});

const PORT = process.env.PORT || 3000;

app.use('/user', user);
app.use('/users', user);
app.use('/event', event);
app.use('/events', event);
app.use('/dog', dog);
app.use('/dogs', dog);

server.listen(PORT, () => console.log(`Running server on port ${PORT}`)); ////*************check the documentition/