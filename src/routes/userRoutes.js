// import das dependências
import { Router } from "express";

// import do user controller
import UserController from "../controllers/UserController";

// instância da rota
const router = new Router();

// Chamada get da função index do user controller
router.get("/", UserController.index);

// Chamada get da função showContact do user controller
router.get("/:userId/contact", UserController.showContact);

// Chamada get da função showAddress do user controller
router.get("/:userId/address", UserController.showAddress);

// export da rota
export default router;
