const puzzles = [
  {
    trueCount: 1,
    statements: [
      { text: "The prize is in box A.", trueWhen: ["A"] },
      { text: "The prize is in box B.", trueWhen: ["B"] },
      { text: "The prize is in box A.", trueWhen: ["A"] },
    ],
  },
  {
    trueCount: 2,
    statements: [
      { text: "The prize is not in box A.", trueWhen: ["B", "C"] },
      { text: "The prize is in box B.", trueWhen: ["B"] },
      { text: "The prize is in box A.", trueWhen: ["A"] },
    ],
  },
  {
    trueCount: 1,
    statements: [
      { text: "The prize is in box A or box C.", trueWhen: ["A", "C"] },
      { text: "The prize is in box C.", trueWhen: ["C"] },
      { text: "The prize is in box C.", trueWhen: ["C"] },
    ],
  },
  {
    trueCount: 2,
    statements: [
      { text: "The prize is in box A or box B.", trueWhen: ["A", "B"] },
      { text: "The prize is in box A.", trueWhen: ["A"] },
      { text: "The prize is in box C.", trueWhen: ["C"] },
    ],
  },
  {
    trueCount: 1,
    statements: [
      { text: "The prize is in box A or box C.", trueWhen: ["A", "C"] },
      { text: "The prize is in box A or box B.", trueWhen: ["A", "B"] },
      { text: "The prize is in box B.", trueWhen: ["B"] },
    ],
  },
  {
    trueCount: 2,
    statements: [
      { text: "The prize is in box B or box C.", trueWhen: ["B", "C"] },
      { text: "The prize is in neither A nor B.", trueWhen: ["C"] },
      { text: "The prize is in neither B nor C.", trueWhen: ["A"] },
    ],
  },
  {
    trueCount: 1,
    statements: [
      { text: "The prize is in both A and C.", trueWhen: [] },
      { text: "The prize is not in box A.", trueWhen: ["B", "C"] },
      { text: "The prize is in box B.", trueWhen: ["B"] },
    ],
  },
  {
    trueCount: 1,
    statements: [
      { text: "The prize is in one of these three boxes.", trueWhen: ["A", "B", "C"] },
      { text: "The prize is in box A.", trueWhen: ["A"] },
      { text: "The prize is in box B.", trueWhen: ["B"] },
    ],
  },
  {
    trueCount: 2,
    statements: [
      { text: "The prize is in one of these three boxes.", trueWhen: ["A", "B", "C"] },
      { text: "The prize is in box A or box C.", trueWhen: ["A", "C"] },
      { text: "The prize is in box C.", trueWhen: ["C"] },
    ],
  },
  {
    trueCount: 1,
    statements: [
      { text: "The prize is not in the middle box.", trueWhen: ["A", "C"] },
      { text: "The prize is in one of the two boxes to the right of A.", trueWhen: ["B", "C"] },
      { text: "The prize is in the middle box.", trueWhen: ["B"] },
    ],
  },
];

const boxNames = ["A", "B", "C"];
const puzzleForm = document.querySelector("#puzzle-form");
const boxesElement = document.querySelector("#boxes");
const ruleElement = document.querySelector("#rule");
const progressElement = document.querySelector("#progress");
const feedbackElement = document.querySelector("#feedback");
const nextButton = document.querySelector("#next-button");
const checkButton = puzzleForm.querySelector(".check-button");

let puzzleIndex = 0;

function truthValues(puzzle, prizeLocation) {
  return puzzle.statements.map((statement) => statement.trueWhen.includes(prizeLocation));
}

function validSolutions(puzzle) {
  return boxNames.filter((boxName) => {
    const numberTrue = truthValues(puzzle, boxName).filter(Boolean).length;
    return numberTrue === puzzle.trueCount;
  });
}

function renderPuzzle() {
  const puzzle = puzzles[puzzleIndex];
  const truthWord = puzzle.trueCount === 1 ? "statement is" : "statements are";

  progressElement.textContent = `${puzzleIndex + 1} / ${puzzles.length}`;
  ruleElement.textContent = `Exactly ${puzzle.trueCount === 1 ? "one" : "two"} ${truthWord} true.`;
  boxesElement.replaceChildren();

  puzzle.statements.forEach((statement, index) => {
    const boxName = boxNames[index];
    const label = document.createElement("label");
    const input = document.createElement("input");
    const name = document.createElement("span");
    const text = document.createElement("span");

    label.className = "box-option";
    label.dataset.box = boxName;
    input.type = "radio";
    input.name = "box";
    input.value = boxName;
    name.className = "box-name";
    name.textContent = `Box ${boxName}`;
    text.className = "statement";
    text.textContent = `“${statement.text}”`;

    label.append(input, name, text);
    boxesElement.append(label);
  });

  feedbackElement.textContent = "";
  feedbackElement.className = "feedback";
  nextButton.hidden = true;
  checkButton.disabled = false;
}

function reasoningList(puzzle, solution) {
  const values = truthValues(puzzle, solution);
  const items = values
    .map((isTrue, index) => {
      const state = isTrue ? "True" : "False";
      const className = isTrue ? "truth" : "lie";
      return `<li>Box ${boxNames[index]}: <span class="${className}">${state}</span></li>`;
    })
    .join("");

  const truthWord = puzzle.trueCount === 1 ? "statement" : "statements";
  return `<ul class="reasoning">${items}</ul><p class="conclusion">That gives exactly ${puzzle.trueCount === 1 ? "one" : "two"} true ${truthWord}, so the prize must be in box ${solution}.</p>`;
}

function checkAnswer(event) {
  event.preventDefault();
  const selectedInput = puzzleForm.querySelector('input[name="box"]:checked');

  if (!selectedInput) {
    feedbackElement.className = "feedback error";
    feedbackElement.innerHTML = "<strong>Choose a box first.</strong>";
    return;
  }

  const puzzle = puzzles[puzzleIndex];
  const solution = validSolutions(puzzle)[0];
  const selectedBox = selectedInput.value;
  const selectedTruthCount = truthValues(puzzle, selectedBox).filter(Boolean).length;
  const isCorrect = selectedBox === solution;

  boxesElement.querySelectorAll("input").forEach((input) => {
    input.disabled = true;
  });
  boxesElement.querySelector(`[data-box="${solution}"]`).classList.add("is-correct");

  if (!isCorrect) {
    boxesElement.querySelector(`[data-box="${selectedBox}"]`).classList.add("is-incorrect");
  }

  feedbackElement.className = `feedback ${isCorrect ? "correct" : "incorrect"}`;
  feedbackElement.innerHTML = isCorrect
    ? `<strong>Correct — the prize is in box ${solution}.</strong>${reasoningList(puzzle, solution)}`
    : `<strong>Not quite.</strong><span>If the prize were in box ${selectedBox}, ${selectedTruthCount} statements would be true. The rule requires ${puzzle.trueCount}.</span>${reasoningList(puzzle, solution)}`;

  checkButton.disabled = true;
  nextButton.textContent = puzzleIndex === puzzles.length - 1 ? "Restart ↻" : "Next →";
  nextButton.hidden = false;
  nextButton.focus();
}

function goToNextPuzzle() {
  puzzleIndex = puzzleIndex === puzzles.length - 1 ? 0 : puzzleIndex + 1;
  renderPuzzle();
  puzzleForm.querySelector("input").focus();
}

puzzleForm.addEventListener("submit", checkAnswer);
nextButton.addEventListener("click", goToNextPuzzle);

renderPuzzle();
