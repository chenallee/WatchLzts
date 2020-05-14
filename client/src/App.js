import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { CSSReset, ThemeProvider, theme, ColorModeProvider, PseudoBox, useColorMode } from "@chakra-ui/core";

import Welcome from './pages/Welcome';
import Explore from './pages/Explore';
import Watchlists from './pages/Watchlists';

import Navbar from './components/Navbar';

import * as API from './utils/API';
import AuthService from './utils/auth';
import UserInfoContext from './utils/UserInfoContext';



function App() {
  
  const [userInfo, setUserInfo] = useState({
    savedShows: [],
    username: '',
    email: '',

    getUserData: () => {
      // if user's logged in get the token or return null
      const token = AuthService.loggedIn() ? AuthService.getToken() : null;

      if (!token) {
        return false;
      }
      API.getMe(token)
      .then(({ data: { username, email, savedShows } }) =>
        setUserInfo({ ...userInfo, username, email, savedShows })
      )
      .catch((err) => console.log(err));
    }
  });
 
  const { colorMode, toggleColorMode } = useColorMode();
    // on load, get user data if a token exists
    useEffect(() => {
      userInfo.getUserData();

    }, []);

  return (
   
      <Router>
      <>
      <UserInfoContext.Provider value={userInfo}>
        <PseudoBox bgImage={colorMode === 'light' ? `url('./assets/memphis-mini.png')` : `url('./assets/memphis-mini-dark.png')`} height='100vh' backgroundRepeat='repeat' backgroundAttachment='fixed'>
      <Navbar />
      <Switch>
        <Route exact path='/' render={() => (userInfo.username) ? <Watchlists/> : <Welcome/>}/>
        <Route exact path='/explore' component={Explore}/>
  <Route exact path='/watchlzts' render={() => (userInfo.username) ? <Watchlists/> : <Welcome/>}/>
        <Route render={() => <h1> This is not the page you're looking for... </h1>} />
      </Switch>
      </PseudoBox>
      </UserInfoContext.Provider>
      </>
    </Router>
    
  
  );
}


  

export default App;
