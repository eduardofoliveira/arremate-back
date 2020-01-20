const { Router } = require("express");
const routes = new Router();

import UserController from "./app/controllers/UserController";

routes.get("/users", UserController.index);
routes.post("/users", UserController.store);
routes.delete("/users/:id", UserController.delete);

module.exports = routes;
