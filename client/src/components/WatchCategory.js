import React, { useContext, useEffect, useState } from 'react';

import {
    AccordionItem,
    AccordionHeader,
    AccordionPanel,
    AccordionIcon, Box, SimpleGrid, Text, Flex, IconButton, Button,
    Modal, ModalOverlay, ModalContent, useDisclosure, ModalCloseButton, ModalBody
} from "@chakra-ui/core";

// import context for global state
import UserInfoContext from '../utils/UserInfoContext';

import Show from '../components/Show';
import AddShowModal from '../components/AddShowModal';

function WatchCategory({ category }) {

    const { isOpen, onOpen, onClose } = useDisclosure();

    // get whole userData state object from App.js
    const userData = useContext(UserInfoContext);

    const cateColors = {
        'to watch': 'maize',
        'watching': 'pistachio',
        'completed': 'tartorange'
    }
    const cate404 = {
        'to watch': `You haven't added any shows you plan to watch!`,
        'watching': `You're not watching anything!`,
        'completed': `You haven't completed any shows!`
    }

    return (
        <>
            <AccordionHeader bg='white'>
                <Box textAlign="left" bg={cateColors[category]}>
                    {category}
                </Box>
                <AccordionIcon />
            </AccordionHeader>
            <AccordionPanel pb={4} bgImage=' url(https://live.staticflickr.com/4583/37647876375_41366fc17d_b.jpg);'>
                <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }}>
                    {userData.savedShows.find((show) => {
                        return show.watchStatus === category;
                    }) ?
                        (<>
                            {userData.savedShows.map((show) => {
                                if (show.watchStatus === category) {
                                    return (
                                        <Show show={show} cateColor={cateColors[category]} />
                                    )
                                }
                            })}
                            <Flex textAlign='center' bg='white' p='2rem' overflow='hidden' justify='center' align='center' rounded='lg' mx={{ sm: '5rem', md: '1rem' }} flexDir='column' shadow='lg' >
                                <Button onClick={onOpen} rightIcon="small-add" variant='ghost' variantColor={cateColors[category]}> Add Show</Button>
                                {/* <IconButton aria-label="Search database" icon="small-add" variant='ghost' variantColor={cateColors[category]} /> */}
                            </Flex>
                        </>
                        ) : (
                            <Flex textAlign='center' bg='white' p='2rem' overflow='hidden' justify='center' align='center' rounded='lg' mx={{ sm: '5rem', md: '1rem' }} flexDir='column' shadow='lg' >
                                <Text> {cate404[category]} 📺 </Text>
                                <Text> Add show </Text>
                                <IconButton onClick={onOpen} aria-label="add show" icon="small-add" variant='ghost' variantColor={cateColors[category]} />
                            </Flex>
                        )}

                </SimpleGrid>
            </AccordionPanel>

            <Modal isOpen={isOpen} scrollBehavior='inside' onClose={onClose} size={{sm: '100%', md:'90%', xl: '80%'}}>
                <ModalOverlay />
                <ModalContent rounded='lg'>
                    <AddShowModal defaultCategory={category} cateColor={cateColors[category]} />
                </ModalContent>
            </Modal>
        </>
    );
}
export default WatchCategory;