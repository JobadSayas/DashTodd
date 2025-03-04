import React, { useState, useEffect } from "react";

const Semaforo = ({ dateTime }) => {  // Recibimos dateTime desde props
  const [color, setColor] = useState("bg-green-400");
  const [semaforoImg, setSemaforoImg] = useState();
  const [minutosRestantes, setMinutosRestantes] = useState(null);

  useEffect(() => {
    const actualizarSemaforo = () => {
      const horas = dateTime.getHours();  // Usamos la hora proveniente de dateTime
      const minutos = dateTime.getMinutes();  // Usamos los minutos de dateTime
      // const horas = 18;
      // const minutos = 59;

      const horaDespertar = 7;
      const minutosDespertar = 20;
      const horaDormir = 19;
      const minutosDormir = 20;


      if (//Antes de despetar (amarillo)
        (horas === horaDespertar && minutos >= minutosDespertar - 15 && minutos < minutosDespertar) ||
        (horas === horaDespertar - 1 && minutosDespertar < 15 && minutos >= minutosDespertar + 45)
      ) {
        setColor("bg-yellow-400");
        setSemaforoImg("amarillo");
        iniciarCuentaRegresiva(horaDespertar, minutosDespertar); // Cuenta regresiva hasta las 7:30 AM
      } else if ( //Despertar (verde)
        (horas > horaDespertar && horas < horaDormir) || 
        (horas === horaDespertar && minutos >= minutosDespertar) || 
        (horas === horaDormir && minutos === minutosDormir)
      ) {
        setColor("bg-green-400");
        setSemaforoImg("verde");
        setMinutosRestantes(null);
      } else if ( //Antes de dormir (amarillo)
        (horas === horaDormir && minutos >= minutosDormir - 30 && minutos < minutosDormir) ||
        (horas === horaDormir - 1 && minutosDormir < 30 && minutos >= minutosDormir + 30)
      ) {
      
        setColor("bg-yellow-400");
        setSemaforoImg("amarillo");
        iniciarCuentaRegresiva(horaDormir, minutosDormir); // Cuenta regresiva hasta las 7:30 PM
      } else if (
        (horas === horaDormir && minutos >= minutosDormir) || 
        (horas > horaDormir || horas < horaDespertar) || 
        (horas === horaDespertar && minutos < minutosDespertar - 15)
      ) {
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
