interface TodoItem {
  category: string;
  title: string;
  description: string;
  id?: number;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export default TodoItem;
