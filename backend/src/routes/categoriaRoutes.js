import express from "express";
import categoriaController from "../controllers/categoriaController.js";

const routeCategoria = express.Router();

routeCategoria.get("/", categoriaController.getAllCategorias);
routeCategoria.get("/:categoria", categoriaController.categoriaByname);
routeCategoria.post("/", categoriaController.storeCategoria);
routeCategoria.put("/:id", categoriaController.updateCategoriaById);
routeCategoria.delete("/:id", categoriaController.removeCategoria);

export default routeCategoria;
