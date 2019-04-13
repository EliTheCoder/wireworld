import https = require("https");
import fs = require("fs");
import path = require("path");
import redux = require("redux");
import express = require("express");
const app = express();

const port = 8080;

const options = {
  key: fs.readFileSync("server.key"),
  cert: fs.readFileSync("server.crt")
};

const reducer = () => {};

const store = redux.createStore(reducer);

app.use(express.static(path.join(__dirname, "/client")));

const server = https.createServer(options, app);

server.listen(port, function() {
  console.log("Server listening on: https://localhost:" + port);
});