import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography
} from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { decode } from 'jsonwebtoken';
import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';
import { ActionButton } from '../../components/Inputs/ActionButtons';
import { NewTodoItemModal } from '../../components/modal';

import User from '../../interfaces/user';

const Home: React.FC = () => {
  const history = useHistory();
  const user = localStorage.getItem('user');
  const decodedData = decode(user as string);
  const { name } = decodedData as User;

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
              <h1>{name}</h1>
            )}
          </Toolbar>
        </AppBar>
      </div>

      <NewTodoItemModal />
    </>
  );
};

export default Home;
