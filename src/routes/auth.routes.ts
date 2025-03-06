import express from 'express';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth.service';

const router = express.Router();
const authController = new AuthController(new AuthService());

router.post('/login', (req, res) => authController.login(req, res));
router.post('/register', (req, res) => authController.register(req, res));
router.post('/refresh-token', (req, res) => authController.refreshToken(req, res));

export default router;