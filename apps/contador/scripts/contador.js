const contador = document.querySelector("#contador");
const boton_sumar = document.querySelector("#boton_sumar");
const boton_restar = document.querySelector("#boton_restar");
const boton_contar = document.querySelector("#boton_contar");
const disabled_ui = [boton_sumar, boton_restar, boton_contar];
const ring_ring = document.querySelector("#ring_ring");

boton_sumar.addEventListener("click", function(){
    let valor_contador = parseInt(contador.innerHTML);
    valor_contador += 1;
    contador.innerHTML = valor_contador;
    ring_ring.classList.remove("show");
})

boton_restar.addEventListener("click", function(){
    let valor_contador = parseInt(contador.innerHTML);
    if(valor_contador>0){
            valor_contador -= 1;
            contador.innerHTML = valor_contador;
    }
})

boton_contar.addEventListener("click", function(){
    let valor_contador = parseInt(contador.innerHTML);
    if(valor_contador > 0){
        disabled_ui.map(x=>x.disabled = true);
    }
    if(valor_contador>0){
        const id_clock = setInterval(function(){
            valor_contador -= 1;
            contador.innerHTML = valor_contador;
            if(valor_contador===0){
                clearInterval(id_clock);
                ring_ring.classList.add("show");
                disabled_ui.map(disabled_ui.map(x=>x.disabled = false));
            }
        }, 1000);
    }
})
