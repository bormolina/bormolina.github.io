const exercises = [
  {
    title: "Your first grid",
    concept: "display: grid · grid-template-columns · fr · repeat()",
    explanation: "A grid container is created with display: grid. Its direct children become grid items. Columns are defined with grid-template-columns. The fr unit means ‘one fraction of the available space’, so 1fr 1fr 1fr creates three equal columns. repeat(3, 1fr) is a shorter way to write exactly the same thing.",
    challenge: "Turn .grid into a grid container. Then use grid-template-columns and repeat(3, 1fr) to create three equal columns.",
    html: `<div class="grid">\n  <div class="item">HTML</div>\n  <div class="item">CSS</div>\n  <div class="item">Grid</div>\n</div>`,
    start: `.grid {\n  /* Write your code here */\n}\n\n.item {\n  padding: 2rem 1rem;\n  text-align: center;\n  background: #ff5a36;\n  color: white;\n}`,
    solution: `.grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n}\n\n.item {\n  padding: 2rem 1rem;\n  text-align: center;\n  background: #ff5a36;\n  color: white;\n}`,
    after: "display: grid activates the grid layout. grid-template-columns describes its columns. repeat(3, 1fr) repeats 1fr three times, giving every column an equal share of the available width."
  },
  {
    title: "Add space with gap",
    concept: "gap",
    explanation: "Grid items do not have to touch. The gap property adds space only between grid rows and columns, without adding a margin around the outside of the container.",
    challenge: "Keep the three columns and add a 16px gap. Then try a different value and observe the result.",
    html: `<div class="grid">\n  <div class="item">1</div><div class="item">2</div><div class="item">3</div>\n  <div class="item">4</div><div class="item">5</div><div class="item">6</div>\n</div>`,
    start: `.grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  /* Add space between the cells */\n}\n\n.item {\n  padding: 1.5rem;\n  text-align: center;\n  border: 2px solid #172121;\n  background: #f5f1e8;\n}`,
    solution: `.grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 16px;\n}\n\n.item {\n  padding: 1.5rem;\n  text-align: center;\n  border: 2px solid #172121;\n  background: #f5f1e8;\n}`,
    after: "gap: 16px separates both columns and rows. You can also use column-gap, row-gap, or two values: gap: 12px 24px."
  },
  {
    title: "Columns that adapt",
    concept: "minmax() + auto-fit",
    explanation: "A grid can work out how many columns fit. auto-fit creates as many columns as possible, while minmax() prevents them from becoming too narrow.",
    challenge: "Make every card at least 150px wide and let the available columns share the remaining space.",
    html: `<div class="grid">\n  <article class="card">🌱<strong>Seed</strong></article>\n  <article class="card">🌿<strong>Sprout</strong></article>\n  <article class="card">🌳<strong>Tree</strong></article>\n  <article class="card">🍎<strong>Fruit</strong></article>\n</div>`,
    start: `.grid {\n  display: grid;\n  gap: 12px;\n  /* Create the responsive columns here */\n}\n\n.card {\n  display: grid;\n  gap: .5rem;\n  padding: 1.5rem;\n  border-radius: 8px;\n  background: #155e4a;\n  color: white;\n  font-size: 2rem;\n}\n.card strong { font-size: 1rem; }`,
    solution: `.grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));\n  gap: 12px;\n}\n\n.card {\n  display: grid;\n  gap: .5rem;\n  padding: 1.5rem;\n  border-radius: 8px;\n  background: #155e4a;\n  color: white;\n  font-size: 2rem;\n}\n.card strong { font-size: 1rem; }`,
    after: "auto-fit adjusts the number of columns. minmax(150px, 1fr) means: never narrower than 150px and, when space is available, grow proportionally."
  },
  {
    title: "Make one item stand out",
    concept: "grid-column",
    explanation: "Items can span several cells. The vertical grid lines are numbered from 1. We position an item by stating the line where it starts and the line where it ends.",
    challenge: "Make the featured card span the full width, from the first to the last grid line.",
    html: `<div class="grid">\n  <article class="card featured">Featured</article>\n  <article class="card">Article 1</article>\n  <article class="card">Article 2</article>\n  <article class="card">Article 3</article>\n</div>`,
    start: `.grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 12px;\n}\n.featured {\n  /* It should span every column */\n}\n.card {\n  min-height: 100px;\n  padding: 1rem;\n  border: 2px solid #172121;\n  background: #f5f1e8;\n}\n.featured { background: #ffb23f; }`,
    solution: `.grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 12px;\n}\n.featured {\n  grid-column: 1 / -1;\n}\n.card {\n  min-height: 100px;\n  padding: 1rem;\n  border: 2px solid #172121;\n  background: #f5f1e8;\n}\n.featured { background: #ffb23f; }`,
    after: "grid-column: 1 / -1 starts at the first line and ends at the last one. It is a reliable way to span the full width even when the number of columns changes."
  },
  {
    title: "Draw the layout",
    concept: "grid-template-areas",
    explanation: "Grid areas let us name the parts of an interface and draw their arrangement. This makes the layout easy to read: header, sidebar, main and footer.",
    challenge: "Assign every block to its area to complete the layout. The areas have already been drawn on the container.",
    html: `<div class="layout">\n  <header>Header</header>\n  <aside>Menu</aside>\n  <main>Main content</main>\n  <footer>Footer</footer>\n</div>`,
    start: `.layout {\n  display: grid;\n  grid-template-columns: 140px 1fr;\n  grid-template-rows: auto 200px auto;\n  grid-template-areas:\n    "header header"\n    "sidebar main"\n    "footer footer";\n  gap: 10px;\n}\n/* Assign a grid-area to each element */\nheader, aside, main, footer { padding: 1rem; }\nheader { background: #ff5a36; color: white; }\naside { background: #ffb23f; }\nmain { background: #dce8e4; }\nfooter { background: #172121; color: white; }`,
    solution: `.layout {\n  display: grid;\n  grid-template-columns: 140px 1fr;\n  grid-template-rows: auto 200px auto;\n  grid-template-areas:\n    "header header"\n    "sidebar main"\n    "footer footer";\n  gap: 10px;\n}\nheader { grid-area: header; background: #ff5a36; color: white; }\naside { grid-area: sidebar; background: #ffb23f; }\nmain { grid-area: main; background: #dce8e4; }\nfooter { grid-area: footer; background: #172121; color: white; }\nheader, aside, main, footer { padding: 1rem; }`,
    after: "Each grid-area connects an element to a name in the layout drawing. Repeating a name makes that area span several cells."
  },
  {
    title: "Final responsive project",
    concept: "Grid + @media",
    explanation: "Your final task brings the lesson together. You will reproduce the same portfolio at two screen sizes. On mobile, every section appears in one column. On desktop, the profile becomes a sidebar and the projects sit beside it. The project cards must also adapt to the available width.",
    challenge: "Create a folder with index.html and styles.css. Copy the HTML provided below into index.html, link your stylesheet and write the CSS needed to match both reference views. Resize your browser regularly while you work.",
    isProject: true,
    html: `<div class="portfolio">\n  <aside class="profile">\n    <div class="avatar">BM</div><strong>Borja</strong><span>Teacher</span>\n  </aside>\n  <section class="projects">\n    <h2>Projects</h2>\n    <div class="project-grid">\n      <article>Binary</article><article>Networks</article><article>CSS Grid</article>\n    </div>\n  </section>\n</div>`,
    htmlCode: `<!doctype html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1" />\n    <title>My portfolio</title>\n    <link rel="stylesheet" href="styles.css" />\n  </head>\n  <body>\n    <div class="portfolio">\n      <aside class="profile">\n        <div class="avatar">BM</div>\n        <strong>Borja</strong>\n        <span>Teacher</span>\n      </aside>\n\n      <main class="projects">\n        <h2>Projects</h2>\n        <div class="project-grid">\n          <article>Binary</article>\n          <article>Networks</article>\n          <article>CSS Grid</article>\n        </div>\n      </main>\n    </div>\n  </body>\n</html>`,
    start: `/* Write your styles.css here. */\n\n* {\n  box-sizing: border-box;\n}\n\nbody {\n  margin: 0;\n  padding: 24px;\n  font-family: system-ui, sans-serif;\n}\n\n/* Start with the mobile layout, then add a media query. */`,
    solution: `.portfolio {\n  display: grid;\n  gap: 24px;\n}\n.profile { padding: 1.5rem; background: #172121; color: white; }\n.profile span, .profile strong { display: block; margin-top: .4rem; }\n.avatar { display: grid; place-items: center; width: 58px; aspect-ratio: 1; border-radius: 50%; background: #ff5a36; font-weight: bold; }\n.projects h2 { margin-top: 0; }\n.project-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(110px, 1fr)); gap: 10px; }\n.project-grid article { padding: 1.25rem; background: #f5f1e8; border: 1px solid #ccc4b5; }\n\n@media (min-width: 520px) {\n  .portfolio {\n    grid-template-columns: 140px 1fr;\n    align-items: start;\n  }\n}`,
    after: "The base layout works on mobile. The media query only adds complexity when there is enough room. This approach is known as mobile first."
  }
];

const list = document.querySelector("#exercise-list");
const completed = new Set(JSON.parse(localStorage.getItem("grid-course-completed") || "[]"));

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
  localStorage.setItem("grid-course-completed", JSON.stringify([...completed]));
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
          <p>Your page must move between these two layouts. The content stays the same; only the CSS changes.</p>
        </div>
        <div class="reference-views">
          <figure class="reference-card reference-card--desktop">
            <figcaption>Desktop · two-column layout</figcaption>
            <iframe title="Desktop reference for the final project" sandbox=""></iframe>
          </figure>
          <figure class="reference-card reference-card--mobile">
            <figcaption>Mobile · stacked layout</figcaption>
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
        <p>Use the editor to experiment, then move your finished CSS into <code>styles.css</code>. Your result should work at widths between the two references too.</p>
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
  localStorage.removeItem("grid-course-completed");
  location.reload();
});

updateProgress();
