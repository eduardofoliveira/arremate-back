const express = require("express");
import path from "path";
const app = express();
import cors from "cors";
const http = require("http").Server(app);

var allowedOrigins = "http://*:*";
var paths = "*";

const io = require("socket.io")(http, {
  origins: allowedOrigins,
  paths
});
import "./database";
import socket from "./app/socket.io";
socket.configure(io);

const routes = require("./routes");

class App {
  constructor() {
    this.server = app;
    this.http = http;

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(cors());
    this.server.use(
      "/files",
      express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
    );
    this.server.use(require("./app/middleware/includeMiddleware")(io));
  }

  routes() {
    this.server.use(routes);
  }
}

module.exports = new App().http;
