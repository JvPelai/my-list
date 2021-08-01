import { DeleteResult, getCustomRepository, UpdateResult } from 'typeorm';
import { TodoItemDTO } from '../dto/todo-item.dto';
import { TodoItemsRepositories } from '../repositories/TodoItemRepository';
import { UsersRepositories } from '../repositories/UserRepository';

const createTodoItem = async (
  data: TodoItemDTO,
  userId: string
): Promise<boolean> => {
  const todoItemsRepository = getCustomRepository(TodoItemsRepositories);
  const userRepository = getCustomRepository(UsersRepositories);
  const todoItem = todoItemsRepository.create(data);
  const createdBy = await userRepository.findOne(userId);
  if (createdBy) {
    todoItem.createdBy = createdBy;
    await todoItemsRepository.save(todoItem);
  }

  return true;
};

const updateTodoItem = async (data: TodoItemDTO): Promise<UpdateResult> => {
  const todoItemsRepository = getCustomRepository(TodoItemsRepositories);
  const updatedTodoItem = await todoItemsRepository.update(
    data.id as number,
    data
  );
  return updatedTodoItem;
};

const deleteTodoItem = async (itemId: number): Promise<DeleteResult> => {
  const todoItemsRepository = getCustomRepository(TodoItemsRepositories);
  const deleteTodoItem = await todoItemsRepository.delete(itemId);
  return deleteTodoItem;
};

export { createTodoItem, updateTodoItem, deleteTodoItem };
