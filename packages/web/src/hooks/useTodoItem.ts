import axios from 'axios';
import TodoItem from '../interfaces/todoItem';
import User from '../interfaces/user';
import { useAuth } from './useAuth';

type UseTodoItemReturn = {
  listItemsByUserId: (userId: string) => Promise<TodoItem[] | null>;
  createTodoItem: (data: TodoItem) => Promise<boolean | null>;
  updateTodoItem: (data: TodoItem, itemId: number) => Promise<unknown>;
  deleteTodoItem: (id: number) => Promise<boolean>;
};

const useTodoItem = (): UseTodoItemReturn => {
  const context = useAuth();
  const { authToken, user } = context;
  const listItemsByUserId = async (
    userId: string
  ): Promise<TodoItem[] | null> => {
    const instance = axios.create({
      baseURL: 'http://localhost:8000',
      headers: {
        'Content-Type': 'application/json',
        authorization: authToken
      }
    });
    try {
      const todoList = await instance.get(`/users/${userId}/todo`);
      return todoList.data as TodoItem[];
    } catch (error) {
      return null;
    }
  };
  const createTodoItem = async (data: TodoItem): Promise<boolean | null> => {
    const { userId } = user as User;
    const instance = axios.create({
      baseURL: 'http://localhost:8000',
      headers: {
        'Content-Type': 'application/json',
        authorization: authToken
      }
    });
    try {
      const newItem = await instance.post(`/users/${userId}/todo`, data);
      if (newItem) {
        return true;
      }
      return false;
    } catch (error) {
      return null;
    }
  };

  const updateTodoItem = async (
    data: TodoItem,
    itemId: number
  ): Promise<TodoItem> => {
    const { userId } = user as User;
    const instance = axios.create({
      baseURL: 'http://localhost:8000',
      headers: {
        'Content-Type': 'application/json',
        authorization: authToken
      }
    });
    const newItem = await instance.put(`/users/${userId}/todo/${itemId}`, data);
    return newItem.data;
  };
  const deleteTodoItem = async (id: number): Promise<boolean> => {
    const { userId } = user as User;
    const instance = axios.create({
      baseURL: 'http://localhost:8000',
      headers: {
        'Content-Type': 'application/json',
        authorization: authToken
      }
    });
    await instance.delete(`/users/${userId}/todo/${id}`);
    return true;
  };

  return { listItemsByUserId, createTodoItem, updateTodoItem, deleteTodoItem };
};

export default useTodoItem;
