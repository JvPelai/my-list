import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import RegisterForm from './pages/Form/Register';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={() => <Home />} />
        <Route
          exact
          path="/register"
          render={() => <RegisterForm login={false} />}
        />
        <Route exact path="/login" render={() => <RegisterForm login />} />
        <Route exact path="/users/:user" />
        <Route exact path="/users/:user/todo" />
        <Route exact path="/users/:user/todo/:todo" />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
