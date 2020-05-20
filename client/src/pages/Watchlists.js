import React, { useContext, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams, useLocation
  } from "react-router-dom";
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
    const routeKeys = {
        '/to-watch': 'to watch',
        '/watching': 'watching',
        '/completed': 'completed'
    }
    

    const location = useLocation();
    useEffect(() => {
          }, [location]);

    return (
        <Flex paddingTop='5rem' paddingBottom='1rem' justify='center'  width={{ base: '100%', lg: '80%' }}
        >
           <WatchCategory category={routeKeys[location.pathname]}/>
        </Flex>

    );
}

export default Watchlists;