import React, { useContext, useEffect, useState } from 'react';

import { useUpdateEffect } from 'react-use';

import { Box, Grid, Image, Flex, Heading, Text, Select, Collapse, IconButton, PseudoBox, SimpleGrid, Icon, Divider, Editable, EditableInput, EditablePreview, Input, InputGroup, InputLeftAddon, InputRightAddon, Stack, ControlBox, VisuallyHidden, Checkbox } from "@chakra-ui/core";

// import context for global state
import UserInfoContext from '../utils/UserInfoContext';
import AuthService from '../utils/auth';

import * as API from '../utils/API';

import { deleteShow, updateShow, getShow } from '../utils/API';

function Show({ show, cateColor }) {
    // const [showMore, setShowMore] = useState(false);
    // const handleToggle = () => setShowMore(!showMore);
    const [flipCard, setFlipCard] = useState(false);
    const handleFlip = () => setFlipCard(!flipCard);
    const [watchStatus, setWatchStatus] = useState(show.watchStatus);
    const [episodeState, setEpisodeState] = useState(show.episodes);


    const userData = useContext(UserInfoContext);

    // checking for watchStatus updates
    useUpdateEffect(() => {
        //check if we need to update epis too
        const showStatus = checkSeasonStatus();

        // if watchStatus is set to 'completed' && if episodeState is all complete -> call endpoint here
        // if watchStatus is set to 'to watch' && if episodeState is all 0 -> call endpoint here
        // if watchStatus is set to 'watching' -> we don't care what episode state is -> call endpoint here

        if (watchStatus === showStatus || watchStatus === 'watching') {
            console.log('call endpoint here');
            //get show obj & replace with states
            //send new showObj to endpoint
            handleUpdateShow();
            return;
        }

        // if watchStatus is set to 'to watch' && if episodeState NOT all 0 -> exit here and update episodeState 
        if (watchStatus === 'to watch') {
            console.log('set eps to 0');
            //for each season -> update 
            handleUpdateAll('0');
            return;
        }

        // if watchStatus is set to 'completed' && if episodeState NOT all complete ->  exit here and update episodeState
        if (watchStatus === 'completed') {
            console.log('set eps to season eps');
            handleUpdateAll('completed');
            return;
        }

    }, [watchStatus])
    //checking for episodeState updates
    useUpdateEffect(() => {
        console.log(watchStatus);
        console.log(episodeState);

        //check if we need to update epis too
        const showStatus = checkSeasonStatus();
        console.log(showStatus);

        // if episode state is set so all 0 & watchStatus = to watch
        // -> just send states to DB
        // call endpoint here
        // if episodeState is set so all complete & watchStatus = complete
        // -> just send states to DB
        // call endpoint here
        if (watchStatus === showStatus) {
            console.log('call endpoint here');
            //get show obj & replace with states
            //send new showObj to endpoint
            handleUpdateShow();
            return;
        }

        // if episodeState is set so all complete & watchStatus != complete
        // -> update watchStatus -> send to DB
        // exit here and update watchStatus
        if (showStatus === 'completed') {
            setWatchStatus('completed');
            return;
        }

        // if episode state is set so all 0 & watchStatus != to watch
        // -> update watchStatus -> send to DB
        // exit here and update watchStatus
        if (showStatus === 'to watch') {
            setWatchStatus('to watch');
            return;
        }

        if (showStatus === 'watching') {
            setWatchStatus('watching');
            return;
        }

        // else just send states to DB
        // call endpoint here
        handleUpdateShow();

        //check if we need to update status too
        //for each season, if watched = season -> setWatchStatus(completed)
        //for each season, if watched = season -> setWatchStatus(completed)

    }, [episodeState])

    async function handleUpdateShow() {
        let showToUpdate = await handleRetrieveShow();
        showToUpdate.watchStatus = watchStatus;
        showToUpdate.episodes = episodeState;
        console.log(showToUpdate);

        // get token
        const token = AuthService.loggedIn() ? AuthService.getToken() : null;

        if (!token) {
            return false;
        }
        updateShow(show.tvMazeId, token, showToUpdate)
            .then(() => userData.getUserData())
            .catch((err) => console.log(err));
    }

    const checkSeasonStatus = () => {
        let watchedCount = 0;
        let unwatchedCount = 0;
        episodeState.forEach((season) => {
            console.log(season);
            if (season.watchedEpis === 0) {
                unwatchedCount++;
            }
            if (season.watchedEpis == season.seasonEpis) {
                watchedCount++;
            }
        })
        console.log(`watched ${watchedCount} / ${episodeState.length}`)
        console.log(`unwatched ${unwatchedCount} / ${episodeState.length}`)
        if (watchedCount === episodeState.length) {
            return 'completed';
        }
        if (unwatchedCount === episodeState.length) {
            return 'to watch';
        }


        return 'watching';
    }

    async function handleRetrieveShow() {
        //get & return show obj
        // get token
        const token = AuthService.loggedIn() ? AuthService.getToken() : null;

        if (!token) {
            return false;
        }
        const showObj = await getShow(show.tvMazeId, token)
            .then(({ data }) => {
                //console.log(data.savedShows[0]);
                return data.savedShows[0];
            })
            .catch((err) => console.log(err));

        return showObj;
    }

    async function handleUpdateSeason(season, status) {
        //console.log(season);
        let newSeason = season;
        if (parseInt(status) === 0) {
            newSeason.watchedEpis = 0;
        } else if (status === 'completed') {
            newSeason.watchedEpis = season.seasonEpis;
        } else {
            newSeason.watchedEpis = status;
        }

        return newSeason;

    }

    async function handleUpdateOne(season, value) {
        // console.log(season)
        //  console.log(`-> ${value}`)
        //function update one season of show

        //get show
        let showObj = await handleRetrieveShow();
        let seasonIndex = showObj.episodes.findIndex((seasonObj) => seasonObj.id == season.id);

        // update 1 season on show
        const updatedSeason = await handleUpdateSeason(season, value);
        // console.log(updatedSeason);

        //splice new season into epiObj
        const epiObj = showObj.episodes;
        epiObj.splice(seasonIndex, 1, updatedSeason);
        // console.log(epiObj);

        //setEpisodeState as new epiObj
        setEpisodeState(epiObj);

    }

    async function constructNewEpiObj({ episodes }, newStatus) {
        let epiObj = [];
        // console.log(episodes);
        for (let i = 0; i < episodes.length; i++) {
            let updatedSeason = await handleUpdateSeason(episodes[i], newStatus);
            epiObj.push(updatedSeason);
        }

        return epiObj;

    }

    async function handleUpdateAll(newStatus) {
        //function update all seasons
        // get show
        let showObj = await handleRetrieveShow();
        // console.log(showObj);
        // console.log(newStatus);
        // for each season, update season
        let epiObj = await constructNewEpiObj(showObj, newStatus);
        //  console.log(epiObj);

        //setEpisodeState as new epiObj
        setEpisodeState(epiObj);

    }

    function handleDeleteShow(showId) {

        // get token
        const token = AuthService.loggedIn() ? AuthService.getToken() : null;

        if (!token) {
            return false;
        }

        deleteShow(showId, token)
            .then(() => userData.getUserData())
            .catch((err) => console.log(err));

    }

    async function handleUpdateEpiInput(season, value) {

        let error;
        // const key = season.id;
        if (!value || value < 0 || value > season.seasonEpis) {
            //add validation
            error = `there's an error`;
            console.log(error)
            //clear input ?
            return error;
        }

        //console.log(season);
        // console.log(value);
        const epsWatched = parseInt(value);
        handleUpdateOne(season, epsWatched);

    }

    function returnSummary() {
        return { __html: show.summary };
    }

    return (
        <PseudoBox className={flipCard ? 'flip-container flip' : 'flip-container'} mx='auto'>

            <PseudoBox className='flipper'>

                <Flex bg='white' overflow='hidden' align='center' rounded='lg'

                    flexDir='column' shadow='lg' className='front'  >

                    <PseudoBox overflow='hidden'>
                        <Image cursor='pointer' onClick={handleFlip} width='100%' src={show.image} alt={`${show.title} cover`} />
                    </PseudoBox>
                    <Flex flexDir='column' p='1rem' minWidth='100%'>
                        <PseudoBox onClick={handleFlip} cursor='pointer' display='flex' flexDir='row' alignItems='center' justifyContent='flex-start'>
                            <Heading as='h4' size='lg'> {show.title} </Heading> <Icon marginLeft='.5rem' name="info" />

                        </PseudoBox>

                        <Select
                            backgroundColor={`${cateColor}.400`}
                            border={`${cateColor}.400`}
                            color='white'
                            value={watchStatus}
                            onChange={(e) => setWatchStatus(e.target.value)}
                        >
                            <option value="to watch">to watch</option>
                            <option value="watching">watching</option>
                            <option value="completed">completed</option>
                        </Select>



                    </Flex>
                </Flex>

                <Flex bg='white' overflow='hidden' align='center' rounded='lg'
                    flexDir='column' shadow='lg' className='back' >
                    <Flex width='100%' justifyContent='space-between' height='10%'>
                        <IconButton size='lg' variant='ghost' variantColor='tartorange' aria-label="delete show" icon="delete"
                            onClick={() => handleDeleteShow(show.tvMazeId)} />
                        <IconButton size='lg' variant='ghost' aria-label="show card front" icon="arrow-back"
                            onClick={handleFlip} />
                    </Flex>
                    <Flex flexDir='column' padding='0 1rem 1rem 1rem' width='100%' height='90%'>
                        <Heading as='h4' size='lg'> {show.title} </Heading>
                        <Text > episodes: </Text>
                        <Stack paddingY='.5rem' overflowY='scroll'>
                            {episodeState.map((season) => {
                                return (

                                    <Flex key={season.id} flexDir='row' justifyContent='space-between' paddingX='1rem'>
                                        <Box display='flex' width='40%'>
                                            <Checkbox isChecked={season.watchedEpis === season.seasonEpis ? true : false}
                                                isDisabled={season.watchedEpis === season.seasonEpis ? true : false}
                                                onChange={(e) => handleUpdateOne(season, 'completed')}>S {season.seasonName}</Checkbox>

                                        </Box>


                                        <InputGroup key={season.id} size="sm"
                                        >
                                            <Input rounded='md' roundedRight='0' placeholder={season.watchedEpis}
                                                type='number' min='0' max={season.seasonEpis} step='1'
                                                width='100%'
                                                textAlign='right'
                                                paddingRight='.5rem'
                                                variant={season.watchedEpis === season.seasonEpis ? 'filled' : 'flushed'}
                                                onBlur={(e) => handleUpdateEpiInput(season, e.target.value)}
                                            />
                                            <InputRightAddon children={`/ ${season.seasonEpis}`}
                                                bg={`${cateColor}.100`}
                                                border='none'
                                                rounded='md' />
                                        </InputGroup>
                                    </Flex>
                                );
                            })}
                        </Stack>

                    </Flex>

                </Flex>

            </PseudoBox>

        </PseudoBox>
    );
}

export default Show;