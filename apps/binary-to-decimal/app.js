const bitsContainer = document.querySelector("#bits");
const sumElement = document.querySelector("#sum");
const answerForm = document.querySelector("#answer-form");
const answerInput = document.querySelector("#answer");
const feedback = document.querySelector("#feedback");
const nextButton = document.querySelector("#next-button");
const settingsButton = document.querySelector("#settings-button");
const settingsDialog = document.querySelector("#settings-dialog");
const settingsForm = document.querySelector("#settings-form");
const closeSettingsButton = document.querySelector("#close-settings");
const minBitsInput = document.querySelector("#min-bits");
const maxBitsInput = document.querySelector("#max-bits");
const settingsError = document.querySelector("#settings-error");

let minBits = 4;
let maxBits = 8;
let decimalValue = 0;
let binaryValue = "";

function randomInteger(minimum, maximum) {
  return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
}

function createExercise() {
  const bitLength = randomInteger(minBits, maxBits);
  const smallestValue = bitLength === 1 ? 0 : 2 ** (bitLength - 1);
  const largestValue = 2 ** bitLength - 1;

  decimalValue = randomInteger(smallestValue, largestValue);
  binaryValue = decimalValue.toString(2).padStart(bitLength, "0");

  renderBits();
  answerForm.reset();
  answerInput.disabled = false;
  answerForm.querySelector("button").disabled = false;
  feedback.textContent = "";
  feedback.className = "feedback";
  nextButton.hidden = true;
  answerInput.focus();
}

function renderBits() {
  bitsContainer.replaceChildren();

  [...binaryValue].forEach((bit, index) => {
    const exponent = binaryValue.length - index - 1;
    const placeValue = 2 ** exponent;
    const column = document.createElement("div");
    const bitElement = document.createElement("span");
    const valueElement = document.createElement("span");

    column.className = "bit-column";
    bitElement.className = "bit";
    bitElement.textContent = bit;
    valueElement.className = "place-value";
    valueElement.dataset.bit = bit;
    valueElement.dataset.value = placeValue;
    valueElement.setAttribute("aria-hidden", "true");

    column.append(bitElement, valueElement);
    bitsContainer.append(column);
  });

  sumElement.textContent = "";
  bitsContainer.setAttribute("aria-label", `Binary number ${binaryValue}`);
}

function revealExplanation() {
  const activeValues = [];

  bitsContainer.querySelectorAll(".place-value").forEach((valueElement) => {
    if (valueElement.dataset.bit === "1") {
      valueElement.textContent = valueElement.dataset.value;
      valueElement.setAttribute("aria-label", `Value ${valueElement.dataset.value}`);
      activeValues.push(Number(valueElement.dataset.value));
    } else {
      valueElement.textContent = "·";
      valueElement.classList.add("is-zero");
      valueElement.setAttribute("aria-label", "This bit adds nothing");
    }

    valueElement.removeAttribute("aria-hidden");
  });

  sumElement.textContent = `${activeValues.join(" + ")} = ${decimalValue}`;
}

function checkAnswer(event) {
  event.preventDefault();

  if (answerInput.value.trim() === "") {
    feedback.className = "feedback incorrect";
    feedback.innerHTML = "<strong>Enter a number first.</strong> Write the decimal value of the binary number.";
    answerInput.focus();
    return;
  }

  const submittedAnswer = Number(answerInput.value);
  const isCorrect = submittedAnswer === decimalValue;

  revealExplanation();
  feedback.className = `feedback ${isCorrect ? "correct" : "incorrect"}`;
  feedback.innerHTML = isCorrect
    ? `<strong>Correct!</strong>${binaryValue} in binary is ${decimalValue} in decimal.`
    : `<strong>Not quite.</strong>The correct answer is ${decimalValue}. Add only the values below the bits that contain 1.`;

  answerInput.disabled = true;
  answerForm.querySelector("button").disabled = true;
  nextButton.hidden = false;
  nextButton.focus();
}

function saveSettings(event) {
  event.preventDefault();
  const newMinimum = Number(minBitsInput.value);
  const newMaximum = Number(maxBitsInput.value);

  if (!Number.isInteger(newMinimum) || !Number.isInteger(newMaximum) || newMinimum < 1 || newMaximum > 16) {
    settingsError.textContent = "Use whole numbers between 1 and 16.";
    return;
  }

  if (newMinimum > newMaximum) {
    settingsError.textContent = "The minimum cannot be greater than the maximum.";
    return;
  }

  minBits = newMinimum;
  maxBits = newMaximum;
  settingsError.textContent = "";
  settingsDialog.close();
  createExercise();
}

answerForm.addEventListener("submit", checkAnswer);
nextButton.addEventListener("click", createExercise);
settingsButton.addEventListener("click", () => settingsDialog.showModal());
closeSettingsButton.addEventListener("click", () => settingsDialog.close());
settingsForm.addEventListener("submit", saveSettings);

settingsDialog.addEventListener("click", (event) => {
  if (event.target === settingsDialog) settingsDialog.close();
});

createExercise();
