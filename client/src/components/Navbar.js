import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import { FiLogIn, FiLogOut, FiList } from 'react-icons/fi'
import { Box, Button, IconButton } from "@chakra-ui/core";
import UserInfoContext from '../utils/UserInfoContext';



function Navbar() {
    //
    const [showModal, setShowModal] = useState(false);

    const { username } = useContext(UserInfoContext);

    return (
        <>
            <Box as='nav'>
                <IconButton icon='moon' />
                {username ? (
                    <>
                        <Button as={Link} to='/watchlzts' variantColor='junglegreen' aria-label="Search database" leftIcon={FiList}> my lzts </Button>
                        <Button variant='ghost' variantColor="#577590" _hover={{ bg: "#577590" }} aria-label="Search database" leftIcon={FiLogOut}> log out</Button>
                        
                    </>
                ) : (
                    <Button variant='ghost' variantColor="#577590" _hover={{ bg: "#577590" }} aria-label="Search database" leftIcon={FiLogIn}> log in</Button>
                )}

            </Box>


        </>
    )
}

export default Navbar;