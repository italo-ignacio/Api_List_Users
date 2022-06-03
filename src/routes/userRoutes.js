// import das dependências
import { Router } from "express";

// import do user controller
import UserController from "../controllers/UserController";

// instância da rota
const router = new Router();

// Chamada get da função index do user controller
router.get("/", UserController.index);

// export da rota
export default router;
