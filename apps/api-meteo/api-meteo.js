async function obtenerDatos() {
    try {
        const url = "https://api.open-meteo.com/v1/forecast?latitude=36.7507&longitude=-3.5179&hourly=temperature_2m,precipitation_probability&timezone=auto";
        const respuesta = await fetch(url);
        if (!respuesta.ok) throw new Error("Error al obtener los datos");
        const datos = await respuesta.json();   
        return datos;       
    } catch (error) {
        console.log(`Se ha producido el siguiente error: ${error}`)
    }
}

function calcularMedias(datos) {
    const temps = datos.hourly.temperature_2m;
    const lluvias = datos.hourly.precipitation_probability;

    const mediaTemp = temps.reduce((a, b) => a + b, 0) / temps.length;
    const mediaLluvia = lluvias.reduce((a, b) => a + b, 0) / lluvias.length;

    return {
        temperaturaMedia: mediaTemp.toFixed(0),
        probabilidadMediaLluvia: mediaLluvia.toFixed(0)
    };
}

function obtenerEmoji(probabilidad){
    const emojis = ["🌞", "⛅", "🌦️", "🌧️", "⛈️"];
    if(probabilidad === 0){
        return emojis[0];
    }
    else if(probabilidad > 0 && probabilidad <= 30){
        return emojis[1];
    }
    else if(probabilidad > 30 && probabilidad <=60){
        return emojis[2];
    }
    else if(probabilidad>60 && probabilidad <= 80){
        return emojis[3];
    }
    else{
        return emojis[4];
    }
}

function mostrarDatos(medias){
    document.querySelector("#temperatura").innerHTML = medias.temperaturaMedia;
    const emojiDia = obtenerEmoji(medias.probabilidadMediaLluvia);
    document.querySelector("#emojiDia").innerHTML = emojiDia;
}

obtenerDatos().then(resultado => {
    const datos = resultado;
    const medias = calcularMedias(datos);
    mostrarDatos(medias);
});