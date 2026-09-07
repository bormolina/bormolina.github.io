# BorLectures Copy/Paste Prompt

Create lecture notes using BorLectures.

Read the authoring guide before writing the HTML:
https://raw.githubusercontent.com/bormolina/borLectures/main/AUTHORING_FOR_AGENTS.md

Use these shared viewer files in the notes HTML:
https://cdn.jsdelivr.net/gh/bormolina/borLectures@main/theme-clear.css
https://cdn.jsdelivr.net/gh/bormolina/borLectures@main/styles.css
https://cdn.jsdelivr.net/gh/bormolina/borLectures@main/app.js

Create only:

- one semantic notes HTML file;
- a local `assets/` folder if images or diagrams are needed.

Do not modify BorLectures viewer code. Do not add frameworks, package managers, build tools, or dependencies.

The HTML body must contain only `#notesSource` with `article` sections. Each `article` must use `data-kicker` and `data-slide-type`. Supported slide types are `text`, `text-columns`, `text-image`, and `images`.
