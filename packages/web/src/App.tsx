import React from 'react';

import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';

const App: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/register" />
      <Route exact path="/login" />
      <Route exact path="/users/:user" />
      <Route exact path="/users/:user/todo" />
      <Route exact path="/users/:user/todo/:todo" />
    </Switch>
  );
};

export default App;
