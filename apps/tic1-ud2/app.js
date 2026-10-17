const app = document.body.dataset.app;
const challenge = document.querySelector("#challenge");
const form = document.querySelector("#answer-form");
const feedback = document.querySelector("#feedback");
const nextButton = document.querySelector("#next-button");
const extra = document.querySelector("#extra");
let current = {};

const settingsDefinitions = {
  "binary-to-decimal": { fields: [{ key: "minBits", label: "Minimum bits", value: 4, min: 1, max: 16 }, { key: "maxBits", label: "Maximum bits", value: 10, min: 1, max: 16 }], pairs: [["minBits", "maxBits"]] },
  "decimal-to-binary": { fields: [{ key: "minValue", label: "Minimum value", value: 0, min: 0, max: 65535 }, { key: "maxValue", label: "Maximum value", value: 1023, min: 0, max: 65535 }], pairs: [["minValue", "maxValue"]] },
  "binary-to-hexadecimal": { fields: [{ key: "minDigits", label: "Minimum hex digits", value: 2, min: 1, max: 6 }, { key: "maxDigits", label: "Maximum hex digits", value: 4, min: 1, max: 6 }, { key: "easyMode", label: "Easy mode: group bits in fours", value: false, type: "checkbox" }], pairs: [["minDigits", "maxDigits"]] },
  "hexadecimal-to-binary": { fields: [{ key: "minDigits", label: "Minimum hex digits", value: 2, min: 1, max: 6 }, { key: "maxDigits", label: "Maximum hex digits", value: 4, min: 1, max: 6 }], pairs: [["minDigits", "maxDigits"]] },
  "how-many-bits": { fields: [{ key: "minStates", label: "Minimum states", value: 3, min: 2, max: 64 }, { key: "maxStates", label: "Maximum states", value: 30, min: 2, max: 64 }], pairs: [["minStates", "maxStates"]] },
  "ascii-decoder": { fields: [{ key: "minLength", label: "Minimum characters", value: 4, min: 4, max: 11 }, { key: "maxLength", label: "Maximum characters", value: 11, min: 4, max: 11 }], pairs: [["minLength", "maxLength"]] },
  "rgb-colour-lab": { fields: [{ key: "minChannel", label: "Minimum target channel", value: 25, min: 0, max: 255 }, { key: "maxChannel", label: "Maximum target channel", value: 230, min: 0, max: 255 }, { key: "tolerance", label: "Tolerance per channel", value: 35, min: 5, max: 100 }], pairs: [["minChannel", "maxChannel"]] },
  "information-units": { fields: [{ key: "minValue", label: "Minimum quantity", value: 1, min: 1, max: 1000000 }, { key: "maxValue", label: "Maximum quantity", value: 500, min: 1, max: 1000000 }], pairs: [["minValue", "maxValue"]] },
  "image-size": { fields: [{ key: "minWidth", label: "Minimum width", value: 320, min: 1, max: 10000 }, { key: "maxWidth", label: "Maximum width", value: 1920, min: 1, max: 10000 }, { key: "minHeight", label: "Minimum height", value: 240, min: 1, max: 10000 }, { key: "maxHeight", label: "Maximum height", value: 1080, min: 1, max: 10000 }, { key: "minBpp", label: "Minimum bits per pixel", value: 1, min: 1, max: 32 }, { key: "maxBpp", label: "Maximum bits per pixel", value: 32, min: 1, max: 32 }], pairs: [["minWidth", "maxWidth"], ["minHeight", "maxHeight"], ["minBpp", "maxBpp"]] },
  "audio-size": { fields: [{ key: "minRate", label: "Minimum sample rate", value: 8000, min: 1000, max: 192000 }, { key: "maxRate", label: "Maximum sample rate", value: 48000, min: 1000, max: 192000 }, { key: "minDepth", label: "Minimum bits per sample", value: 8, min: 1, max: 32 }, { key: "maxDepth", label: "Maximum bits per sample", value: 24, min: 1, max: 32 }, { key: "maxChannels", label: "Maximum channels", value: 2, min: 1, max: 8 }, { key: "minDuration", label: "Minimum duration (s)", value: 5, min: 1, max: 3600 }, { key: "maxDuration", label: "Maximum duration (s)", value: 120, min: 1, max: 3600 }], pairs: [["minRate", "maxRate"], ["minDepth", "maxDepth"], ["minDuration", "maxDuration"]] },
  "video-size": { fields: [{ key: "minFps", label: "Minimum fps", value: 24, min: 1, max: 240 }, { key: "maxFps", label: "Maximum fps", value: 60, min: 1, max: 240 }, { key: "minDuration", label: "Minimum duration (s)", value: 5, min: 1, max: 3600 }, { key: "maxDuration", label: "Maximum duration (s)", value: 30, min: 1, max: 3600 }, { key: "minFrameSize", label: "Minimum bytes per frame", value: 50000, min: 1, max: 100000000 }, { key: "maxFrameSize", label: "Maximum bytes per frame", value: 1000000, min: 1, max: 100000000 }], pairs: [["minFps", "maxFps"], ["minDuration", "maxDuration"], ["minFrameSize", "maxFrameSize"]] }
};

