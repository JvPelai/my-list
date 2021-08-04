import React from 'react';

import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import RegisterForm from './pages/Form/Register';

const App: React.FC = () => {
  return (
    <Switch>
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
    </Switch>
  );
};

export default App;
