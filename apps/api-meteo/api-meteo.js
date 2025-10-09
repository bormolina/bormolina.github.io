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

datos_meteorologicos = obtenerDatos();
console.log(datos_meteorologicos)