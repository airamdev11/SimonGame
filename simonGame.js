var buttonColors = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userClickedPattern = [];
var initialized = false;
var level = 0;

$(".btn").click(function () {
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    animatePress(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);

});


$(document).keydown(function () {
    if (!initialized) {
        nextSequence();
        initialized = true;
    }
    else {
        nextSequence();
    }
})


function nextSequence() {
    userClickedPattern = [];
        $("h1").text("Level: " + level);
    
    level++;
    let randonNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randonNumber];

    gamePattern.push(randomChosenColor);
    console.log(gamePattern);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(500);
    playSound(randomChosenColor);
    

}

function playSound(name) {
    var audio = new Audio();
    audio.src = "sounds/" + name + ".mp3"
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass('pressed');
    }, 100);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("Success");
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(nextSequence, 1500);
        }
    }
    else {
	console.log("Wrong");
	if(level === 0){
		alert("You need press a key");
	}
else{
        console.log("Wrong");
	let audio = new Audio("sounds/wrong.mp3");
	audio.play();
        gamePattern= [];
        userClickedPattern = [];
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass('game-over');
        }, 500);
        setTimeout(function () {
            $("h1").text("Game Over, Press Any Key to Restart");
        }, 500);
        setTimeout(function () {
            alert("Resultado: "+ (level-1));
            level = 0;
        }, 500);
    }
}
}