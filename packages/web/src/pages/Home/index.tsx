import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography
} from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import React from 'react';
import { useHistory } from 'react-router-dom';

const Home: React.FC = () => {
  const history = useHistory();
  return (
    <div className="flex-grow-1">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6" className="flex-grow-1">
            MyList
          </Typography>
          <Button
            onClick={() => history.push('/login')}
            color="inherit"
            variant="text"
            component="button"
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Home;