import express from "express";
import clientesController from "../controllers/clienteController.js"
import validateCliente from "../middlewares/clientesMiddleware.js";
import { authenticationToken } from "../middlewares/authLoginMiddleware.js";



const routeClientes = express.Router();

routeClientes.get("/",authenticationToken, clientesController.getAllClientes);
routeClientes.get("/:email", clientesController.getClientesByEmail);
routeClientes.post("/", validateCliente, clientesController.storeCliente);
routeClientes.put("/:id", validateCliente, clientesController.updateClienteById);
routeClientes.delete("/:id", clientesController.removeCliente);
// routeClientes.get("/email/:email", clientesController.getClientesByEmail);


export default routeClientes;