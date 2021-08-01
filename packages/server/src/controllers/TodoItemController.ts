import { Request, Response } from 'express';
import { TodoItemDTO } from '../dto/todo-item.dto';
import { UserHelper } from '../helpers';
import {
  createTodoItem,
  deleteTodoItem,
  updateTodoItem
} from '../services/TodoItemServices';

class TodoItemController {
  static async create(request: Request, response: Response): Promise<Response> {
    const { user } = request.params;
    const token = request.headers['authorization'] as string;
    if (!token) {
      return response.status(401).json('You must provide an access token');
    }
    const { category, title, description } = request.body;
    const todoItemData = TodoItemDTO.create({ category, title, description });
    try {
      const userAuthorized = await UserHelper.userAuthorized(token, user);
      if (!userAuthorized) {
        return response.status(401).json('Invalid user');
      }
      const newItem = await createTodoItem(todoItemData, user);
      return response.status(201).json(newItem);
    } catch (error) {
      return response.status(500).json(error);
    }
  }

  static async update(request: Request, response: Response): Promise<Response> {
    const { user, id } = request.params;
    const token = request.headers['authorization'] as string;
    if (!token) {
      return response.status(401).json('You must provide an access token');
    }
    const { category, title, description } = request.body;
    const todoItemData = TodoItemDTO.create({
      category,
      title,
      description,
      id: parseInt(id)
    });
    try {
      const userAuthorized = await UserHelper.userAuthorized(token, user);
      if (!userAuthorized) {
        return response.status(401).json('Invalid user');
      }
      const updatedItem = await updateTodoItem(todoItemData);
      return response.status(200).json(updatedItem);
    } catch (error) {
      return response.status(500).json(error);
    }
  }

  static async delete(request: Request, response: Response): Promise<Response> {
    const { id, user } = request.params;
    const token = request.headers['authorization'] as string;
    if (!token) {
      return response.status(401).json('You must provide an access token');
    }
    try {
      const userAuthorized = await UserHelper.userAuthorized(token, user);
      if (!userAuthorized) {
        return response.status(401).json('Invalid user');
      }
      const deleteOperationResult = await deleteTodoItem(parseInt(id));
      return response.status(200).json(deleteOperationResult);
    } catch (error) {
      return response.status(500).json(error);
    }
  }
}

export { TodoItemController };
