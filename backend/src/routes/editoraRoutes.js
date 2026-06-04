import express from "express";
import editoraController from "../controllers/editoraController.js";
import validateEditoras from "../middlewares/editorasMiddlewares.js";




const routeEditoras = express.Router();

routeEditoras.get("/", editoraController.getAllEditoras);
routeEditoras.get("/:nome", editoraController.editoraByName);
routeEditoras.post("/", validateEditoras,  editoraController.storeEditora);
routeEditoras.put("/:id", editoraController.updateEditorasById);
routeEditoras.delete("/:id", editoraController.removeEditora);

export default routeEditoras;