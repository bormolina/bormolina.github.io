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
        temperaturaMedia: mediaTemp.toFixed(1),
        probabilidadMediaLluvia: mediaLluvia.toFixed(1)
    };
}

obtenerDatos().then(resultado => {
    const datos = resultado;
    const medias = calcularMedias(datos);
    console.log(`Temperatura media: ${medias.temperaturaMedia} °C`);
    console.log(`Probabilidad media de lluvia: ${medias.probabilidadMediaLluvia} %`);
});