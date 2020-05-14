import React, { useContext, useEffect } from 'react';
import { Flex, Heading, Text, Button, useColorMode } from "@chakra-ui/core";

function Welcome(){
    const { colorMode, toggleColorMode } = useColorMode();

    return(
        <>
        <Flex marginTop='5%' width='100%' height='20rem'
        
        padding='auto'
        bgImage='linear-gradient( 90deg, 
            #F94144 13%, 
            #f3722c 13%, #f3722c 26%, 
            #F8961E 26%,  #F8961E 39%, 
            #F9C74F 39%, #F9C74F 52%, 
            #90BE6D 52%, #90BE6D 65%, 
            #43AA8B 65%, #43AA8B 78%,
            #577590 78%)'
        >
        <Heading as='h1'
        margin='10% 0 0 20%'
        fontWeight='extrabold'
        textShadow='1px 1px rgba(0, 0, 0, 0.5)'
        ><Text display='inline' color='white'
        >Welcome to Watchlzts</Text> <span>📺 </span> 
        </Heading>
        
        </Flex>
            
        </>
    );
}

export default Welcome;