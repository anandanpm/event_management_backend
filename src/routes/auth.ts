import { Router } from 'express';
import { container } from 'tsyringe';
import { AuthController } from '../controllers/AuthController';

const router = Router();
const authController = container.resolve(AuthController);

router.post('/register', authController.register.bind(authController));
router.post('/login', authController.login.bind(authController));

export default router;