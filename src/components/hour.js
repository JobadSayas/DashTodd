import React, { useState, useEffect } from "react";

const Hora = () => {
  const [horaActual, setHoraActual] = useState("");
  const [imagenHora, setImagenHora] = useState("");  // Imagen por defecto
  const [colorFondo, setColorFondo] = useState();  // Color de fondo por defecto
  const [colorTexto, setColorTexto] = useState("white");  // Color de texto por defecto

  useEffect(() => {
    const actualizarHora = () => {
      const ahora = new Date();
      const horas = ahora.getHours();
      const minutos = ahora.getMinutes();
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
      } else if (horas >= 6 && horas < 7) {
        setImagenHora("crepusculo");
        setColorFondo("bg-indigo-900");
        setColorTexto("text-white");
      } else if (horas >= 7 && horas < 8) {
        setImagenHora("amanecer");
        setColorFondo("bg-blue-500"); 
        setColorTexto("text-black");
      } else if (horas >= 8 && horas < 11) {
        setImagenHora("manana");
        setColorFondo("bg-sky-300");
        setColorTexto("text-black");
      } else if (horas >= 11 && horas < 14) {
        setImagenHora("medioDia");
        setColorFondo("bg-sky-300");
        setColorTexto("text-black");
      } else if (horas >= 14 && horas < 17) {
        setImagenHora("tarde");
        setColorFondo("bg-sky-300");
        setColorTexto("text-black");
      } else if (horas >= 17 && horas < 18) {
        setImagenHora("atardecer");
        setColorFondo("bg-orange-300");
        setColorTexto("text-black");
      } else {
        setImagenHora("noche");
        setColorFondo("bg-indigo-900");
        setColorTexto("text-white");
      }
    };

    actualizarHora();
    const intervalo = setInterval(actualizarHora, 60000); // Actualiza cada minuto

    return () => clearInterval(intervalo); // Limpiar intervalo al desmontar
  }, []);

  return (
    <div
      id="hora" className={`rounded-lg w-full h-[113px] flex items-center justify-center overflow-hidden relative ${colorFondo}`}
    >
      <img
        src={`/img/${imagenHora}.jpg`}
        id="imagenHora"
        alt="Imagen de la hora"
        className="absolute inset-0 w-auto h-full mx-auto"
      />
      <div
        id="mostrarHora"
        className={`absolute bottom-[-24px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-5xl z-10 font-bold flex gap-2 items-end ${colorTexto}`}
        dangerouslySetInnerHTML={{ __html: horaActual }}
      />
      {/* <img
        id="icon"
        className="absolute top-[10px] right-[10px] w-[50px]"
        alt="Icono"
      /> */}
    </div>
  );
};

export default Hora;
