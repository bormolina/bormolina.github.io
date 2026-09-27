const totalCircles = 12;
const clock = document.getElementById("clock");
const connections = document.getElementById("connections");
const turn = document.getElementById("turn");
const selectionMessage = document.getElementById("selection");
const removeButton = document.getElementById("remove-button");
const clearButton = document.getElementById("clear-button");
const restartButton = document.getElementById("restart-button");
const lastMove = document.getElementById("last-move");
const circles = [];
const edges = [];
let remaining = Array(totalCircles).fill(true);
let selected = [];
let player = 1;
let winner = null;

const hour = (index) => index === 0 ? 12 : index;
const position = (index) => {
  const angle = index * 2 * Math.PI / totalCircles;
  return { x: 50 + 38 * Math.sin(angle), y: 50 - 38 * Math.cos(angle) };
};

function isLegalMove(indices) {
  if (winner !== null || indices.length < 1 || indices.length > 2) return false;
  if (indices.some((index) => !Number.isInteger(index) || !remaining[index])) return false;
  if (indices.length === 1) return true;
  // Original clock neighbours only: removing circles never creates new edges.
  const distance = Math.abs(indices[0] - indices[1]);
  return distance === 1 || distance === totalCircles - 1;
}

function renderSelection() {
  circles.forEach((button, index) => button.setAttribute("aria-pressed", String(selected.includes(index))));
  removeButton.disabled = !isLegalMove(selected);
  clearButton.disabled = selected.length === 0 || winner !== null;
  selectionMessage.className = "selection";
  if (winner !== null) {
    selectionMessage.textContent = "Game over. Restart to play again.";
  } else if (selected.length === 0) {
    selectionMessage.textContent = `Player ${player}: select one circle or two connected circles.`;
  } else {
    const names = selected.map(hour).join(" and ");
    selectionMessage.textContent = selected.length === 1
      ? `Player ${player} selected circle ${names}. Remove it or add a connected neighbour.`
      : `Player ${player} selected circles ${names}. Confirm to remove both.`;
  }
}

function selectCircle(index) {
  if (winner !== null || !remaining[index]) return;
  if (selected.includes(index)) {
    selected = selected.filter((value) => value !== index);
  } else {
    const candidate = [...selected, index];
    if (!isLegalMove(candidate)) {
      selectionMessage.className = "selection is-error";
      selectionMessage.textContent = selected.length === 2
        ? `Player ${player}: you can only remove one or two circles per turn. Deselect one to change your selection.`
        : `Player ${player}: those circles are not joined by a line. Choose a connected neighbour or clear your selection.`;
      return;
    }
    selected = candidate;
  }
  renderSelection();
}

function renderBoard() {
  const count = remaining.filter(Boolean).length;
  circles.forEach((button, index) => {
    button.hidden = !remaining[index];
    button.disabled = !remaining[index] || winner !== null;
  });
  edges.forEach((line, index) => {
    line.style.display = remaining[index] && remaining[(index + 1) % totalCircles] ? "" : "none";
  });
  document.getElementById("remaining-count").textContent = count;
  document.getElementById("remaining-label").textContent = count === 1 ? "circle remaining" : "circles remaining";
  document.getElementById("game").dataset.player = player;
  for (const number of [1, 2]) {
    const active = winner === null && player === number;
    document.getElementById(`player-${number}`).classList.toggle("is-active", active);
    document.getElementById(`player-${number}`).classList.toggle("is-winner", winner === number);
    document.getElementById(`player-${number}-state`).textContent = winner !== null
      ? (winner === number ? "Winner" : "Game over")
      : (active ? "Your turn" : "Waiting");
  }
  removeButton.textContent = winner === null ? `Player ${player}: remove selection` : "Game over";
  turn.classList.toggle("is-winner", winner !== null);
  turn.textContent = winner === null
    ? `Player ${player}'s turn · ${count} ${count === 1 ? "circle remaining" : "circles remaining"}`
    : `Player ${winner} wins! They removed the last circle.`;
  renderSelection();
}

function removeSelected() {
  if (!isLegalMove(selected)) return;
  lastMove.textContent = `Player ${player} removed ${selected.length === 1 ? "circle" : "circles"} ${selected.map(hour).join(" and ")}.`;
  selected.forEach((index) => { remaining[index] = false; });
  selected = [];
  if (remaining.every((value) => !value)) winner = player;
  else player = player === 1 ? 2 : 1;
  renderBoard();
  if (winner !== null) restartButton.focus();
  else circles[remaining.findIndex(Boolean)].focus();
}

function restartGame() {
  remaining = Array(totalCircles).fill(true);
  selected = [];
  player = 1;
  winner = null;
  lastMove.textContent = "Player 1 starts the game.";
  renderBoard();
}

for (let index = 0; index < totalCircles; index++) {
  const start = position(index);
  const end = position((index + 1) % totalCircles);
  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  for (const [name, value] of Object.entries({ x1: start.x, y1: start.y, x2: end.x, y2: end.y })) {
    line.setAttribute(name, value);
  }
  connections.append(line);
  edges.push(line);

  const button = document.createElement("button");
  button.type = "button";
  button.className = "circle";
  button.textContent = hour(index);
  button.setAttribute("aria-label", `Circle at ${hour(index)} o'clock`);
  button.setAttribute("aria-pressed", "false");
  button.style.left = `${start.x}%`;
  button.style.top = `${start.y}%`;
  button.addEventListener("click", () => selectCircle(index));
  clock.append(button);
  circles.push(button);
}

removeButton.addEventListener("click", removeSelected);
clearButton.addEventListener("click", () => { selected = []; renderSelection(); });
restartButton.addEventListener("click", () => { restartGame(); circles[0].focus(); });
restartGame();
