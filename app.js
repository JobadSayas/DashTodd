const version = "2.20";
const versionDiv = document.getElementById('version'); // Select the div with id 'version'
versionDiv.innerHTML = `v${version}`; // Set the inner HTML to 'v' concatenated with the version number

const despertar = 6;
const siesta = 1;
const dormir = 8;
const ajusteMinutos = 15;


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
    } else if (horas >= 7 && horas < 9) { // 7:00 AM - 8:59 AM
        imagenHora.src = 'img/amanecer.jpg';
        contenedorHora.style.backgroundColor = '#3b82f6'; // bg-blue-500
        mostrarHora.style.color = 'black'; // Texto negro
    } else if (horas >= 9 && horas < 12) { // 9:00 AM - 11:59 AM
        imagenHora.src = 'img/manana.jpg';
        contenedorHora.style.backgroundColor = '#7dd3fc'; // bg-sky-300
        mostrarHora.style.color = 'black'; // Texto negro
    } else if (horas >= 12 && horas < 15) { // 12:00 PM - 2:59 PM
        imagenHora.src = 'img/medio-dia.jpg';
        contenedorHora.style.backgroundColor = '#7dd3fc'; // bg-sky-300
        mostrarHora.style.color = 'black'; // Texto negro
    } else if (horas >= 15 && horas < 18) { // 3:00 PM - 5:59 PM
        imagenHora.src = 'img/tarde.jpg';
        contenedorHora.style.backgroundColor = '#7dd3fc'; // bg-sky-300
        mostrarHora.style.color = 'black'; // Texto negro
    } else if (horas >= 18 && horas < 20) { // 6:00 PM - 7:59 PM
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
    if ((horas === 6 && minutos >= ajusteMinutos) || 
        (horas === 7 && minutos < ajusteMinutos)) { // 12:15 PM
            imagenSemaforo.src = 'img/amarillo.jpg'; // Cambiar a amarillo
            contenedorSemaforo.style.backgroundColor = '#facc15'; // Fondo amarillo
            iniciarCuentaRegresiva(); // Iniciar la cuenta regresiva
    } 
    else if ((horas > 7 || 
             (horas === 7 && minutos >= ajusteMinutos)) && 
             (horas < 12 || 
             (horas === 12 && minutos < ajusteMinutos))) {
                imagenSemaforo.src = 'img/verde.jpg'; // Cambiar a verde
                contenedorSemaforo.style.backgroundColor = '#4ade80'; // Fondo verde
                ocultarCuentaRegresiva(); // Ocultar cuenta regresiva
    }
    else if ((horas === 12 && minutos >= ajusteMinutos) || 
             (horas === 13 && minutos < ajusteMinutos)) {
                imagenSemaforo.src = 'img/amarillo.jpg'; // Cambiar a amarillo
                contenedorSemaforo.style.backgroundColor = '#facc15'; // Fondo amarillo
                iniciarCuentaRegresiva(); // Iniciar cuenta regresiva
    }
    else if ((horas === 13 && minutos >= ajusteMinutos) || 
             (horas === 14 && minutos < ajusteMinutos)) {
                imagenSemaforo.src = 'img/rojo.jpg'; // Cambiar a rojo
                contenedorSemaforo.style.backgroundColor = '#f87171'; // Fondo rojo
                ocultarCuentaRegresiva(); // Ocultar cuenta regresiva
    }
    else if ((horas > 14 || 
             (horas === 14 && minutos >= ajusteMinutos)) && 
             (horas < 19 || 
             (horas === 19 && minutos < ajusteMinutos))) {
                imagenSemaforo.src = 'img/verde.jpg'; // Cambiar a verde
                contenedorSemaforo.style.backgroundColor = '#4ade80'; // Fondo verde
                ocultarCuentaRegresiva(); // Ocultar cuenta regresiva
    }
    else if ((horas === 19 && minutos >= ajusteMinutos) || 
             (horas === 20 && minutos < ajusteMinutos)) { // 12:15 PM
                imagenSemaforo.src = 'img/amarillo.jpg'; // Cambiar a amarillo
                contenedorSemaforo.style.backgroundColor = '#facc15'; // Fondo amarillo
                iniciarCuentaRegresiva(); // Iniciar cuenta regresiva
    }
    else if ((horas === 20 && minutos >= ajusteMinutos) || // 8:15 PM to 8:59 PM
             (horas > 20 && horas < 24) ||      // 9:00 PM to 11:59 PM
             (horas >= 0 && horas < 6) ||       // 12:00 AM to 5:59 AM
             (horas === 6 && minutos < ajusteMinutos)) {  // 6:00 AM to 6:15 AM
                imagenSemaforo.src = 'img/rojo.jpg'; // Cambiar a rojo
                contenedorSemaforo.style.backgroundColor = '#f87171'; // Fondo rojo
                ocultarCuentaRegresiva(); // Ocultar cuenta regresiva
    }    
}


function iniciarCuentaRegresiva() {
    const cuentaRegresivaDiv = document.getElementById('minutes-left');
    cuentaRegresivaDiv.style.display = 'block'; // Mostrar el div

    const minutosActuales = ahora.getMinutes(); // Obtener minutos actuales
    const minutosSiguienteAjuste = (60 - ajusteMinutos) + ajusteMinutos; // Calcula el siguiente ajuste

    // Si estamos dentro de la misma hora
    if (minutosActuales < ajusteMinutos) {
        const minutosRestantes = ajusteMinutos - minutosActuales;
        cuentaRegresivaDiv.innerHTML = `${minutosRestantes}`; // Mostrar los minutos restantes
    }
    // Si ya hemos pasado el ajuste de la hora, cuenta hasta el ajuste de la siguiente hora
    else {
        const minutosRestantes = (60 - minutosActuales) + ajusteMinutos;
        cuentaRegresivaDiv.innerHTML = `${minutosRestantes}`; // Mostrar los minutos restantes
    }
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

let ahora = 0;
let horas = 0;
let minutos = 0;
// Llamar a las funciones de actualización cada segundo
setInterval(() => {
    ahora = new Date(); // Obtener la hora actual
    // ahora = new Date("Oct 3 2024 13:14:42 GMT-0500 (Central Daylight Time");
    horas = ahora.getHours(); // Obtener las horas
    minutos = ahora.getMinutes(); // Obtener los minutos
    actualizarHora();
    actualizarSemaforo();
    actualizarCalendario(); // Actualizar el calendario
    mostrarCortina() // Mostrar coritna
}, 1000); //cada segundo

// Recargar api
setInterval(() => {
    mostrarTemperatura(); // Actualizar la temperatura
}, 1800000); // cada 30 mins
mostrarTemperatura();

// Recargar la página
// setInterval(() => {
//     location.reload(); // Recargar la página
// }, 3600000); // cada 60 mins