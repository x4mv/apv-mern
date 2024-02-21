import express from "express";
import { agregarPacientes, obtenerPacientes, obtenerPacientesById, actualizarPaciente, eliminarPaciente } from "../controllers/pacienteController.js";
import { checkAuth } from '../middlewares/authMiddleware.js';

const router = express.Router();


router.route('/')
    .post(checkAuth, agregarPacientes)
    .get(checkAuth, obtenerPacientes)

router
    .route("/:id")
    .get(checkAuth, obtenerPacientesById)
    .put(checkAuth, actualizarPaciente)
    .delete(checkAuth, eliminarPaciente)

export default router;