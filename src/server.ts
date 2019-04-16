import http = require("http");
import fs = require("fs");
import path = require("path");
import redux = require("redux");
import socketio = require("socket.io");
import eliapi = require("eliapi");
import express = require("express");
const app = express();

const port = 8000;

// const options = {
//   key: fs.readFileSync("server.key"),
//   cert: fs.readFileSync("server.crt")
// };

const reducer = () => {};

const store = redux.createStore(reducer);

app.use(express.static(path.join(__dirname, "/client")));

const server = http.createServer(app);

server.listen(port, function() {
    eliapi.log(0, "Server listening on: http://localhost:" + port);
});

const io = socketio(server);

io.on("connection", function(socket: socketio.Socket) {
    eliapi.log(
        0,
        "CLIENT CONNECTED WITH IP ADDRESS: " +
            socket.request.connection.remoteAddress.split(":").slice(3)[0]
    );
    socket.on("add", data => {
        socket.broadcast.emit("add", data);
    });
    socket.on("remove", data => {
        socket.broadcast.emit("remove", data);
    });
});