const definition = settingsDefinitions[app];
const settings = Object.fromEntries(definition.fields.map((field) => [field.key, field.value]));

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const pick = (items) => items[randomInt(0, items.length - 1)];
const formatNumber = (value, digits = 6) => new Intl.NumberFormat("en-GB", { maximumFractionDigits: digits }).format(value);
const boundedPick = (values, minimum, maximum) => {
  const available = values.filter((value) => value >= minimum && value <= maximum);
  return available.length ? pick(available) : randomInt(minimum, maximum);
};

function installSettings() {
  const header = document.querySelector(".app-header");
  const progress = header.querySelector(".progress");
  const actions = document.createElement("div");
  actions.className = "header-actions";
  const button = document.createElement("button");
  button.className = "icon-button";
  button.type = "button";
  button.setAttribute("aria-label", "Open settings");
  button.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.83 2.83-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.03 1.56V21h-4v-.08A1.7 1.7 0 0 0 8.94 19.4a1.7 1.7 0 0 0-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 4.57 15 1.7 1.7 0 0 0 3 14v-4h.08A1.7 1.7 0 0 0 4.6 8.94a1.7 1.7 0 0 0-.34-1.88L4.2 7l2.83-2.83.06.06A1.7 1.7 0 0 0 9 4.57 1.7 1.7 0 0 0 10 3h4v.08A1.7 1.7 0 0 0 15.06 4.6a1.7 1.7 0 0 0 1.88-.34L17 4.2 19.83 7l-.06.06A1.7 1.7 0 0 0 19.43 9 1.7 1.7 0 0 0 21 10h.08v4H21a1.7 1.7 0 0 0-1.6 1Z"></path></svg>';
  actions.append(progress, button);
  header.append(actions);

  const dialog = document.createElement("dialog");
  dialog.className = "settings-dialog";
  dialog.innerHTML = `<form method="dialog" id="settings-form"><div class="dialog-heading"><h2>Settings</h2><button class="close-button" type="button" aria-label="Close settings">×</button></div><p>Choose the values used to create new questions.</p><div class="settings-grid"></div><p class="settings-error" role="alert"></p><button class="save-button" type="submit">Save and start</button></form>`;
  document.body.append(dialog);
  const grid = dialog.querySelector(".settings-grid");
  definition.fields.forEach((field) => {
    const label = document.createElement("label");
    if (field.type === "checkbox") {
      label.className = "checkbox-field";
      label.innerHTML = `<input id="setting-${field.key}" type="checkbox"><span>${field.label}</span>`;
    } else {
      label.innerHTML = `<span>${field.label}</span><input id="setting-${field.key}" type="number" min="${field.min}" max="${field.max}" step="1" required>`;
    }
    grid.append(label);
  });

  const populate = () => definition.fields.forEach((field) => {
    const input = dialog.querySelector(`#setting-${field.key}`);
    if (field.type === "checkbox") input.checked = settings[field.key];
    else input.value = settings[field.key];
  });
  button.addEventListener("click", () => { populate(); dialog.showModal(); });
  dialog.querySelector(".close-button").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
  dialog.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    const proposed = {};
    for (const field of definition.fields) {
      const input = dialog.querySelector(`#setting-${field.key}`);
      proposed[field.key] = field.type === "checkbox" ? input.checked : Number(input.value);
      if (field.type !== "checkbox" && (!Number.isInteger(proposed[field.key]) || proposed[field.key] < field.min || proposed[field.key] > field.max)) {
        dialog.querySelector(".settings-error").textContent = `Use a whole number from ${formatNumber(field.min)} to ${formatNumber(field.max)} for ${field.label.toLowerCase()}.`;
        return;
      }
    }
    for (const [minimum, maximum] of definition.pairs) {
      if (proposed[minimum] > proposed[maximum]) {
        dialog.querySelector(".settings-error").textContent = "A minimum value cannot be greater than its maximum value.";
        return;
      }
    }
    Object.assign(settings, proposed);
    dialog.querySelector(".settings-error").textContent = "";
    dialog.close();
    createExercise();
  });
}

