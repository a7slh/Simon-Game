let userClickedPattern = [];

let gamePattern = [];

let level = 0;
let started = false;

$(document).keydown(function () {
  if (started === false) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

let buttonColors = ["red", "blue", "green", "yellow"];

function nextSequence() {
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  let randomNumber = Math.floor(Math.random() * 4); //random number (0-3).

  let randomChosenColor = buttonColors[randomNumber]; //get a random button color and push it to game pattern array.
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100); // flash animation to buttons.

  playSound(randomChosenColor);
}

$(".btn").click(function () {
  //click event listener that returns the id of the clicked button.
  let userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);

  playSound(userChosenColor); //sound to the clicked button.
  animatePress(userChosenColor); //animation to the clicked button.
});

function playSound(name) {
  const sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");

    playSound("wrong");

    $("body").addClass("game-over");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
