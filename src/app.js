// import das dependências
import express from "express";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";

// import da rota user
import userRoutes from "./routes/userRoutes";

// import do arquivo de documentação
import swaggerDocs from "./swagger.json";

// iniciar o dotenv
dotenv.config();

// Class do app express
class App {
  // Construtor do app
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }
  middlewares() {
    // Middlewares para utilização de JSON
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }
  routes() {
    // Rotas do servidor
    this.app.use("/user", userRoutes);
    this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  }
}

// Export do servidor instanciado
export default new App().app;
