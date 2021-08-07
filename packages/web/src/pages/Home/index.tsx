import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography
} from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { decode } from 'jsonwebtoken';
import React from 'react';

import { useHistory } from 'react-router-dom';
import { NewTodoItemModal } from '../../components/modal';

import User from '../../interfaces/user';

const Home: React.FC = () => {
  const history = useHistory();
  const user = localStorage.getItem('user');
  const decodedData = decode(user as string);
  let userName = '';
  if (decodedData) {
    const { name } = decodedData as User;
    userName = name;
  }

  return (
    <>
      <div className="flex-grow-1">
        <AppBar position="static">
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
      </div>

      <NewTodoItemModal />
    </>
  );
};

export default Home;
