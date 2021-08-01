import { Request, Response } from 'express';
import { TodoItemDTO } from '../dto/todo-item.dto';
import {
  createTodoItem,
  deleteTodoItem,
  updateTodoItem
} from '../services/TodoItemServices';

class TodoItemController {
  static async create(request: Request, response: Response): Promise<Response> {
    const { category, title, description } = request.body;
    const todoItemData = TodoItemDTO.create({ category, title, description });
    const token = request.headers['authorization'];
    const newItem = await createTodoItem(todoItemData, token as string);
    return response.json(newItem);
  }

  static async update(request: Request, response: Response): Promise<Response> {
    const { category, title, description } = request.body;
    const { id } = request.params;
    const todoItemData = TodoItemDTO.create({
      category,
      title,
      description,
      id: parseInt(id)
    });
    const token = request.headers['authorization'];
    const updatedItem = await updateTodoItem(todoItemData, token as string);
    return response.json(updatedItem);
  }

  static async delete(request: Request, response: Response): Promise<Response> {
    const { id, user } = request.params;
    const token = request.headers['authorization'];
    const deleteOperationResult = await deleteTodoItem(
      parseInt(id),
      user,
      token as string
    );
    return response.json(deleteOperationResult);
  }
}

export { TodoItemController };
