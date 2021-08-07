import axios from 'axios';
import TodoItem from '../interfaces/todoItem';

type UseTodoItemReturn = {
  createTodoItem: (data: TodoItem, params: any) => Promise<TodoItem>;
  updateTodoItem: (data: TodoItem, params: any) => Promise<unknown>;
};

const useTodoItem = (): UseTodoItemReturn => {
  const createTodoItem = async (
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
    const newItem = await instance.post(`/users/${params.userId}/todo`, data);
    return newItem.data;
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
