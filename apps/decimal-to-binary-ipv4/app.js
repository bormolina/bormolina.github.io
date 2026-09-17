const placeValues = [128, 64, 32, 16, 8, 4, 2, 1];

const decimalElement = document.querySelector("#decimal-number");
const weightsElement = document.querySelector("#weights");
const solutionBitsElement = document.querySelector("#solution-bits");
const answerForm = document.querySelector("#answer-form");
const answerInput = document.querySelector("#answer");
const feedbackElement = document.querySelector("#feedback");
const nextButton = document.querySelector("#next-button");

let decimalValue = 0;
let binaryValue = "";

function randomIPv4Value() {
  return Math.floor(Math.random() * 256);
}

function renderPlaceValues() {
  weightsElement.replaceChildren();
  solutionBitsElement.replaceChildren();

  placeValues.forEach((value) => {
    const weight = document.createElement("span");
    const bit = document.createElement("span");

    weight.className = "weight";
    weight.textContent = value;
    bit.className = "solution-bit";

    weightsElement.append(weight);
    solutionBitsElement.append(bit);
  });
}

function createExercise() {
  decimalValue = randomIPv4Value();
  binaryValue = decimalValue.toString(2).padStart(8, "0");

  decimalElement.textContent = decimalValue;
  decimalElement.setAttribute("aria-label", `Decimal number ${decimalValue}`);
  renderPlaceValues();

  answerForm.reset();
  answerInput.disabled = false;
  answerForm.querySelector("button").disabled = false;
  solutionBitsElement.setAttribute("aria-hidden", "true");
  feedbackElement.textContent = "";
  feedbackElement.className = "feedback";
  nextButton.hidden = true;
  answerInput.focus();
}

function revealSolution() {
  const selectedValues = [];
  const weights = weightsElement.querySelectorAll(".weight");
  const bits = solutionBitsElement.querySelectorAll(".solution-bit");

  [...binaryValue].forEach((bit, index) => {
    bits[index].textContent = bit;

    if (bit === "1") {
      weights[index].classList.add("active");
      selectedValues.push(placeValues[index]);
    }
  });

  solutionBitsElement.removeAttribute("aria-hidden");
  const addition = selectedValues.length ? selectedValues.join(" + ") : "0";
  return `${decimalValue} = ${addition} = ${binaryValue}`;
}

function checkAnswer(event) {
  event.preventDefault();
  const submittedAnswer = answerInput.value.replaceAll(" ", "");

  if (!/^[01]{8}$/.test(submittedAnswer)) {
    feedbackElement.className = "feedback incorrect";
    feedbackElement.innerHTML = "<strong>Use exactly eight bits.</strong>Enter eight 0s and 1s, for example 10010110.";
    answerInput.focus();
    return;
  }

  const isCorrect = submittedAnswer === binaryValue;
  const equation = revealSolution();

  feedbackElement.className = `feedback ${isCorrect ? "correct" : "incorrect"}`;
  feedbackElement.innerHTML = isCorrect
    ? `<strong>Correct!</strong><span class="equation">${equation}</span>`
    : `<strong>Not quite. This is the correct conversion:</strong><span class="equation">${equation}</span>`;

  answerInput.disabled = true;
  answerForm.querySelector("button").disabled = true;
  nextButton.hidden = false;
  nextButton.focus();
}

answerForm.addEventListener("submit", checkAnswer);
nextButton.addEventListener("click", createExercise);

createExercise();
