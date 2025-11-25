const cells = document.querySelectorAll(".scroll-tile");

const restartBtn = document.getElementById("restart-btn");

let options = ["", "", "", "", "", "", "", "", ""];

let end = false;

let statusText = document.getElementById("status-text");

cells.forEach((t) => t.classList.add("disabled"));

whoStarts();

cells.forEach(function (cell) {
  cell.addEventListener("click", function () {
    const index = cell.getAttribute("data-index");

    if (options[index] == "") {
      options[index] = "X";

      cell.innerText = "X";
      cell.classList.add("mark-x");

      console.log("X gedrückt an " + [index] + " " + options);
      checkResult();
      computerTurn(cell);
    }
  });
});

restartBtn.addEventListener("click", function () {
  resetGame();
});

function computerTurn(cell) {
  checkResult();

  if (end == true || !options.includes("")) {
    return;
  }

  let randomO = Math.floor(Math.random() * 9);
  if (options[randomO] == "") {
    options[randomO] = "O";
    cells[randomO].innerText = "O";
    cells[randomO].classList.add("mark-o");
    console.log(options);

    checkResult();
  } else {
    computerTurn(cell);
  }

  //if (options[randomO] == "X") {
  //computerTurn();
}

function checkResult() {
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // Wir gehen jeden der 8 Zettel durch
  for (let condition of winConditions) {
    // Schritt 1: Die Adressen vom Zettel holen
    const indexA = condition[0];
    const indexB = condition[1];
    const indexC = condition[2];

    // Schritt 2: Nachschauen, was auf dem Spielfeld an diesen Adressen steht
    const valA = options[indexA]; // z.B. "X"
    const valB = options[indexB]; // z.B. "X"
    const valC = options[indexC]; // z.B. "" (leer)

    // Schritt 3: Dein IF-Check
    // Was muss erfüllt sein?
    // 1. valA darf nicht leer sein ("")
    // 2. valA muss gleich valB sein
    // 3. valB muss gleich valC sein

    if (valA != "" && valA == valB && valB == valC) {
      // Gewonnen!

      end = true;

      cells.forEach((t) => t.classList.add("disabled"));

      console.log(valA + " hat gewonnen!");
      if (valA == "X") {
        statusText.textContent =
          "Arrgh! Du hast den Schatz geborgen, Käpt'n! 💰";
        statusText.classList.add("status-win");
      } else if (valB == "O") {
        statusText.textContent = "Ab über die Planke mit dir, du Landratte! 🦈";
        statusText.classList.add("status-lose");
      }
    }
  }
  if (options.includes("") == false) {
    end = true;
    cells.forEach((t) => t.classList.add("disabled"));
    console.log("Unentschieden");
    statusText.textContent =
      "Beim Klabautermann! Das Pulver ist verschossen. (Remis) 💣";
    statusText.classList.add("status-draw");
  }
}
function resetGame() {
  statusText.textContent = "Ahoi! Spieler X beginnt.";
  options = ["", "", "", "", "", "", "", "", ""];
  end = false;

  // Hier sauber durch ALLE Zellen gehen und aufräumen
  statusText.className = "";
  cells.forEach(function (c) {
    c.innerText = "";
    c.classList.remove("mark-x");
    c.classList.remove("mark-o");
  });

  whoStarts();
}

function whoStarts() {
  const choices = ["player", "computer"];

  const randomIndex = Math.floor(Math.random() * choices.length);

  console.log(choices[randomIndex]);

  cells.forEach((t) => t.classList.remove("disabled"));
  if (choices[randomIndex] == "computer") {
    statusText.textContent = "Ahoi! Computer O beginnt.";
    computerTurn();
  }
}
