import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { TodoList } from '../../components/Data Display/List';
import { NewTodoItemModal } from '../../components/modal';
import { UserDropdown } from '../../components/Navigation/Dropdown';
import { useAuth } from '../../hooks/useAuth';

const Home: React.FC = () => {
  const history = useHistory();
  const context = useAuth();
  const { user } = context;

  let userName = '';
  let id = '';
  if (user) {
    const { name, userId } = user;
    userName = name;
    id = userId;
  }

  return (
    <>
      <div className="flex-grow-1">
        <AppBar position="fixed">
          <Toolbar>
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
              <UserDropdown name={userName} />
            )}
          </Toolbar>
        </AppBar>
        <div className="py-1" />
      </div>
      <div className="d-flex flex-direction-column justify-content-start align-items-start mt-5">
        <NewTodoItemModal />
        <TodoList id={id} />
      </div>
    </>
  );
};

export default Home;
