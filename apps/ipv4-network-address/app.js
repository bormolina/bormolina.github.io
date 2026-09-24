const get = (id) => document.getElementById(id);
const answerForm = get("answer-form");
const answerInput = get("answer");
const feedback = get("feedback");
const nextButton = get("next-button");
const settingsDialog = get("settings-dialog");
let minPrefix = 16;
let maxPrefix = 28;
let address;
let prefix;
let mask;
let network;
let answered = false;

function randomInteger(minimum, maximum) {
  return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
}

function subnetMask(length) {
  return Array.from({ length: 4 }, (_, index) => {
    const bits = Math.max(0, Math.min(8, length - index * 8));
    return 256 - 2 ** (8 - bits);
  });
}

function parseAddress(value) {
  const parts = value.trim().split(".");
  if (parts.length !== 4 || parts.some((part) => !/^(0|[1-9]\d{0,2})$/.test(part) || Number(part) > 255)) return null;
  return parts.map(Number);
}

function createExercise() {
  prefix = randomInteger(minPrefix, maxPrefix);
  address = [randomInteger(1, 223), ...Array.from({ length: 3 }, () => randomInteger(0, 255))];
  mask = subnetMask(prefix);
  network = address.map((octet, index) => octet & mask[index]);
  get("ip-address").textContent = `${address.join(".")}/${prefix}`;
  answerForm.reset();
  answered = false;
  answerInput.disabled = false;
  answerInput.removeAttribute("aria-invalid");
  answerForm.querySelector("button").disabled = false;
  feedback.textContent = "";
  feedback.className = "feedback";
  get("explanation").hidden = true;
  nextButton.hidden = true;
  answerInput.focus();
}

function revealExplanation() {
  const steps = get("explanation-steps");
  steps.replaceChildren();
  const addStep = (text, values, binaryIndex = -1, keptBits = 0) => {
    const step = document.createElement("li");
    const description = document.createElement("p");
    description.textContent = text;
    const line = document.createElement("div");
    line.className = "address-step";
    values.forEach((value, index) => {
      if (index > 0) line.append(document.createTextNode("."));
      if (index === binaryIndex) {
        const bits = value.toString(2).padStart(8, "0");
        for (const [className, text] of [["network-bits", bits.slice(0, keptBits)], ["host-bits", bits.slice(keptBits)]]) {
          const span = document.createElement("span");
          span.className = className;
          span.textContent = text;
          line.append(span);
        }
      } else {
        line.append(document.createTextNode(String(value)));
      }
    });
    if (binaryIndex === -1) line.append(document.createTextNode(`/${prefix}`));
    step.append(description, line);
    steps.append(step);
  };
  const wholeOctets = Math.floor(prefix / 8);
  const keptBits = prefix % 8;
  if (prefix === 32) {
    addStep("/32 means all 32 bits belong to the network. There are no host bits to clear, so the address stays unchanged.", network);
  } else if (keptBits === 0) {
    addStep(`/${prefix} means ${wholeOctets} complete network octets and ${4 - wholeOctets} complete host octets. No binary conversion is needed.`, address);
    addStep(wholeOctets === 0
      ? "All bits are host bits. Set every octet to zero to get the network address."
      : `Keep the first ${wholeOctets} octet(s) and set all remaining octets to zero to get the network address.`, network);
  } else {
    const ordinal = ["first", "second", "third", "fourth"][wholeOctets];
    addStep(`/${prefix} = ${wholeOctets} complete network octet(s) + ${keptBits} network bit(s) in the ${ordinal} octet. Convert only that octet (${address[wholeOctets]}) to binary.`, address, wholeOctets, keptBits);
    addStep(`Keep its first ${keptBits} bit(s) and set its last ${8 - keptBits} host bit(s) to zero.` + (wholeOctets < 3 ? " All later octets contain only host bits, so set them to zero too." : ""), network, wholeOctets, keptBits);
    addStep(`Convert the ${ordinal} octet back to decimal: ${network[wholeOctets].toString(2).padStart(8, "0")} = ${network[wholeOctets]}. This is the network address.`, network);
  }
  get("explanation").hidden = false;
}

answerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (answered) return;
  const submitted = parseAddress(answerInput.value);
  if (!submitted) {
    feedback.className = "feedback incorrect";
    feedback.textContent = "Enter a valid IPv4 address: four numbers from 0 to 255 separated by dots, without leading zeros or /CIDR.";
    answerInput.setAttribute("aria-invalid", "true");
    answerInput.focus();
    return;
  }
  answerInput.removeAttribute("aria-invalid");
  const correct = submitted.every((octet, index) => octet === network[index]);
  feedback.className = `feedback ${correct ? "correct" : "incorrect"}`;
  const title = document.createElement("strong");
  title.textContent = correct ? "Correct!" : "Not quite.";
  feedback.replaceChildren(title, document.createTextNode(correct
    ? `The network address is ${network.join(".")}.`
    : `The correct answer is ${network.join(".")}. Keep the network bits and set the host bits to zero, as shown below.`));
  revealExplanation();
  answered = true;
  answerInput.disabled = true;
  answerForm.querySelector("button").disabled = true;
  nextButton.hidden = false;
  nextButton.focus();
});

nextButton.addEventListener("click", createExercise);
get("settings-button").addEventListener("click", () => {
  get("min-prefix").value = minPrefix;
  get("max-prefix").value = maxPrefix;
  get("settings-error").textContent = "";
  settingsDialog.showModal();
});
get("close-settings").addEventListener("click", () => settingsDialog.close());
get("settings-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const minimum = get("min-prefix").valueAsNumber;
  const maximum = get("max-prefix").valueAsNumber;
  if (!Number.isInteger(minimum) || !Number.isInteger(maximum) || minimum < 0 || maximum > 32 || minimum > maximum) {
    get("settings-error").textContent = "Use whole numbers from 0 to 32. The minimum cannot exceed the maximum.";
    return;
  }
  minPrefix = minimum;
  maxPrefix = maximum;
  settingsDialog.close();
  createExercise();
});

createExercise();
