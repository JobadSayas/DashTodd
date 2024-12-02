const version = "8.2";
const versionDiv = document.getElementById('version'); // Select the div with id 'version'
versionDiv.innerHTML = version; // Set the inner HTML to 'v' concatenated with the version number

const despertar = 7;
const siesta = 1;
const dormir = 7;
const ajusteMinutos = 0;


// Función para actualizar la hora y el semáforo
function actualizarHora() {
    // Formatear la hora y los minutos para que siempre tengan dos dígitos
    const formatoHoras = horas % 12 || 12; // Convertir a formato 12 horas
    const formatoMinutos = String(minutos).padStart(2, '0'); // Agregar cero a la izquierda si es necesario
    const ampm = horas >= 12 ? 'PM' : 'AM'; // Determinar AM o PM

    // Actualizar el contenido del elemento mostrarHora
    const mostrarHora = document.getElementById('mostrarHora');
    mostrarHora.innerHTML = `${formatoHoras}:${formatoMinutos} <small style="position: relative; top:-2px">${ampm}</small>`;

    // Cambiar la imagen y el fondo del módulo de la hora
    const imagenHora = document.getElementById('imagenHora'); // Seleccionar la imagen del módulo hora
    const contenedorHora = document.getElementById('hora'); // Contenedor padre del módulo de la hora
    
    if (horas >= 0 && horas < 6) { // 12:00 AM - 5:59 AM
        imagenHora.src = 'img/noche.jpg';
        contenedorHora.style.backgroundColor = '#312e81'; // bg-indigo-900
        mostrarHora.style.color = 'white'; // Cambiar a texto blanco
    } else if (horas >= 6 && horas < 7) { // 6:00 AM - 6:59 AM
        imagenHora.src = 'img/crepusculo.jpg';
        contenedorHora.style.backgroundColor = '#312e81'; // bg-indigo-900
        mostrarHora.style.color = 'white'; // Cambiar a texto blanco
    } else if (horas >= 7 && horas < 8) { // 7:00 AM - 8:59 AM
        imagenHora.src = 'img/amanecer.jpg';
        contenedorHora.style.backgroundColor = '#3b82f6'; // bg-blue-500
        mostrarHora.style.color = 'black'; // Texto negro
    } else if (horas >= 8 && horas < 11) { // 9:00 AM - 11:59 AM
        imagenHora.src = 'img/manana.jpg';
        contenedorHora.style.backgroundColor = '#7dd3fc'; // bg-sky-300
        mostrarHora.style.color = 'black'; // Texto negro
    } else if (horas >= 11 && horas < 14) { // 12:00 PM - 2:59 PM
        imagenHora.src = 'img/medio-dia.jpg';
        contenedorHora.style.backgroundColor = '#7dd3fc'; // bg-sky-300
        mostrarHora.style.color = 'black'; // Texto negro
    } else if (horas >= 14 && horas < 17) { // 3:00 PM - 5:59 PM
        imagenHora.src = 'img/tarde.jpg';
        contenedorHora.style.backgroundColor = '#7dd3fc'; // bg-sky-300
        mostrarHora.style.color = 'black'; // Texto negro
    } else if (horas >= 17 && horas < 18) { // 6:00 PM - 7:59 PM
        imagenHora.src = 'img/atardecer.jpg';
        contenedorHora.style.backgroundColor = '#fb923c'; // bg-orange-300
        mostrarHora.style.color = 'black'; // Texto negro
    } else { // 8:00 PM - 9:59 PM
        imagenHora.src = 'img/noche.jpg';
        contenedorHora.style.backgroundColor = '#312e81'; // bg-indigo-900
        mostrarHora.style.color = 'white'; // Cambiar a texto blanco
    }  
}



