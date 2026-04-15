const cards = [
  { src: "1-cutout.png", scale: 1, rare: false },
  { src: "2-cutout.png", scale: 1, rare: false },
  { src: "3-cutout.png", scale: 1, rare: false },
  { src: "4-cutout.png", scale: 0.92, rare: false },
  { src: "5-cutout.png", scale: 1, rare: false },
  { src: "6-cutout.png", scale: 1, rare: false },
  { src: "7-cutout.png", scale: 1, rare: true },
];

const boosterScreen = document.querySelector("[data-booster-screen]");
const cardsScreen = document.querySelector("[data-cards-screen]");
const booster = document.querySelector("[data-booster]");
const deck = document.querySelector("[data-deck]");
const activeCard = document.querySelector("[data-active-card]");
const nextCard = document.querySelector("[data-next-card]");
const cardCount = document.querySelector("[data-card-count]");
const hint = document.querySelector("[data-hint]");

let currentCard = 0;
let isOpening = false;
let isSliding = false;

function revealCards() {
  boosterScreen.classList.add("is-hidden");
  cardsScreen.classList.add("is-visible");
  cardsScreen.setAttribute("aria-hidden", "false");
  activeCard.classList.add("card--revealed");
}

function openBooster() {
  if (isOpening) return;

  isOpening = true;
  booster.classList.add("is-opening");
  hint.textContent = "Abrindo...";
  booster.setAttribute("disabled", "true");

  window.setTimeout(revealCards, 940);
}

function updateCounter() {
  cardCount.textContent = `${currentCard + 1} / ${cards.length}`;
}

function setCardImage(image, index) {
  const card = cards[index];

  image.src = `./${card.src}`;
  image.alt = `Carta ${index + 1}`;
  image.style.setProperty("--card-scale", card.scale);
  image.classList.toggle("card--rare", card.rare);
}

function showNextCard() {
  if (isSliding) return;

  isSliding = true;
  const nextIndex = (currentCard + 1) % cards.length;

  setCardImage(nextCard, nextIndex);
  nextCard.classList.add("is-entering");
  activeCard.classList.remove("is-rare-reveal");
  activeCard.classList.add("is-leaving");
  deck.classList.toggle("deck--rare", cards[nextIndex].rare);

  window.setTimeout(() => {
    currentCard = nextIndex;
    setCardImage(activeCard, currentCard);
    activeCard.classList.remove("is-leaving", "card--revealed", "is-rare-reveal");
    nextCard.classList.remove("is-entering");

    if (cards[currentCard].rare) {
      activeCard.classList.add("is-rare-reveal");
    }

    updateCounter();
    isSliding = false;
  }, 520);
}

setCardImage(activeCard, 0);
setCardImage(nextCard, 1);
deck.classList.toggle("deck--rare", cards[currentCard].rare);
updateCounter();

booster.addEventListener("click", openBooster);
deck.addEventListener("click", showNextCard);
