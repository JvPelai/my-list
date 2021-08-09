import React, { useEffect, useState } from 'react';
import TodoItem from '../../../interfaces/todoItem';
import useTodoItem from '../../../hooks/useTodoItem';
import { EditTodoItemModal, ConfirmDeleteItemModal } from '../../modal';

type ListProps = {
  id: string;
};

const TodoList: React.FC<ListProps> = ({ id }: ListProps) => {
  const [userItems, setUserItems] = useState<TodoItem[] | null>([]);
  const { listItemsByUserId } = useTodoItem();
  useEffect(() => {
    const todoList = async () => {
      const listItems = await listItemsByUserId(id);
      setUserItems(listItems);
    };
    todoList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="d-flex justify-content-center mx-auto my-3">
      <ul className="list-group list-group-flush">
        {userItems?.map((items) => {
          return (
            <li
              key={items.id}
              className="list-group-item d-flex justify-content-between align-items-center border-0"
            >
              <div className="border border-3 rounded-1 p-3">
                <div className="d-flex flex-direction-row justify-content-between">
                  <h3>{items.title}</h3>
                  <div>
                    <ConfirmDeleteItemModal id={items.id as number} />
                    <br />
                    <EditTodoItemModal formValues={items} />
                  </div>
                </div>
                <p>{items.description}</p>
                <span>Category: {items.category} / </span>
                <span>created at: {items.created_at}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export { TodoList };
