function generateWinningNumber() {
    return Math.floor(Math.random() * 100 + 1);
}

function shuffle(arr) {
    var end = arr.length;
    var i = 0;
    var temp = 0;
   //While there remains elements to shuffle
    while(end) {

        //picks a random number to represent element in array and assigns it to i
        i = Math.floor(Math.random() * end--);

       //swaps that element with the last element in array
       //this works because we are decrementing each time so last element not included in next possible search
        temp = arr[end];
        arr[end] = arr[i];
        arr[i] = temp;
    }
    return arr;
}

function Game() {
    this.playersGuess = null;
    this.winningNumber = generateWinningNumber();
    this.pastGuesses = [];
    this.hasWon = false;
    this.guessCount = 0;
}

Game.prototype.difference = function() {
    return Math.abs(this.playersGuess - this.winningNumber);
}

Game.prototype.isLower = function() {
    return (this.playersGuess < this.winningNumber);
}

Game.prototype.playersGuessSubmission = function(num) {
    if(num < 1 || num > 100 || isNaN(num)) {
        $('#subtitle').text('That is an invalid guess dork!');
        $('#title').text('');
        throw 'That is an invalid guess.';
    }
    this.playersGuess = num;
    return this.checkGuess();
}

Game.prototype.checkGuess = function() {
    this.guessCount++;
    if(this.playersGuess === this.winningNumber) {
        $('#hint, #submit').prop("disabled",true);
        $('#subtitle').text("You are Lucky today! Press the Reset button to play again!");
        this.hasWon = true;
        return 'You Win!';
    } else if (this.pastGuesses.indexOf(this.playersGuess) > -1) {
        return 'You have already guessed that number.';
    } else {
        this.pastGuesses.push(this.playersGuess);
        $('#guess-list li:nth-child('+ this.pastGuesses.length +')').text(this.playersGuess);
        if(this.pastGuesses.length === 5) {
            $('#hint, #submit').prop('disabled',true);
            $('#subtitle').text('Press the Reset button to play again!');
            return 'You Lose.';
        } else {
            if(this.isLower()) {
                $('#subtitle').text('Guess Higher!');
            } else {
                $('#subtitle').text('Guess Lower!');
            }
            if(this.difference() < 10) {
                $('#guess' + this.guessCount).css('color','red');
                return "You\'re burning up!";
            } else if(this.difference() < 25) {
                $('#guess' + this.guessCount).css('color','orange');
                return "You\'re lukewarm.";
            } else if(this.difference() < 50) {
                $('#guess' + this.guessCount).css('color','purple');
                return "You\'re a bit chilly.";
            } else {
                $('#guess' + this.guessCount).css('color','blue');
                return "You\'re ice cold!";
            }
        }
    }
}




function newGame() {
    return new Game();
}

Game.prototype.provideHint = function() {
    var num1 = generateWinningNumber();
    var num2 = generateWinningNumber();
    var arr = [num1,num2,this.winningNumber];
    return shuffle(arr);
}

function makeAGuess(game) {
    var guess = $('#players-input').val();
    $('#players-input').val("");
    var output = game.playersGuessSubmission(parseInt(guess,10));
    $('#title').text(output);
}

$(document).ready(function() {

    
    var game = new Game;

    $('#submit').on('click', function(e) {
        makeAGuess(game);
    });

    $('#players-input').keypress(function(event) {
        if (event.which === 13) {
            makeAGuess(game);
        }
    });

    $('#hint').click(function() {
        var hints = game.provideHint();
        $('#title').text('The winning number is '+hints[0]+', '+hints[1]+', or '+hints[2]);
        $('#hint').prop('disabled',true);
    });

    $('#reset').click(function() {
        $('#title').text('Guessing Game?!?');
        if(game.hasWon) {
            $('#subtitle').text('Test your luck on a number between 1-100, get it right and you might want to go buy a lotto ticket!');
        } else if(!game.hasWon) {
            $('#subtitle').text('Failure is not an option for you I see, try again. xD');
        }
        $('.guess').text('-');
        $('#guess1').css('color','white');
        $('#guess2').css('color','white');
        $('#guess3').css('color','white');
        $('#guess4').css('color','white');
        $('#guess5').css('color','white');
        $('#hint, #submit').prop("disabled",false);
        game = newGame();
    })
    $('')
});































