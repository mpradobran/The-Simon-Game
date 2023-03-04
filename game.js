var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var start = false;
var level = 0;

$(document).on('keydown', function(event) {
    if (!start) {
      $("#level-title").text("Level " + level);
      nextSequence();
      start = true;
    }
  });

$(".btn").click(function(){
    if(start){
        var colorName = this.id;
        userClickedPattern.push(colorName);
        playSound(colorName);
        animatePress(colorName);    
        checkAnswer(userClickedPattern.length-1);
    }
});

function nextSequence(){
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);
  
    var randomNumber =  Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    var buttonWithColor = '#' + randomChosenColour;
    $(buttonWithColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name){
    var audio = new Audio('sounds/'+ name +'.mp3'); 
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");

    setTimeout(function () {
        $("#"+currentColour).removeClass("pressed");
      }, 100);
}

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
            nextSequence();
          }, 1000);
  
        }
  
      } else {  
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
        $("body").addClass("game-over");

        setTimeout(function () {
            $("body").removeClass("game-over");
          }, 200);
    
      } 
}

function startOver(){
    level = 0;
    gamePattern = [];
    start = false;
}