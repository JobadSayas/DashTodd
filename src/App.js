import { useEffect, useState } from "react";
import Semaforo from "./components/semaforo";
import Hour from "./components/hour";
import Weather from "./components/weather";
import Calendar from "./components/calendar";

function App() {
  const [mostrarCortina, setMostrarCortina] = useState(false);

  useEffect(() => {
    const actualizarCortina = () => {
      const horas = new Date().getHours();
      setMostrarCortina(horas >= 22 || horas < 6);
    };

    actualizarCortina(); // Ejecutar al cargar
    const intervalo = setInterval(actualizarCortina, 60000); // Revisar cada minuto

    return () => clearInterval(intervalo); // Limpiar el intervalo al desmontar
  }, []);

  return (
    <div className="flex flex-col bg-white p-3 gap-2 justify-start relative w-[360px]">
      
      <Semaforo />
      <Hour />
      <Weather />
      <Calendar />

      {mostrarCortina && (
        <div
          id="cortina"
          className="absolute top-0 left-0 w-screen h-screen z-20 bg-black"
        ></div>
      )}

    </div>
  );
}

export default App;
