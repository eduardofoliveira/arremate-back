const express = require("express");
import path from "path";
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
import "./database";

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
