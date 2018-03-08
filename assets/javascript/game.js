$( document ).ready(function() {
        
        //Global variables
        let words = ["maggie", "marge", "homer", "barney", "lisa", "bart", "apu", "smithers", "moe", "millhouse", "nelson", "ralph", "krusty"];
        let wins = 0;
        let loss = 0;
        let numberOfGuesses = 6;
        let wordCounter = 0;
        //stores random word           
        let randWord = '';
        //stores the underscores
        let wordLength = [];
        //indexed input as letter
        let dashWrongGuess = [];
        //guessed letter array
        let guessedLetters = [];

        //Functions
        function gameStart() {
            //resets the neccesary variables to 0
            numberOfGuesses = 6;
            wordCounter = 0;
            wordLength = [];
            dashWrongGuess = [];
            //Holds all guessed letters.
            guessedLetters = [];

            //Assigns random word to the variable. 
            randWord = words[Math.floor(Math.random() * words.length)];

            //Pushes array word-length to the DOM as understcores 
            for (let i = 0; i < randWord.length; i++) {
                wordLength.push("_");
            }
            
            //reset the neccesary variables in the html
            document.getElementById("target-id").textContent = wordLength.join(" ");
            document.getElementById("numberOfGuesses").textContent = numberOfGuesses;
            document.getElementById("dashWrongGuess").textContent = dashWrongGuess;
            document.getElementById("win").textContent = wins;
            document.getElementById("loss").textContent = loss;
        }

 
        function winLoseCheck() {
            if (wordCounter === randWord.length) {
                wins++;
                document.getElementById('win').textContent = wins;
                document.getElementById('wooHoo').play();
                alert("You won! The character is " + randWord.charAt(0).toUpperCase() + randWord.slice(1) + ".");
                gameStart();
            } 
            else if (numberOfGuesses === 0) {
                loss++;
                document.getElementById('loss').textContent = loss;
                document.getElementById('doh').play();
                alert("You lost! The character was " + randWord.charAt(0).toUpperCase() + randWord.slice(1) + ".");
                gameStart();
            }
        }

        function letterCheck(userKey) 
        {
            //If letter is in the random word look for the letter in the index of the 
            if (randWord.indexOf(userKey) > -1) {
                for (let i = 0; i < randWord.length; i++) {
                    if(randWord[i] === userKey) {
                        wordLength[i] = userKey;
                        let wordLengthStr = (wordLength.join(" ")).toUpperCase();
                        document.getElementById("target-id").textContent = wordLengthStr;  
                        wordCounter++;
                    }
                }

            }
            //What happens if guess is wrong 
            else { 
                dashWrongGuess.push(userKey);
                dashWrongGuessStr = (dashWrongGuess.join(" ")).toUpperCase();
                numberOfGuesses--;
                document.getElementById("dashWrongGuess").textContent = dashWrongGuessStr;
                document.getElementById("numberOfGuesses").textContent = numberOfGuesses;
            }
            
            winLoseCheck();
        };

        //Events  
        gameStart();

        //Keypress event
        document.onkeyup = function(event) {
            let keyInput = event.key.toLowerCase();
            
            //If keyInput is a letter and has not been guessed already run letter check and push guessedLetter to array. 
            if ( /^[a-z]$/.test(keyInput) == true && guessedLetters.indexOf(keyInput) == -1 ) {
               letterCheck(keyInput);
               guessedLetters.push(keyInput);
            }
        }
    });