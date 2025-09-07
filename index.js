const http = require("http");
const express = require("express");
const { Server } = require("socket.io");
const { join } = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'))

app.get("/", (req, res) => {
    return res.sendFile(join(__public, "index.html"))
})

io.on("connection", (socket) => {
    // console.log('A user is connected', socket.id);
    socket.on("messageforServer", (message) => {
        io.emit("message", message)
    })

});
server.listen(3000, () => console.log(`Server Started on PORT:3000`))
