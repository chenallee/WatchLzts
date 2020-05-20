import React from 'react';
import { Flex, Text } from "@chakra-ui/core";
function Footer() {

    return(
        <Flex as='footer' p='.5rem' width='100%' backgroundColor='light' marginTop='auto' justifyContent='center' flexDir='row'>
            <Text padding='0 1rem'> show info from <a href='https://www.tvmaze.com/' target='_blank' rel="noopener noreferrer" style={{textShadow: '0px 0px 10px #DB92F6'}}>TVmaze</a></Text>
            
        <Text borderLeft='1px solid grey' padding='0 1rem'> © 2020 - <a href='https://github.com/chenallee' target='_blank' rel="noopener noreferrer" style={{textShadow: '0px 0px 10px #DB92F6'}}>Lee Chenalloy</a></Text>
        </Flex>
    )

}

export default Footer;