const { text } = require("express");
const { readSync } = require("fs");

const app = require("express")()
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
    cors: { origin: "http://localhost:5173" }
})
const port = 3001;

io.on("connection", (socket) => {
    socket.on("set_username", (username) => {


        socket.data.username = username
        //userName(username, socket.id);

        console.log(`Bem vindo ${username} seu id é ${socket.id}!`);


    })
    socket.on("disconnect", (reason) => {
        console.log(`${socket.data.username} desconectado, motivo: ${reason}`);
    })

    socket.on("message", (text) => {
        io.emit("receive_message", {
            text,
            authorID: socket.id,
            author: socket.data.username,
        })
        console.log(`Usuário ${socket.data.username} enviou uma mensagem!`)
    })
})


server.listen(port, () => { (console.log("server running....")) })
