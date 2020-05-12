import React, { useContext, useEffect } from 'react';
import { Box, Flex, Heading, Text, 
    Accordion,
    AccordionItem,
    AccordionHeader,
    AccordionPanel,
    AccordionIcon,
    SimpleGrid, Grid } from "@chakra-ui/core";

// import context for global state
import UserInfoContext from '../utils/UserInfoContext';

import * as API from '../utils/API';
import AuthService from '../utils/auth';

import Show from '../components/Show';
import WatchCategory from '../components/WatchCategory';

function Watchlists() {
    // get whole userData state object from App.js
    const userData = useContext(UserInfoContext);

    return (
        <Flex p='1rem' rounded='lg'  flexDir='column' justify='center' align='start' mx='auto' width={{ base: '100%', md: '80%' }}>
            <Heading as='h2' fontWeight='extrabold' marginBottom='1rem' align='start' color=''>📺 {userData.username}'s Watchlzts</Heading>
            <Flex width='100%' flexDir='column'>
            <>
            <Accordion width='100%' defaultIndex={1}>

                <AccordionItem>
                    <WatchCategory category='to watch' />
                </AccordionItem>

                <AccordionItem>
                    <WatchCategory category='watching' />
                </AccordionItem>
                
                <AccordionItem>
                    <WatchCategory category='completed' />
                </AccordionItem>
            </Accordion>
            </>
            
                
           
            </Flex>
        </Flex>

    );
}

export default Watchlists;