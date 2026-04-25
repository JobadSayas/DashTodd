// src/components/hour.js
import React from "react";

const Hour = ({ dateTime, weatherData }) => {
  const horas = dateTime.getHours();
  const minutos = dateTime.getMinutes();

  // 1. LÓGICA DE ESTILOS (Declarativa)
  // Definimos un objeto de configuración según la hora
  const getConfig = () => {
    if (horas >= 0 && horas < 6)   return { img: "noche", bg: "bg-indigo-900", txt: "text-white" };
    if (horas >= 6 && horas < 7)   return { img: "crepusculo", bg: "bg-indigo-900", txt: "text-white" };
    if (horas >= 7 && horas < 8)   return { img: "amanecer", bg: "bg-blue-500", txt: "text-black" };
    if (horas >= 8 && horas < 12)  return { img: "manana", bg: "bg-sky-300", txt: "text-black" };
    if (horas >= 12 && horas < 15) return { img: "medio-dia", bg: "bg-sky-300", txt: "text-black" };
    if (horas >= 15 && horas < 18) return { img: "tarde", bg: "bg-sky-300", txt: "text-black" };
    if (horas >= 18 && horas < 19) return { img: "atardecer", bg: "bg-orange-400", txt: "text-black" };
    return { img: "noche", bg: "bg-indigo-900", txt: "text-white" };
  };

  const { img, bg, txt } = getConfig();

  // 2. FORMATEO DE HORA (Sin usar dangerouslySetInnerHTML)
  const formatoHoras = horas % 12 || 12;
  const formatoMinutos = String(minutos).padStart(2, "0");
  const ampm = horas >= 12 ? "PM" : "AM";

  return (
    <div className={`rounded-lg w-full h-[113px] flex items-center justify-center overflow-hidden relative ${bg} transition-colors duration-1000`}>
      
      {/* Imagen de fondo */}
      <img
        src={`/img/${img}.jpg`}
        alt="Imagen de la hora"
        className="absolute inset-0 w-auto h-full mx-auto"
      />

      {/* Reloj */}
      <div className={`absolute bottom-2 left-1/2 transform -translate-x-1/2 text-[40px] z-10 font-bold flex gap-1 items-baseline ${txt}`}>
        {formatoHoras}:{formatoMinutos}
        <small className="text-xl relative top-[-2px]">{ampm}</small>
      </div>

      {/* Icono de clima */}
      {weatherData.icon && (
        <img
          src={`/img/icons/${weatherData.icon}.svg`}
          className="absolute top-[10px] right-[10px] w-[50px] drop-shadow-md"
          alt="Icono de clima"
        />
      )}
    </div>
  );
};

export default Hour;