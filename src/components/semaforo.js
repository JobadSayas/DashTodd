import React, { useState, useEffect } from "react";

const Semaforo = ({ dateTime }) => {  
  const [color, setColor] = useState("bg-green-400");
  const [semaforoImg, setSemaforoImg] = useState();
  const [minutosRestantes, setMinutosRestantes] = useState(null);

  useEffect(() => {
    const horas = dateTime.getHours();
    const minutos = dateTime.getMinutes();
    // Simulación de valores para pruebas
    // const horas = 7;  // Hardcodeado para pruebas
    // const minutos = 10;  // Hardcodeado para pruebas

    // Variables configurables
    const horaDespertar = 7;
    const minutosDespertar = 10;
    const horaDormir = 19;
    const minutosDormir = 10;

    const duracionAntesDespertar = 15; // Minutos antes de despertar (amarillo)
    const duracionAntesDormir = 30;    // Minutos antes de dormir (amarillo)

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
  }, [dateTime]);  

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
