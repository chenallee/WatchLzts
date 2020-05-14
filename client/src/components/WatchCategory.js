import React, { useContext, useEffect, useState } from 'react';

import {
    AccordionItem,
    AccordionHeader,
    AccordionPanel,
    AccordionIcon, Box, SimpleGrid, Text, Flex, IconButton, Button,
    Modal, ModalOverlay, ModalContent, useDisclosure, ModalCloseButton, ModalBody, useColorMode
} from "@chakra-ui/core";

// import context for global state
import UserInfoContext from '../utils/UserInfoContext';

import Show from '../components/Show';
import AddShowModal from '../components/AddShowModal';

function WatchCategory({ category }) {

    const { isOpen, onOpen, onClose } = useDisclosure();

    // get whole userData state object from App.js
    const userData = useContext(UserInfoContext);
    const { colorMode, toggleColorMode } = useColorMode();
    const [categoryShows, setCategoryShows] = useState([]);

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
    
    useEffect(() => {

        let showArr = [];
        userData.savedShows.forEach((show) => {
            if(show.watchStatus === category){
                showArr.push(show);
            }
        })
        //console.log(showArr)
        setCategoryShows(showArr);
  
      }, [userData]);

    return (
        <>
            <AccordionHeader rounded='md' bg={colorMode === 'dark' ? `${cateColors[category]}.100` : `${cateColors[category]}.200`} color={colorMode === 'dark' ? 'black' : ''}
            _expanded={{ bg: colorMode === 'dark' ? `${cateColors[category]}.200` : `${cateColors[category]}.400`, color: 'white' }}
            _hover={{ bg: colorMode === 'dark' ? `${cateColors[category]}.50` : `${cateColors[category]}.100`}}
            >
                <Box textAlign="left" 
                
                >
                    {category}  ({categoryShows.length})
                </Box>
                <AccordionIcon />
            </AccordionHeader>
            <AccordionPanel pb={4} 
            maxHeight='70vh'
            overflowY='scroll'
            >
                <Flex marginBottom='1rem' flexDir='column' alignItems='center'>
                    {categoryShows.length ? (<></>) : (<Text>{cate404[category]} 📺</Text>)}
                <Button size='lg' onClick={onOpen} leftIcon="small-add" variant='ghost' variantColor={cateColors[category]}> Add Show... </Button>
                </Flex>
                <SimpleGrid 
                //columns={{sm: '1', }}
                spacing='1rem' minChildWidth='300px'>

                            {categoryShows.map((show) => {
                                    return (
                                        <Show key={show.tvMazeId} show={show} cateColor={cateColors[category]} />
                                    )
                 })}
                           
                </SimpleGrid>
            </AccordionPanel>

            <Modal isOpen={isOpen} scrollBehavior='inside' onClose={onClose} size={{sm: '100%', md:'90%', xl: '80%'}}
                
            >
                <ModalOverlay />
                <ModalContent rounded='lg'  backgroundColor={colorMode === 'dark' ? 'gray.900' : 'white'}>
                    <AddShowModal defaultCategory={category} cateColor={cateColors[category]} />
                </ModalContent>
            </Modal>
        </>
    );
}
export default WatchCategory;