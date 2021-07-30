import { Router } from 'express';
import { CreateUserController } from '../controllers/User/CreateUserController';

const router = Router();

router.post('/users', CreateUserController.handle);

export { router };
