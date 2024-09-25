// Versión 0.9

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
    mostrarHora.innerHTML = `${formatoHoras}:${formatoMinutos} <small>${ampm}</small>`;

    // Cambiar la imagen según la hora
    const imagenHora = document.getElementById('imagenHora'); // Seleccionar la imagen del módulo hora
    if (horas === 7 && minutos === 0) {
        imagenHora.src = 'img/amanecer.jpg';
    } else if (horas === 10 && minutos === 0) {
        imagenHora.src = 'img/manana.jpg';
    } else if (horas === 13 && minutos === 0) {
        imagenHora.src = 'img/mediodia.jpg';
    } else if (horas === 16 && minutos === 0) {
        imagenHora.src = 'img/tarde.jpg';
    } else if (horas === 18 && minutos === 0) {
        imagenHora.src = 'img/atardecer.jpg';
    } else if (horas >= 20) {
        imagenHora.src = 'img/noche.jpg';
    }

    // Cambiar la imagen del semáforo según la hora
    const imagenSemaforo = document.getElementById('semaforoImg'); // Seleccionar la imagen del semáforo
    if (horas === 6 && minutos === 0) {
        imagenSemaforo.src = 'img/amarillo.jpg'; // Cambiar a imagen amarilla
    } else if (horas === 7 && minutos === 0) {
        imagenSemaforo.src = 'img/verde.jpg'; // Cambiar a imagen verde
    } else if (horas === 12 && minutos === 0) {
        imagenSemaforo.src = 'img/amarillo.jpg'; // Cambiar a imagen amarilla
    } else if (horas === 13 && minutos === 0) {
        imagenSemaforo.src = 'img/rojo.jpg'; // Cambiar a imagen roja
    } else if (horas === 14 && minutos === 0) {
        imagenSemaforo.src = 'img/verde.jpg'; // Cambiar a imagen verde
    } else if (horas === 19 && minutos === 0) {
        imagenSemaforo.src = 'img/amarillo.jpg'; // Cambiar a imagen amarilla
    } else if (horas === 20 && minutos === 0) {
        imagenSemaforo.src = 'img/rojo.jpg'; // Cambiar a imagen roja
    }

    // Controlar el estado del semáforo entre las 8 PM y las 6 AM
    if (horas >= 20 || horas < 6) {
        imagenSemaforo.src = 'img/rojo.jpg'; // Mantener el semáforo en rojo
    }
}

// Función para actualizar el calendario
function actualizarCalendario() {
    const hoy = new Date(); // Obtener la fecha actual
    const diaActual = hoy.getDate(); // Obtener el número del día
    const primerDiaDeLaSemana = hoy.getDate() - hoy.getDay(); // Obtener el primer día de la semana (domingo)

    // Obtener los elementos de los días de la semana
    const diasDeLaSemana = [
        document.getElementById('domingo'),
        document.getElementById('lunes'),
        document.getElementById('martes'),
        document.getElementById('miercoles'),
        document.getElementById('jueves'),
        document.getElementById('viernes'),
        document.getElementById('sabado')
    ];

    // Cargar los días de la semana
    diasDeLaSemana.forEach((dia, index) => {
        const numeroDia = primerDiaDeLaSemana + index; // Calcular el número del día
        dia.textContent = numeroDia; // Establecer el número en el elemento

        // Resaltar el día actual
        if (numeroDia === diaActual) {
            dia.classList.add('text-red-500'); // Resaltar en rojo
        } else {
            dia.classList.remove('text-red-500'); // Quitar el rojo
            dia.classList.add('text-black'); // Asegurarse de que los otros días sean negros
        }
    });
}

// Llamar a las funciones cada minuto para actualizar la hora, el semáforo y el calendario
setInterval(() => {
    actualizarHoraYSemaforo();
    actualizarCalendario();
}, 60000);

// Llamar a las funciones una vez para mostrar la hora y el calendario inmediatamente al cargar
actualizarHoraYSemaforo();
actualizarCalendario();
