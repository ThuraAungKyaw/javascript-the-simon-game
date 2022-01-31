
var buttons = ["blue", "red", "green", "yellow"]
var gamePattern = []
var userClickedPattern = []
var gameStarted = false
var level = 0

// Listener to keep watch of key presses to start the game
$(document).keydown(function(event){
  if(!gameStarted) {
    gameStarted = true
    nextSequence()
  }
})

function nextSequence() {
  // Generate a random number with JS Built-in function
  let rand = Math.random();

  // Get a random number between 0 and 3
  let randNum = Math.floor(Math.random() * 4);

  // Play sound and animate for the next sequence
  playSound(buttons[randNum])
  animatePress(buttons[randNum])

  // Add the new sequence to the game pattern
  gamePattern.push(buttons[randNum])

  // Increases level
  level += 1;

  // Update h1 with a new level number
  $("#level-title").html("Level " + level)

}

function restart() {
  // Reset game variables to the initial state
  gameStarted = false;
  gamePattern = []
  userClickedPattern = []
  level = 0
}

function playSound(key) {
  // Play sound according to the passed color key
  var audio = new Audio("./sounds/" + key + ".mp3")
  audio.play()
}

function checkAnswer(currentLevel) {
  // Check if the last user and game pattern are the same
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    // Check to see if the user has completed the current sequence
    if(userClickedPattern.length === gamePattern.length) {
      // Wait 1000 miliseconds to show the next sequence
      setTimeout(function() {
        nextSequence()
        // Clear user clicked pattern for the next round
        userClickedPattern = []
    }, 1000)

    }
  } else {
    // Make visual changes to let the gamer know the game is over
    playSound("wrong")
    $("body").addClass("game-over")
    setTimeout(function() {
      $("body").removeClass("game-over")
    }, 200)

    $("#level-title").html("Game Over, Press Any Key to Restart")
    restart()
  }
}

function animatePress(key) {
  // Perform animations on the button based on the passed color key
  $("#" + key).fadeOut(100).fadeIn(100);
  $("#" + key).addClass("pressed")
  setTimeout(function() {
  $("#" + key).removeClass("pressed")
}, 100)
}

// Hook the buttons with respective listener functions
for(let i=0; i<buttons.length;i++){

  $("#" + buttons[i]).click(function() {
    // Define what to do once the button is clicked
    playSound(buttons[i])
    animatePress(buttons[i])
    userClickedPattern.push(buttons[i])


    checkAnswer(userClickedPattern.length-1)
  })

}
