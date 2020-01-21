const { Router } = require("express");
import multer from "multer";
import multerConfig from "./config/multer";

import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";
import FileController from "./app/controllers/FileController";
import ProductController from "./app/controllers/ProductController";

import authMiddleware from "./app/middleware/auth";

const routes = new Router();
const upload = multer(multerConfig);

routes.post("/users", UserController.store);
routes.post("/sessions", SessionController.store);

routes.use(authMiddleware);

routes.get("/users", UserController.index);
routes.put("/users", UserController.update);
routes.delete("/users/:id", UserController.delete);

routes.post("/files", upload.single("file"), FileController.store);

routes.get("/products", ProductController.index);
routes.post("/products", ProductController.store);
routes.put("/products/:id", ProductController.update);

module.exports = routes;
