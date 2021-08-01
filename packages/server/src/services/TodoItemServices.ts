import { JwtPayload, verify } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';
import { TodoItemDTO } from '../dto/todo-item.dto';
import { TodoItemsRepositories } from '../repositories/TodoItemRepository';

const createTodoItem = async (
  data: TodoItemDTO,
  token: string
): Promise<string | JwtPayload> => {
  const repository = getCustomRepository(TodoItemsRepositories);
  const user = verify(token, 'supersecret');
  const item = { ...data, user: user.sub };
  const todoItem = repository.create(item);
  await repository.save(todoItem);
  return user;
};

export { createTodoItem };
