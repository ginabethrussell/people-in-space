// get JSON data from api using browser method - fetch
const astronautDataSource = 'http://api.open-notify.org/astros.json';
const astronauts = {};
//fetch returns a promise
// work with a promise, using .then(blob => blob.json()).then(data => astronauts = data) 
// when first returned, raw data, use blob object's json method
// ex. to spread data in an array arrName.push(...data)*didnt work here?
fetch(astronautDataSource)
.then(response => response.json())
.then(data => astronauts.data = (data));

// function reloads the original page when button clicked under astro info display
function reload() {
    window.location.reload();
}

// Update html to show selected astronaut info
function displayAstronautInfo(selectedAstronaut){
    // Create capitalized full name from selectedAstronaut string
    let nameOfAstronautArr = selectedAstronaut.split(' ');
    let fullName = nameOfAstronautArr[0][0].toUpperCase() + nameOfAstronautArr[0].slice(1,) + " " + 
    nameOfAstronautArr[1][0].toUpperCase() + nameOfAstronautArr[1].slice(1,);
    document.querySelector('#user-mess').textContent = `Show me more about ${fullName}!`
   
    //let astroToDisplay = Array.from(astroInfo);
    let astroToDisplay = Array.from(astroInfo.people).filter(person => {
        if (person.name === fullName){
            return person;
        }});
   
    let astroImgSrc = astroToDisplay[0].biophoto;
    let astroCountry = astroToDisplay[0].country;
    let astroCountryFlagImgSrc = astroToDisplay[0].countryflag;
    let astroLaunchDate = astroToDisplay[0].launchdate;
    let astroDays = astroToDisplay[0].careerdays;
    let astroTitle = astroToDisplay[0].title;
    let astroLocation = astroToDisplay[0].location;
    let astroBio = astroToDisplay[0].bio;
    let astroBiolink = astroToDisplay[0].biolink; 

    document.getElementById('poster').style.display ="none";
    let photoImg = document.createElement('img');
    photoImg.src = astroImgSrc;
    document.getElementById('astronaut-display').appendChild(photoImg);

    document.getElementById('search').style.display ="none";
    let flagImg = document.createElement('img');
    flagImg.id = "country-flag";
    flagImg.src = astroCountryFlagImgSrc;
    document.getElementById('flag-country').appendChild(flagImg);

    let countryName = document.createElement('h2');
    countryName.id = "country-name";
    document.getElementById('flag-country').appendChild(countryName);
    document.getElementById('country-name').innerText = astroCountry;

    let launchDate = document.createElement('h3');
    launchDate.id = "launch-date";
    document.getElementById('text-info').appendChild(launchDate);
    document.getElementById('launch-date').innerText = astroLaunchDate;

   let daysInSpace = document.createElement('h3');
   daysInSpace.id = "days";
   document.getElementById('text-info').appendChild(daysInSpace);
   document.getElementById('days').innerText = astroDays;
   
   let astroRank = document.createElement('h3');
   astroRank.id = "title";
   document.getElementById('text-info').appendChild(astroRank);
   document.getElementById('title').innerText = astroTitle;
    
   let location = document.createElement('h3');
   location.id = "location";
   document.getElementById('text-info').appendChild(location);
   document.getElementById('location').innerText = astroLocation;
    
   let bio = document.createElement('p');
   bio.id = "bio";
   document.getElementById('text-info').appendChild(bio);
   document.getElementById('bio').innerText = astroBio;
    
   let astroContact = document.createElement('a');
   astroContact.id = "contact";
   astroContact.href = `${astroBiolink}`;
   document.getElementById('text-info').appendChild(astroContact);
   astroContact.setAttribute('target', '_blank');
   document.getElementById('contact').innerText = "More Info ...";

   let refreshButton = document.createElement('button');
   refreshButton.id = 'refresh-button';
   document.getElementById('text-info').appendChild(refreshButton);
   document.getElementById('refresh-button').innerText = 'Find Another Astronaut!';
   refreshButton.addEventListener('click', reload);
}

//Create a function to find matches in array to what user is typing
function findMatches(wordToMatch, namesToMatchArr) {
    return namesToMatchArr.filter(name => {
    const regex = new RegExp(wordToMatch, 'gi'); //g is global, may match any; i is insensitive
    return name.match(regex);
     });
}  

//called when input is changed
function displayMatches(e) {
    
    const astronautNamesArr = astronauts.data.people;
    const namesToMatchArr = astronautNamesArr.map(item => item['name']);

    let inputValue = '';
    let topSuggestion = '';
    // If user presses enter, check for a match in the input box or top suggestion
    // Get user value and top suggestion if not null
    if (e.code === "Enter"){
        if(document.querySelector('.search').value !== null){
            inputValue = document.querySelector('.search').value.toLowerCase();
        }
        if(document.querySelector('.suggestions li') !== null){
            topSuggestion = document.querySelector('.suggestions li').textContent.trim().toLowerCase();
        }
        
        //Make name array lowercase to make matches case insensitive
        const lowerCaseNameArr = namesToMatchArr.map(name => {return name.toLowerCase()});

        /*if user input or suggestion matches an astronaut in space, call function
         to display info, if user input doesn't match or create a suggestion, give user
         an error message */ 
        if (lowerCaseNameArr.includes(inputValue)){
            displayAstronautInfo(inputValue);
            return;
        } else if (lowerCaseNameArr.includes(topSuggestion)){
            displayAstronautInfo(topSuggestion);
            return;
        }
        document.querySelector('#user-mess').textContent = "That is not an astronaut in space. Try Again."
        
        return;
   }

   //look for matches to the value typed in
    const matchArray = findMatches(this.value, namesToMatchArr);

    //create highlighted portion in the name
    const html = matchArray.map(name => {
        const regex = new RegExp(this.value,'gi');
        const astroName = name.replace(regex,`<span class="hl">${this.value}</span>` );
        return `
            <li>
                <span class="name">${astroName}</span>
            </li>
        `;
    }).join('');//turns array into a string
    suggestions.innerHTML = html; //adds to the ul in the html
  }
 
  const searchInput = document.querySelector('.search');
  const suggestions = document.querySelector('.suggestions');

  //listen for change or key event on input field
  searchInput.addEventListener('change', displayMatches);//only fires when off the element
  searchInput.addEventListener('keyup', displayMatches);// runs when each key is pressed

  