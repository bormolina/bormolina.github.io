const exercises = [
  {
    title: "Start the flex container",
    concept: "display: flex · main axis · cross axis",
    explanation: "display: flex turns an element into a flex container. Its direct children become flex items and line up along the main axis. The default direction is row, so the main axis runs horizontally and the cross axis runs vertically.",
    challenge: "Turn .team into a flex container. Notice how one declaration changes the cards from a vertical list into a horizontal row.",
    html: `<div class="team">\n  <div class="person">Ada</div>\n  <div class="person">Linus</div>\n  <div class="person">Grace</div>\n</div>`,
    start: `.team {\n  /* Turn this into a flex container */\n}\n\n.person {\n  padding: 2rem;\n  border: 2px solid #172121;\n  background: #e8edff;\n  text-align: center;\n}`,
    solution: `.team {\n  display: flex;\n}\n\n.person {\n  padding: 2rem;\n  border: 2px solid #172121;\n  background: #e8edff;\n  text-align: center;\n}`,
    after: "display: flex affects the direct children of .team. Because flex-direction defaults to row, the items appear from left to right. Try flex-direction: column to rotate the main axis."
  },
  {
    title: "Control the main axis",
    concept: "justify-content",
    explanation: "justify-content controls how items and leftover space are distributed along the main axis. Useful values include flex-start, center, flex-end, space-between, space-around and space-evenly.",
    challenge: "Move the navigation links to opposite ends of the bar using justify-content: space-between.",
    html: `<nav class="navigation">\n  <a href="#">Home</a>\n  <a href="#">Projects</a>\n  <a href="#">Contact</a>\n</nav>`,
    start: `.navigation {\n  display: flex;\n  /* Distribute the items here */\n  padding: 1rem;\n  background: #172121;\n}\n\na {\n  color: white;\n  text-decoration: none;\n}`,
    solution: `.navigation {\n  display: flex;\n  justify-content: space-between;\n  padding: 1rem;\n  background: #172121;\n}\n\na {\n  color: white;\n  text-decoration: none;\n}`,
    after: "space-between places the first item at the start, the last item at the end and divides the remaining space between the other items. Change it to center or space-evenly to compare."
  },
  {
    title: "Control the cross axis",
    concept: "align-items",
    explanation: "align-items positions all flex items along the cross axis. In a row, that means vertical alignment. Common values are stretch, flex-start, center, flex-end and baseline.",
    challenge: "Vertically centre the three badges inside the 240px-high container using align-items.",
    html: `<div class="badges">\n  <span class="badge badge--small">HTML</span>\n  <span class="badge badge--large">CSS</span>\n  <span class="badge">Flexbox</span>\n</div>`,
    start: `.badges {\n  display: flex;\n  justify-content: center;\n  /* Align items on the cross axis */\n  gap: 12px;\n  height: 240px;\n  border: 2px dashed #9ba5a2;\n}\n\n.badge { padding: 1rem; background: #3867ff; color: white; }\n.badge--small { padding-block: .5rem; }\n.badge--large { padding-block: 2rem; }`,
    solution: `.badges {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 12px;\n  height: 240px;\n  border: 2px dashed #9ba5a2;\n}\n\n.badge { padding: 1rem; background: #3867ff; color: white; }\n.badge--small { padding-block: .5rem; }\n.badge--large { padding-block: 2rem; }`,
    after: "align-items: center centres every item on the cross axis while preserving its own height. justify-content: center is still working independently on the main axis."
  },
  {
    title: "Let items wrap",
    concept: "flex-wrap · gap",
    explanation: "Flex items try to stay on one line by default and may become cramped. flex-wrap: wrap allows them to move onto additional lines. gap then adds consistent space between items in both directions.",
    challenge: "Allow the cards to wrap onto new lines and add a 12px gap. Resize the page mentally: the layout should use as many cards per row as will fit.",
    html: `<div class="topics">\n  <article>HTML</article><article>CSS</article>\n  <article>JavaScript</article><article>Networks</article>\n  <article>Databases</article>\n</div>`,
    start: `.topics {\n  display: flex;\n  /* Allow wrapping and add spacing */\n}\n\n.topics article {\n  width: 150px;\n  padding: 1.5rem;\n  background: #e8edff;\n  border: 1px solid #9babdf;\n}`,
    solution: `.topics {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 12px;\n}\n\n.topics article {\n  width: 150px;\n  padding: 1.5rem;\n  background: #e8edff;\n  border: 1px solid #9babdf;\n}`,
    after: "flex-wrap: wrap creates extra flex lines whenever the items no longer fit. gap: 12px adds equal spacing horizontally and vertically without needing margins on individual cards."
  },
  {
    title: "Share the available space",
    concept: "flex: grow shrink basis",
    explanation: "The flex shorthand controls how an item grows, shrinks and chooses its starting size. flex: 1 1 160px means: grow when space is available, shrink when necessary, and aim to start at 160px.",
    challenge: "Make every card flexible with flex: 1 1 140px, then make .featured grow twice as much with flex-grow: 2.",
    html: `<div class="courses">\n  <article>Web</article>\n  <article class="featured">Programming</article>\n  <article>Systems</article>\n</div>`,
    start: `.courses {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 12px;\n}\n\n.courses article {\n  /* grow | shrink | basis */\n  padding: 2rem 1rem;\n  background: #e8edff;\n  border: 2px solid #172121;\n}\n\n.featured {\n  background: #8da7ff;\n}`,
    solution: `.courses {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 12px;\n}\n\n.courses article {\n  flex: 1 1 140px;\n  padding: 2rem 1rem;\n  background: #e8edff;\n  border: 2px solid #172121;\n}\n\n.featured {\n  flex-grow: 2;\n  background: #8da7ff;\n}`,
    after: "Every card starts from a 140px basis and may grow or shrink. The featured item has a growth factor of 2, so it receives twice the share of any leftover space."
  },
  {
    title: "Final responsive project",
    concept: "Flexbox + @media",
    explanation: "Your final task combines direction, wrapping, gaps and flexible sizing. On mobile, the profile and project cards form a vertical flow. On desktop, the profile becomes a fixed-width sidebar while the main area grows to fill the remaining space.",
    challenge: "Create a folder with index.html and styles.css. Copy the HTML below into index.html, link your stylesheet and reproduce both reference layouts using Flexbox.",
    isProject: true,
    html: `<div class="portfolio">\n  <aside class="profile">\n    <div class="avatar">BM</div><strong>Borja</strong><span>Teacher</span>\n  </aside>\n  <main class="projects">\n    <h2>Learning projects</h2>\n    <div class="project-list">\n      <article>Binary</article><article>Networks</article><article>Flexbox</article>\n    </div>\n  </main>\n</div>`,
    htmlCode: `<!doctype html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1" />\n    <title>My Flexbox portfolio</title>\n    <link rel="stylesheet" href="styles.css" />\n  </head>\n  <body>\n    <div class="portfolio">\n      <aside class="profile">\n        <div class="avatar">BM</div>\n        <strong>Borja</strong>\n        <span>Teacher</span>\n      </aside>\n\n      <main class="projects">\n        <h2>Learning projects</h2>\n        <div class="project-list">\n          <article>Binary</article>\n          <article>Networks</article>\n          <article>Flexbox</article>\n        </div>\n      </main>\n    </div>\n  </body>\n</html>`,
    start: `/* Write your styles.css here. */\n\n* { box-sizing: border-box; }\nbody {\n  margin: 0;\n  padding: 24px;\n  font-family: system-ui, sans-serif;\n}\n\n/* Start with the mobile layout, then add a media query. */`,
    solution: `* { box-sizing: border-box; }\nbody { margin: 0; padding: 24px; font-family: system-ui, sans-serif; }\n.portfolio { display: flex; flex-direction: column; gap: 24px; }\n.profile { padding: 1.5rem; background: #172121; color: white; }\n.profile strong, .profile span { display: block; margin-top: .4rem; }\n.avatar { display: flex; justify-content: center; align-items: center; width: 58px; aspect-ratio: 1; border-radius: 50%; background: #3867ff; font-weight: bold; }\n.projects { flex: 1; }\n.projects h2 { margin-top: 0; }\n.project-list { display: flex; flex-direction: column; gap: 10px; }\n.project-list article { flex: 1 1 120px; padding: 1.25rem; background: #e8edff; border: 1px solid #9babdf; }\n\n@media (min-width: 520px) {\n  .portfolio { flex-direction: row; align-items: flex-start; }\n  .profile { flex: 0 0 150px; }\n  .project-list { flex-flow: row wrap; }\n}`,
    after: "The mobile-first layout begins as a column. Above 520px, flex-direction: row places the profile beside the content. The profile keeps a 150px basis, while .projects and its wrapping cards use the remaining space."
  }
];

