import React, { createContext } from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import RegisterForm from './pages/Form/Register';
import useUser from './hooks/useUser';
import UserContext from './contexts/user';

const App: React.FC = () => {
  const { userData } = useUser();
  return (
    <BrowserRouter>
      <Switch>
        <UserContext.Provider value={{ userData }}>
          <Route exact path="/" component={Home} />
          <Route
            exact
            path="/register"
            render={() => <RegisterForm login={false} />}
          />
          <Route exact path="/login" render={() => <RegisterForm login />} />
          <Route exact path="/users/:user" />
          <Route exact path="/users/:user/todo" />
          <Route exact path="/users/:user/todo/:todo" />
        </UserContext.Provider>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
