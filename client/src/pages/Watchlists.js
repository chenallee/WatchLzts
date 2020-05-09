import React, { useContext, useEffect } from 'react';
import { Box, Flex, Heading, Text, 
    Accordion,
    AccordionItem,
    AccordionHeader,
    AccordionPanel,
    AccordionIcon,
    SimpleGrid, } from "@chakra-ui/core";

// import context for global state
import UserInfoContext from '../utils/UserInfoContext';

import * as API from '../utils/API';
import AuthService from '../utils/auth';

import Show from '../components/Show';

function Watchlists() {
    // get whole userData state object from App.js
    const userData = useContext(UserInfoContext);

    return (
        <Flex p='1rem' rounded='lg' bg='white' flexDir='column' justify='center' align='start' mx='auto' width={{ base: '100%', md: '80%' }}>
            <Heading align='start'>📺 {userData.username}'s Watchlzts</Heading>
            <Flex width='100%'>
        {userData.savedShows.length ? (
            <>
            <Accordion allowToggle width='100%' defaultIndex={1}>
                {/* potentially make each accordion item its own component and pass in category */}
                <AccordionItem>
                    <AccordionHeader>
                        <Box  textAlign="left">
                            to watch
                        </Box>
                        <AccordionIcon />
                    </AccordionHeader>
                    <AccordionPanel pb={4}>
                    
                    {userData.savedShows.find((show) => {
                        return show.watchStatus === 'to watch';}) ? 
                    (<SimpleGrid columns={{sm: 1, md: 2, lg: 3, xl:4}}>
                        {userData.savedShows.map((show) => {
                            if(show.watchStatus === 'to watch'){
                                return(
                                    <Show/>
                                )
                            }
                        })}
                     </SimpleGrid>) : (<Text> You haven't added any shows you plan to watch! </Text>)}
                    </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                    <AccordionHeader>
                        <Box  textAlign="left">
                            watching
                        </Box>
                        <AccordionIcon />
                    </AccordionHeader>
                    <AccordionPanel pb={4}>
                    {userData.savedShows.find((show) => {
                        return show.watchStatus === 'watching';}) ? 
                        (<SimpleGrid columns={{sm: 1, md: 2, lg: 3, xl:4}}>
                            {userData.savedShows.map((show) => {
                                if(show.watchStatus === 'watching'){
                                    return(
                                        <Show show={show}/>
                                    )
                                }
                            })}
                         </SimpleGrid>) : (<Text> You're not watching anything! </Text>)}
                    </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                    <AccordionHeader>
                        <Box textAlign="left">
                            completed
                        </Box>
                        <AccordionIcon />
                    </AccordionHeader>
                    <AccordionPanel pb={4}>
                    {userData.savedShows.find((show) => {
                        return show.watchStatus === 'completed';}) ? 
                        (<SimpleGrid columns={{sm: 1, md: 2, lg: 3, xl:4}}>
                            {userData.savedShows.map((show) => {
                                if(show.watchStatus === 'completed'){
                                    return(
                                        <Show show={show}/>
                                    );
                                }
                            })}
                         </SimpleGrid>) : (<Text> You haven't completed any shows! </Text>)}
                    
                    </AccordionPanel>
                </AccordionItem>

            </Accordion>
            </>
            ) : (
                <Text> You haven't saved any shows yet! </Text>
            )}
            </Flex>
        </Flex>

    );
}

export default Watchlists;