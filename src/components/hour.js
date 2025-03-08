import React, { useState, useEffect } from "react";

const Hour = ({ dateTime, weatherData }) => {  // Recibimos weatherData desde props
  const [horaActual, setHoraActual] = useState();
  const [imagenHora, setImagenHora] = useState();  // Imagen por defecto
  const [colorFondo, setColorFondo] = useState();  // Color de fondo por defecto
  const [colorTexto, setColorTexto] = useState();  // Color de texto por defecto
  const [iconoClima, setIconoClima] = useState(""); // Estado para almacenar el icono del clima

  useEffect(() => {
    const actualizarHora = () => {
      const horas = dateTime.getHours(); // Usamos la hora proveniente de dateTime
      const minutos = dateTime.getMinutes(); // Usamos los minutos de dateTime
      
      //Hardcode time
      // const horas = 18;
      // const minutos = 30;

      const formatoHoras = horas % 12 || 12; // Convertir a formato 12 horas
      const formatoMinutos = String(minutos).padStart(2, "0"); // Agregar ceros si es necesario
      const ampm = horas >= 12 ? "PM" : "AM"; // Determinar AM o PM

      // Actualizar la hora
      setHoraActual(`${formatoHoras}:${formatoMinutos} <small style="position: relative; top:-2px">${ampm}</small>`);

      // Cambiar la imagen y el fondo según la hora
      if (horas >= 0 && horas < 6) {
        setImagenHora("noche");
        setColorFondo("bg-indigo-900");
        setColorTexto("text-white");
      } else if (horas >= 7 && horas < 8) {
        setImagenHora("crepusculo");
        setColorFondo("bg-indigo-900");
        setColorTexto("text-white");
      } else if (horas >= 8 && horas < 9) {
        setImagenHora("amanecer");
        setColorFondo("bg-blue-500");
        setColorTexto("text-black");
      } else if (horas >= 9 && horas < 12) {
        setImagenHora("manana");
        setColorFondo("bg-sky-300");
        setColorTexto("text-black");
      } else if (horas >= 12 && horas < 15) {
        setImagenHora("medio-dia");
        setColorFondo("bg-sky-300");
        setColorTexto("text-black");
      } else if (horas >= 15 && horas < 18) {
        setImagenHora("tarde");
        setColorFondo("bg-sky-300");
        setColorTexto("text-black");
      } else if (horas >= 18 && horas < 19) {
        setImagenHora("atardecer");
        setColorFondo("bg-orange-400");
        setColorTexto("text-black");
      } else {
        setImagenHora("noche");
        setColorFondo("bg-indigo-900");
        setColorTexto("text-white");
      }
    };

    actualizarHora(); // Ejecutamos la primera vez cuando se monta
    // Ya no necesitamos intervalos ya que la hora se actualiza de manera continua desde App.js

    // Actualizamos el icono del clima
    if (weatherData.icon) {
      setIconoClima(weatherData.icon);
    }

  }, [dateTime, weatherData]);  // Ejecutamos el efecto cada vez que cambie dateTime o weatherData

  return (
    <div className={`rounded-lg w-full h-[113px] flex items-center justify-center overflow-hidden relative ${colorFondo}`}>
      <img
        src={`/img/${imagenHora}.jpg`}
        id="imagenHora"
        alt="Imagen de la hora"
        className="absolute inset-0 w-auto h-full mx-auto"
      />
      <div
        className={`absolute bottom-[-35px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[40px] z-10 font-bold flex gap-2 items-end ${colorTexto}`}
        dangerouslySetInnerHTML={{ __html: horaActual }}
      />
      {/* Icono de clima */}
      {iconoClima && (
        <img
          id="icon"
          src={`/img/icons/${iconoClima}.svg`} // URL del icono
          className="absolute top-[10px] right-[10px] w-[50px]"
          alt="Icono de clima"
        />
      )}
    </div>
  );
};

export default Hour;