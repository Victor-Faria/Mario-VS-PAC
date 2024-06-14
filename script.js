const character = $(".character");
const monster = $(".monster");
const bowser = $(".bowser");
const display = $("#display");
bowser.hide();
let counter = 0;
let gameStarted = false;

function jump() {
  if (gameStarted && !character.hasClass("animate")) {
    character.addClass("animate");
    setTimeout(() => character.removeClass("animate"), 500);
  }
}

let checkDead;

function startGame() {
  gameStarted = true;
  monster.addClass("animate");
  checkDead = setInterval(function () {
    const characterBottom = parseInt(character.css("bottom"));
    const monsterRight = parseInt(monster.css("right"));

    if (monsterRight < 450 && monsterRight > 430 && characterBottom <= 80) {
      monster.css("animation", "none");
      display.val("You made : " + (counter / 2) * 100 + " Points !");
      monster.hide();
      character.hide();
      bowser.show();
      clearInterval(checkDead);
      $("#display").css("opacity", "1");
    } else if (monsterRight > 450 && characterBottom > 40) {
      counter++;
      console.log(counter);
    }
  }, 100);
}

function restartgame() {
  location.reload();
}

$("#restart-btn").on("click", restartgame);

$("#dialog").dialog({
  autoOpen: false,
  modal: true,
  open: function() {
      // Show 'Get Ready!' first
      $("#countdown").text('Get Ready!');
      setTimeout(() => {
          let count = 3;
          const countdown = $("#countdown");
          const interval = setInterval(() => {
              if (count > 0) {
                  countdown.text(count);
                  count--;
              } else {
                  countdown.text('Go!');
                  clearInterval(interval);
                  setTimeout(() => {
                      $("#dialog").dialog("close");
                  }, 1000);  // Close the dialog after showing 'Go!' for 1 second
              }
          }, 1000);  // Countdown interval
      }, 1000);  // Delay before starting the countdown
  },
  close: function() {
      // Start the game here
      startGame();
      console.log("Game started!");
  }
});

$("#dialog").dialog("open");

$("body").on("click", jump);
