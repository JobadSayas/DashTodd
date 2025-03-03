import React, { useState, useEffect } from "react";

const Calendar = ({ dateTime }) => {
  const [days, setDays] = useState(Array(7).fill(null));
  const [currentDay, setCurrentDay] = useState(new Date().getDay());

  useEffect(() => {
    actualizarCalendario();
  }, [dateTime]);  // Recalcular cuando dateTime cambie

  function actualizarCalendario() {
    // Usamos la hora recibida desde props (dateTime)
    const ahora = dateTime || new Date(); // Si no se pasa 'dateTime', usamos la fecha actual
    const diaActualMes = ahora.getDate(); // Día del mes
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

    let dia = primerDiaDeLaSemana.getDate(); // Día inicial de la semana
    let mesActual = primerDiaDeLaSemana.getMonth(); // Mes actual de la semana
    let anioActual = primerDiaDeLaSemana.getFullYear(); // Año actual de la semana

    const nuevosDias = [];

    for (let i = 0; i < 7; i++) {
      // Si el día excede el último día del mes actual, cambiar al siguiente mes
      if (dia > ultimoDiaDelMes(anioActual, mesActual)) {
        dia = 1;
        mesActual++;
        if (mesActual > 11) {
          mesActual = 0;
          anioActual++;
        }
      }

      // Si el día es menor que 1, retroceder al mes anterior
      if (dia < 1) {
        mesActual--;
        if (mesActual < 0) {
          mesActual = 11;
          anioActual--;
        }
        dia = ultimoDiaDelMes(anioActual, mesActual);
      }

      nuevosDias.push(dia);
      dia++;
    }

    setDays(nuevosDias);
    setCurrentDay(diaSemana);
  }

  return (
    <div
      id="calendario"
      className="relative rounded-lg w-full h-[113px] flex gap-2 bg-center bg-no-repeat bg-contain bg-gray-200 flex-shrink-0 bg-[url('/img/calendario.jpg')]"
    >
      {/* Días de la Semana */}
      <div className="w-[336px] flex justify-between absolute top-[63px] left-1/2 transform -translate-x-1/2 z-10">
        {days.map((dia, index) => (
          <div
            key={index}
            className={`w-full text-center text-3xl font-bold ${index === currentDay ? "text-red-500" : "text-black"}`}
          >
            {dia}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;