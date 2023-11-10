const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const jobRoute = require("./routes/job");
const chatRoute = require("./routes/chat");
const messageRoute = require("./routes/messages");
const bookmarkRoute = require("./routes/bookmark");
const bodyParser=require('body-parser');
dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(() => console.log('db connected')).catch((err) => { console.log(err) });
// app.get('/', (req, res) => res.send('Hello Makeen!'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/", authRoute);
app.use("/api/users", userRoute);
app.use("/api/jobs", jobRoute);
app.use("/api/Bookmarks", bookmarkRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);
const server=app.listen(process.env.Port || 5002, () => console.log(`Example app listening on port ${process.env.port}!`));
const io=require('socket.io')(server,{pingTimeout:60000,cors:{origin:"http:localhost:5001"}});

io.on("connection",(socket)=>{
    console.log("connected to sockets");
    socket.on('setup',(userId)=>{
        socket.join(userId);
        socket.broadcast.emit('online_user',userId)
        console.log(userId);
    });
    socket.on('typing',(room)=>{
        console.log("typing");
        console.log("room");
        socket.to(room).emit('typing',room);
    });

    socket.on('stop typing',(room)=>{
        console.log("stop typing");
        console.log("room");
        socket.to(room).emit('stop typing',room);
    });


    socket.on('join chat',(room)=>{
        socket.join(room)
        console.log('User Joined :'+ room);

        // socket.to(room).emit('stop typing',room);
    });

    socket.on('new message',(newMessageReceived)=>{
        var chat=newMessageReceived.chat;
        var room=chat._id;
        var sender=newMessageReceived.sender;

        
        if(!sender||sender._id){
            console.log("Sender not defined");
            return;
        }
        var senderId=sender._id;
        console.log(senderId+"message sender");
        const users=chat.users;
        if(!users){
            console.log("users not defined");
            return;
        }



        socket.to(room).emit('message received',newMessageReceived);
        socket.to(room).emit('message sent',newMessageReceived);
        
    });

    socket.off('setup',()=>{
        console.log('user offline');
        socket.leave(userId);
    });

})