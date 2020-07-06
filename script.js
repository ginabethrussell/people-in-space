
const astronautDataSource = 'http://api.open-notify.org/astros.json';
const astronauts = {};

fetch(astronautDataSource)
.then(response => response.json())
.then(data => astronauts.data = (data));

// Update html to show selected astronaut info
function displayAstronautInfo(selectedAstronaut){
    // Create capitalized full name from selectedAstronaut string
    let nameOfAstronautArr = selectedAstronaut.split(' ');
    let fullName = nameOfAstronautArr[0][0].toUpperCase() + nameOfAstronautArr[0].slice(1,) + " " + 
    nameOfAstronautArr[1][0].toUpperCase() + nameOfAstronautArr[1].slice(1,);
    document.querySelector('#user-mess').textContent = `Show me more about ${fullName}!`
}

function findMatches(wordToMatch, namesToMatchArr) {
    return namesToMatchArr.filter(name => {
    const regex = new RegExp(wordToMatch, 'gi');
    return name.match(regex);
     });
}  
  
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
    const matchArray = findMatches(this.value, namesToMatchArr);

    const html = matchArray.map(name => {
        const regex = new RegExp(this.value,'gi');
        const astroName = name.replace(regex,`<span class="hl">${this.value}</span>` );
        return `
            <li>
                <span class="name">${astroName}</span>
            </li>
        `;
    }).join('');
    suggestions.innerHTML = html; 
  }
 
  const searchInput = document.querySelector('.search');
  const suggestions = document.querySelector('.suggestions');
  
  searchInput.addEventListener('change', displayMatches);
  searchInput.addEventListener('keyup', displayMatches);