const list = document.querySelector("#exercise-list");
const storageKey = "flexbox-course-completed";
const completed = new Set(JSON.parse(localStorage.getItem(storageKey) || "[]"));

function escapeHtml(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function previewDocument(html, css) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><style>
    *{box-sizing:border-box} body{margin:0;padding:24px;font-family:system-ui,sans-serif;color:#172121;background:#fff} ${css}
  </style></head><body>${html}</body></html>`;
}

function updateProgress() {
  document.querySelector("#progress-count").textContent = completed.size;
  localStorage.setItem(storageKey, JSON.stringify([...completed]));
}

function copyText(text, button) {
  navigator.clipboard.writeText(text).then(() => {
    const previous = button.textContent;
    button.textContent = "Copied!";
    setTimeout(() => { button.textContent = previous; }, 1400);
  });
}

exercises.forEach((exercise, index) => {
  const section = document.createElement("section");
  section.className = `exercise${completed.has(index) ? " is-complete" : ""}`;
  section.id = `exercise-${index + 1}`;
  const projectBrief = exercise.isProject ? `
    <div class="reference-section">
      <div class="reference-heading">
        <div><span class="reference-step">1</span><h3>Study the target</h3></div>
        <p>The same content must move naturally between these two layouts. Only the CSS changes.</p>
      </div>
      <div class="reference-views">
        <figure class="reference-card reference-card--desktop">
          <figcaption>Desktop · sidebar and flexible cards</figcaption>
          <iframe title="Desktop reference for the final project" sandbox=""></iframe>
        </figure>
        <figure class="reference-card reference-card--mobile">
          <figcaption>Mobile · vertical flow</figcaption>
          <iframe title="Mobile reference for the final project" sandbox=""></iframe>
        </figure>
      </div>
    </div>
    <div class="project-files">
      <div class="reference-heading">
        <div><span class="reference-step">2</span><h3>Create the project files</h3></div>
        <p>Create <code>index.html</code> and <code>styles.css</code> in the same folder. Copy this complete HTML into <code>index.html</code>.</p>
      </div>
      <div class="html-code-block">
        <div class="editor-toolbar"><span>index.html</span><button type="button" data-action="copy-html">Copy HTML</button></div>
        <pre><code>${escapeHtml(exercise.htmlCode)}</code></pre>
      </div>
    </div>
    <div class="reference-heading project-code-heading">
      <div><span class="reference-step">3</span><h3>Build the CSS</h3></div>
      <p>Use the editor to experiment, then move your finished rules into <code>styles.css</code>. Test widths between both references too.</p>
    </div>` : "";

  section.innerHTML = `
    <div class="exercise-number">0${index + 1}</div>
    <div>
      <div class="exercise-header">
        <h2 class="exercise-title">${exercise.title}</h2>
        <span class="status-pill">${completed.has(index) ? "Completed ✓" : "To do"}</span>
      </div>
      <p class="lesson-copy">${exercise.explanation}</p>
      <span class="concept">${escapeHtml(exercise.concept)}</span>
      <div class="challenge"><strong>Your challenge</strong><p>${exercise.challenge}</p></div>
      ${projectBrief}
      <div class="workspace">
        <div class="editor-shell">
          <div class="editor-toolbar"><span>CSS editor</span><div class="toolbar-actions"><button type="button" data-action="copy">Copy</button><button type="button" data-action="reset">Reset</button></div></div>
          <textarea class="code-editor" aria-label="CSS editor for exercise ${index + 1}" spellcheck="false">${exercise.start}</textarea>
        </div>
        <div class="preview-shell">
          <div class="preview-title">Live result</div>
          <iframe class="preview" title="Result for exercise ${index + 1}" sandbox=""></iframe>
        </div>
      </div>
      <div class="exercise-actions">
        <button class="solution-button" type="button" data-action="solution">Show and run solution</button>
        <button type="button" data-action="complete">${completed.has(index) ? "Mark as incomplete" : "Mark as completed"}</button>
      </div>
      <div class="solution-explanation" hidden><strong>What is happening?</strong><br>${exercise.after}</div>
    </div>`;

  const editor = section.querySelector(".code-editor");
  const frame = section.querySelector(".preview");
  const status = section.querySelector(".status-pill");
  const explanation = section.querySelector(".solution-explanation");
  const completeButton = section.querySelector('[data-action="complete"]');
  const render = () => { frame.srcdoc = previewDocument(exercise.html, editor.value); };

  if (exercise.isProject) {
    section.querySelectorAll(".reference-card iframe").forEach(reference => {
      reference.srcdoc = previewDocument(exercise.html, exercise.solution);
    });
    section.querySelector('[data-action="copy-html"]').addEventListener("click", event => {
      copyText(exercise.htmlCode, event.currentTarget);
    });
  }

  editor.addEventListener("input", render);
  editor.addEventListener("keydown", event => {
    if (event.key === "Tab") {
      event.preventDefault();
      const start = editor.selectionStart;
      editor.setRangeText("  ", start, editor.selectionEnd, "end");
      render();
    }
  });
  section.querySelector('[data-action="copy"]').addEventListener("click", event => copyText(editor.value, event.currentTarget));
  section.querySelector('[data-action="reset"]').addEventListener("click", () => { editor.value = exercise.start; explanation.hidden = true; render(); });
  section.querySelector('[data-action="solution"]').addEventListener("click", () => { editor.value = exercise.solution; explanation.hidden = false; render(); });
  completeButton.addEventListener("click", () => {
    if (completed.has(index)) completed.delete(index); else completed.add(index);
    const done = completed.has(index);
    section.classList.toggle("is-complete", done);
    status.textContent = done ? "Completed ✓" : "To do";
    completeButton.textContent = done ? "Mark as incomplete" : "Mark as completed";
    updateProgress();
  });
  list.append(section);
  render();
});

document.querySelector("#reset-course").addEventListener("click", () => {
  completed.clear();
  localStorage.removeItem(storageKey);
  location.reload();
});

updateProgress();
