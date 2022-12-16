buttonColors = ["red", "blue", "green", "yellow"];
gamePattern = []
userClickedPattern = [];
var level = 0;
var clicked = true;
$("body").on("keypress", function(event) {
  if (event.key == "a" && clicked == true) {
    gamePattern.length = 0;
    nextSequence();
    clicked = false;
  }
});

function nextSequence() {
  userClickedPattern.length = 0;
  level++;
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(4 * Math.random());
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);




  $("#" + randomChosenColor).fadeOut(50).fadeIn(50);
  playSound(randomChosenColor);

  $(".btn").unbind().on("click", function() {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);

  });
}

function playSound(name) {
  var buttonAudio = new Audio("sounds/" + name + ".mp3");
  buttonAudio.play();

}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");

  }, 100);

}

function checkAnswer(currentlevel) {
  if (userClickedPattern[currentlevel] == gamePattern[currentlevel]) {
    console.log("Success");
  } else {
    // console.log("Failure");
    var wrongAudio = new Audio("sounds/wrong.mp3");
    wrongAudio.play();
    $("body").addClass("game-over");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press A to Restart");
    userClickedPattern.length = 0;

    clicked = true;
    level = 0;
  }
  if (userClickedPattern.length == gamePattern.length) {
    setTimeout(function() {
      nextSequence();
    }, 1000);
  }

}
