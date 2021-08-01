import { Request, Response } from 'express';
import { TodoItemDTO } from '../dto/todo-item.dto';
import { createTodoItem } from '../services/TodoItemServices';

class TodoItemController {
  static async create(request: Request, response: Response): Promise<Response> {
    const { category, title, description } = request.body;
    const todoItemData = TodoItemDTO.create({ category, title, description });
    const token = request.headers['authorization'];
    const newItem = await createTodoItem(todoItemData, token as string);
    return response.json(newItem);
  }
}

export { TodoItemController };
