// src/components/semaforo.js
import React from "react";

const Semaforo = ({ dateTime, params }) => {
  // 1. Si todavía no hay parámetros, mostramos un estado de carga o gris
  if (!params) {
    return (
      <div className="relative rounded-lg w-full h-[113px] flex bg-gray-400 animate-pulse justify-center items-center">
        <span className="text-white">Cargando parámetros...</span>
      </div>
    );
  }

  // 2. LÓGICA DECLARATIVA (Cálculos al vuelo)
  // No necesitamos estados porque dateTime cambia cada segundo y dispara el render
  const horas = dateTime.getHours();
  const minutos = dateTime.getMinutes();
  const tiempoActual = horas * 60 + minutos;

  const { wakeUp, sleep, wakeUpInterval, sleepInterval, raw } = params;

  // Variables para determinar el estado visual
  let color = "bg-green-400";
  let semaforoImg = "verde";
  let minutosRestantes = null;

  // Lógica de validación (Igual a la tuya pero simplificada)
  if (tiempoActual >= sleep || tiempoActual < wakeUp - wakeUpInterval) {
    // 🔴 ROJO: Es hora de dormir o falta mucho para despertar
    color = "bg-red-400";
    semaforoImg = "rojo";
  } else if (tiempoActual >= wakeUp - wakeUpInterval && tiempoActual < wakeUp) {
    // 🔶 AMARILLO: Cuenta regresiva para despertar
    color = "bg-yellow-400";
    semaforoImg = "amarillo";
    minutosRestantes = wakeUp - tiempoActual;
  } else if (tiempoActual >= wakeUp && tiempoActual < sleep - sleepInterval) {
    // 🟢 VERDE: Día normal
    color = "bg-green-400";
    semaforoImg = "verde";
  } else if (tiempoActual >= sleep - sleepInterval && tiempoActual < sleep) {
    // 🔶 AMARILLO: Cuenta regresiva para dormir
    color = "bg-yellow-400";
    semaforoImg = "amarillo";
    minutosRestantes = sleep - tiempoActual;
  }

  // Formatear el horario para mostrar abajo
  const horarioText = `${raw.wakeUpHour}:${raw.wakeUpMinute.padStart(2, "0")} - ${raw.sleepHour}:${raw.sleepMinute.padStart(2, "0")}`;

  return (
    <div className={`relative rounded-lg w-full h-[113px] flex bg-center bg-no-repeat bg-contain flex-shrink-0 justify-center transition-colors duration-500 ${color}`}>
      <div className="flex items-center">
        <img src={`/img/${semaforoImg}.jpg`} alt="Semáforo" className="h-full w-auto mx-auto my-auto" />

        {color === "bg-yellow-400" && minutosRestantes !== null && (
          <div className="font-bold text-5xl ml-[18px] w-[53px] text-center">
            {String(minutosRestantes).padStart(2, "0")}
          </div>
        )}
      </div>
      <span className="absolute bottom-[3px] text-xs font-medium">{horarioText}</span>
    </div>
  );
};

export default Semaforo;