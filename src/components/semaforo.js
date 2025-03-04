import React, { useState, useEffect } from "react";

const Semaforo = ({ dateTime }) => {  
  const [color, setColor] = useState("bg-green-400");
  const [semaforoImg, setSemaforoImg] = useState();
  const [minutosRestantes, setMinutosRestantes] = useState(null);

  useEffect(() => {
    const actualizarSemaforo = () => {
      // Simulación de valores para pruebas
      const horas = dateTime.getHours();
      const minutos = dateTime.getMinutes();
      // const horas = 6;
      // const minutos = 54;

      // Variables configurables para despertar y dormir
      const horaDespertar = 7;
      const minutosDespertar = 10;
      const horaDormir = 19;
      const minutosDormir = 10;

      // Calcular tiempos específicos
      const minutosAntesDespertar = minutosDespertar - 15; // 15 minutos antes de despertar
      const minutosAntesDormir = minutosDormir - 30; // 30 minutos antes de dormir

      // Asegurar que los minutos no sean negativos (cuando restamos minutos)
      const horaAntesDespertar = minutosAntesDespertar < 0 ? horaDespertar - 1 : horaDespertar;
      const minutosFinalAntesDespertar = (minutosAntesDespertar + 60) % 60;

      const horaAntesDormir = minutosAntesDormir < 0 ? horaDormir - 1 : horaDormir;
      const minutosFinalAntesDormir = (minutosAntesDormir + 60) % 60;

      // **Condiciones**

      // 🔶 Antes de despertar (Amarillo)
      if (
        (horas === horaAntesDespertar && minutos >= minutosFinalAntesDespertar) ||
        (horas === horaDespertar && minutos < minutosDespertar)
      ) {
        setColor("bg-yellow-400");
        setSemaforoImg("amarillo");
        iniciarCuentaRegresiva(horaDespertar, minutosDespertar);
      } 
      
      // 🟢 Hora de despertar a 30 min antes de dormir (Verde)
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
        iniciarCuentaRegresiva(horaDormir, minutosDormir);
      } 
      
      // 🔴 Hora de dormir (Rojo)
      else {
        setColor("bg-red-400");
        setSemaforoImg("rojo");
        setMinutosRestantes(null);
      }
    };

    const iniciarCuentaRegresiva = (horaObjetivo, minutoObjetivo) => {
      const ahora = dateTime;
      const objetivo = new Date();
      objetivo.setHours(horaObjetivo, minutoObjetivo, 0, 0);

      const diferenciaMs = objetivo - ahora;
      if (diferenciaMs > 0) {
        setMinutosRestantes(Math.ceil(diferenciaMs / (1000 * 60)));
      } else {
        setMinutosRestantes(0);
      }
    };

    actualizarSemaforo();  

  }, [dateTime]);  

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