function setFeedback(correct, title, message) {
  feedback.className = `feedback ${correct ? "correct" : "incorrect"}`;
  feedback.innerHTML = `<strong>${title}</strong>${message}`;
}

function resetCommon() {
  form.reset();
  feedback.textContent = "";
  feedback.className = "feedback";
  extra.replaceChildren();
  nextButton.hidden = true;
  [...form.elements].forEach((element) => { element.disabled = false; });
}

function finish() {
  [...form.elements].forEach((element) => { element.disabled = true; });
  nextButton.hidden = false;
  nextButton.focus();
}

function requireValue(input, message = "Enter an answer first.") {
  if (input.value.trim() !== "") return true;
  setFeedback(false, "Answer needed.", message);
  input.focus();
  return false;
}

const simpleConversions = {
  "binary-to-decimal": {
    create() {
      const length = randomInt(settings.minBits, settings.maxBits);
      current.decimal = randomInt(2 ** (length - 1), 2 ** length - 1);
      current.shown = current.decimal.toString(2);
      challenge.textContent = current.shown;
    },
    check(input) {
      const correct = Number(input.value) === current.decimal;
      const powers = [...current.shown].map((bit, index) => bit === "1" ? 2 ** (current.shown.length - index - 1) : null).filter(Number.isFinite);
      extra.innerHTML = `<p class="formula">${powers.join(" + ")} = ${current.decimal}</p>`;
      setFeedback(correct, correct ? "Correct!" : "Not quite.", correct ? `${current.shown}₂ equals ${current.decimal}₁₀.` : `The correct answer is ${current.decimal}. Add the place values whose bits are 1.`);
    }
  },
  "decimal-to-binary": {
    create() {
      current.decimal = randomInt(settings.minValue, settings.maxValue);
      current.answer = current.decimal.toString(2);
      challenge.textContent = current.decimal;
    },
    check(input) {
      const submitted = input.value.replace(/\s/g, "").replace(/^0+(?=\d)/, "");
      const correct = /^[01]+$/.test(submitted) && submitted === current.answer;
      const powers = [...current.answer].map((bit, i) => bit === "1" ? 2 ** (current.answer.length - i - 1) : null).filter(Number.isFinite);
      extra.innerHTML = `<p class="formula">${current.decimal} = ${powers.join(" + ")} → ${current.answer}₂</p>`;
      setFeedback(correct, correct ? "Correct!" : "Not quite.", correct ? `${current.decimal}₁₀ equals ${current.answer}₂.` : `The binary representation is ${current.answer}. Use only 0s and 1s.`);
    }
  },
  "binary-to-hexadecimal": {
    create() {
      const digits = randomInt(settings.minDigits, settings.maxDigits);
      current.value = randomInt(digits === 1 ? 0 : 16 ** (digits - 1), 16 ** digits - 1);
      current.shown = current.value.toString(2).padStart(digits * 4, "0");
      current.answer = current.value.toString(16).toUpperCase();
      challenge.replaceChildren();
      if (settings.easyMode) {
        challenge.classList.add("bit-groups");
        current.shown.match(/.{4}/g).forEach((group) => {
          const span = document.createElement("span");
          span.className = "bit-group";
          span.textContent = group;
          challenge.append(span);
        });
        challenge.setAttribute("aria-label", current.shown);
      } else {
        challenge.classList.remove("bit-groups");
        challenge.textContent = current.shown;
        challenge.removeAttribute("aria-label");
      }
    },
    check(input) {
      const submitted = input.value.trim().replace(/^0x/i, "").toUpperCase();
      const correct = submitted === current.answer;
      const padded = current.shown.padStart(Math.ceil(current.shown.length / 4) * 4, "0");
      const groups = padded.match(/.{4}/g);
      extra.innerHTML = `<p class="formula">${groups.map((group) => `${group} → ${parseInt(group, 2).toString(16).toUpperCase()}`).join(" &nbsp; ")}</p>`;
      setFeedback(correct, correct ? "Correct!" : "Not quite.", `The hexadecimal value is ${current.answer}. Group the bits in fours from the right.`);
    }
  },
  "hexadecimal-to-binary": {
    create() {
      const digits = randomInt(settings.minDigits, settings.maxDigits);
      current.value = randomInt(digits === 1 ? 0 : 16 ** (digits - 1), 16 ** digits - 1);
      current.shown = current.value.toString(16).toUpperCase().padStart(digits, "0");
      current.answer = [...current.shown].map((digit) => parseInt(digit, 16).toString(2).padStart(4, "0")).join("");
      challenge.textContent = current.shown;
    },
    check(input) {
      const submitted = input.value.replace(/\s/g, "");
      const correct = submitted === current.answer;
      extra.innerHTML = `<p class="formula">${[...current.shown].map((digit) => `${digit} → ${parseInt(digit, 16).toString(2).padStart(4, "0")}`).join(" &nbsp; ")}</p>`;
      setFeedback(correct, correct ? "Correct!" : "Not quite.", `The binary value is ${current.answer}. Convert each hexadecimal digit into four bits.`);
    }
  }
};

