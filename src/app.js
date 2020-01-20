const express = require("express");
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
    this.server.use(require("./middleware/includeMiddleware")(io));
  }

  routes() {
    this.server.use(routes);
  }
}

module.exports = new App().http;
