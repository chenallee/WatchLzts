import React, { useState, useContext } from 'react';

import { Input, Stack, FormControl, Button, FormHelperText, FormLabel } from "@chakra-ui/core";


import UserInfoContext from '../utils/UserInfoContext';
import { createUser } from '../utils/API';
import AuthService from '../utils/auth';

function SignupForm({ onClose }){
      // set initial form state
  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });

  // get context object from app.js
  const userData = useContext(UserInfoContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

   // console.log(userFormData);

    //send new user data to server, receiving the JWT and user data in return
    createUser(userFormData)
      .then(({ data: { token, user } }) => {
        // set token to localstorage
        AuthService.login(token);
        // execute function from context api in app.js to update state for logged in user
        userData.getUserData();
        // close modal
        onClose();
      })
      .catch((err) => {
        console.log(err.response);
        // setShowAlert(true);
        // setErrorText(err.response.data.message);
      });
  };

  return (
    <form onSubmit={handleFormSubmit}>
        <Stack spacing={3} my={3}>
        <FormControl isRequired>
        
            <FormLabel>Username</FormLabel>
            <Input name='username' placeholder='Username' aria-label='username' onChange={handleInputChange} value={userFormData.username}/>
        
        </FormControl>

        <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input name='email' type='email' placeholder='Email' aria-label='email' onChange={handleInputChange} value={userFormData.email}/>
        </FormControl>

        <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input name='password' type='password' placeholder='Password' aria-label='password' onChange={handleInputChange} value={userFormData.password}/>
        </FormControl>

        <Button type='submit'  backgroundImage='linear-gradient(315deg, rgba(255,255,255,0) 0%, rgba(254,37,194,0.20211834733893552) 100%)'>Sign up</Button>
        <FormHelperText textAlign='center'>Sign up to start tracking your shows! <span role='img' aria-label='television emoji'>📺</span>  </FormHelperText>
        </Stack>

       
    </form>
  );
};

export default SignupForm;