const message = document.getElementById("message");
const editButton = document.getElementById("edit-button");
const attentionButton = document.getElementById("attention-button");
const dialog = document.getElementById("message-dialog");
const form = document.getElementById("message-form");
const input = document.getElementById("message-input");
const board = document.querySelector(".board");
const funEmojis = document.getElementById("fun-emojis");
let emojiCycle;

const safeEmojis = [
  "🐶", "🐱", "🐸", "🦊", "🐼", "🦄", "🐙", "🦩",
  "👍", "☝️", "🤟", "👏", "🫠", "🫥", "🤪", "🥸",
  "🐶", "🐱", "🐸", "🦊", "🐼", "🦄", "🐙", "🦩",
  "👍", "☝️", "🤟", "👏", "🫠", "🫥", "🤪", "🥸",
  "🐶", "🐱", "🐸", "🦊", "🐼", "🦄", "🐙", "🦩",
  "👍", "☝️", "🤟", "👏", "🫠", "🫥", "🤪", "🥸",
  "🐶", "🐱", "🐸", "🦊", "🐼", "🦄", "🐙", "🦩",
  "👍", "☝️", "🤟", "👏", "🫠", "🫥", "🤪", "🥸",
  "💃", "👠", "✨", "🌈"
];

let resizeFrame;

function messageFits() {
  return message.scrollWidth <= message.clientWidth + 1 && message.scrollHeight <= message.clientHeight + 1;
}

function fitMessage() {
  cancelAnimationFrame(resizeFrame);
  resizeFrame = requestAnimationFrame(() => {
    // A font-size around 42% renders capital letters at roughly one third of
    // the viewport height; longer notices are reduced until they fit.
    const maxSize = Math.min(board.clientWidth, board.clientHeight * .42);
    let low = 12;
    let high = Math.max(low, maxSize);

    while (high - low > .5) {
      const middle = (low + high) / 2;
      message.style.fontSize = `${middle}px`;
      if (messageFits()) low = middle;
      else high = middle;
    }

    message.style.fontSize = `${low}px`;
  });
}

function openEditor() {
  input.value = message.textContent === "Escribe un aviso" ? "" : message.textContent;
  dialog.showModal();
  requestAnimationFrame(() => input.focus());
}

function showMessage() {
  const value = input.value.trim();
  if (!value) {
    input.focus();
    return;
  }
  message.textContent = value;
  dialog.close();
  fitMessage();
}

function randomSafeEmojis(amount = 4) {
  const shuffled = [...safeEmojis];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }
  return shuffled.slice(0, amount).join(" ");
}

editButton.addEventListener("click", openEditor);

form.addEventListener("submit", (event) => {
  if (event.submitter?.value === "cancel") return;
  event.preventDefault();
  showMessage();
});

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    showMessage();
  }
});

attentionButton.addEventListener("click", () => {
  const enabled = document.body.classList.toggle("is-attention");
  clearInterval(emojiCycle);
  if (enabled) {
    funEmojis.textContent = randomSafeEmojis();
    emojiCycle = setInterval(() => {
      funEmojis.textContent = randomSafeEmojis();
    }, 2000);
  }
  attentionButton.setAttribute("aria-pressed", String(enabled));
  attentionButton.querySelector(".button-label").textContent = enabled ? "Quitar atención" : "Prestad atención";
  fitMessage();
});

new ResizeObserver(fitMessage).observe(board);
document.fonts.ready.then(fitMessage);