function createHowManyBits() {
  current.states = randomInt(settings.minStates, settings.maxStates);
  current.bits = Math.ceil(Math.log2(current.states));
  challenge.textContent = `${current.states} distinct states`;
}

function checkHowManyBits(input) {
  const correct = Number(input.value) === current.bits;
  const combinations = 2 ** current.bits;
  const codes = document.createElement("div");
  codes.className = "codes";
  for (let i = 0; i < combinations; i += 1) {
    const code = document.createElement("span");
    code.className = `code${i >= current.states ? " spare" : ""}`;
    code.textContent = i.toString(2).padStart(current.bits, "0");
    codes.append(code);
  }
  extra.innerHTML = `<p class="formula">2<sup>${current.bits - 1}</sup> = ${2 ** (current.bits - 1)} is not enough; 2<sup>${current.bits}</sup> = ${combinations} is enough.</p><p>${combinations} combinations are available: ${current.states} used and ${combinations - current.states} spare.</p>`;
  extra.append(codes);
  setFeedback(correct, correct ? "Correct!" : "Not quite.", `You need ${current.bits} bits. Spare codes are highlighted below.`);
}

const asciiMessages = ["DATA", "BYTE", "CODE", "HELLO", "BINARY", "NETWORK", "GOOD JOB", "COMPUTER", "FILE SIZE", "RGB COLOUR", "HELLO WORLD"];
function createAscii() {
  current.message = pick(asciiMessages.filter((message) => message.length >= settings.minLength && message.length <= settings.maxLength));
  challenge.innerHTML = "";
  challenge.classList.add("byte-list");
  [...current.message].forEach((character) => {
    const span = document.createElement("span");
    span.className = "byte";
    span.textContent = character.charCodeAt(0).toString(2).padStart(8, "0");
    challenge.append(span);
  });
}

function checkAscii(input) {
  const submitted = input.value.toUpperCase();
  const correct = submitted === current.message;
  const review = document.createElement("div");
  review.className = "character-review";
  [...current.message].forEach((character, index) => {
    const span = document.createElement("span");
    span.className = `character ${submitted[index] === character ? "good" : "bad"}`;
    span.textContent = submitted[index] ?? "_";
    span.title = submitted[index] === character ? "Correct character" : `Expected ${character}`;
    review.append(span);
  });
  extra.innerHTML = `<p class="formula">Decoded message: ${current.message}</p>`;
  extra.append(review);
  setFeedback(correct, correct ? "Correct!" : "Check the highlighted characters.", correct ? "Every byte has been decoded correctly." : "Red positions are missing or incorrect. Use the ASCII table if you need it.");
}

function createAsciiTable() {
  const table = document.querySelector("#ascii-table");
  if (!table) return;
  for (let code = 32; code <= 126; code += 1) {
    const cell = document.createElement("span");
    const label = code === 32 ? "space" : String.fromCharCode(code);
    cell.textContent = `${code.toString(2).padStart(8, "0")}  ${label}`;
    table.append(cell);
  }
}

function updateColour() {
  const r = Number(document.querySelector("#red").value);
  const g = Number(document.querySelector("#green").value);
  const b = Number(document.querySelector("#blue").value);
  document.querySelector("#red-number").value = r;
  document.querySelector("#green-number").value = g;
  document.querySelector("#blue-number").value = b;
  document.querySelector("#your-colour").style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
}

