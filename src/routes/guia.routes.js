import { Router } from "express";
import { crearGuia, listarGuias, buscarGuia, actualizarGuia } from "../controllers/guia.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
const router = Router();

router.post("/", verifyToken, crearGuia);
router.get("/", verifyToken, listarGuias);
router.get("/:id", verifyToken, buscarGuia);
router.put("/:id", verifyToken, actualizarGuia);

export default router;
