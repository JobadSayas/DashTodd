import { useEffect, useRef } from "react";

const Weather = ({ weatherData }) => {
  const { temperatura, airSpeed, icon } = weatherData;
  const angleRef = useRef(0); // Mantiene el ángulo acumulado

  // Rotar el ventilador según la velocidad del aire
  useEffect(() => {
    const rotateFan = () => {
      angleRef.current = (angleRef.current + airSpeed) % 360;
      document.getElementById("fan").style.transform = `rotate(${angleRef.current}deg)`;
    };

    const interval = setInterval(rotateFan, 30);
    return () => clearInterval(interval);
  }, [airSpeed]);

  // Calcular posición del termómetro
  const leftValue = temperatura !== null ? (temperatura / 100) * 220 : 0;

  return (
    <div className="relative rounded-lg w-full h-[113px] flex gap-1 justify-center bg-purple-300 overflow-hidden">
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

      {/* Imagen del ventilador girando */}
      <img
        id="fan"
        src="/img/fan.svg"
        alt="Fan"
        className="w-[60px]"
      />

      {/* Velocidad del viento */}
      <div className="text-white text-md absolute top-[42px] right-[22px] z-10 bg-black w-7 h-7 rounded-full border-purple-300 border-[2px] flex items-center justify-center">
        {airSpeed ?? "--"}
      </div>
    </div>
  );
};

export default Weather;