function createRgb() {
  current.target = [0, 1, 2].map(() => randomInt(settings.minChannel, settings.maxChannel));
  document.querySelector("#target-colour").style.backgroundColor = `rgb(${current.target.join(",")})`;
  ["red", "green", "blue"].forEach((id) => { document.querySelector(`#${id}`).value = 128; });
  updateColour();
}

function checkRgb() {
  const values = ["red", "green", "blue"].map((id) => Number(document.querySelector(`#${id}`).value));
  const differences = values.map((value, index) => value - current.target[index]);
  const distance = Math.sqrt(differences.reduce((sum, difference) => sum + difference ** 2, 0));
  const correct = distance <= settings.tolerance * Math.sqrt(3) && differences.every((difference) => Math.abs(difference) <= settings.tolerance);
  if (correct) {
    setFeedback(true, "Great match!", `Your RGB(${values.join(", ")}) is close enough to the target.`);
  } else {
    const names = ["red", "green", "blue"];
    const hints = differences.map((difference, index) => Math.abs(difference) <= 12 ? `${names[index]} is close` : `${difference < 0 ? "increase" : "decrease"} ${names[index]}`);
    setFeedback(false, "Keep adjusting.", `${hints.join(", ")}. Aim for a difference of no more than ${settings.tolerance} per channel.`);
    return;
  }
  extra.innerHTML = `<p class="formula">Target: RGB(${current.target.join(", ")})</p>`;
  finish();
}

const units = { b: 1, B: 8, kB: 8000, MB: 8000000, GB: 8000000000 };
const mediaUnits = Object.keys(units);

function setMediaAnswer(bytes) {
  current.bytes = bytes;
  current.outputUnit = pick(mediaUnits);
  current.answer = bytes * 8 / units[current.outputUnit];
  const label = document.querySelector("#size-answer-label");
  if (label) label.textContent = `Size in ${current.outputUnit}`;
}

function createUnits() {
  do {
    current.from = pick(Object.keys(units));
    current.to = pick(Object.keys(units));
    current.value = randomInt(settings.minValue, settings.maxValue);
    current.answer = current.value * units[current.from] / units[current.to];
  } while (current.to === current.from || current.answer < 0.000001);
  challenge.textContent = `${current.value} ${current.from} = ? ${current.to}`;
}

function checkUnits(input) {
  const submitted = Number(input.value.replace(/[,\s]/g, ""));
  const tolerance = Math.max(Math.abs(current.answer) * 0.000001, 1e-10);
  const correct = Number.isFinite(submitted) && Math.abs(submitted - current.answer) <= tolerance;
  extra.innerHTML = `<p class="formula">${current.value} × ${units[current.from]} bits ÷ ${units[current.to]} bits per ${current.to} = ${formatNumber(current.answer, 9)} ${current.to}</p>`;
  setFeedback(correct, correct ? "Correct!" : "Not quite.", `The answer is ${formatNumber(current.answer, 9)} ${current.to}. Remember: lowercase b means bit; uppercase B means byte.`);
}

function createSizeExercise() {
  if (app === "image-size") {
    current = {
      width: boundedPick([320, 640, 800, 1024, 1280, 1920], settings.minWidth, settings.maxWidth),
      height: boundedPick([240, 480, 600, 720, 1080], settings.minHeight, settings.maxHeight),
      bpp: boundedPick([1, 8, 16, 24, 32], settings.minBpp, settings.maxBpp)
    };
    setMediaAnswer(current.width * current.height * current.bpp / 8);
    challenge.textContent = `${current.width} × ${current.height} px · ${current.bpp} bits/pixel`;
  } else if (app === "audio-size") {
    current = {
      rate: boundedPick([8000, 22050, 44100, 48000, 96000, 192000], settings.minRate, settings.maxRate),
      depth: boundedPick([8, 16, 24, 32], settings.minDepth, settings.maxDepth),
      channels: randomInt(1, settings.maxChannels),
      duration: boundedPick([5, 10, 30, 60, 120, 300], settings.minDuration, settings.maxDuration)
    };
    setMediaAnswer(current.rate * current.depth * current.channels * current.duration / 8);
    const channelDescription = current.channels === 1 && Math.random() < 0.5
      ? "mono"
      : current.channels === 2 && Math.random() < 0.5
        ? "stereo"
        : `${current.channels} channel${current.channels > 1 ? "s" : ""}`;
    challenge.textContent = `${formatNumber(current.rate)} Hz · ${current.depth} bits · ${channelDescription} · ${current.duration} s`;
  } else {
    current = {
      fps: boundedPick([24, 25, 30, 50, 60, 120], settings.minFps, settings.maxFps),
      duration: boundedPick([5, 10, 15, 30, 60, 120], settings.minDuration, settings.maxDuration),
      frameSize: boundedPick([50000, 100000, 250000, 500000, 1000000], settings.minFrameSize, settings.maxFrameSize)
    };
    current.frames = current.fps * current.duration;
    setMediaAnswer(current.frames * current.frameSize);
    challenge.textContent = `${current.fps} fps · ${current.duration} s · ${formatNumber(current.frameSize)} B/frame`;
  }
}

