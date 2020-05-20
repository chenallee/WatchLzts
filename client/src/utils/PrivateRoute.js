import React, { useState, useContext } from 'react';
import { BrowserRouter as Router, Switch, Route,  Redirect, useHistory, useLocation } from 'react-router-dom';
import Welcome from '../pages/Welcome';

import UserInfoContext from '../utils/UserInfoContext';

function PrivateRoute({ children, ...rest }) {

    const { username } = useContext(UserInfoContext);

    return (
      <Route
        {...rest}
        render={({ location }) =>
          username ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: '/watching',
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }

  export default Welcome;