const nTemas = temas.length
let selected = getRandomInt(0, nTemas-1)
let tema = temas[selected] 
const gui_rta = document.getElementById("rta")
const gui_lta = document.getElementById("lta")
const gui_selector = document.getElementById("selectorTema")

window.onload = (event) => {
  const gui_nTemas = document.getElementById("nTemas")
  const gui_prob = document.getElementById("proba")
  gui_nTemas.textContent = nTemas
  gui_prob.textContent = prob(nTemas)
  temaAleatorio()
  agregarTemas()
  gui_selector.value = tema.nombre
}

function agregarTemas(){
  temas.forEach(tema =>{
    const opt = document.createElement('option');
    opt.value = tema.nombre;
    opt.innerHTML = tema.nombre;
    gui_selector.appendChild(opt);
  })
}

function temaAleatorio(){ 
  selected = getRandomInt(0, nTemas-1) 
  tema = temas[selected]
  gui_selector.value = tema.nombre
  gui_rta.textContent = ""
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function selectHandler(selectionItem){
  tema = temas[selectionItem.selectedIndex]
}

function verTema(){
  const lineas = tema.indice
  const nuevas_lineas = lineas.map(linea =>{
    const nPuntos = (linea.match(/\./g)||[]).length
    const nSpaces = 2*(nPuntos-1)
    const spaces = " ".repeat(nSpaces)
    return spaces+linea
  })
  gui_rta.textContent = nuevas_lineas.join("\n")
}

function friendlyTab(e){
  if (e.key == 'Tab') {
    e.preventDefault();
    var start = gui_lta.selectionStart;
    var end = gui_lta.selectionEnd;

    // set textarea value to: text before caret + tab + text after caret
    gui_lta.value = gui_lta.value.substring(0, start) +
      "  " + gui_lta.value.substring(end);

    // put caret at right position again
    this.selectionStart =
      this.selectionEnd = start + 1;
  }
}

function prob(nTemas){
  return ((1-(74-nTemas)/74*(73-nTemas)/73*(72-nTemas)/72*(71-nTemas)/71)*100).toFixed(2)
}