function checkSize(input) {
  const submitted = Number(input.value.replace(/[,\s]/g, ""));
  const submittedFrames = app === "video-size" ? Number(document.querySelector("#frames-answer").value.replace(/[,\s]/g, "")) : null;
  const tolerance = Math.max(Math.abs(current.answer) * 0.000001, 1e-10);
  const correct = Number.isFinite(submitted) && Math.abs(submitted - current.answer) <= tolerance && (app !== "video-size" || submittedFrames === current.frames);
  let working;
  const conversion = current.outputUnit === "B"
    ? `${formatNumber(current.bytes, 9)} B`
    : `${formatNumber(current.bytes, 9)} B × 8 ÷ ${formatNumber(units[current.outputUnit])} = ${formatNumber(current.answer, 9)} ${current.outputUnit}`;
  if (app === "image-size") working = `${current.width} × ${current.height} × ${current.bpp} ÷ 8 = ${formatNumber(current.bytes, 9)} B; ${conversion}`;
  if (app === "audio-size") working = `${formatNumber(current.rate)} × ${current.depth} × ${current.channels} × ${current.duration} ÷ 8 = ${formatNumber(current.bytes, 9)} B; ${conversion}`;
  if (app === "video-size") working = `${current.fps} × ${current.duration} = ${formatNumber(current.frames)} frames; ${formatNumber(current.frames)} × ${formatNumber(current.frameSize)} = ${formatNumber(current.bytes, 9)} B; ${conversion}`;
  extra.innerHTML = `<p class="formula">${working}</p>`;
  setFeedback(correct, correct ? "Correct!" : "Not quite.", `The uncompressed size is ${formatNumber(current.answer, 9)} ${current.outputUnit}.${app === "video-size" ? ` The video contains ${formatNumber(current.frames)} frames; both answers must be correct.` : ""}`);
}

function createExercise() {
  resetCommon();
  challenge.classList.remove("byte-list", "bit-groups");
  if (simpleConversions[app]) simpleConversions[app].create();
  else if (app === "how-many-bits") createHowManyBits();
  else if (app === "ascii-decoder") createAscii();
  else if (app === "rgb-colour-lab") createRgb();
  else if (app === "information-units") createUnits();
  else createSizeExercise();
  const firstInput = form.querySelector("input:not([type=range])");
  if (firstInput && app !== "rgb-colour-lab") firstInput.focus();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (app === "rgb-colour-lab") { checkRgb(); return; }
  const input = form.querySelector(app === "video-size" ? "#size-answer" : "input");
  if (app === "video-size" && !requireValue(document.querySelector("#frames-answer"), "Enter the number of frames first.")) return;
  if (!requireValue(input)) return;
  if (simpleConversions[app]) simpleConversions[app].check(input);
  else if (app === "how-many-bits") checkHowManyBits(input);
  else if (app === "ascii-decoder") checkAscii(input);
  else if (app === "information-units") checkUnits(input);
  else checkSize(input);
  finish();
});

if (app === "rgb-colour-lab") {
  ["red", "green", "blue"].forEach((id) => {
    const range = document.querySelector(`#${id}`);
    const number = document.querySelector(`#${id}-number`);
    range.addEventListener("input", updateColour);
    number.addEventListener("input", () => {
      const value = Math.max(0, Math.min(255, Number(number.value) || 0));
      range.value = value;
      updateColour();
    });
  });
}

nextButton.addEventListener("click", createExercise);
installSettings();
createAsciiTable();
createExercise();