function actualizarSemaforo() {
    // Cambiar la imagen del semáforo según la hora
    const imagenSemaforo = document.getElementById('semaforoImg'); // Seleccionar la imagen del semáforo
    const contenedorSemaforo = document.getElementById('semaforo'); // Contenedor padre del semáforo
    
    // Cambios en el semáforo basados en rangos de hora
    if ((horas === 6 && minutos >= 45) || (horas === 7 && minutos < 0)) { 
        // Yellow 6:45 AM to 7:00 AM
        imagenSemaforo.src = 'img/amarillo.jpg';
        contenedorSemaforo.style.backgroundColor = '#facc15';
        iniciarCuentaRegresiva(7, 0);
    } else if ((horas >= 7 && horas < 12)) {
        // Green 7:00 AM to 12:00 PM
        imagenSemaforo.src = 'img/verde.jpg';
        contenedorSemaforo.style.backgroundColor = '#4ade80';
        ocultarCuentaRegresiva();
    } else if ((horas === 12 && minutos >= 0 && minutos < 30)) { 
        // Yellow 12:00 PM to 12:30 PM
        imagenSemaforo.src = 'img/amarillo.jpg';
        contenedorSemaforo.style.backgroundColor = '#facc15';
        iniciarCuentaRegresiva(12, 30);
    } else if ((horas === 12 && minutos >= 30) || (horas === 13 && minutos < 30)) {
        // Red 12:30 PM to 1:30 PM
        imagenSemaforo.src = 'img/rojo.jpg';
        contenedorSemaforo.style.backgroundColor = '#f87171';
        ocultarCuentaRegresiva();
    } else if ((horas === 13 && minutos >= 30) || (horas > 13 && horas < 19) || (horas === 19 && minutos < 30)) {
        // Green 1:30 PM to 7:30 PM
        imagenSemaforo.src = 'img/verde.jpg';
        contenedorSemaforo.style.backgroundColor = '#4ade80';
        ocultarCuentaRegresiva();
    }
    else if ((horas === 19 && minutos >= 30) || 
             (horas === 20 && minutos < 0)) { 
                imagenSemaforo.src = 'img/amarillo.jpg'; // Cambiar a amarillo
                contenedorSemaforo.style.backgroundColor = '#facc15'; // Fondo amarillo
                iniciarCuentaRegresiva(20, 0);
    }
    else if ((horas >= 20 && horas < 24) || // De 20:00 a 23:59
             (horas >= 0 && horas < 6) ||   // De 00:00 a 5:59
             (horas === 6 && minutos < 45)) {  // Hasta 6:44
                imagenSemaforo.src = 'img/rojo.jpg'; // Cambiar a rojo
                contenedorSemaforo.style.backgroundColor = '#f87171'; // Fondo rojo
                ocultarCuentaRegresiva(); // Ocultar cuenta regresiva
    }    
}


let intervalo; // Variable para almacenar el intervalo globalmente

function iniciarCuentaRegresiva(horaObjetivo, minutoObjetivo) {
    const cuentaRegresivaDiv = document.getElementById('minutes-left');
    cuentaRegresivaDiv.style.display = 'block'; // Mostrar el div

    function actualizarCuentaRegresiva() {
        // Obtener la fecha y hora actual
        const horaActual = ahora.getHours();
        const minutoActual = ahora.getMinutes();

        // Crear un objeto Date para la hora actual y el tiempo objetivo
        const ahoraEnMinutos = horaActual * 60 + minutoActual;
        const objetivoEnMinutos = horaObjetivo * 60 + minutoObjetivo;

        // Calcular la diferencia en minutos (teniendo en cuenta cambio de día si es necesario)
        let minutosRestantes = objetivoEnMinutos - ahoraEnMinutos;
        if (minutosRestantes < 0) {
            minutosRestantes += 24 * 60; // Añadir 24 horas en minutos si el objetivo es el día siguiente
        }

        // Actualizar el div con los minutos restantes
        cuentaRegresivaDiv.innerHTML = `${minutosRestantes}`;

        // Detener la cuenta regresiva cuando llegue a 0
        if (minutosRestantes <= 0) {
            clearInterval(intervalo); // Limpiar el intervalo
            cuentaRegresivaDiv.style.display = 'none'; // Ocultar el div
        }
    }

    // Ejecutar el cálculo de inmediato y luego cada minuto
    actualizarCuentaRegresiva(); // Llamada inicial
    const intervalo = setInterval(actualizarCuentaRegresiva, 60000); // Actualización cada minuto
}


// Nueva función para ocultar la cuenta regresiva
function ocultarCuentaRegresiva() {
    const cuentaRegresivaDiv = document.getElementById('minutes-left');
    cuentaRegresivaDiv.style.display = 'none'; // Ocultar el div
}

