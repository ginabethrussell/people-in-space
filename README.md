# people-in-space
This page was developed to allow users to view information about current astronauts in space. JSON data was retreived from the [Open Notify API for How Many People Are in Space Right Now](http://open-notify.org/Open-Notify-API/People-In-Space/) Additional JSON data was pulled from the site [How Many People Are In Space Right Now](https://www.howmanypeopleareinspacerightnow.com/). I attempted to use Fetch/Promise methods to retrieve the data but had issues with the headers. I used the data to create my own JSON object in the project folder. This work around will prevent the site from updating with future crew changes. The project was also created to practice coding an autocomplete input box for the user. 

This site is published using [GitHub Pages](https://ginabethrussell.github.io/people-in-space/).

Tutorial resource for Autocomplete functionality from Wes Bos, Type Ahead, #JavaScript30 6/30.

Snoopy Poster downloaded from [ ISS 20th Anniversary Poster 1 ](https://www.nasa.gov/image-feature/iss-20th-anniversary-poster-1-high-res).


**Astronauts in Space** is a responsive site created using a CSS flexbox. Users can begin typing in the search box to find an astronaut currently in space. The autocomplete feature will assist the user in selecting an astronaut. Information about the astronaut whose name is typed in the search box or who is the top suggestion from the autocomplete list will be displayed to the user when the user presses return. A button below the astronaut's info will allow the user to search again. Additional links are included to allow the user to connect to the home pages for NASA, SpaceX, and the NASA ISS page. The site is responsive on smaller devices. 