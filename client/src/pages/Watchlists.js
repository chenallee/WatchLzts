import React, { useContext, useEffect } from 'react';
import { Box, Flex, Heading, Text, 
    Accordion,
    AccordionItem,
    AccordionHeader,
    AccordionPanel,
    AccordionIcon, } from "@chakra-ui/core";

// import context for global state
import UserInfoContext from '../utils/UserInfoContext';

import * as API from '../utils/API';
import AuthService from '../utils/auth';

function Watchlists() {
    // get whole userData state object from App.js
    const userData = useContext(UserInfoContext);


    return (
        <Flex flexDir='column' justify='center' align='center'>
            <Heading>{userData.username}'s Watchlzts</Heading>
            <Flex width='80%'>
        {userData.savedShows.length ? (
            <>
            {/* {userData.savedShows.map((show) => {
                return(
                    <Box>
                        <Heading as='h4' size='lg'>{show.title}</Heading>

                    </Box>
                )
            })} */}
            <Accordion allowToggle width='100%' defaultIndex={1}>
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
                    (<>
                        {userData.savedShows.map((show) => {
                            if(show.watchStatus === 'to watch'){
                                return(
                                    <Box>
                                        <Heading as='h4' size='lg'>{show.title}</Heading>
                                    </Box>
                                )
                            }
                        })}
                     </>) : (<Text> You haven't added any shows you plan to watch! </Text>)}
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
                    (<>
                        {userData.savedShows.map((show) => {
                            if(show.watchStatus === 'watching'){
                                return(
                                    <Box>
                                        <Heading as='h4' size='lg'>{show.title}</Heading>
                                    </Box>
                                )
                            }
                        })}
                     </>) : (<Text> You're not watching anything! </Text>)}
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
                    (<>
                        {userData.savedShows.map((show) => {
                            if(show.watchStatus === 'completed'){
                                return(
                                    <Box>
                                        <Heading as='h4' size='lg'>{show.title}</Heading>
                                    </Box>
                                )
                            }
                        })}
                     </>) : (<Text> You haven't completed any shows! </Text>)}
                    
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