import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import RegisterForm from './pages/Form/Register';
import { AuthProvider } from './contexts/auth';

const App: React.FC = () => {
  return (
    <AuthProvider>
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
    </AuthProvider>
  );
};

export default App;
