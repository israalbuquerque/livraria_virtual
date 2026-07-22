import express from "express";
import clientesController from "../controllers/clienteController.js"
import validateCliente from "../middlewares/clientesMiddleware.js";
import { authenticationToken , adminRole} from "../middlewares/authLoginMiddleware.js";



const routeClientes = express.Router();

routeClientes.get("/",authenticationToken, adminRole("admin ","vendedor", "gerente"), clientesController.getAllClientes);
routeClientes.get("/:email", authenticationToken, adminRole("admin ","vendedor", "gerente"), clientesController.getClientesByEmail);
routeClientes.post("/",  authenticationToken, adminRole("admin ","vendedor", "gerente"), validateCliente, clientesController.storeCliente);
routeClientes.put("/:id", authenticationToken, adminRole("admin ","vendedor", "gerente"), validateCliente, clientesController.updateClienteById);
routeClientes.delete("/:id", authenticationToken, adminRole("admin", "gerente"), clientesController.removeCliente);
// routeClientes.get("/email/:email", clientesController.getClientesByEmail);


export default routeClientes;