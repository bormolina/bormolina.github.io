const get = (id) => document.getElementById(id);
const answerForm = get("answer-form");
const nextButton = get("next-button");
const settingsDialog = get("settings-dialog");
const fieldNames = ["mask", "network", "hosts", "broadcast", "gateway"];
let minPrefix = 16;
let maxPrefix = 30;
let address;
let prefix;
let network;
let solution;
let givenCidr;
let answered = false;

function randomInteger(minimum, maximum) {
  return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
}

function toOctets(value) {
  return [24, 16, 8, 0].map((shift) => Math.floor(value / 2 ** shift) % 256);
}

function calculateSubnet(ip, length) {
  const value = ip.reduce((total, octet) => total * 256 + octet, 0);
  const size = 2 ** (32 - length);
  const start = Math.floor(value / size) * size;
  return {
    mask: toOctets(2 ** 32 - size).join("."),
    network: toOctets(start).join("."),
    hosts: String(size - 2),
    broadcast: toOctets(start + size - 1).join("."),
    gateway: toOctets(start + 1).join("."),
  };
}

function parseAddress(value) {
  const parts = value.trim().split(".");
  if (parts.length !== 4 || parts.some((part) => !/^(0|[1-9]\d{0,2})$/.test(part) || Number(part) > 255)) return null;
  return parts.join(".");
}

function createExercise() {
  prefix = randomInteger(minPrefix, maxPrefix);
  address = [randomInteger(1, 223), ...Array.from({ length: 3 }, () => randomInteger(0, 255))];
  solution = calculateSubnet(address, prefix);
  network = solution.network.split(".").map(Number);
  givenCidr = Math.random() < 0.5;
  get("ip-address").textContent = address.join(".") + (givenCidr ? `/${prefix}` : "");
  get("given-mask").hidden = givenCidr;
  get("given-mask").textContent = givenCidr ? "" : `Subnet mask: ${solution.mask}`;
  get("mask-label").textContent = givenCidr ? "Subnet mask (dotted decimal)" : "Subnet mask (CIDR)";
  get("mask").placeholder = givenCidr ? "e.g. 255.255.255.0" : "e.g. /24";
  answerForm.reset();
  answered = false;
  for (const name of fieldNames) {
    get(name).disabled = false;
    get(name).removeAttribute("aria-invalid");
    get(`${name}-feedback`).textContent = "";
    get(`${name}-feedback`).className = "field-feedback";
  }
  get("check-button").disabled = false;
  get("feedback").textContent = "";
  get("feedback").className = "feedback";
  get("explanation").hidden = true;
  nextButton.hidden = true;
  get("mask").focus();
}

function readAnswer(name) {
  const value = get(name).value.trim();
  if (name === "hosts") {
    return /^\d+$/.test(value) && Number.isSafeInteger(Number(value)) ? String(Number(value)) : null;
  }
  if (name === "mask" && !givenCidr) {
    return /^\/?(0|[1-9]\d?)$/.test(value) && Number(value.replace("/", "")) <= 32
      ? `/${Number(value.replace("/", ""))}` : null;
  }
  return parseAddress(value);
}

function explainAnswers() {
  explainNetwork();
  const bits = solution.mask.split(".").map((octet) => Number(octet).toString(2).padStart(8, "0"));
  get("mask-explanation").textContent = givenCidr
    ? `/${prefix} means ${prefix} consecutive 1 bits followed by ${32 - prefix} zeros. Split into octets: ${bits.join(".")}. Convert each octet to decimal: ${solution.mask}.`
    : `Convert the mask octets to binary: ${bits.join(".")}. Count the consecutive 1 bits: ${prefix}. The CIDR prefix is /${prefix}.`;
  get("hosts-explanation").textContent = `32 - ${prefix} = ${32 - prefix} host bits. Usable hosts = 2^${32 - prefix} - 2 = ${solution.hosts}. Subtract the network and broadcast addresses.`;
  get("broadcast-explanation").textContent = `Keep the network bits and set all host bits to 1. Equivalently, add 2^${32 - prefix} - 1 = ${Number(solution.hosts) + 1} to the network address: ${solution.broadcast}.`;
  get("gateway-explanation").textContent = `In these exercises, the gateway is the first usable IP: ${solution.network} + 1 = ${solution.gateway}. It is included in the usable host count.`;
}

answerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (answered) return;
  const submitted = {};
  let firstInvalid;
  for (const name of fieldNames) {
    submitted[name] = readAnswer(name);
    const invalid = submitted[name] === null;
    get(name).removeAttribute("aria-invalid");
    get(`${name}-feedback`).textContent = "";
    if (invalid) {
      firstInvalid ??= name;
      get(name).setAttribute("aria-invalid", "true");
      get(`${name}-feedback`).className = "field-feedback incorrect";
      get(`${name}-feedback`).textContent = name === "hosts"
        ? "Enter a non-negative whole number without separators."
        : name === "mask" && !givenCidr
          ? "Enter a CIDR prefix, for example /24 or 24 (0 to 32)."
          : "Enter four octets from 0 to 255, without leading zeros or /CIDR.";
    }
  }
  if (firstInvalid) {
    get("feedback").textContent = "Check the highlighted fields before submitting.";
    get("feedback").className = "feedback incorrect";
    get(firstInvalid).focus();
    return;
  }
  let correctCount = 0;
  for (const name of fieldNames) {
    const expected = name === "mask" && !givenCidr ? `/${prefix}` : solution[name];
    const correct = submitted[name] === expected;
    if (correct) correctCount++;
    get(`${name}-feedback`).className = `field-feedback ${correct ? "correct" : "incorrect"}`;
    get(`${name}-feedback`).textContent = correct ? "Correct!" : `Not quite. Correct answer: ${expected}.`;
    get(name).disabled = true;
  }
  answered = true;
  get("check-button").disabled = true;
  get("feedback").className = `feedback ${correctCount === 5 ? "correct" : "incorrect"}`;
  get("feedback").textContent = `${correctCount} of 5 correct. ${correctCount === 5 ? "Well done!" : "Review the answers and the explanation below."}`;
  explainAnswers();
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
  if (!Number.isInteger(minimum) || !Number.isInteger(maximum) || minimum < 0 || maximum > 30 || minimum > maximum) {
    get("settings-error").textContent = "Use whole numbers from 0 to 30. The minimum cannot exceed the maximum.";
    return;
  }
  minPrefix = minimum;
  maxPrefix = maximum;
  settingsDialog.close();
  createExercise();
});

function explainNetwork() {
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

createExercise();
