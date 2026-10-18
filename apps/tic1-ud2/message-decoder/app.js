const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ ";
const messages = [
  "BINARY IS USEFUL",
  "DATA NEEDS A CODE",
  "BITS STORE NUMBERS",
  "TEXT BECOMES DATA",
  "COLOURS USE VALUES",
  "A BYTE HAS EIGHT BITS",
  "HEXADECIMAL IS SHORT",
  "COMPUTERS FOLLOW RULES",
  "EVERY SYMBOL HAS A CODE",
  "DIGITAL DATA USES BITS",
  "MESSAGES CAN BE ENCODED",
  "INFORMATION HAS A FORMAT"
];

const initialForm = document.querySelector("#initial-form");
const initialInput = document.querySelector("#initial");
const initialFeedback = document.querySelector("#initial-feedback");
const decoder = document.querySelector("#decoder");
const hexMessage = document.querySelector("#hex-message");
const answerForm = document.querySelector("#answer-form");
const answerInput = document.querySelector("#answer");
const feedback = document.querySelector("#feedback");

let phrase = "";

function normaliseInitial(value) {
  return value
    .trim()
    .charAt(0)
    .toUpperCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace("Ñ", "N");
}

function normaliseAnswer(value) {
  return value.trim().toUpperCase().replace(/\s+/g, " ");
}

function encodeMessage(message, key) {
  return [...message].map((character) => {
    const position = alphabet.indexOf(character);
    const encoded = (position - key + 27) % 27;
    return encoded.toString(16).toUpperCase().padStart(2, "0");
  });
}

function showInitialError(message) {
  initialFeedback.className = "feedback incorrect";
  initialFeedback.innerHTML = `<strong>Check your initial.</strong>${message}`;
  decoder.hidden = true;
  initialInput.focus();
}

initialForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const initial = normaliseInitial(initialInput.value);
  const key = alphabet.indexOf(initial);

  if (key < 0 || key > 25) {
    showInitialError("Enter one letter from A to Z.");
    return;
  }

  phrase = messages[key % messages.length];
  const codes = encodeMessage(phrase, key);
  hexMessage.replaceChildren();
  codes.forEach((code) => {
    const item = document.createElement("span");
    item.textContent = `0x${code}`;
    hexMessage.append(item);
  });

  initialInput.value = initial;
  initialFeedback.textContent = "";
  initialFeedback.className = "feedback";
  answerForm.reset();
  feedback.textContent = "";
  feedback.className = "feedback";
  decoder.hidden = false;
  answerInput.focus();
});

answerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (answerInput.value.trim() === "") {
    feedback.className = "feedback incorrect";
    feedback.innerHTML = "<strong>Answer needed.</strong>Enter the phrase you decoded.";
    answerInput.focus();
    return;
  }

  const correct = normaliseAnswer(answerInput.value) === phrase;
  feedback.className = `feedback ${correct ? "correct" : "incorrect"}`;
  feedback.innerHTML = correct
    ? "<strong>Correct!</strong>You decoded the complete message."
    : "<strong>Not quite.</strong>Check each hexadecimal value and try again.";
});

initialInput.focus();
