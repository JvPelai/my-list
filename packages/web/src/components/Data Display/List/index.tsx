import React, { useEffect, useState } from 'react';
import TodoItem from '../../../interfaces/todoItem';
import useTodoItem from '../../../hooks/useTodoItem';
import { EditTodoItemModal, ConfirmDeleteItemModal } from '../../modal';
import { formatDate } from '../../../helpers/date';

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
    <div className="d-flex justify-content-center mx-auto my-3 w-100">
      <ul className="list-group list-group-flush">
        {userItems?.map((items) => {
          return (
            <li
              key={items.id}
              className="list-group-item d-flex justify-content-between align-items-center border-0"
            >
              <div className="border border-3 rounded-1 p-3 w-100">
                <div className="d-flex flex-direction-row justify-content-between">
                  <div>
                    <h3 className="text-break">
                      {items.title} <EditTodoItemModal formValues={items} />
                    </h3>
                    <span>{formatDate(items.created_at as string)}</span>
                    <br />
                    <h6 className="d-inline-block p-1 border border-primary rounded mt-1 text-secondary">
                      {items.category}
                    </h6>
                    <h6>Description:</h6>
                    <p className="text-break">{items.description}</p>
                  </div>
                  <div>
                    <ConfirmDeleteItemModal id={items.id as number} />
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export { TodoList };
