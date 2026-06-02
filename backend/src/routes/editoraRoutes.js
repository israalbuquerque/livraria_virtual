import express from "express";
import editoraController from "../controllers/editoraController.js";

const routeEditoras = express.Router();

routeEditoras.get("/", editoraController.getAllEditoras);
routeEditoras.get("/:nome", editoraController.editoraByName);
routeEditoras.post("/", editoraController.storeEditora);
routeEditoras.put("/:id", editoraController.updateEditorasById);
routeEditoras.delete("/:id", editoraController.removeEditora);

export default routeEditoras;