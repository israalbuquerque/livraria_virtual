import express from "express";
import cors from "cors";
import dotenv  from "dotenv";
import routeCompras from "./src/routes/comprasRoutes.js";
import routeCategoria from "./src/routes/categoriaRoutes.js";
import routeClientes from "./src/routes/clienteRoutes.js";
import routeEditoras from "./src/routes/editoraRoutes.js";
import routeLivro from "./src/routes/livroRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());

const PORT = process.env.PORT_SERVER || 3000;

app.use("/clientes", routeClientes);
app.use("/compras", routeCompras);
app.use("/categorias", routeCategoria);
app.use("/livros", routeLivro);
app.use("/editoras", routeEditoras);

app.listen(PORT, () => {
  return console.log(`Servidor rodando http://localhost:${PORT}`);
});
