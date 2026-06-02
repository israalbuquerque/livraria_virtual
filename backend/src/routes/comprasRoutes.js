import express from "express";
import compraController from "../controllers/compraController.js"

const routeCompras = express.Router();

routeCompras.get("/", compraController.getAllcompras);
routeCompras.get("/:id", compraController.compraById)
routeCompras.post("/", compraController.storeCompra);
routeCompras.put("/:id", compraController.updateComprasById);
routeCompras.delete("/:id", compraController.removeCompra);

export default routeCompras;