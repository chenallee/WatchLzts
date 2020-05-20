import React, { useContext, useEffect } from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import { Flex, Heading, Text, Button, useColorMode, Tabs, Tab, TabList, TabPanel, TabPanels } from "@chakra-ui/core";
import SignUpForm from '../components/SignupForm';
import LogInForm from '../components/LoginForm';

function Welcome() {
    const { colorMode, toggleColorMode } = useColorMode();
    const layer1Color = {
        'dark': '#242423',
        'light': 'white',
    }

    let history = useHistory();
    let location = useLocation();
  

    return (
        <>
            <Flex 
                 paddingTop='5rem'
                alignItems='center'
                flexDir='column'>
                <Heading
                    size='2xl'
                    
                    as='h1'
                    textAlign='center'
                    textShadow='5px 5px 5px rgba(0, 0, 0, 0.1)'
                ><Text 
                fontFamily='Baloo Chettan 2'
                display='inline' color='light'
                >WatchLzts</Text> <span>📺 </span>
                </Heading>
               
                {/* <Text
                  margin='0 auto'
                  maxWidth='30rem'
                  textAlign='center'>
                Sometimes you watch shows on different platforms or different accounts. WatchLzts helps you record how far you've gotten in each show! 
                </Text> */}
               
                
                <Flex margin='3rem auto' 
                bg={layer1Color[colorMode]} 
                padding='1rem' rounded='lg' boxShadow='5px 5px 5px rgba(0, 0, 0, 0.1)'>
                <Tabs isFitted variant='soft-rounded'>
                    <TabList>
                        <Tab>Log In</Tab>
                        <Tab>Sign up</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <LogInForm  />
                        </TabPanel>
                        <TabPanel>
                            <SignUpForm  />
                        </TabPanel>
                    </TabPanels>

                </Tabs>
                </Flex>
               

            </Flex>

        </>
    );
}

export default Welcome;