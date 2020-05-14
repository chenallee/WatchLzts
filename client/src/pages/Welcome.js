import React, { useContext, useEffect } from 'react';
import { Flex, Heading, Text, Button, useColorMode } from "@chakra-ui/core";

function Welcome(){
    const { colorMode, toggleColorMode } = useColorMode();

    return(
        <>
        <Flex 
        justifyContent='center' marginTop='10%'>
        <Heading 
        size='2xl'
        fontWeight='extrabold'
        ><Text as='h1' display='inline' color='white'
        >Welcome to Watchlzts</Text> <span>📺 </span> 
        </Heading>
        
        </Flex>
            
        </>
    );
}

export default Welcome;