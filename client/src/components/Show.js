import React, { useContext, useEffect, useState } from 'react';

import { Box, Grid, Image, Flex, Heading, Text, Select, Collapse, IconButton, PseudoBox, SimpleGrid, Icon, Divider, Editable, EditableInput, EditablePreview } from "@chakra-ui/core";

// import context for global state
import UserInfoContext from '../utils/UserInfoContext';
import AuthService from '../utils/auth';

import * as API from '../utils/API';

import { deleteShow } from '../utils/API';

function Show({ show, cateColor }) {
    // const [showMore, setShowMore] = useState(false);
    // const handleToggle = () => setShowMore(!showMore);
    const [flipCard, setFlipCard] = useState(false);
    const handleFlip = () => setFlipCard(!flipCard);

    const userData = useContext(UserInfoContext);

    // get whole userData state object from App.js
    // const userData = useContext(UserInfoContext);
    function returnSummary() {
        return { __html: show.summary };
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

    // function getEpis(){
    //     getEpisodes(show.tvMazeId)
    //     .then((data) => {
    //         console.log(data);
    //     })
    //     .catch((err) => console.log(err));
    // }

    return (
        <PseudoBox className={flipCard ? 'flip-container flip' : 'flip-container'} mx='auto'>

            <PseudoBox className='flipper'>

                <Flex bg='white' overflow='hidden' align='center' rounded='lg'
                    // mx={{ sm: '5rem', md: '1rem' }} 
                    flexDir='column' shadow='lg' className='front'  >

                    {/* <PseudoBox className={flipCard ? 'front backSide' : 'front viewSide'} display={flipCard ? 'hidden' : ''}> */}
                    <Image cursor='pointer' onClick={handleFlip} overflow='hidden' width='100%' src={show.image} alt={`${show.title} cover`} />
                    <Flex flexDir='column' p='1rem' minWidth='100%'>
                        <PseudoBox onClick={handleFlip} cursor='pointer' display='flex' flexDir='row' alignItems='center' justifyContent='flex-start'>
                            <Heading as='h4' size='lg'> {show.title} </Heading> <Icon marginLeft='.5rem' name="info" />

                        </PseudoBox>

                        <Select
                            backgroundColor={`${cateColor}.500`}
                            border={`${cateColor}.500`}
                            color='white'
                        //value={show.watchStatus}
                        // onChange -> update show
                        >
                            <option value="to watch">to watch</option>
                            <option value="watching">watching</option>
                            <option value="completed">completed</option>
                        </Select>
                        {/* <Collapse mt={4} isOpen={showMore} display='flex' flexDir='column'>

                                <Text dangerouslySetInnerHTML={returnSummary()}></Text>
                                <Divider></Divider>
                                
                            </Collapse> */}


                    </Flex>
                    {/* </PseudoBox> */}
                </Flex>

                <Flex bg='white' overflow='hidden' align='center' rounded='lg'
                    // mx={{ sm: '5rem', md: '1rem' }} 
                    flexDir='column' shadow='lg' className='back' >
                    <Flex width='100%' justifyContent='space-between'>
                        <IconButton size='lg' variant='ghost' variantColor='tartorange' aria-label="delete show" icon="delete"
                            onClick={() => handleDeleteShow(show.tvMazeId)} />
                        <IconButton size='lg' variant='ghost' aria-label="show card front" icon="arrow-back"
                            onClick={handleFlip} />
                    </Flex>
                    <Heading as='h4' size='lg'> {show.title} </Heading>
                    <Text > episodes </Text>
                    <SimpleGrid marginTop='1rem' columns='2' spacingX={10} spacingY={5}>
                        {show.episodes.map((season) => {
                            return (
                                <Text key={season.id} as='sub' letterSpacing='3px' textDecoration={season.watchedEpis === season.seasonEpis ? 'line-through' : 'none'}>
                                    S{season.seasonName} - {season.watchedEpis}/{season.seasonEpis}
                                    {/* {season.watchedEpis === season.seasonEpis ? (<></>) : (<IconButton variantColor="green" aria-label="Search database" icon="small-add" />) } */}

                                </Text>
                            );
                        })}
                    </SimpleGrid>
                </Flex>

            </PseudoBox>

        </PseudoBox>
    );
}

export default Show;