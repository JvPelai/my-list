import { EntityRepository, Repository } from 'typeorm';
import { TodoItem } from '../entities/TodoItem';

@EntityRepository(TodoItem)
class TodoItemsRepositories extends Repository<TodoItem> {}

export { TodoItemsRepositories };
