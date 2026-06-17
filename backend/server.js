import express from "express";
import cors from "cors";
import dotenv  from "dotenv";
import cookieParser from "cookie-parser";
import routeCompras from "./src/routes/comprasRoutes.js";
import routeCategoria from "./src/routes/categoriaRoutes.js";
import routeClientes from "./src/routes/clienteRoutes.js";
import routeEditoras from "./src/routes/editoraRoutes.js";
import routeLivro from "./src/routes/livroRoutes.js";
import userRouter from "./src/routes/userRoute.js";
import loginRoute from "./src/routes/loginRoute.js";




dotenv.config();

const app = express();

app.use(express.json());

app.use(cors({
  origin: "http://localhost:3001",
  credentials: true,
}));

app.use(cookieParser());

const PORT = process.env.PORT_SERVER || 3000;

app.use("/clientes", routeClientes);
app.use("/compras", routeCompras);
app.use("/categorias", routeCategoria);
app.use("/livros", routeLivro);
app.use("/editoras", routeEditoras);
app.use("/users", userRouter);
app.use("/auth", loginRoute)

app.listen(PORT, () => {
  return console.log(`Servidor rodando http://localhost:${PORT}`);
});
