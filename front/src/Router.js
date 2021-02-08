import * as React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Login from './containers/Login.tsx';
import SignUp from './containers/SignUp.tsx';
import User from './containers/User.tsx';
import Store from './containers/Store.tsx';
import Product from './containers/Product.tsx';
import Error from './components/error/Error';
import { useSelector } from 'react-redux';

const Router = () => {
  const { loginData } = useSelector(state => state.user);

  return (
    <BrowserRouter>
      <Switch>
        {loginData &&
        loginData.data &&
        loginData.data.data &&
        loginData.data.data.userId ? (
          <>
            <Route exact path="/" component={User} />
            <Route exact path="/user" component={User} />
            <Route exact path="/error" component={Error} />
            <Redirect exact path="/*" to="/" />
          </>
        ) : (
          <>
            <Route exact path="/" component={Login} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signUp" component={SignUp} />
            <Route exact path="/error" component={Error} />
            <Redirect exact path="/*" to="/" />
          </>
        )}
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
