import { Router } from 'express';
import { UserController } from '../controllers/UserController';

const router = Router();

router.post('/users', UserController.create);
router.post('/users/auth', UserController.auth);

export { router };
