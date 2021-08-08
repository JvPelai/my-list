import axios from 'axios';
import { decode } from 'jsonwebtoken';
import TodoItem from '../interfaces/todoItem';
import User from '../interfaces/user';

type UseTodoItemReturn = {
  listItemsByUserId: (userId: string) => Promise<TodoItem[] | null>;
  createTodoItem: (data: TodoItem) => Promise<boolean | null>;
  updateTodoItem: (data: TodoItem, params: any) => Promise<unknown>;
};

const useTodoItem = (): UseTodoItemReturn => {
  const listItemsByUserId = async (
    userId: string
  ): Promise<TodoItem[] | null> => {
    const authToken = localStorage.getItem('user') as string;
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
    const authToken = localStorage.getItem('user') as string;
    const decodedData = decode(authToken);
    const { userId } = decodedData as User;
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
    params: any
  ): Promise<TodoItem> => {
    const authToken = localStorage.getItem('user') as string;
    const instance = axios.create({
      baseURL: 'http://localhost:8000',
      headers: {
        'Content-Type': 'application/json',
        authorization: authToken
      }
    });
    const newItem = await instance.put(`/users/${params.userId}/todo`, data);
    return newItem.data;
  };

  return { listItemsByUserId, createTodoItem, updateTodoItem };
};

export default useTodoItem;
