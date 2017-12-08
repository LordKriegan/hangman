var inquirer = require('inquirer');
var wordObj = require('./wordObj.js');
var hangmanVisual = require('./hangmanVisual.js')

var guessWord;

function startGame() {
    guessWord = new wordObj();
    inquirer.prompt([{
        name: "gameMenu",
        type: "list",
        choices: ["Play game!", "Exit"],
        message: "What do you want to do?"
    }]).then(function (input) {
        if (input.gameMenu === "Play game!") {
            guessLet();
        } else {
            console.log("Bye!");
        }
    });
}

function guessLet() {
    if (guessWord.checkWord()) {
        console.log(guessWord.realWord)
        console.log("You got it!");
        startGame();
    } else {
        var viewStr = "";
        for (var i = 0; i < guessWord.realWord.length; i++) {
            viewStr += guessWord.viewWord[i].viewChar + " ";
        }
        console.log(viewStr + "\nGuesses left: " + guessWord.guesses);
        inquirer.prompt([{
            name: "guessLet",
            type: "input",
            message: "Guess a letter: ",
            validate: function (input) {
                if (input.length > 1 || //if length greater than 1
                    (!input.match(/[a-z]/gi)) || //check to see if its a valid letter
                    (guessWord.guessedLets.includes(input))) { //see if it was already guessed
                    return false; //if any of the above is true mark as invalid
                }
                return true; //otherwise its a valid guess
            }
        }]).then(function (input) {
            guessWord.guessedLets += input.guessLet;
            var state = guessWord.guessLet(input.guessLet); //guessLet returns true if a letter changed and false if not.
            if (!state) { //if incorrect decrement guesses
                guessWord.guesses--;
                console.log(hangmanVisual[guessWord.guesses]);
                if (guessWord.guesses <= 0) {//if out of guesses start over
                    console.log("Game over!");
                    startGame();
                } else {
                    guessLet();
                }
            } else { //otherwise move on to next letter
                guessLet();
            }
        });
    }
}

startGame();