class TodoItemDTO {
  category: string;
  title: string;
  description: string;

  private constructor() {}

  static create(item: TodoItemDTO): TodoItemDTO {
    const instance = new TodoItemDTO();
    instance.category = item.category;
    instance.title = item.title;
    instance.description = item.description;
    return instance;
  }
}
export { TodoItemDTO };
