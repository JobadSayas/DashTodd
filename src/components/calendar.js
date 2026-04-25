// src/components/calendar.js
import React from "react";

const Calendar = ({ dateTime }) => {
  // 1. LÓGICA DECLARATIVA: Calculamos la semana actual "al vuelo"
  const getWeekDays = () => {
    const dias = [];
    const fechaReferencia = new Date(dateTime);
    
    // Encontrar el domingo de la semana actual
    const diaSemanaActual = fechaReferencia.getDay(); // 0 (Dom) a 6 (Sab)
    fechaReferencia.setDate(fechaReferencia.getDate() - diaSemanaActual);

    // Llenar el arreglo con los 7 días de la semana
    for (let i = 0; i < 7; i++) {
      dias.push(fechaReferencia.getDate());
      fechaReferencia.setDate(fechaReferencia.getDate() + 1);
    }
    return dias;
  };

  const days = getWeekDays();
  const currentDayIndex = dateTime.getDay(); // Para saber cuál resaltar

  return (
    <div
      id="calendario"
      className="relative rounded-lg w-full h-[113px] flex gap-2 bg-center bg-no-repeat bg-contain flex-shrink-0 bg-gray-200 bg-[url('/img/calendario.jpg')]"
    >
      {/* Días de la Semana */}
      <div className="w-[336px] flex justify-between absolute top-[73px] left-1/2 transform -translate-x-1/2 z-10">
        {days.map((dia, index) => (
          <div
            key={index}
            className={`w-full text-center text-3xl font-bold transition-colors duration-500 ${
              index === currentDayIndex ? "text-red-500" : "text-black"
            }`}
          >
            {dia}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;