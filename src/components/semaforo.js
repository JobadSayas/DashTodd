import React, { useState, useEffect } from "react";
import axios from "axios";

const Semaforo = ({ dateTime }) => {
  const [color, setColor] = useState("bg-green-400");
  const [semaforoImg, setSemaforoImg] = useState();
  const [minutosRestantes, setMinutosRestantes] = useState(null);

  // Estado para almacenar los parámetros obtenidos de la API
  const [horaDespertar, setHoraDespertar] = useState();
  const [minutosDespertar, setMinutosDespertar] = useState();
  const [horaDormir, setHoraDormir] = useState();
  const [minutosDormir, setMinutosDormir] = useState();
  const [horario, setHorario] = useState();

  const [duracionAntesDespertar, setDuracionAntesDespertar] = useState();
  const [duracionAntesDormir, setDuracionAntesDormir] = useState();

  // Función para hacer la llamada a la API y obtener los valores de la base de datos
  const obtenerParametros = async () => {
    try {
      const response = await axios.get("https://dashtodd.visssible.com/backend/parameters.php");
      if (response.data) {
        const {
          wakeUpHour,
          wakeUpMinute,
          wakeUpInterval,
          sleepHour,
          sleepMinute,
          sleepInterval,
        } = response.data;

        // Actualizar los estados con los datos recibidos
        setHoraDespertar(parseInt(wakeUpHour, 10));
        setMinutosDespertar(parseInt(wakeUpMinute, 10));
        setHoraDormir(parseInt(sleepHour, 10));
        setMinutosDormir(parseInt(sleepMinute, 10));
        setDuracionAntesDespertar(parseInt(wakeUpInterval, 10));
        setDuracionAntesDormir(parseInt(sleepInterval, 10));

      }
    } catch (error) {
      console.error("Error al obtener los parámetros:", error);
    }
  };

  useEffect(() => {
    // Hacer la llamada inicial para obtener los parámetros de la API
    obtenerParametros();

    // Revisar la hora cada minuto y hacer la llamada cuando sea hora exacta
    const intervalId = setInterval(() => {

      const ahora = new Date();
      const horas = ahora.getHours();
      const minutos = ahora.getMinutes();

        // Validar si la hora y los minutos son las horas exactas (12:00, 6:00, 12:00, 18:00)
        if (
          (horas === 0 && minutos === 0) ||
          (horas === 6 && minutos === 0) ||
          (horas === 12 && minutos === 0) ||
          (horas === 18 && minutos === 0)
        ) {
          obtenerParametros(); // Llamar a la API a las horas deseadas
        }
    }, 60000); // Revisa cada minuto

    // Limpiar el intervalo al desmontar el componente
    return () => {
      clearInterval(intervalId);
    };

  }, []);


  useEffect(() => {
    // Obtener la hora y minutos actuales de dateTime (que viene de las props)
    // const horas = dateTime.getHours();
    // const minutos = dateTime.getMinutes();
    const horas = 6;
    const minutos = 40;

    // Calculamos los tiempos importantes
    const tiempoActual = horas * 60 + minutos; // Convertimos la hora actual a minutos
    const tiempoDespertar = horaDespertar * 60 + minutosDespertar; // Convertimos la hora de despertar a minutos
    const tiempoDormir = horaDormir * 60 + minutosDormir; // Convertimos la hora de dormir a minutos

    // Validaciones
    if (
      // 🔴 De 0 horas a 15 minutos antes de despertar (luz roja)
      tiempoActual >= tiempoDormir ||
      tiempoActual < tiempoDespertar - duracionAntesDespertar
    ) {
      setColor("bg-red-400"); // Cambiar a rojo
      setSemaforoImg("rojo"); // Cambiar la imagen del semáforo a rojo
    } else if (
      // 🔶 De 15 minutos antes de despertar y hasta la hora de despertar (luz amarilla)
      tiempoActual >= tiempoDespertar - duracionAntesDespertar &&
      tiempoActual < tiempoDespertar
    ) {
      setColor("bg-yellow-400"); // Cambiar a amarillo
      setSemaforoImg("amarillo"); // Cambiar la imagen del semáforo a amarillo
      iniciarCuentaRegresiva(horaDespertar, minutosDespertar, horas, minutos);
    } else if (
      // 🟢 De la hora de despertar y hasta 30 minutos antes de dormir (luz verde)
      tiempoActual >= tiempoDespertar &&
      tiempoActual < tiempoDormir - duracionAntesDormir
    ) {
      setColor("bg-green-400"); // Cambiar a verde
      setSemaforoImg("verde"); // Cambiar la imagen del semáforo a verde
    } else if (
      // 🔶 De 30 minutos antes de dormir a la hora de dormir (luz amarilla)
      tiempoActual >= tiempoDormir - duracionAntesDormir &&
      tiempoActual < tiempoDormir
    ) {
      setColor("bg-yellow-400"); // Cambiar a amarillo
      setSemaforoImg("amarillo"); // Cambiar la imagen del semáforo a amarillo
      iniciarCuentaRegresiva(horaDormir, minutosDormir, horas, minutos);
    } else if (
      // 🔴 De la hora de dormir en adelante (luz roja)
      tiempoActual >= tiempoDormir
    ) {
      setColor("bg-red-400"); // Cambiar a rojo
      setSemaforoImg("rojo"); // Cambiar la imagen del semáforo a rojo
    }

    // Iniciar la cuenta regresiva si es necesario
    iniciarCuentaRegresiva(horaDespertar, minutosDespertar, horas, minutos);
  }, [dateTime]); // Este efecto se ejecuta cada vez que dateTime cambia


  // Nuevo useEffect para actualizar 'horario' después de que los estados se actualicen
  useEffect(() => {
    if (horaDespertar !== undefined && minutosDespertar !== undefined && horaDormir !== undefined && minutosDormir !== undefined) {
      setHorario(`${horaDespertar}:${String(minutosDespertar).padStart(2, "0")} - ${horaDormir}:${String(minutosDormir).padStart(2, "0")}`);
    }
  }, [horaDespertar, minutosDespertar, horaDormir, minutosDormir]);


  const iniciarCuentaRegresiva = (horaObjetivo, minutoObjetivo, horasActuales, minutosActuales) => {
    // Crear la fecha actual con la hora hardcodeada
    const ahora = new Date();
    ahora.setHours(horasActuales);
    ahora.setMinutes(minutosActuales);
    ahora.setSeconds(0);
    ahora.setMilliseconds(0);

    // Crear la fecha objetivo
    const objetivo = new Date(ahora);
    objetivo.setHours(horaObjetivo);
    objetivo.setMinutes(minutoObjetivo);

    // Calcular la diferencia en minutos
    const diferenciaMs = objetivo.getTime() - ahora.getTime();
    const minutosRestantesCalculados = Math.max(0, Math.floor(diferenciaMs / (1000 * 60)));

    setMinutosRestantes(minutosRestantesCalculados);
  };

  return (
    <div className={`relative rounded-lg w-full h-[113px] flex bg-center bg-no-repeat bg-contain flex-shrink-0 justify-center ${color}`}>
      <div className="flex items-center">
        <img src={`/img/${semaforoImg}.jpg`} alt="Semáforo" className="h-full w-auto mx-auto my-auto" />
        {minutosRestantes !== null && (
          <div className="font-bold text-5xl ml-[18px] w-[53px] text-center">
            {String(minutosRestantes).padStart(2, "0")}
          </div>
        )}
      </div>
      <span className="absolute bottom-[3px] text-xs">{horario}</span>
    </div>
  );
};

export default Semaforo;