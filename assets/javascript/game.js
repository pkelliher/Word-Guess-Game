// Global variable
// Arrays and Variable for holding data
var wordOptions = ["trump" ,"obama", "bush", "clinton", "bush", "reagan", "carter", "ford", "nixon", "johnson"];
var selectedWord = "";
var lettersInWord = [];
var numBlanks = 0;
var blanksAndSuccesses = [];
var wrongLetters = [];

// Game counters
var winCount = 0;
var lossCount = 0;
var guessesLeft = 9;

// Functions (Reusable locks of code that I will call upon when needed)
function startGame () {
    selectedWord = wordOptions [Math.floor(Math.random() * wordOptions.length)];
    lettersInWord = selectedWord.split("");
    numBlanks = lettersInWord.length;

    // Reset game
    guessesLeft = 10;
    wrongLetters = [];
    blanksAndSuccesses = [];

    // Populate the blanks and successes with the right number of blanks
    for (var i = 0; i < numBlanks; i++){
        blanksAndSuccesses.push("_");
    }

    // Change HTML to reflectd round conditions
    document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join(" ");
    document.getElementById("numGuesses").innerHTML = guessesLeft;
    document.getElementById("winCounter").innerHTML = winCount;
    document.getElementById("lossCounter").innerHTML = lossCount;

    // Testing / Debugging
    console.log(selectedWord);
    console.log(lettersInWord);
    console.log(numBlanks);
    console.log(blanksAndSuccesses);

}

function checkLetters(letter) {
    //check if letter exsists in code at all
    var isLetterInWord = false;

    for (var i = 0; i < numBlanks; i++){
        if(selectedWord[i] == letter) {
            isLetterInWord = true;
        }
    }

    // Check where in the wod the letter exsits, then populate the array
    if(isLetterInWord) {
        for (var i = 0; i < numBlanks; i++) {
             if(selectedWord[i] == letter) {
                 blanksAndSuccesses[i] = letter;
             }
        }
    }

    // Letter wasn't found
    else {
        wrongLetters.push(letter);
        guessesLeft--
    }

    // Testing / Debugging
    console.log(blanksAndSuccesses);

}

function roundComplete() {
    console.log("Win Count: " + winCount + " | loss Count: " + lossCount + " | Guesses left " + numGuesses);

    // Update the HTML to reflect the most recenent count state
    document.getElementById("numGuesses").innerHTML = guessesLeft;
    document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join(" ");
    document.getElementById("wrongGuesses").innerHTML = wrongLetters.join(" ");


    // Check if user won
    if (lettersInWord.toString() == blanksAndSuccesses.toString()) {
        winCount++;
        alert("You won!");

        // Update the win counter in the HTML
        document.getElementById("winCounter").innerHTML = winCount;

        startGame();
    }

    // Check if user lost
    else if (guessesLeft == 0) {
        lossCount++;
        alert("You lost!");

        // Update the lost counter in the HTML
        document.getElementById("lossCounter").innerHTML = lossCount;

        startGame();
    }
}

// Main Process

// Initiates the code the first time
startGame();

// Registers key clicks

document.onkeyup = function (event) {
    var lettersGuessed = String.fromCharCode(event.keyCode).toLowerCase();
    checkLetters(lettersGuessed);
    roundComplete();
    // Testing / Debugging
    console.log(lettersGuessed);
}