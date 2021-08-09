import { EntityRepository, getCustomRepository, Repository } from 'typeorm';
import { TodoItem } from '../entities/TodoItem';
import { User } from '../entities/User';
import { TodoItemsRepositories } from './TodoItemRepository';

@EntityRepository(User)
class UsersRepositories extends Repository<User> {
  async getTodoItems(userId: string): Promise<TodoItem[]> {
    const todoItemsRepository = getCustomRepository(TodoItemsRepositories);
    const todoItems = await todoItemsRepository
      .createQueryBuilder('todo_items')
      .where('todo_items.createdById = :id', { id: userId })
      .orderBy('todo_items.created_at', 'ASC')
      .getMany();
    return todoItems;
  }
}

export { UsersRepositories };
