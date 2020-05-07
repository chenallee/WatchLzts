import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import { FiLogIn, FiLogOut, FiList } from 'react-icons/fi'
import {
    Box, Button, IconButton,
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
    Tabs, TabList, TabPanels, Tab, TabPanel, useDisclosure
} from "@chakra-ui/core";

import SignUpForm from './SignupForm';
import LogInForm from './LoginForm';

import UserInfoContext from '../utils/UserInfoContext';
import AuthService from '../utils/auth';


function Navbar() {
    //
    // const [showModal, setShowModal] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const { username } = useContext(UserInfoContext);

    return (
        <>
            {/* NAVBAR */}
            <Box as='nav'>
                <IconButton icon='moon' />
                {username ? (
                    <>
                        <Button as={Link} to='/watchlzts' variantColor='junglegreen' aria-label="Search database" leftIcon={FiList}> my lzts </Button>
                        <Button onClick={AuthService.logout} variant='ghost' variantColor="#577590" _hover={{ bg: "#577590" }} aria-label="Search database" leftIcon={FiLogOut}> log out</Button>

                    </>
                ) : (
                        <Button onClick={onOpen} variant='ghost' variantColor="#577590" _hover={{ bg: "#577590" }} aria-label="Search database" leftIcon={FiLogIn}> log in</Button>
                    )}

            </Box>
            {/* MODAL - let's make this its own component and pass in defaultIndex */}
            <Modal isOpen={isOpen} onClose={onClose} size='xl'>
                <ModalOverlay />
                {/* tab will show either login or sign up form ... since here we access from login that will be the default */}
                <ModalContent>
                    <ModalCloseButton />
                    <ModalBody>
                        <Tabs defaultIndex={0}>
                            <TabList>
                                <Tab>Log In</Tab>
                                <Tab>Sign up</Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel>
                                    <LogInForm onClose={onClose} />
                                </TabPanel>
                                <TabPanel>
                                    <SignUpForm onClose={onClose} />
                                </TabPanel>
                            </TabPanels>

                        </Tabs>
                    </ModalBody>
                </ModalContent>
            </Modal>


        </>
    )
}

export default Navbar;