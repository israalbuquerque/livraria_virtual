import express from "express";

import livroController from "../controllers/livroController.js";
import validateLivro from "../middlewares/livroMiddleware.js";


const routeLivro = express.Router();

routeLivro.get("/", livroController.getAlllivros);
routeLivro.get("/:titulo", livroController.livrosBytitle);
routeLivro.post("/", validateLivro, livroController.storeLivros);
routeLivro.put("/:id", livroController.updateLivrosById);
routeLivro.delete("/:id", livroController.removeLivro);

export default routeLivro;