const cards = document.querySelectorAll(".card");
let cardOne, cardTwo;
let disableDeck = false;
let matchedCard = 0;
let moves = 0;
let timerInterval;
let startTime;

// New Game button
const newGameBtn = document.getElementById("new-game-btn");
newGameBtn.addEventListener("click", startNewGame);

function startNewGame() {
  shuffleCard();
  resetMoves();
  resetTimer();
  hideCongratsMessage();
}

function flipCard(e) {
  let clickedCard = e.target;

  if (clickedCard !== cardOne && !disableDeck) {
    clickedCard.classList.add("flip");

    if (!cardOne) {
      cardOne = clickedCard;
      startTimer(); // Start timer when the first card is flipped
      return;
    }
    cardTwo = clickedCard;

    disableDeck = true;

    let cardOneImg = cardOne.querySelector("img").src,
      cardTwoImg = cardTwo.querySelector("img").src;
    matchCards(cardOneImg, cardTwoImg);

    incrementMoves();
  }
}

function matchCards(img1, img2) {
  if (img1 === img2) {
    matchedCard++;
    if (matchedCard == 8) {
      clearInterval(timerInterval);
      showCongratsMessage();
    }

    cardOne.removeEventListener("click", flipCard);
    cardTwo.removeEventListener("click", flipCard);
    cardOne = cardTwo = "";
    disableDeck = false;
  } else {
    setTimeout(() => {
      cardOne.classList.add("shake");
      cardTwo.classList.add("shake");
    }, 400);

    setTimeout(() => {
      cardOne.classList.remove("shake", "flip");
      cardTwo.classList.remove("shake", "flip");
      cardOne = cardTwo = "";
      disableDeck = false;
    }, 1200);
  }
}

function shuffleCard() {
  matchedCard = 0;
  cardOne = cardTwo = "";
  moves = 0;
  resetMoves();
  resetTimer();

  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
  arr.sort(() => (Math.random() > 0.5 ? 1 : -1));

  cards.forEach((card, index) => {
    card.classList.remove("flip");
    card.addEventListener("click", flipCard);

    let imgTag = card.querySelector("img");
    imgTag.src = `Assets/img-${arr[index]}.png`;
  });
}

function incrementMoves() {
  moves++;
  document.getElementById("moves").innerText = moves;
}

function resetMoves() {
  moves = 0;
  document.getElementById("moves").innerText = moves;
}

function startTimer() {
  if (!startTime) {
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000);
  }
}

function updateTimer() {
  let elapsedTime = Date.now() - startTime;
  let hours = Math.floor(elapsedTime / 3600000);
  let minutes = Math.floor((elapsedTime % 3600000) / 60000);
  let seconds = Math.floor((elapsedTime % 60000) / 1000);
  document.getElementById("timer").innerText = `${hours
    .toString()
    .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

function resetTimer() {
  clearInterval(timerInterval);
  startTime = null;
  document.getElementById("timer").innerText = "00:00:00";
}

function showCongratsMessage() {
  const congratsMsg = document.getElementById("congrats-msg");
  congratsMsg.style.display = "block";
}

function hideCongratsMessage() {
  document.getElementById("congrats-msg").style.display = "none";
}

// Start the game when the page loads
shuffleCard();
