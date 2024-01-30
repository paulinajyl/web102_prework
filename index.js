/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    for (const game of games) {

        // create a new div element, which will become the game card
        const gameCard = document.createElement('div');

        // add the class game-card to the list
        gameCard.classList.add('game-card')

        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
        gameCard.innerHTML = `${game.name} is ${game.description}. <img class="game-img" src="${game.img}" alt="${game.name}" />`;

        // append the game to the games-container
        gamesContainer.appendChild(gameCard)
    }
}
// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON);

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const tot_contributions = GAMES_JSON.reduce( (tot_backers, game) => {
    return tot_backers + game.backers;
}, 0);
console.log("Total contributions:", tot_contributions);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `${tot_contributions.toLocaleString()}`;


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

const tot_raised = GAMES_JSON.reduce( (money_raised, game) => {
    return money_raised + game.pledged;
}, 0);
console.log("Total raised:", tot_raised);

// set inner HTML using template literal
raisedCard.innerHTML = `$${tot_raised.toLocaleString()}`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

// I just got the length of the entire json file:
const tot_games = GAMES_JSON.length
console.log("Game count:", tot_games);

gamesCard.innerHTML = `${tot_games.toLocaleString()}`;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let listOfUnfunded = GAMES_JSON.filter(
        (game) => {
            return game.pledged < game.goal;
        }
    );
    console.log(listOfUnfunded);

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(listOfUnfunded);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let listOfFunded = GAMES_JSON.filter(
        (game) => {
            return game.pledged > game.goal;
        }
    );
    console.log(listOfFunded);
    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(listOfFunded);
}


// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/****************************************************************
 * *********************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator*/

// sum the number of unfunded games
const unfundedAmnt = GAMES_JSON.reduce( (tot_unfunded, game) => {
    if (game.pledged < game.goal) {
        return tot_unfunded + 1;
    } else {
        return tot_unfunded;
    }
}, 0);

// to check the amount!
console.log("Number of unfunded games:", unfundedAmnt);

// create a string that explains the number of unfunded games using the ternary operator
// I added condition for no games, only 1 game, and then for multiple games
const displayStr = `A total of $100,000 has been raised for 4 games. 
Currently ${unfundedAmnt <= 0 ? "no games remain unfunded. Amazing!" : `${unfundedAmnt} game${unfundedAmnt > 1 ? 's' : ''} 
remain unfunded. We need your help to fund these amazing games!`}`
console.log(displayStr)

// create a new DOM element containing the template string and append it to the description container
const descriptionContainer = document.getElementById("description-container");
const unfundedStr = document.createElement('p');

unfundedStr.innerHTML = displayStr;
descriptionContainer.appendChild(unfundedStr);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [firstGame, secondGame, ...restOfGames] = sortedGames;
console.log('the top 2 games:', firstGame, secondGame);
console.log('rest:', restOfGames)
// create a new element to hold the name of the top pledge game, then append it to the correct element
// do the same for the runner up item
let firstGamename = firstGame.name;
let secondGamename = secondGame.name;
firstGameContainer.appendChild(document.createTextNode(firstGamename));
secondGameContainer.appendChild(document.createTextNode(secondGamename));

console.log("first game is", firstGamename);
console.log("second game is", secondGamename);

/************************************************************************************
 * Bonus features!
 * Dark mode, from WebDev101
 * The pictures look pretty bright, so I added a dark mode toggle
 * */
let themeButton = document.getElementById("theme-button");
const toggleDarkMode = () => {
    document.body.classList.toggle("dark-mode")
};
themeButton.addEventListener("click", toggleDarkMode);

