import React, { useContext, useEffect, useState } from 'react';

import {
    AccordionItem,
    AccordionHeader,
    AccordionPanel,
    AccordionIcon, Box, SimpleGrid, Text, Flex, IconButton
} from "@chakra-ui/core";

// import context for global state
import UserInfoContext from '../utils/UserInfoContext';

import Show from '../components/Show';

function WatchCategory({ category }) {
    // get whole userData state object from App.js
    const userData = useContext(UserInfoContext);

    const cateColors = {
        'to watch': 'yellow',
        'watching': 'green',
        'completed': 'red'
    }
    const cate404 = {
        'to watch': `You haven't added any shows you plan to watch!`,
        'watching': `You're not watching anything!`,
        'completed': `You haven't completed any shows!`
    }


    return (
        <>
            <AccordionHeader>
                <Box textAlign="left">
                    {category}
                </Box>
                <AccordionIcon />
            </AccordionHeader>
            <AccordionPanel pb={4}>
                <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }}>
                    {userData.savedShows.find((show) => {
                        return show.watchStatus === category;
                    }) ?
                        (<>
                            {userData.savedShows.map((show) => {
                                if (show.watchStatus === category) {
                                    return (
                                        <Show show={show} />
                                    )
                                }
                            })}
                        </>
                        ) : (
                            <Flex overflow='hidden' align='center' rounded='lg' mx={{ sm: '5rem', md: '1rem' }} flexDir='column' shadow='lg' >
                                <Text> {cate404[category]} </Text>
                            </Flex>
                        )}
                    {<Flex overflow='hidden' align='center' rounded='lg' mx={{ sm: '5rem', md: '1rem' }} flexDir='column' shadow='lg' >
                        <Text> Add another show 📺  </Text>
                        <IconButton aria-label="Search database" icon="small-add" variant='ghost' variantColor={cateColors[category]} />
                    </Flex>}
                </SimpleGrid>
            </AccordionPanel>
        </>
    );
}
export default WatchCategory;