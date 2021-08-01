import { Router } from 'express';
import { TodoItemController } from '../controllers/TodoItemController';
import { UserController } from '../controllers/UserController';

const router = Router();

router.post('/users', UserController.create);
router.post('/users/auth', UserController.auth);
router.post('/todo', TodoItemController.create);
router.get('/users/:user/todo', UserController.getUserTodoItems);

export { router };
