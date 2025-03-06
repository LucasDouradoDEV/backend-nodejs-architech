import express from 'express';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = express.Router();
const userController = new UserController(new UserService());

// Rotas protegidas pelo middleware de autenticação
router.get('/', authMiddleware, (req, res) => userController.getUsers(req, res));
router.get('/:id', authMiddleware, (req, res) => userController.getUserById(req, res));
router.put('/:id', authMiddleware, (req, res) => userController.updateUser(req, res));
router.delete('/:id', authMiddleware, (req, res) => userController.deleteUser(req, res));

// Rota pública para criar um novo usuário
router.post('/', (req, res) => userController.createUser(req, res));

export default router;