import React, { useContext } from 'react';


import {FiLogOut,} from 'react-icons/fi'
import {
    Flex, Button, IconButton,
    useColorMode,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,

} from "@chakra-ui/core";


import UserInfoContext from '../utils/UserInfoContext';
import AuthService from '../utils/auth';


function Navbar() {
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



        </>
    )
}

export default Navbar;