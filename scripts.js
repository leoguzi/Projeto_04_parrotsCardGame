/*função que le o numero de cartas e verifica se é um valor válido**/
function leNumeroCartas() {
  let valido = false;
  let numero_cartas = 0;
  while (!valido) {
    numero_cartas = parseInt(prompt("Digite um número par entre 4 e 14: "));
    if (numero_cartas >= 4 && numero_cartas < 15 && numero_cartas % 2 === 0) {
      valido = true;
      alert(numero_cartas);
    }
  }
}
leNumeroCartas();

function giraCard(card) {
  card.querySelector(".back-face").classList.add("efeito-back");
  card.querySelector(".front-face").classList.add("efeito-front");
}
