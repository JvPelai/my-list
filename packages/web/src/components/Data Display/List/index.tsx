import React from 'react';
import TodoItem from '../../../interfaces/todoItem';

type ListProps = {
  items: TodoItem[];
};

const TodoList: React.FC<ListProps> = ({ items }: ListProps) => {
  return (
    <div className="d-flex justify-content-center mx-auto my-3">
      <ul className="list-group list-group-flush">
        {items.map((item) => {
          return (
            <li
              key={item.id}
              className="list-group-item d-flex justify-content-between align-items-center border-0"
            >
              <div className="border border-3 rounded-1 p-3">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <span>Category: {item.category} / </span>
                <span>created at: {item.created_at}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export { TodoList };
