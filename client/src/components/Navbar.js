import React, { useState, useContext } from 'react';
import { 
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams}
     from 'react-router-dom';

import { FiLogIn, FiLogOut, FiList } from 'react-icons/fi'
import {
    Flex, Box, Button, IconButton,
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
    Tabs, TabList, TabPanels, Tab, TabPanel, useDisclosure, useColorMode, Icon,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuGroup,
    MenuDivider,
    MenuOptionGroup,
    MenuItemOption,
} from "@chakra-ui/core";


import Watchlists from '../pages/Watchlists';

import AddShowModal from '../components/AddShowModal';

import UserInfoContext from '../utils/UserInfoContext';
import AuthService from '../utils/auth';


function Navbar() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { colorMode, toggleColorMode } = useColorMode();

    const { username } = useContext(UserInfoContext);

    return (
        <>
            {/* NAVBAR */}
            <Flex as='nav' p='.5rem' justify='flex-end' pos='fixed' width='100%' zIndex={2} 
            // bg={colorMode === 'dark' ? 'rgba(36, 36, 35, 1)'  : 'rgba(255, 255, 255, 1)' }
            // bgImage='rgba(147,37,254,0.6)'
            >
                {username ? (
                    <>
                    <Button onClick={onOpen} leftIcon="small-add"  > Add Show... </Button>
                    <Button as={Link} to='/to-watch'
                       
                         variant='ghost'aria-label="Search database" leftIcon={FiList}> to watch </Button>
                        <Button as={Link} to='/watching'
                        
                         variant='ghost'  aria-label="Search database" leftIcon={FiList}> watching </Button>
                         <Button as={Link} to='/completed'
                        
                         variant='ghost' aria-label="Search database" leftIcon={FiList}> completed </Button>


                        <Menu closeOnSelect={true} 
                        
                        >
                            <MenuButton as={IconButton} icon='settings' variant='ghost'>
                            </MenuButton>
                            <MenuList width='5rem' 
                            border='none'
                            bg={colorMode === 'dark' ? '#242423' : 'white'}
                            >
                                
                                    <Button as={MenuItem} variant='ghost' variantColor='yelloworange' leftIcon={colorMode === 'dark' ? 'sun' : 'moon'} onClick={toggleColorMode}> theme </Button>
                            
                                    <Button as={MenuItem} onClick={AuthService.logout} variant='ghost' variantColor='queenblue' aria-label="Search database" leftIcon={FiLogOut}> log out</Button>
                               
                            </MenuList>
                        </Menu>

                    </>
                ) : (
                        <IconButton variant='ghost' variantColor='yelloworange' icon={colorMode === 'dark' ? 'sun' : 'moon'} onClick={toggleColorMode} />
                        // <Button onClick={onOpen} variant='ghost' variantColor='queenblue' aria-label="Search database" leftIcon={FiLogIn}> log in</Button>
                    )}

            </Flex>
            {/* MODAL - let's make this its own component and pass in defaultIndex */}
            <Modal isOpen={isOpen} scrollBehavior='inside' onClose={onClose} size={{sm: '100%', md:'90%', xl: '80%'}} 
                >
                    <ModalOverlay />
                    <ModalContent rounded='lg'  backgroundColor={colorMode === 'dark' ? 'gray.900' : 'white'}>
                        <AddShowModal/>
                    </ModalContent>
                </Modal>


        </>
    )
}

export default Navbar;