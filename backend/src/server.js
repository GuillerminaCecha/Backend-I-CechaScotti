import express from "express";
import paths from "./utils/paths.js";
import cookieParser from "cookie-parser";

import { config as configDotenv } from "./config/dotenv.config.js";
import { config as configHandlebars } from "./config/handlebars.config.js";
import serverSocket from "./config/socket.config.js";
import { config as configPassport } from "./config/passport.config.js";
import { config as configCORS } from "./config/cors.config.js";
import { connectDB } from "./config/mongoose.config.js";

import ProductRouter from "./routers/api/products.router.js";
import AuthRouter from "./routers/api/auth.router.js";
import HomeRouter from "./routers/home.router.js";
import CartRouter from "./routers/api/cart.router.js";
import UserRouter from "./routers/api/user.router.js";

const server = express();

// Variables de entorno
configDotenv(paths);

// Configuración de CORS
configCORS(server);

// Configuración de Passport
configPassport(server);

// Conexion a la base de datos
connectDB();

// Decodificadores del BODY
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(cookieParser(process.env.SECRET_KEY));

// Ruta estática
server.use(express.static(paths.public));

// Configuración Handlebars
configHandlebars(server);

// Enrutadores
server.use("/", new HomeRouter().getRouter());
server.use("/api/products", new ProductRouter().getRouter());
server.use("/api/sessions", new AuthRouter().getRouter());
server.use("/api/users", new UserRouter().getRouter());
server.use("/api/carts", new CartRouter().getRouter());

// Rutas inexistentes
server.use("*", (req, res) => {
    res.status(404).send("<h1>Error 404</h1><h3>La URL indicada no existe en este servidor</h3>");
});

// Errores internos
server.use((error, req, res) => {
    console.log("Error:", error.message);
    res.status(500).send("<h1>Error 500</h1><h3>Se ha generado un error en el servidor</h3>");
});

// Oyente de peticiones
const serverHTTP = server.listen(process.env.PORT, () => {
    console.log(`Servidor en http://localhost:${process.env.PORT}`) ;

});

// Configuracion websocket
serverSocket.config(serverHTTP);