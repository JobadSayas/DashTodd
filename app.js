// Versión 1.19

// Función para actualizar la hora y el semáforo
function actualizarHoraYSemaforo() {
    const ahora = new Date(); // Obtener la hora actual
    const horas = ahora.getHours(); // Obtener las horas
    const minutos = ahora.getMinutes(); // Obtener los minutos

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
        contenedorHora.classList.add('bg-indigo-900');
        contenedorHora.classList.remove('bg-blue-500', 'bg-sky-300', 'bg-orange-300'); // Eliminar otras clases
        mostrarHora.style.color = 'white'; // Cambiar a texto blanco
    } else if (horas >= 6 && horas < 7) { // 6:00 AM - 6:59 AM
        imagenHora.src = 'img/crepusculo.jpg';
        contenedorHora.classList.add('bg-indigo-900');
        contenedorHora.classList.remove('bg-blue-500', 'bg-sky-300', 'bg-orange-300'); // Eliminar otras clases
        mostrarHora.style.color = 'white'; // Cambiar a texto blanco
    } else if (horas >= 7 && horas < 8) { // 7:00 AM - 7:59 AM
        imagenHora.src = 'img/amanecer.jpg';
        contenedorHora.classList.add('bg-blue-500');
        contenedorHora.classList.remove('bg-indigo-900', 'bg-sky-300', 'bg-orange-300'); // Eliminar otras clases
        mostrarHora.style.color = 'black'; // Texto negro
    } else if (horas >= 8 && horas < 12) { // 8:00 AM - 11:59 AM
        imagenHora.src = 'img/manana.jpg';
        contenedorHora.classList.add('bg-sky-300');
        contenedorHora.classList.remove('bg-indigo-900', 'bg-blue-500', 'bg-orange-300'); // Eliminar otras clases
        mostrarHora.style.color = 'black'; // Texto negro
    } else if (horas >= 12 && horas < 13) { // 12:00 PM - 12:59 PM
        imagenHora.src = 'img/medio-dia.jpg';
        contenedorHora.classList.add('bg-sky-300');
        contenedorHora.classList.remove('bg-indigo-900', 'bg-blue-500', 'bg-orange-300'); // Eliminar otras clases
        mostrarHora.style.color = 'black'; // Texto negro
    } else if (horas >= 13 && horas < 14) { // 1:00 PM - 1:59 PM
        imagenHora.src = 'img/medio-dia.jpg';
        contenedorHora.classList.add('bg-sky-300');
        contenedorHora.classList.remove('bg-indigo-900', 'bg-blue-500', 'bg-orange-300'); // Eliminar otras clases
        mostrarHora.style.color = 'black'; // Texto negro
    } else if (horas >= 14 && horas < 19) { // 2:00 PM - 6:59 PM
        imagenHora.src = 'img/tarde.jpg';
        contenedorHora.classList.add('bg-sky-300');
        contenedorHora.classList.remove('bg-indigo-900', 'bg-blue-500', 'bg-orange-300'); // Eliminar otras clases
        mostrarHora.style.color = 'black'; // Texto negro
    } else if (horas >= 19 && horas < 20) { // 7:00 PM - 7:59 PM
        imagenHora.src = 'img/atardecer.jpg';
        contenedorHora.classList.add('bg-orange-300');
        contenedorHora.classList.remove('bg-indigo-900', 'bg-blue-500', 'bg-sky-300'); // Eliminar otras clases
        mostrarHora.style.color = 'black'; // Texto negro
    } else { // 8:00 PM - 11:59 PM
        imagenHora.src = 'img/noche.jpg';
        contenedorHora.classList.add('bg-indigo-900');
        contenedorHora.classList.remove('bg-blue-500', 'bg-sky-300', 'bg-orange-300'); // Eliminar otras clases
        mostrarHora.style.color = 'white'; // Cambiar a texto blanco
    }

    // Cambiar la imagen del semáforo según la hora
    const imagenSemaforo = document.getElementById('semaforoImg'); // Seleccionar la imagen del semáforo
    const contenedorSemaforo = document.getElementById('semaforo'); // Contenedor padre del semáforo
    
    // Cambios en el semáforo basados en rangos de hora
    if (horas >= 0 && horas < 6) { // 12:00 AM - 5:59 AM
        imagenSemaforo.src = 'img/rojo.jpg'; // Cambiar a imagen roja
        contenedorSemaforo.classList.add('bg-red-300'); // Cambiar el fondo a rojo
        contenedorSemaforo.classList.remove('bg-green-200', 'bg-yellow-200'); // Eliminar otros colores
    } else if (horas === 6) { // 6:00 AM
        imagenSemaforo.src = 'img/amarillo.jpg'; // Cambiar a imagen amarilla
        contenedorSemaforo.classList.add('bg-yellow-200'); // Cambiar el fondo a amarillo
        contenedorSemaforo.classList.remove('bg-green-200', 'bg-red-300'); // Eliminar otros colores
    } else if (horas === 7) { // 7:00 AM
        imagenSemaforo.src = 'img/verde.jpg'; // Cambiar a imagen verde
        contenedorSemaforo.classList.add('bg-green-200'); // Cambiar el fondo a verde
        contenedorSemaforo.classList.remove('bg-yellow-200', 'bg-red-300'); // Eliminar otros colores
    } else if (horas === 12) { // 12:00 PM
        imagenSemaforo.src = 'img/amarillo.jpg'; // Cambiar a imagen amarilla
        contenedorSemaforo.classList.add('bg-yellow-200'); // Cambiar el fondo a amarillo
        contenedorSemaforo.classList.remove('bg-green-200', 'bg-red-300'); // Eliminar otros colores
    } else if (horas === 13) { // 1:00 PM
        imagenSemaforo.src = 'img/rojo.jpg'; // Cambiar a imagen roja
        contenedorSemaforo.classList.add('bg-red-300'); // Cambiar el fondo a rojo
        contenedorSemaforo.classList.remove('bg-green-200', 'bg-yellow-200'); // Eliminar otros colores
    } else if (horas === 19) { // 7:00 PM
        imagenSemaforo.src = 'img/amarillo.jpg'; // Cambiar a imagen amarilla
        contenedorSemaforo.classList.add('bg-yellow-200'); // Cambiar el fondo a amarillo
        contenedorSemaforo.classList.remove('bg-green-200', 'bg-red-300'); // Eliminar otros colores
    } else if (horas >= 8 && horas < 12) { // 8:00 AM - 11:59 AM
        imagenSemaforo.src = 'img/verde.jpg'; // Cambiar a imagen verde
        contenedorSemaforo.classList.add('bg-green-200'); // Cambiar el fondo a verde
        contenedorSemaforo.classList.remove('bg-yellow-200', 'bg-red-300'); // Eliminar otros colores
    } else if (horas >= 14 && horas < 19) { // 2:00 PM - 6:59 PM
        imagenSemaforo.src = 'img/verde.jpg'; // Cambiar a imagen verde
        contenedorSemaforo.classList.add('bg-green-200'); // Cambiar el fondo a verde
        contenedorSemaforo.classList.remove('bg-yellow-200', 'bg-red-300'); // Eliminar otros colores
    } else { // 8:00 PM - 11:59 PM
        imagenSemaforo.src = 'img/rojo.jpg'; // Cambiar a imagen roja
        contenedorSemaforo.classList.add('bg-red-300'); // Cambiar el fondo a rojo
        contenedorSemaforo.classList.remove('bg-green-200', 'bg-yellow-200'); // Eliminar otros colores
    }
}

