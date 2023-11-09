"use strict";
function getComputerChoice(choices = ["rock", "paper", "scissors"]) {
  const index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

function getUserChoice(e) {
  const element = e.target.outerHTML;
  if (element.includes('class="buttons"')) return "";
  const userPlay = element.includes("fa-hand-peace")
    ? mapSignChoice["fa-hand-peace"]
    : element.includes("fa-hand-rock")
    ? mapSignChoice["fa-hand-rock"]
    : mapSignChoice["fa-hand-paper"];
  return userPlay;
}

function playRound(player, computer) {
  if (player === computer) return "";

  let loser;
  switch (player) {
    case "rock":
      loser = computer !== "paper" ? "Computer" : "You";
      break;
    case "paper":
      loser = computer !== "scissors" ? "Computer" : "You";
      break;
    default:
      loser = computer !== "rock" ? "Computer" : "You";
  }
  return loser;
}

function updateScreen(userPlay, computerPlay, round) {
  switch (round) {
    case "You":
      computerPoints++;
      scoreBanner.info.textContent = "Computer Win!";
      scoreBanner.message.textContent = `${computerPlay} defeat ${userPlay}`;
      break;
    case "Computer":
      userPoints++;
      scoreBanner.info.textContent = "You Win!";
      scoreBanner.message.textContent = `${userPlay} defeat ${computerPlay}`;
      break;
    default:
      scoreBanner.info.textContent = "It is a Draw!";
      scoreBanner.message.textContent = `${userPlay} vs ${computerPlay}`;
  }

  scoreBoxPlayer.round.innerHTML = mapChoiceSign[userPlay];
  scoreBoxPlayer.score.textContent = `Player: ${userPoints}`;

  scoreBoxComputer.round.innerHTML = mapChoiceSign[computerPlay];
  scoreBoxComputer.score.textContent = `Computer: ${computerPoints}`;
}

function updateFooter() {
  const footer = document.querySelector("footer");
  const paragraph = document.createElement("p");
  paragraph.textContent = `Copyright © ${new Date().getFullYear()} cramirez`;

  const anchor = document.createElement("a");
  anchor.setAttribute("href", "https://github.com/cramirez16");
  anchor.setAttribute("target", "_blank");

  const githubIcon = document.createElement("i");
  githubIcon.setAttribute("class", "fab fa-github");
  githubIcon.setAttribute("aria-hidden", "true");

  anchor.appendChild(githubIcon);
  footer.appendChild(paragraph);
  footer.appendChild(anchor);
}

let computerPoints = 0;
let userPoints = 0;
let round;

const scoreBanner = {
  info: document.querySelector(".score-info"),
  message: document.querySelector(".score-message"),
};

const scoreBoxPlayer = {
  round: document.querySelector("#player>.round"),
  score: document.querySelector("#player>.score"),
};

const scoreBoxComputer = {
  round: document.querySelector("#computer>.round"),
  score: document.querySelector("#computer>.score"),
};

const mapSignChoice = {
  "fa-hand-peace": "scissors",
  "fa-hand-paper": "paper",
  "fa-hand-rock": "rock",
};

const mapChoiceSign = {
  rock: '<i class="fas fa-hand-rock"></i>',
  paper: '<i class="fas fa-hand-paper"></i>',
  scissors: '<i class="fas fa-hand-peace"></i>',
};

const buttons = document.querySelector(".buttons");

const buttonsCallBack = (e) => {
  const userPlay = getUserChoice(e);
  if (userPlay === "") return;
  const computerPlay = getComputerChoice();

  round = playRound(userPlay, computerPlay);

  updateScreen(userPlay, computerPlay, round);

  if (userPoints === 5 || computerPoints === 5) {
    endGame();
    scoreBanner.message.textContent = ``;
  }
};

function game() {
  updateFooter();
  buttons.addEventListener("click", buttonsCallBack);
}

function endGame() {
  buttons.removeEventListener("click", buttonsCallBack);
}

game();
