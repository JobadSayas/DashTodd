// src/components/weather.js
import { useEffect, useState } from "react";

const Weather = ({ weatherData }) => {
  const { temperatura, airSpeed, icon } = weatherData;
  const [angle, setAngle] = useState(0);

  // 1. Rotación declarativa: Ya no buscamos el ID "fan"
  useEffect(() => {
    // Si no hay viento, no gastamos recursos en el intervalo
    if (airSpeed === 0) return;

    const interval = setInterval(() => {
      // Actualizamos el estado del ángulo. 
      // Usamos la función de actualización (prev) para asegurar precisión.
      setAngle((prevAngle) => (prevAngle + airSpeed) % 360);
    }, 30);

    return () => clearInterval(interval);
  }, [airSpeed]);

  // 2. Cálculo de posición del termómetro (Declarativo)
  const leftValue = temperatura !== null ? (temperatura / 100) * 220 : 0;

  return (
    <div className="relative rounded-lg w-full h-[113px] flex gap-1 justify-center bg-purple-300 overflow-hidden">
      
      {/* Sección del termómetro */}
      <div className="w-[260px] bg-center bg-no-repeat bg-contain pt-[15px] bg-[url('/img/clima.jpg')]">
        <div className="w-[260px] h-[55px] relative">
          <span
            className="absolute top-1/2 -translate-y-1/2 rounded-full w-10 h-10 bg-white flex justify-center items-center font-bold text-2xl pt-[3px] transition-all duration-500"
            style={{ left: `${leftValue}px` }}
          >
            {temperatura ?? "--"}
          </span>
        </div>
      </div>

      {/* 3. El Ventilador: Ahora React tiene el control total */}
      <img
        src="/img/fan.svg"
        alt="Fan"
        className="w-[60px]"
        style={{ transform: `rotate(${angle}deg)` }} // <-- Style Binding
      />

      {/* Velocidad del viento */}
      <div className="text-white text-md absolute top-[42px] right-[22px] z-10 bg-black w-7 h-7 rounded-full border-purple-300 border-[2px] flex items-center justify-center">
        {airSpeed ?? "--"}
      </div>
      
      {/* Bonus: Icono de clima si lo necesitas usar después */}
      {icon && (
        <img 
          src={`/img/icons/${icon}.svg`} 
          className="absolute top-2 right-2 w-8 opacity-50" 
          alt="clima icon"
        />
      )}
    </div>
  );
};

export default Weather;