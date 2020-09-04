const express = require("express");
const multer = require("multer");

const uploadConfig = require("./config/upload");

const UserController = require("./controllers/UserController");
const ClientController = require("./controllers/ClientController");
const ProductTypeController = require("./controllers/ProductTypeController");

const routes = express.Router();
const upload = multer(uploadConfig);

routes.post("/users", UserController.store);
routes.post("/users/:id", UserController.store);

routes.get("/clients", ClientController.index);
routes.post("/clients", upload.single("thumbnail"), ClientController.store);

routes.post("/productType", ProductTypeController.store);

module.exports = routes;
