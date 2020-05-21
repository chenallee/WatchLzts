# WatchLzts
A site that allows users to track their watch status for tv shows. If you don't want to sign up, you can test it out with the `username: macaroni` and `password: crunchies`. 

Sometimes you watch shows on different platforms or different accounts. WatchLzts lets you keep track of the shows you want to watch, the ones you’re currently watching, and those you’ve completed. You can even record how far you've gotten in each show. So when you continue your ‘Avatar: The Last Airbender’ rewatch at your partner’s house - you don’t have to read episode descriptions or switch accounts to pick up where you last left off. 
## usage
Check out the live site [here](https://watchlzts.herokuapp.com/)!

Whichever category you try to add a show from, is what it will be added to by default unless you choose a different selection from the select dropdown.

Once you have some shows added, you can use the select dropdown on the front of the show card to update it's status, which also changes the episodes watched. If you want to edit what you watch more finely, you can click on the show card's image or title to flip it and see your watch status on each season. Check the box to mark that you've fully completed a season, or input what episode you're on. Shows get moved to the appropriate category automatically!

You can also select whether to use the site in light or dark mode.

As of right now, there is no procedures in place to recover forgotten passwords, so keep that in mind if you intend to use WatchLzts!

## technologies
A full stack MERN ([MongoDB](https://www.mongodb.com/), [Express](https://expressjs.com/), [React](https://reactjs.org/), [Node.js](https://nodejs.org/en/)) app made using [Create React App](https://create-react-app.dev/).

Uses [Mongoose](https://mongoosejs.com/) for modeling mongo data, [JWT](https://jwt.io/) for authentication, and [Chakra UI](https://chakra-ui.com/) for the front end. 
Data pulled from several endpoints of the TVMaze API.
* [show search](https://www.tvmaze.com/api#show-search)
* [show seasons](https://www.tvmaze.com/api#show-seasons)
* [season episodes](https://www.tvmaze.com/api#season-episodes)

## thoughts:
This is my first time really delving deep with React state management. Teaching myself how to use Chakra UI for the first time was interesting as well! Although I am still working on refactoring this site in order to more efficiently make use of the components and state management react and chakra ui feature, I learned a lot from working on this.

I struggled with getting used to how to implement Chakra UI both conceptually and syntactically. I feel like I understand it well enough conceptually to figure out what syntax to look up now. 
I also had issues with the TVMaze API. Most shows returned episodes per season from the show seasons endpoint, but many anime did not. It was important for me to be able to track episodes for anime as well, since I was inspired by [MyAnimeList](https://myanimelist.net/). I'd like to check out the unoffical MAL APIs sometime and see what I can build with those. In order to make sure I got the complete data I was looking for, I had to do a lot of promise handling. I also learned that the .foreach method does not wait on each index before continuing, and I ended up using for loops instead.
I also discovered that I couldn't deal with state management as easily as I predicted. I spent a lot of time learning to be careful about what my variables were referencing, and to update state properly using setState hooks. For season episode state, I ended up retrieving the show object and replacing its episode array value each time I needed to update it. I would like to manage the data a bit better on both the server and client side so there isn't as much data being sent back and forth each time a show is updated. 

Even before I tackle those features, this site is far from done! I want a cleaner design for the site and a welcoming landing page. I also need to add a font file to extend the chakra default theme to include some additional fonts.
Also, I had a bit of trouble making the show cards do their flip animation while also being responsive. The site needs to be optimized on larger and smaller screens. 
I also want to add some spinners to indicate activity while a show is being saved or updated, and more input validation so the user more easily understands the interaction behaviors.
Another thing I'd like to add to the front of the card is something that shows the user what their last watched episode was. Like 'S1 3/9' with a plus button they can click to change it to 'S1 4/9' easily without manually typing on the back of the card. 

If you've gotten this far, thanks for reading! Please check back soon for updates. I also always welcome advice!
