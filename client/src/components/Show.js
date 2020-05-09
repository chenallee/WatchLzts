import React, { useContext, useEffect, useState } from 'react';

import { Box, Grid, Image, Flex, Heading, Text, Select, Collapse, IconButton, PseudoBox, SimpleGrid, Icon, Divider, Editable, EditableInput, EditablePreview } from "@chakra-ui/core";

// import context for global state
import UserInfoContext from '../utils/UserInfoContext';

import * as API from '../utils/API';

function Show({ show }) {
    const [showMore, setShowMore] = useState(false);
    const handleToggle = () => setShowMore(!showMore);

    // get whole userData state object from App.js
    // const userData = useContext(UserInfoContext);
    function returnSummary() {
        return { __html: show.summary };
    }

    return (
        
        <Flex overflow='hidden' key={show.tvMazeId} align='center' rounded='lg' mx={{ sm: '5rem', md: '1rem' }} flexDir='column' shadow='lg'>
            <Image onClick={handleToggle} cursor='pointer' overflow='hidden' width='100%' src={show.image} alt={`${show.title} cover`} />
            <Flex flexDir='column' p='1rem' minWidth='100%'>
                <PseudoBox onClick={handleToggle} cursor='pointer' display='flex' flexDir='row' alignItems='center' justifyContent='flex-start'>
                    <Heading as='h4' size='lg'> {show.title} </Heading> <Icon marginLeft='.5rem' name="info" /> 
                    
                </PseudoBox>

                <Select
                    backgroundColor="tomato"
                    borderColor="tomato"
                    color="white"
                    value={show.watchStatus}
                // onChange -> update show
                >
                    <option value="to watch">to watch</option>
                    <option value="watching">watching</option>
                    <option value="completed">completed</option>
                </Select>
                <Collapse mt={4} isOpen={showMore} display='flex' flexDir='column'>
                    
                    <Text dangerouslySetInnerHTML={returnSummary()}></Text>
                    <Divider></Divider>
                    <Text > episodes </Text>
                    <SimpleGrid marginTop='1rem' columns='2' spacingX={10} spacingY={5}>
                        {show.episodes.map((season) => {
                            return (
                                <Text as='sub' letterSpacing='3px' textDecoration={season.watchedEpis === season.seasonEpis ? 'line-through' : 'none' }>
                                    S{season.seasonName} - {season.watchedEpis}/{season.seasonEpis} 
                                    {/* {season.watchedEpis === season.seasonEpis ? (<></>) : (<IconButton variantColor="green" aria-label="Search database" icon="small-add" />) } */}
                                </Text>
                            );
                        })}
                    </SimpleGrid>
                </Collapse>


            </Flex>
        </Flex>
    );
}

export default Show;