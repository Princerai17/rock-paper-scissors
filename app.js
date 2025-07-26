let userScore = 0;
let compScore = 0;
let round = 1;
const maxRounds = 5;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");
const roundTracker = document.querySelector("#round-tracker");
const historyList = document.querySelector("#history-list");
const resetBtn = document.querySelector("#reset-btn");
const playAgainBtn = document.querySelector("#play-again-btn");

const genCompChoice = () => {
  const options = ["rock", "paper", "scissors"];
  const randIdx = Math.floor(Math.random() * 3);
  return options[randIdx];
};

const updateHistory = (result) => {
  const item = document.createElement("li");
  item.textContent = `Round ${round}: ${result}`;
  historyList.prepend(item);
};

const updateScore = (userWin, userChoice, compChoice) => {
  if (userWin) {
    userScore++;
    msg.innerText = `🎉 You win! ${userChoice} beats ${compChoice}`;
    msg.style.backgroundColor = "green";
    updateHistory(`You won! (${userChoice} vs ${compChoice})`);
  } else {
    compScore++;
    msg.innerText = `😢 You lost. ${compChoice} beats ${userChoice}`;
    msg.style.backgroundColor = "red";
    updateHistory(`You lost! (${userChoice} vs ${compChoice})`);
  }
  userScorePara.innerText = userScore;
  compScorePara.innerText = compScore;
};

const drawGame = (userChoice) => {
  msg.innerText = `🤝 It's a Draw! You both chose ${userChoice}`;
  msg.style.backgroundColor = "#081b31";
  updateHistory(`Draw! (${userChoice} vs ${userChoice})`);
};

const checkGameEnd = () => {
  if (round > maxRounds) {
    msg.innerText = userScore > compScore ? "🏆 Game Over: You Win!" :
                     userScore < compScore ? "💔 Game Over: You Lose!" :
                     "🤝 Game Over: It's a Draw!";
    playAgainBtn.style.display = "inline-block";
    choices.forEach(choice => choice.style.pointerEvents = "none");
  }
};

const playGame = (userChoice) => {
  if (round > maxRounds) return;

  const compChoice = genCompChoice();
  if (userChoice === compChoice) {
    drawGame(userChoice);
  } else {
    let userWin = false;
    if (
      (userChoice === "rock" && compChoice === "scissors") ||
      (userChoice === "paper" && compChoice === "rock") ||
      (userChoice === "scissors" && compChoice === "paper")
    ) {
      userWin = true;
    }
    updateScore(userWin, userChoice, compChoice);
  }

  round++;
  roundTracker.innerText = `Round: ${Math.min(round, maxRounds)} / ${maxRounds}`;
  checkGameEnd();
};

choices.forEach(choice => {
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");
    playGame(userChoice);
  });
});

resetBtn.addEventListener("click", () => {
  userScore = 0;
  compScore = 0;
  round = 1;
  userScorePara.innerText = 0;
  compScorePara.innerText = 0;
  roundTracker.innerText = `Round: 1 / ${maxRounds}`;
  msg.innerText = "Make your move!";
  msg.style.backgroundColor = "#081b31";
  historyList.innerHTML = "";
  playAgainBtn.style.display = "none";
  choices.forEach(choice => choice.style.pointerEvents = "auto");
});

playAgainBtn.addEventListener("click", () => {
  resetBtn.click();
});
