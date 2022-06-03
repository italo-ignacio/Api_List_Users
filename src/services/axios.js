// import das dependências
import axios from "axios";
import dotenv from "dotenv";

// iniciar o dotenv
dotenv.config();

// Instanciar e exportar o axios com a URL base do mock
export default axios.create({
  baseURL: process.env.MOCK_BASE_URL,
});
