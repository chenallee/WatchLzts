import React, { useState, useContext } from 'react';

import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Input, FormControl, Stack, IconButton, SimpleGrid, Flex, Heading, Text, Box, Image, AspectRatioBox, Select, Button, useColorMode } from "@chakra-ui/core";

import UserInfoContext from '../utils/UserInfoContext';
import AuthService from '../utils/auth';

import { searchTvMaze, getSeasons, getEpisodes, saveShow, getShow, updateShow } from '../utils/API';

function AddShowModal() {
    const [searchedShows, setSearchedShows] = useState([]);

    const [searchInput, setSearchInput] = useState('');

    const userData = useContext(UserInfoContext);
    const { colorMode, toggleColorMode } = useColorMode();

    function returnSummary(summary) {
        return { __html: summary };
    }

    // create method to search for books and set state on form submit
    const handleFormSubmit = (event) => {
        //searchedShows.empty();
        //console.log(searchedShows);
        event.preventDefault();

        if (!searchInput) {
            return false;
        }

        searchTvMaze(searchInput)
            .then(({ data }) => {
                //console.log(data);
                const showData = data.map(({ show }) => ({
                    tvMazeId: show.id,
                    title: show.name,
                    summary: show.summary,
                    image: show.image?.original || `https://via.placeholder.com/680x1000?text=No+Image`,
                    watchStatus: 'to watch',

                }));
                //showData.episodes.length = 0;

                return setSearchedShows(showData);
            })
            .catch((err) => console.log(err));

    }

    const stageWatchStatus = (status, showId) => {
        const showToEffect = searchedShows.find((show) => show.tvMazeId == showId);
        // console.log(showToEffect);
        showToEffect.watchStatus = status;
    }

    async function formatEpis(season) {
        if (!season.episodeOrder) {
            let episodesRes = await getEpisodes(season.id);
            //console.log(episodesRes.data);
            let seasonEpis = (episodesRes.data).length;
            return seasonEpis;
        } else {
            let seasonEpis = season.episodeOrder;
            return seasonEpis;
        }
    }

    async function formatSeason(season, status) {
        console.log(status);
        let formattedSeason = {
            id: season.id,
            seasonName: season.number,
            seasonEpis: await formatEpis(season)
        }
        console.log(formattedSeason);

        //if episodeOrder: null, 

        if (status === 'completed') {
            formattedSeason.watchedEpis = formattedSeason.seasonEpis;
        }
        if (status === 'to watch' || status === 'watching') {
            formattedSeason.watchedEpis = 0;
        }
        if (status === 'watching' && formattedSeason.seasonName === 1) {
            formattedSeason.watchedEpis = 1;
        }
        console.log(formattedSeason);

        //if after we retrieve episodes from tvmaze, and it's still false... the season may not have aired/smthng else ... for now let's just not save that season. later on, potential to let user input manually
        if (!formattedSeason.seasonEpis) {
            throw new Error('no episodes');
        }
        return formattedSeason;
    }

    async function populateSeasons(showToSave, seasonData) {
        // using for loop bc for each doesn't wait for completion at each index
        for (let i = 0; i < seasonData.length; i++) {
            try {
                const formattedSeason = await formatSeason(seasonData[i], showToSave.watchStatus);
                showToSave.episodes.push(formattedSeason);
            } catch (err) {
                console.log(err);
            }
        }
        console.log(showToSave);
        return showToSave;
    }

    async function handleSaveShow(showId) {

        let showToFormat = searchedShows.find((show) => show.tvMazeId == showId);
        //searchedShows.splice(showToSave);
        //console.log(searchedShows);

        // get token
        const token = AuthService.loggedIn() ? AuthService.getToken() : null;

        if (!token) {
            return false;
        }

        showToFormat.episodes = [];

        let { data: seasonData } = await getSeasons(showId);
        let showToSave = await populateSeasons(showToFormat, seasonData)
        // .then(() => console.log(showToSave))
        //console.log(showToSave);


        saveShow(showToSave, token)
            .then(() => userData.getUserData())
            .catch((err) => console.log(err));
    }

    return (
        <>
            <ModalHeader bgColor='black'>
                <Heading as='h6'>Search for a Show to Add!</Heading>
                <form onSubmit={handleFormSubmit}>
                    <Stack display='flex' flexDir='row'>

                        <Input placeholder='Search by show name...' name='searchInput'
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                        />

                        <IconButton type='submit' variantColor='orangered' aria-label="search for show" icon="search" />
                    </Stack>
                </form>
                <ModalCloseButton />
            </ModalHeader>
            <ModalBody>
                <SimpleGrid columns={{ sm: '1', xl: '2' }} spacing='1.5rem'>
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
                                                // backgroundColor={colorMode === 'dark' ? `${cateColor}.100` : `${cateColor}.400`}

                                                // border={colorMode === 'dark' ? `${cateColor}.100` : `${cateColor}.400`}
                                                // color={colorMode === 'dark' ? `black` : `white`}
                                                defaultValue={show.watchStatus}
                                                onChange={(e) => stageWatchStatus(e.target.value, show.tvMazeId)}
                                            >
                                                <option value="to watch">to watch</option>
                                                <option value="watching">watching</option>
                                                <option value="completed">completed</option>
                                            </Select>
                                            <Button leftIcon="add" variantColor="queenblue"
                                                variant='outline'
                                                onClick={() => handleSaveShow(show.tvMazeId)}
                                                disabled={userData.savedShows?.some((savedShow) => savedShow.tvMazeId == show.tvMazeId)}>
                                                {userData.savedShows?.some((savedShow) => savedShow.tvMazeId == show.tvMazeId)
                                                    ? 'Already on list!'
                                                    : 'Add to list!!'}
                                            </Button>


                                        </Flex>
                                        <Box justifyContent='center' paddingLeft={{ md: '1rem' }} paddingTop={{ sm: '1rem', md: '0' }}>
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