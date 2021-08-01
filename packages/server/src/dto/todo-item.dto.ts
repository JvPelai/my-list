class TodoItemDTO {
  category: string;
  title: string;
  description: string;
  id?: number;

  private constructor() {}

  static create(item: TodoItemDTO): TodoItemDTO {
    const instance = new TodoItemDTO();
    instance.category = item.category;
    instance.title = item.title;
    instance.description = item.description;
    if (item.id) {
      instance.id = item.id;
    }
    return instance;
  }
}
export { TodoItemDTO };
