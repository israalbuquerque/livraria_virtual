import express from "express";
import cors from "cors";
import dotenv  from "dotenv";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import routeCompras from "./src/routes/comprasRoutes.js";
import routeCategoria from "./src/routes/categoriaRoutes.js";
import routeClientes from "./src/routes/clienteRoutes.js";
import routeEditoras from "./src/routes/editoraRoutes.js";
import routeLivro from "./src/routes/livroRoutes.js";
import userRouter from "./src/routes/userRoute.js";
import loginRoute from "./src/routes/loginRoute.js";
import enderecoRouter from "./src/routes/enderecoRoute.js";
import uploadRoute from "./src/routes/uploadRoute.js";
import swaaggerDocs from "./swagger.json" with {type: "json"};




dotenv.config();

const app = express();

app.use(express.json());

app.use(cors({
  origin: "http://localhost:3001",
  credentials: true,
}));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaaggerDocs));
app.use(cookieParser());

const PORT = process.env.PORT_SERVER || 3001;

app.use("/clientes", routeClientes);
app.use("/compras", routeCompras);
app.use("/categorias", routeCategoria);
app.use("/livros", routeLivro);
app.use("/editoras", routeEditoras);
app.use("/users", userRouter);
app.use("/auth", loginRoute);
app.use("/endereco", enderecoRouter);
app.use("/upload", uploadRoute);

app.listen(PORT, () => {
  return console.log(`Servidor rodando http://localhost:${PORT}`);
});































// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import path from "path";
// import { fileURLToPath } from "url";
 
// // Importação das rotas
// import routeCompras from "./src/routes/comprasRoutes.js";
// import routeCategoria from "./src/routes/categoriaRoutes.js";
// import routeClientes from "./src/routes/clienteRoutes.js";
// import routeEditoras from "./src/routes/editoraRoutes.js";
// import routeLivro from "./src/routes/livroRoutes.js";
// import routeLooks from "./src/routes/routeLooks.js"; // Nova rota do Montalook
 
// dotenv.config();
 
// const app = express();
// app.use(express.json());
// app.use(cors());
 
// const PORT = process.env.PORT_SERVER || 3001;
 
// // Ativação dos endpoints
// app.use("/clientes", routeClientes);
// app.use("/compras", routeCompras);
// app.use("/categorias", routeCategoria);
// app.use("/livros", routeLivro);
// app.use("/editoras", routeEditoras);
// app.use("/looks", routeLooks); // Endpoint para o formulário inteligente
 
// // Configuração do __dirname para ES Modules (ESM)
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
 
// // Servir a pasta de uploads localmente de forma correta
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));
 
// app.listen(PORT, () => {
//   console.log(`Servidor rodando em http://localhost:${PORT}`);
// });