// Función para actualizar el calendario
function actualizarCalendario() {

    const diaActualMes = ahora.getDate(); // Día actual del mes
    const diaSemana = ahora.getDay(); // Día de la semana (0=Domingo, 6=Sábado)

    // Obtener el primer día de la semana (domingo)
    const primerDiaDeLaSemana = new Date(ahora);
    primerDiaDeLaSemana.setDate(diaActualMes - diaSemana);

    // Función para verificar si un año es bisiesto
    function esBisiesto(anio) {
        return (anio % 4 === 0 && anio % 100 !== 0) || (anio % 400 === 0);
    }

    // Función para obtener el último día del mes actual
    function ultimoDiaDelMes(anio, mes) {
        const diasEnMes = [31, esBisiesto(anio) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        return diasEnMes[mes];
    }

    // Obtener el último día del mes actual
    const ultimoDiaDelMesActual = ultimoDiaDelMes(ahora.getFullYear(), ahora.getMonth());

    // Obtener los elementos de los días de la semana
    const diasDeLaSemana = [
        document.getElementById('domingo'),
        document.getElementById('lunes'),
        document.getElementById('martes'),
        document.getElementById('miercoles'),
        document.getElementById('jueves'),
        document.getElementById('viernes'),
        document.getElementById('sabado'),
    ];

    let dia = primerDiaDeLaSemana.getDate(); // Día inicial de la semana
    let mesActual = primerDiaDeLaSemana.getMonth(); // Mes actual de la semana
    let anioActual = primerDiaDeLaSemana.getFullYear(); // Año actual de la semana

    diasDeLaSemana.forEach((elementoDia, index) => {
        elementoDia.style.color = "black"; // Reiniciar el color de texto a negro

        // Si el día excede el último día del mes actual, cambiar al siguiente mes
        if (dia > ultimoDiaDelMes(anioActual, mesActual)) {
            dia = 1; // Reiniciar día a 1
            mesActual++; // Avanzar al siguiente mes
            if (mesActual > 11) { // Si excede diciembre, avanzar al siguiente año
                mesActual = 0;
                anioActual++;
            }
        }

        // Si el día es menor que 1, retroceder al mes anterior
        if (dia < 1) {
            mesActual--; // Retroceder al mes anterior
            if (mesActual < 0) { // Si retrocede antes de enero, retroceder al año anterior
                mesActual = 11;
                anioActual--;
            }
            dia = ultimoDiaDelMes(anioActual, mesActual); // Obtener el último día del mes anterior
        }

        // Actualizar el contenido del elemento del día
        elementoDia.innerHTML = dia;

        // Cambiar el color si es el día actual
        if (index === diaSemana) {
            elementoDia.style.color = "red"; // Resaltar el día actual en rojo
        }

        // Incrementar el día para la siguiente iteración
        dia++;
    });
}



let temperatura = 0;
let airSpeed = 0;
let icon = '';
// Función para obtener y mostrar la temperatura actual
async function mostrarTemperatura() {
    const apiKey = 'MJKZY85NQXXSP4NGC69T62JS9';
    const ciudad = 'Bentonville,AR';
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${ciudad}?key=${apiKey}`;

    try {
        const respuesta = await fetch(url);
        const datos = await respuesta.json();

        // Redondear la temperatura
        temperatura = Math.round(datos.currentConditions.feelslike); // Actualiza la variable global
        airSpeed = Math.round(datos.currentConditions.windspeed); // Actualiza la variable global
        icon = datos.currentConditions.icon;

        let airSpeedDiv = document.getElementById('airSpeed'); // Select the div with id 'version'
        airSpeedDiv.innerHTML = airSpeed; // Set the inner HTML to 'v' concatenated with the version number

        document.getElementById("icon").src = `img/icons/${icon}.svg`;

        
        // Limitar la temperatura entre 0 y 100
        if (temperatura < 0) {
            temperatura = 0;
        } else if (temperatura > 100) {
            temperatura = 100;
        }
        
        // Actualizar el span del clima
        const climaSpan = document.getElementById('clima').getElementsByTagName('span')[0];
        climaSpan.innerHTML = temperatura; // Mostrar solo la temperatura redondeada

        // Actualizar la posición del termómetro
        actualizarTemperatura(); // Llamar a la función para actualizar la posición
    } catch (error) {
        console.error('Error al obtener la temperatura:', error);
    }
}


// Función para actualizar la posición del span según la temperatura
function actualizarTemperatura() {
    const spanClima = document.getElementById('clima').getElementsByTagName('span')[0];
    
    // Calcular el valor de left según la escala del termómetro
    const leftValue = (temperatura / 100) * 220; // Convertir la temperatura a la escala del termómetro
    
    // Actualizar la propiedad left del span
    spanClima.style.left = `${leftValue}px`;
}

//Funcion para mostrar la coritna
function mostrarCortina() {
    const cortinaDiv = document.getElementById('cortina'); // Seleccionar el div con id 'cortina'

    // Mostrar el div #cortina solo entre las 10:00 PM y las 6:00 AM
    if (horas >= 22 || horas < 6) { // 10:00 PM (22) a 5:59 AM (5)
        cortinaDiv.style.display = 'block'; // Mostrar el div
    } else {
        cortinaDiv.style.display = 'none'; // Ocultar el div
    }
}

//Fan air speed
let angle = 0; // Starting angle of rotation
const fan = document.getElementById("fan");

// Function to update rotation
function rotateFan() {
    angle = (angle + airSpeed) % 360; // Update angle with current speed
    fan.style.transform = `rotate(${angle}deg)`; // Apply rotation to fan image
}

// Start the rotation with a setInterval
setInterval(rotateFan, 30); // Adjust interval for smoother or faster animation


let ahora = 0;
let horas = 0;
let minutos = 0;
// Llamar a las funciones de actualización cada segundo
setInterval(() => {
    // ahora = new Date(); // Obtener la hora actual
    ahora = new Date("Oct 6 2024 13:31:42 GMT-0500 (Central Daylight Time");
    horas = ahora.getHours(); // Obtener las horas
    minutos = ahora.getMinutes(); // Obtener los minutos
    actualizarHora();
    actualizarSemaforo();
    actualizarCalendario(); // Actualizar el calendario
    mostrarCortina() // Mostrar coritna
}, 1000); //cada segundo

// Recargar api / Comment when on development
// setInterval(() => {
//     mostrarTemperatura(); // Actualizar la temperatura
// }, 600000); // cada 15 mins
// mostrarTemperatura();

// Recargar la página
// setInterval(() => {
//     location.reload(); // Recargar la página
// }, 3600000); // cada 60 mins