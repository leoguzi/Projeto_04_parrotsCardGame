/* this variable holds the card that was turned in the first move of a round*/
let previous_card = null;
/* this variable holds the number of moves of the current game.*/
let moves_number = 0;
/* this variable holds the number os moves that are already turned in the current game*/
let pairs_turned = 0;
/* this variable holds the number os pairs of the current game*/
let pairs_number = 0;

let current_timer = null;

readCardsNumber();
/*this function asks and validates the data for starting the game*/
function readCardsNumber() {
  let valid = false;
  let cards_number = 0;
  while (!valid) {
    cards_number = parseInt(prompt("Digite um número par entre 4 e 14: "));
    if (cards_number >= 4 && cards_number < 15 && cards_number % 2 === 0) {
      valid = true;
    }
  }
  pairs_number = cards_number / 2;
  startGame(cards_number);
}
/*this function creates the cards based on the parrots 
source and the number of cards choosen by the user*/
function startGame(cards_number) {
  const container = document.querySelector(".container-cards");
  let parrots_source = [
    "assets/bobrossparrot.gif",
    "assets/explodyparrot.gif",
    "assets/fiestaparrot.gif",
    "assets/unicornparrot.gif",
    "assets/metalparrot.gif",
    "assets/tripletsparrot.gif",
    "assets/revertitparrot.gif",
  ];
  /*shuffles the parrots source array every time a new game starts*/
  parrots_source.sort(comp);

  let current_game = [];

  for (i = 0; i < cards_number / 2; i++) {
    /*adds 2 equal parrots to the current game array*/
    current_game.push(parrots_source[i]);
    current_game.push(parrots_source[i]);
  }
  /*shuffles the current game array*/
  current_game.sort(comp);

  /*creates 1 card for each item in the current_game array*/
  for (i = 0; i < current_game.length; i++) {
    container.innerHTML += `<div class="card" onclick="move(this)">
                          <div class="front-face face">
                            <img src="assets/front.png" alt="back-parrot" />
                          </div>
                          <div class="back-face face">
                            <img src="${current_game[i]}" alt="Random Parrot Card" />
                          </div>
                        </div>`;
  }
  startTimer();
}
/*actions performed for every move in the game*/
function move(card) {
  /*increment the number of moves for the current game*/
  moves_number++;
  /*css classes for the turning animation*/
  /* turns the card only if it is not turned yet*/
  if (
    !card.querySelector(".back-face").classList.contains("efeito-back") &&
    !card.querySelector(".front-face").classList.contains("efeito-front")
  ) {
    card.querySelector(".back-face").classList.add("efeito-back");
    card.querySelector(".front-face").classList.add("efeito-front");
  }
  /* if there is a previous card, compares it with the current one*/
  if (previous_card) {
    /*if they are diferent, turn them back after 1 sec*/
    if (
      previous_card.querySelector(".back-face.face img").getAttribute("src") !==
      card.querySelector(".back-face.face img").getAttribute("src")
    ) {
      setTimeout(turnCardsBack, 1000, card);
    } else {
      /*if they are equal, clear the previous card preparing to the next move, but don't turn them back */
      previous_card = null;
      pairs_turned++;
      /*check if the game has ended and show the alert case it's true*/
      if (pairs_turned === pairs_number) {
        const final_time = document.querySelector(".timer").innerHTML;
        setTimeout(
          alert,
          1000,
          `Você venceu em ${moves_number} jogadas e levou ${final_time} segundos!`
        );
        clearInterval(current_timer);
      }
    }
  } else {
    /* if it is the first card of the row sets it as the previous card for the next moove.*/
    previous_card = card;
  }
}
/* this function turns the cards back when they are not equal*/
function turnCardsBack(card) {
  card.querySelector(".back-face").classList.remove("efeito-back");
  card.querySelector(".front-face").classList.remove("efeito-front");
  previous_card.querySelector(".back-face").classList.remove("efeito-back");
  previous_card.querySelector(".front-face").classList.remove("efeito-front");
  /*resets the previous card, preparing for the next move*/
  previous_card = null;
}

function startTimer() {
  const timer = document.querySelector(".timer");
  let tempo = 0;
  current_timer = setInterval(function () {
    tempo++;
    timer.innerHTML = tempo;
  }, 1000);
}

function comp() {
  return Math.random() - 0.5;
}
