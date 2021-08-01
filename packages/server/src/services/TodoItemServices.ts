import { JwtPayload, verify } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';
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

export { createTodoItem };
