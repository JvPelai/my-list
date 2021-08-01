import { Router } from 'express';
import { TodoItemController } from '../controllers/TodoItemController';
import { UserController } from '../controllers/UserController';

const router = Router();

router.post('/users', UserController.create);
router.post('/users/auth', UserController.auth);
router.post('/users/:user/todo', TodoItemController.create);
router.get('/users/:user/todo', UserController.getUserTodoItems);
router.put('/users/:user/todo/:id', TodoItemController.update);
router.delete('/users/:user/todo/:id', TodoItemController.delete);

export { router };
