const questions = [
  {
    sequence: [2, 4, 6, 8],
    answer: 10,
    explanation: "Add 2 each time: 2, 4, 6, 8, 10.",
  },
  {
    sequence: [25, 22, 19, 16],
    answer: 13,
    explanation: "Subtract 3 each time: 25, 22, 19, 16, 13.",
  },
  {
    sequence: [3, 6, 12, 24],
    answer: 48,
    explanation: "Multiply by 2 each time: 3, 6, 12, 24, 48.",
  },
  {
    sequence: [81, 27, 9, 3],
    answer: 1,
    explanation: "Divide by 3 each time: 81, 27, 9, 3, 1.",
  },
  {
    sequence: [1, 4, 9, 16],
    answer: 25,
    explanation: "These are square numbers: 1², 2², 3², 4², 5².",
  },
  {
    sequence: [1, 1, 2, 3, 5, 8],
    answer: 13,
    explanation: "Each number is the sum of the previous two: 5 + 8 = 13.",
  },
  {
    sequence: [2, 5, 10, 17, 26],
    answer: 37,
    explanation: "Add consecutive odd numbers: +3, +5, +7, +9, then +11.",
  },
  {
    sequence: [4, 7, 6, 9, 8, 11],
    answer: 10,
    explanation: "Alternate +3 and −1: 4, 7, 6, 9, 8, 11, 10.",
  },
  {
    sequence: [2, 3, 5, 8, 12, 17],
    answer: 23,
    explanation: "Add one more each time: +1, +2, +3, +4, +5, then +6.",
  },
  {
    sequence: [1, 4, 2, 8, 3, 12, 4],
    answer: 16,
    explanation: "Two sequences are interleaved: 1, 2, 3, 4 and 4, 8, 12, 16.",
  },
];

const sequenceElement = document.querySelector("#sequence");
const answerForm = document.querySelector("#answer-form");
const answerInput = document.querySelector("#answer");
const feedbackElement = document.querySelector("#feedback");
const progressElement = document.querySelector("#progress");
const nextButton = document.querySelector("#next-button");
const checkButton = answerForm.querySelector("button");

let questionIndex = 0;

function renderSequence(sequence) {
  sequenceElement.replaceChildren();

  [...sequence, null].forEach((number, index, values) => {
    const valueElement = document.createElement("span");
    valueElement.className = number === null ? "sequence-missing" : "sequence-number";
    valueElement.textContent = number === null ? "?" : number;
    sequenceElement.append(valueElement);

    if (index < values.length - 1) {
      const separator = document.createElement("span");
      separator.className = "sequence-separator";
      separator.textContent = ",";
      separator.setAttribute("aria-hidden", "true");
      sequenceElement.append(separator);
    }
  });

  sequenceElement.setAttribute("aria-label", `${sequence.join(", ")}, what comes next?`);
}

function renderQuestion() {
  const question = questions[questionIndex];

  progressElement.textContent = `${questionIndex + 1} / ${questions.length}`;
  renderSequence(question.sequence);
  answerForm.reset();
  answerInput.disabled = false;
  checkButton.disabled = false;
  feedbackElement.textContent = "";
  feedbackElement.className = "feedback";
  nextButton.hidden = true;
  answerInput.focus();
}

function checkAnswer(event) {
  event.preventDefault();

  if (answerInput.value.trim() === "") {
    feedbackElement.className = "feedback incorrect";
    feedbackElement.innerHTML = "<strong>Enter a number first.</strong>";
    answerInput.focus();
    return;
  }

  const question = questions[questionIndex];
  const submittedAnswer = Number(answerInput.value);
  const isCorrect = submittedAnswer === question.answer;

  feedbackElement.className = `feedback ${isCorrect ? "correct" : "incorrect"}`;
  feedbackElement.innerHTML = isCorrect
    ? `<strong>Correct — the next number is ${question.answer}.</strong><p class="rule-explanation">${question.explanation}</p>`
    : `<strong>Not quite — the next number is ${question.answer}.</strong><p class="rule-explanation">${question.explanation}</p>`;

  answerInput.disabled = true;
  checkButton.disabled = true;
  nextButton.textContent = questionIndex === questions.length - 1 ? "Restart ↻" : "Next →";
  nextButton.hidden = false;
  nextButton.focus();
}

function goToNextQuestion() {
  questionIndex = questionIndex === questions.length - 1 ? 0 : questionIndex + 1;
  renderQuestion();
}

answerForm.addEventListener("submit", checkAnswer);
nextButton.addEventListener("click", goToNextQuestion);

renderQuestion();
