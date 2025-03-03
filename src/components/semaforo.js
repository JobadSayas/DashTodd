import React, { useState, useEffect } from "react";

const Semaforo = ({ dateTime }) => {  // Recibimos dateTime desde props
  const [color, setColor] = useState("bg-green-400");
  const [semaforoImg, setSemaforoImg] = useState();
  const [minutosRestantes, setMinutosRestantes] = useState(null);

  useEffect(() => {
    const actualizarSemaforo = () => {
      const horas = dateTime.getHours();  // Usamos la hora proveniente de dateTime
      const minutos = dateTime.getMinutes();  // Usamos los minutos de dateTime

      if (
        (horas === 7 && minutos >= 15 && minutos < 30) // Amarillo entre 7:15 AM y 7:30 AM
      ) {
        setColor("bg-yellow-400");
        setSemaforoImg("amarillo");
        iniciarCuentaRegresiva(7, 30); // Cuenta regresiva hasta las 7:30 AM
      } else if (
        (horas > 7 && horas < 19) || // Desde las 8:00 AM hasta las 6:59 PM
        (horas === 7 && minutos >= 30) || // Desde las 7:30 AM
        (horas === 19 && minutos === 0) // Desde las 7:00 PM exactamente
      ) {
        setColor("bg-green-400");
        setSemaforoImg("verde");
        setMinutosRestantes(null);
      } else if (
        (horas === 19 && minutos >= 0 && minutos < 30) // Desde las 7:00 PM hasta las 7:29 PM
      ) {
        setColor("bg-yellow-400");
        setSemaforoImg("amarillo");
        iniciarCuentaRegresiva(19, 30); // Cuenta regresiva hasta las 7:30 PM
      } else {
        setColor("bg-red-400");
        setSemaforoImg("rojo");
        setMinutosRestantes(null);
      }
    };

    const iniciarCuentaRegresiva = (horaObjetivo, minutoObjetivo) => {
      const ahora = dateTime; // Usamos dateTime para calcular la cuenta regresiva
      const objetivo = new Date();
      objetivo.setHours(horaObjetivo, minutoObjetivo, 0, 0);

      const diferenciaMs = objetivo - ahora;
      if (diferenciaMs > 0) {
        setMinutosRestantes(Math.ceil(diferenciaMs / (1000 * 60)));
      } else {
        setMinutosRestantes(0);
      }
    };

    actualizarSemaforo();  // Llamamos a la función de actualización del semáforo al renderizar el componente

  }, [dateTime]);  // Reejecutamos cuando `dateTime` cambie

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
