const express = require('express')
const app = express()
const path = require('path')
const http = require('http').createServer(app)
const PORT = process.env.PORT || 3000

const staticPath = path.join(__dirname,'../public')

http.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`);
});
app.set('view engine','hbs')
app.use(express.static(staticPath))
app.get("/",(req,res)=>{
    res.render('index.hbs')
})



//Socket code
const io = require('socket.io')(http)
   var users={}
io.on('connection',(socket)=>{
     //console.log("connected....")
     socket.on("user-joined",(name)=>{
          users[socket.id] = name;
           socket.broadcast.emit('user-connected',name)
        io.emit('user-list',users);
     })
    socket.on('message',(msg)=>{
        //console.log(msg)
        socket.broadcast.emit('message1', msg)
    })
    socket.on('disconnect',()=>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
        io.emit('user-list',users);

    })
    
})