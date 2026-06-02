import express from "express";
import clientesController from "../controllers/clienteController.js"

const routeClientes = express.Router();

routeClientes.get("/", clientesController.getAllClientes);
routeClientes.get("/:email", clientesController.getClientesByEmail);
routeClientes.post("/", clientesController.storeCliente);
routeClientes.put("/:id", clientesController.updateClienteById);
routeClientes.delete("/:id", clientesController.removeCliente);
// routeClientes.get("/email/:email", clientesController.getClientesByEmail);


export default routeClientes;