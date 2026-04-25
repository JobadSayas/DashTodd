// src/App.js
import { useDashboard } from "./hooks/useDashboard";
import Semaforo from "./components/semaforo";
import Hour from "./components/hour";
import Weather from "./components/weather";
import Calendar from "./components/calendar";

function App() {
  const version = "12.0";
  const { dateTime, weatherData, params } = useDashboard();

  // Lógica de cortinas (Declarativa)
  const horas = dateTime.getHours();
  const mostrarCortinaNegra = horas >= 23 || horas < 6;
  const mostrarCortinaAzul = weatherData.temperatura !== null && weatherData.temperatura <= 39;

  return (
    <div className="flex flex-col bg-white p-3 gap-2 justify-start relative w-[360px] overflow-hidden">
      <div className="text-md absolute top-[12px] left-[18px] z-10">{version}</div>

      <Semaforo dateTime={dateTime} params={params} />
      <Hour dateTime={dateTime} weatherData={weatherData} />
      <Weather weatherData={weatherData} />
      <Calendar dateTime={dateTime} />

      {/* Cortina negra */}
      {mostrarCortinaNegra && (
        <div className="absolute inset-0 z-30 bg-black"></div>
      )}

      {/* Cortina azul */}
      {mostrarCortinaAzul && (
        <div className="absolute inset-0 z-20 bg-[url('/img/ice.png')] bg-cover bg-center bg-no-repeat"></div>
      )}
    </div>
  );
}

export default App;