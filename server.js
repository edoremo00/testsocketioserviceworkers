
/*const io = require("socket.io")(httpServer, {
    cors: {
      origin: "http://localhost:5000",
      methods: ["GET", "POST"]
    }
  });*/
  //per problema cors a quanto pare bisogna usare express

const {Server, Socket}=require('socket.io')
const io=new Server({
    cors:{
        origin:'https://unrivaled-conkies-a4673f.netlify.app/',
        //origin: "http://127.0.0.1:5500",//SENZA CORS NON VA NULLA
        methods: ["GET", "POST"]
    }
})

const users={}

//porta server
io.on('connection',(socket)=>{//funzione chiamata ad ogni connessione al server
    //socket.emit('chat-message','hello word')//manda a tutti quelli collegati il messaggio hello world
    //vuole nome evento e cosa mandare ad altri
    //per altri eventi definiti nel client basta registrarsi qui
    socket.on('new-user',nome=>{
        users[socket.id]=nome
        socket.broadcast.emit('user-connected',nome)
    })
    socket.on('send-chat-message',message=>{
        socket.broadcast.emit('send-chat-message',message,users[socket.id])
    })
    socket.on('disconnect',(reason)=>{
       socket.broadcast.emit('user-disconnected', users[socket.id], reason)
    })
    socket.on('user-writing',(scrivendo)=>{
        console.log(scrivendo)
        socket.emit('useriswriting',scrivendo)
    })
})
io.listen(3000)

