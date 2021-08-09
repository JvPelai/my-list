import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { Edit as EditIcon } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import TodoItem from '../../../interfaces/todoItem';
import useTodoItem from '../../../hooks/useTodoItem';
import { EditTodoItemModal } from '../../modal';

type ListProps = {
  id: string;
};

const TodoList: React.FC<ListProps> = ({ id }: ListProps) => {
  const [userItems, setUserItems] = useState<TodoItem[] | null>([]);
  const { listItemsByUserId, deleteTodoItem } = useTodoItem();
  useEffect(() => {
    const todoList = async () => {
      const listItems = await listItemsByUserId(id);
      setUserItems(listItems);
    };
    todoList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteItem = async (itemId: number) => {
    try {
      const deleted = await deleteTodoItem(itemId);
      if (deleted) {
        const listItems = await listItemsByUserId(id);
        setUserItems(listItems);
      }
    } catch (error) {
      throw new Error('could not delete item');
    }
  };
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
                    <IconButton
                      aria-label="delete"
                      size="small"
                      color="secondary"
                      onClick={() => {
                        if (items.id) {
                          deleteItem(items.id as number);
                        }
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
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
