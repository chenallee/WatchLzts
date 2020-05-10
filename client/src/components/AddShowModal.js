import React, { useState, useContext } from 'react';

import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Input, FormControl, Stack, IconButton, SimpleGrid, Flex, Heading, Text, Box, Image, AspectRatioBox, Select, Button } from "@chakra-ui/core";

import UserInfoContext from '../utils/UserInfoContext';
import AuthService from '../utils/auth';

import { saveShow, searchTvMaze, getEpisodes } from '../utils/API';

function AddShowModal({ defaultCategory, cateColor }) {
    const [searchedShows, setSearchedShows] = useState([]);

    const [searchInput, setSearchInput] = useState('');
    
    const userData = useContext(UserInfoContext);

    function returnSummary(summary) {
        return { __html: summary };
    }

    // create method to search for books and set state on form submit
    const handleFormSubmit = (event) => {
        event.preventDefault();

        if (!searchInput) {
            return false;
        }

        searchTvMaze(searchInput)
            .then(({ data }) => {
                console.log(data);
                const showData = data.map(({ show }) => ({
                    tvMazeId: show.id,
                    title: show.name,
                    summary: show.summary,
                    image: show.image?.original || `https://via.placeholder.com/680x1000?text=No+Image`
                }));

                return setSearchedShows(showData);
            })
            .catch((err) => console.log(err));

    }

    return (
        <>
            <ModalHeader >
                <Heading as='h6'>Search for a Show to Add!</Heading>
                <form onSubmit={handleFormSubmit}>
                    <Stack display='flex' flexDir='row'>

                        <Input placeholder='Search by show name...' name='searchInput'
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)} />

                        <IconButton type='submit' variantColor="blue" aria-label="search for show" icon="search" />
                    </Stack>
                </form>
                <ModalCloseButton />
            </ModalHeader>
            <ModalBody>
                <SimpleGrid columns={{ sm: '1', xl: '2' }} spacing='1rem'>
                    {searchInput || searchedShows ? (
                        <>

                            {searchedShows.map((show) => {

                                return (
                                    <Box key={show.tvMazeId} p='1rem' display={{ md: 'flex' }} margin='auto' shadow='sm' margin='0' rounded='lg'>
                                        <Flex flexDir='column' minWidth={{ sm: '40%', xl: '50%' }}>
                                            <AspectRatioBox ratio={3 / 4} maxWidth={{ xl: '60%', }} margin='0 20%'>
                                                <Image src={`${show.image}`} alt={`${show.title}`} rounded='lg' />
                                            </AspectRatioBox>
                                            <Heading as='h4' size='lg' alignSelf='center' marginY='1rem'>{show.title}</Heading>

                                            <Select 
                                                disabled={userData.savedShows?.some((savedShow) => savedShow.tvMazeId == show.tvMazeId)}
                                                backgroundColor={`${cateColor}.500`}
                                                border={`${cateColor}.500`}
                                                color='white'
                                                value={defaultCategory}
                                                // onChange={}
                                            >
                                                <option value="to watch">to watch</option>
                                                <option value="watching">watching</option>
                                                <option value="completed">completed</option>
                                            </Select>
                                            <Button leftIcon="add" variantColor="teal" variant="outline"
                                            disabled={userData.savedShows?.some((savedShow) => savedShow.tvMazeId == show.tvMazeId)}>
                                                {userData.savedShows?.some((savedShow) => savedShow.tvMazeId == show.tvMazeId)
                                                    ? 'Already on list!'
                                                    : 'Add to list!!'}
                                            </Button>


                                        </Flex>
                                        <Box justifyContent='center' >
                                            <Text margin='auto' dangerouslySetInnerHTML={returnSummary(show.summary)}></Text>
                                        </Box>
                                    </Box>
                                );
                            })
                            }
                        </>

                    ) : (
                            <Heading as='h3' size='lg' alignSelf='center'>
                                Search for a show to add!
                            </Heading>
                        )}

                </SimpleGrid>
            </ModalBody>

        </>
    );
}

export default AddShowModal;