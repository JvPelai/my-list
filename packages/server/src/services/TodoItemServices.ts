import { JwtPayload, verify } from 'jsonwebtoken';
import { DeleteResult, getCustomRepository, UpdateResult } from 'typeorm';
import { TodoItemDTO } from '../dto/todo-item.dto';
import { TodoItemsRepositories } from '../repositories/TodoItemRepository';
import { UsersRepositories } from '../repositories/UserRepository';

const createTodoItem = async (
  data: TodoItemDTO,
  token: string
): Promise<string | JwtPayload> => {
  const todoItemsRepository = getCustomRepository(TodoItemsRepositories);
  const userRepository = getCustomRepository(UsersRepositories);
  const user = verify(token, 'supersecret');
  const todoItem = todoItemsRepository.create(data);
  const createdBy = await userRepository.findOne(user.sub as string);
  if (createdBy) {
    todoItem.createdBy = createdBy;
    await todoItemsRepository.save(todoItem);
  }

  return user;
};

const updateTodoItem = async (
  data: TodoItemDTO,
  token: string
): Promise<UpdateResult> => {
  const todoItemsRepository = getCustomRepository(TodoItemsRepositories);
  const user = verify(token, 'supersecret');
  const updatedTodoItem = await todoItemsRepository.update(
    data.id as number,
    data
  );
  return updatedTodoItem;
};

const deleteTodoItem = async (
  itemId: number,
  userId: string,
  token: string
): Promise<DeleteResult> => {
  const todoItemsRepository = getCustomRepository(TodoItemsRepositories);
  const user = verify(token, 'supersecret');
  const deleteTodoItem = await todoItemsRepository.delete(itemId);
  return deleteTodoItem;
};

export { createTodoItem, updateTodoItem, deleteTodoItem };
