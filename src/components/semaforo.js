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
        setHoraDespertar(wakeUpHour);
        setMinutosDespertar(wakeUpMinute);
        setHoraDormir(sleepHour);
        setMinutosDormir(sleepMinute);
        setDuracionAntesDespertar(wakeUpInterval);
        setDuracionAntesDormir(sleepInterval);
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
    const horas = dateTime.getHours();
    const minutos = dateTime.getMinutes();

    // Calcular tiempos específicos
    const minutosAntesDespertar = minutosDespertar - duracionAntesDespertar;
    const minutosAntesDormir = minutosDormir - duracionAntesDormir;

    const horaAntesDespertar = minutosAntesDespertar < 0 ? horaDespertar - 1 : horaDespertar;
    const minutosFinalAntesDespertar = (minutosAntesDespertar + 60) % 60;

    const horaAntesDormir = minutosAntesDormir < 0 ? horaDormir - 1 : horaDormir;
    const minutosFinalAntesDormir = (minutosAntesDormir + 60) % 60;

    // 🔶 Antes de despertar (Amarillo)
    if (
      (horas === horaAntesDespertar && minutos >= minutosFinalAntesDespertar) ||
      (horas === horaDespertar && minutos < minutosDespertar)
    ) {
      setColor("bg-yellow-400");
      setSemaforoImg("amarillo");
      iniciarCuentaRegresiva(horaDespertar, minutosDespertar, horas, minutos);
    } 
    
    // 🟢 Hora de despertar hasta antes de dormir (Verde)
    else if (
      (horas > horaDespertar && horas < horaAntesDormir) ||
      (horas === horaDespertar && minutos >= minutosDespertar) ||
      (horas === horaAntesDormir && minutos < minutosFinalAntesDormir)
    ) {
      setColor("bg-green-400");
      setSemaforoImg("verde");
      setMinutosRestantes(null);
    } 
    
    // 🔶 Antes de dormir (Amarillo)
    else if (
      (horas === horaAntesDormir && minutos >= minutosFinalAntesDormir) ||
      (horas === horaDormir && minutos < minutosDormir)
    ) {
      setColor("bg-yellow-400");
      setSemaforoImg("amarillo");
      iniciarCuentaRegresiva(horaDormir, minutosDormir, horas, minutos);
    } 
    
    // 🔴 Hora de dormir (Rojo)
    else {
      setColor("bg-red-400");
      setSemaforoImg("rojo");
      setMinutosRestantes(null);
    }
  }, [dateTime, horaDespertar, minutosDespertar, horaDormir, minutosDormir, duracionAntesDespertar, duracionAntesDormir]);

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
    </div>
  );
};

export default Semaforo;