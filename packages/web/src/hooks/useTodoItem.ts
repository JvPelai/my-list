import axios from 'axios';
import { decode } from 'jsonwebtoken';
import TodoItem from '../interfaces/todoItem';
import User from '../interfaces/user';

type UseTodoItemReturn = {
  createTodoItem: (data: TodoItem) => Promise<TodoItem | null>;
  updateTodoItem: (data: TodoItem, params: any) => Promise<unknown>;
};

const useTodoItem = (): UseTodoItemReturn => {
  const createTodoItem = async (data: TodoItem): Promise<TodoItem | null> => {
    const authToken = localStorage.getItem('user') as string;
    const decodedData = decode(authToken);
    const { userId } = decodedData as User;
    console.log(authToken, decodedData, data);
    const instance = axios.create({
      baseURL: 'http://localhost:8000',
      headers: {
        'Content-Type': 'application/json',
        authorization: authToken
      }
    });
    try {
      const newItem = await instance.post(`/users/${userId}/todo`, data);
      return newItem.data;
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

  return { createTodoItem, updateTodoItem };
};

export default useTodoItem;
