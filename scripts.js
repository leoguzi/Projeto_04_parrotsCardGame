/*função que le o numero de cartas e verifica se é um valor válido**/
readCardsNumber();

function readCardsNumber() {
  let valid = false;
  let cards_number = 0;
  while (!valid) {
    cards_number = parseInt(prompt("Digite um número par entre 4 e 14: "));
    if (cards_number >= 4 && cards_number < 15 && cards_number % 2 === 0) {
      valid = true;
    }
  }
  startGame(cards_number);
}

function startGame(cards_number) {
  let all_cards = document.querySelectorAll(".card.hidden");
  let i = 0;
  let current_game_cards = [];

  while (i < cards_number) {
    current_game_cards[i] = all_cards[i];
    console.log(all_cards[i]);
    i++;
  }

  i = 0;

  current_game_cards.sort(comparador);

  while (i < current_game_cards.length) {
    console.log(all_cards[i]);
    all_cards[i].innerHTML = current_game_cards[i].innerHTML;
    all_cards[i].classList.remove("hidden");
    i++;
  }
}

function turnCard(card) {
  card.querySelector(".back-face").classList.add("efeito-back");
  card.querySelector(".front-face").classList.add("efeito-front");
}

function comparador() {
  return Math.random() - 0.5;
}
