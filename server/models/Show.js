const { Schema } = require('mongoose');

// show schema
/* 
{
  title: "Castlevania",
  tvMazeId: 25242,
  watchStatus: "watching",
  summary: "<p>Inspired by the classic video game series, <b>Castlevania</b> is a dark medieval fantasy following the last surviving member of the disgraced Belmont clan, trying to save Eastern Europe from extinction at the hand of Vlad Dracula Tepe himself.</p>,
  image: "http://static.tvmaze.com/uploads/images/medium_portrait/166/415423.jpg",
  episodes: [
      {
          seasonName: 1,
          seasonEpis: 4,
          watchedEpis: 4,
      },
    {
          seasonName: 2,
          seasonEpis: 8,
          watchedEpis: 8,
      },
    {
          seasonName: 3,
          seasonEpis: 10,
          watchedEpis: 4,
      }
  ]
}
*/

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedShows` array in User.js
const showSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    //from tvMaze API after show is first added
    tvMazeId: {
        type: String,
        required: true
    },
    watchStatus: {
        type: String,
        required: true
    },
    summary: {
        type: String
    },
    image: {
        type: String
    },
    episodes: [
        //contains season objects:
        /*
         {
          seasonName: 1,
          seasonEpis: 4,
          watchedEpis: 4,
      },
    {
          seasonName: 2,
          seasonEpis: 8,
          watchedEpis: 8,
      },
    {
          seasonName: 3,
          seasonEpis: 10,
          watchedEpis: 4,
      }
        */
    ]
})

module.exports = showSchema;