// Función para actualizar el calendario
function actualizarCalendario() {
    const hoy = new Date(); // Obtener la fecha actual
    const primerDiaDeLaSemana = hoy.getDate() - hoy.getDay(); // Obtener el primer día de la semana (domingo)

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

    // Actualizar el contenido de los días de la semana
    diasDeLaSemana.forEach((dia, index) => {
        dia.innerHTML = primerDiaDeLaSemana + index; // Mostrar el número del día
        dia.classList.remove('bg-red-300', 'bg-yellow-200', 'bg-green-200'); // Limpiar clases de fondo
    });

    // Marcar el día actual
    diasDeLaSemana[hoy.getDay()].classList.add('text-red-500'); // Cambiar el fondo del día actual a verde
}

// Función para obtener y mostrar la temperatura actual
async function mostrarTemperatura() {
    const apiKey = 'MJKZY85NQXXSP4NGC69T62JS9';
    const ciudad = 'Bentonville,AR';
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${ciudad}?key=${apiKey}`;

    try {
        const respuesta = await fetch(url);
        const datos = await respuesta.json();

        // Redondear la temperatura
        const temperatura = Math.round(datos.currentConditions.temp);
        
        // Actualizar el span del clima
        const climaSpan = document.getElementById('clima').getElementsByTagName('span')[0];
        climaSpan.innerHTML = temperatura; // Mostrar solo la temperatura redondeada
    } catch (error) {
        console.error('Error al obtener la temperatura:', error);
    }
}

// Llamar a las funciones de actualización cada segundo
setInterval(() => {
    actualizarHoraYSemaforo(); // Actualizar la hora y el semáforo
    actualizarCalendario(); // Actualizar el calendario
}, 1000); //cada segundo

// Recargar api
setInterval(() => {
    // mostrarTemperatura(); // Actualizar la temperatura
}, 1800000); // cada 30 mins

// Recargar la página
setInterval(() => {
    location.reload(); // Recargar la página
}, 3600000); // cada 60 mins
