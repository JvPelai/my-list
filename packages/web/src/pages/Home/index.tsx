import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography
} from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { decode } from 'jsonwebtoken';
import React, { useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom';
import { TodoList } from '../../components/Data Display/List';
import { NewTodoItemModal } from '../../components/modal';
import { PermanentDrawerRight } from '../../components/Navigation/Drawer';
import useTodoItem from '../../hooks/useTodoItem';
import TodoItem from '../../interfaces/todoItem';

import User from '../../interfaces/user';

const Home: React.FC = () => {
  const history = useHistory();
  const user = localStorage.getItem('user');
  const { listItemsByUserId } = useTodoItem();
  const [userItems, setUserItems] = useState<TodoItem[] | null>([]);
  const decodedData = decode(user as string);
  let userName = '';
  let id = '';
  if (decodedData) {
    const { name, userId } = decodedData as User;
    userName = name;
    id = userId;
  }
  useEffect(() => {
    const todoList = async () => {
      const listItems = await listItemsByUserId(id);
      console.log(listItems);
      setUserItems(listItems);
    };
    todoList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="flex-grow-1">
        <AppBar position="fixed">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <Menu />
            </IconButton>
            <Typography variant="h6" className="flex-grow-1">
              MyList
            </Typography>
            {!user ? (
              <div>
                <Button
                  onClick={() => history.push('/login')}
                  color="inherit"
                  variant="text"
                  component="button"
                >
                  Login
                </Button>
                {' / '}
                <Button
                  onClick={() => history.push('/register')}
                  color="inherit"
                  variant="text"
                  component="button"
                >
                  sign-up
                </Button>
              </div>
            ) : (
              <h1>{userName}</h1>
            )}
          </Toolbar>
        </AppBar>
        <div className="py-1" />
      </div>
      <div className="d-flex flex-direction-column justify-content-center align-items-start mt-5">
        <NewTodoItemModal />
        {userItems && <TodoList items={userItems} />}
        <PermanentDrawerRight />
      </div>
    </>
  );
};

export default Home;
