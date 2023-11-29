(function(){
    'use strict';
    console.log('reading script.js');

    // Referencing DOM Elements.
    const startGame = document.querySelector('#start-game');
    const gameControl = document.querySelector('#game-control');
    const game = document.querySelector('#game');
    const score = document.querySelector('#score');
    const actionArea = document.querySelector('#actions');

    // Declaring variables for the audio.
    const meow = new Audio('sounds/cat-meow-6226.mp3');
    const dieRolling = new Audio('sounds/rolling-dice-2-102706.mp3');

    // Objects for the game.
    const gameData = {
        dice: ['images/1die.png', 'images/2die.png', 'images/3die.png', 'images/4die.png', 'images/5die.png', 'images/6die.png'],
        players: ['Good Cat', 'Bad Cat'],
        score: [0, 0],
        roll1: 0,
        roll2: 0,
        rollSum: 0,
        index: 0,
        gameEnd: 29
    };

    // Adding an event listener to startGame. This starts by randomly setting the game index to decide,
    // which player goes first. On click, it asks if the user is a new player, if they click yes, it shows the
    // game rules, and if they click no, it goes straight to the game.
    startGame.addEventListener('click', function(){

        // Randomly set game index here.
        gameData.index = Math.round(Math.random());
        meow.play();
        gameControl.innerHTML = '<h2>Are you a new player?</h2>';
        gameControl.innerHTML += '<div id="new-player"><button id="new-yes">Yes</button><button id="new-no">No</button><button id="quit">Wanna Quit?</button></div>';


        document.getElementById('new-yes').addEventListener('click', function(){
            // Call function that gives instructions to the game.
            newPlayerRules();
        });

        document.getElementById('new-no').addEventListener('click', function(){
            // Skips instructions and goes straight to the game.
            setUpPlayer();
        });

        document.getElementById('quit').addEventListener('click', function(){
            location.reload();
        });
    });

    // Function that has the game rules. It also has a button for users to click on to play the game.
    function newPlayerRules() {
        gameControl.innerHTML = "<div id='rules'><h2 id='header-rules'>Game of Cat Rules</h2><p>There are two players playing as either the good cat personality or the bad cat personality. The player whose turn it is rolls the dice.</p><p>The total of the roll is added to the current player's score, unless either die comes up as a 'one'. If this happens, this player's turn is over, and it is the other player's turn.</p><p>After each roll, the current player can either roll again, (assuming a 'one' was not rolled) or if the current player feels that luck is running thin, they can pass to the other player. The first player to get 30 points or higher wins. However, if a player rolls two 'ones' (snake eyes), that player's current score gets zeroed out, and they have to start over, accumulating points from zero.</p><p>Good luck and have fun! :)</p><div id='lets-play-container'><button id='lets-play'>Let's Play</button></div></div>";

        document.getElementById("lets-play").addEventListener('click', function(){
            // Starts the game.
            setUpPlayer();
        });
    };


    // This function helps give a micro-animation to clearly indicate which player is going next. It is
    // an overlay that pops up and fades in a few seconds. 
    function setUpPlayer() {
        gameControl.innerHTML = `<div id="overlay"><h2 id="which-player">${gameData.players[gameData.index]} starts!</h2></div>`;

        const whichPlayer = document.querySelector('#overlay');
        setTimeout(function () {
            whichPlayer.style.transition = '0.5s';
            whichPlayer.style.opacity = '0';
            whichPlayer.style.visibility = 'hidden';
            setUpTurn();               
        }, 1500);        
    };

    // This functions sets up the turn to roll the dice. If the user clicks roll dice, it triggers the 
    // throwDice() function.
    function setUpTurn() {
        game.innerHTML = `<p class="game-main-text">Roll the dice for the <span>${gameData.players[gameData.index]}</span></p>`;
        if (gameData.players[gameData.index] === "Good Cat") {
            actionArea.innerHTML = '<div id="action-div"><img id="good-cat-img" src="images/good-cat.png"><button id="roll">Roll the Dice</button></div>';
        }
        else {
            actionArea.innerHTML = '<div id="action-div"><img id="bad-cat-img" src="images/bad-cat.png"><button id="roll">Roll the Dice</button></div>';
        }
        document.getElementById('roll').addEventListener('click', function(){
            dieRolling.play();
            throwDice();
        });
    };

    // This function is where the dice is rolled. It is also where it checks if one of the
    // dies rolled is a 1 or a snake eye. At the very end, it checks the winning condition function
    // to see if the score has already reached 30+.
    function throwDice() {
        actionArea.innerHTML = '';
        // Using ceil could result in a zero (although the chance is low), 
        // which we don't want, so we add 1.
        gameData.roll1 = Math.floor(Math.random() * 6) + 1;
        gameData.roll2 = Math.floor(Math.random() * 6) + 1;
        game.innerHTML = `<p class="game-main-text">Roll the dice for the <span>${gameData.players[gameData.index]}</span></p>`;
        game.innerHTML += `<div id="dice"><img id="first-die" src="${gameData.dice[gameData.roll1-1]}">
                            <img id="sec-die" src="${gameData.dice[gameData.roll2-1]}"></div>`;
        gameData.rollSum = gameData.roll1 + gameData.roll2;

        if (gameData.rollSum === 2) {
            // console.log("snake eyes were rolled");
            game.innerHTML += `<p id="snake-eyes">Oh snap! Snake eyes! Your score has reset, <strong>switching to ${gameData.players[gameData.index]}</strong></p>`;
            gameData.score[gameData.index] = 0;
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);
            setTimeout(setUpPlayer, 3000);
        }
        else if (gameData.roll1 === 1 || gameData.roll2 === 1) {
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);
            game.innerHTML += `<p id="one-roll">Sorry, one of your rolls was a one, <strong>switching to ${gameData.players[gameData.index]}</strong></p>`;
            setTimeout(setUpPlayer, 2500);
        }
        else {
            gameData.score[gameData.index] = gameData.score[gameData.index] + gameData.rollSum;
            actionArea.innerHTML = '<div id="roll-again-pass-buttons"><button id="roll-again">Roll again</button> <button id="pass">Pass</button></div>';
            document.getElementById('roll-again').addEventListener('click', function() {
                dieRolling.play();
                throwDice();
            });
            document.getElementById('pass').addEventListener('click', function(){
                gameData.index ? (gameData.index = 0) : (gameData.index = 1);
                setUpPlayer();
            });
            showCurrentScore();
        }

        checkWinningCondition();
    };

    // This function is where it checks if the total score of either player is 30 or more. If it is,
    // it displays who wins and the player has the option to play again. 
    function checkWinningCondition() {
        if (gameData.score[gameData.index] > gameData.gameEnd) {
            game.remove();
            score.innerHTML = `<h2><span>${gameData.players[gameData.index]}</span> wins with ${gameData.score[gameData.index]} points!</h2>`;
            if (gameData.players[gameData.index] === "Good Cat") {
                score.innerHTML += '<img id="good-cat-img" src="images/good-cat-win.png">';
            }
            else {
                score.innerHTML += '<img id="bad-cat-img" src="images/bad-cat-lose.png">';
            }
                score.innerHTML += '<button id="quit-end">Play Again</button>';
            actionArea.innerHTML = '';

            document.getElementById('quit-end').addEventListener('click', function(){
                location.reload();
            });
            }
        else {
            showCurrentScore();
        }
    };

    // This function displays the current score. This is always shown so that players could refer back to it. 
    function showCurrentScore() {
        score.innerHTML = `<div id="current-score"><p>The score is currently <strong>${gameData.players[0]}: ${gameData.score[0]}</strong> and <strong> ${gameData.players[1]}: ${gameData.score[1]}</strong></p></div>`;    
    };
})();