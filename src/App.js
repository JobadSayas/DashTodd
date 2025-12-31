import { useEffect, useState } from "react";
import Semaforo from "./components/semaforo";
import Hour from "./components/hour";
import Weather from "./components/weather";
import Calendar from "./components/calendar";
import axios from "axios";

function App() {
  const version = "11.3";
  const [weatherData, setWeatherData] = useState({
    temperatura: null,
    airSpeed: 0,
    icon: null,
  });
  const [dateTime, setDateTime] = useState(new Date());

  const obtenerClima = async () => {
    const apiKey = "MJKZY85NQXXSP4NGC69T62JS9";
    const ciudad = "Bentonville,AR";
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${ciudad}?key=${apiKey}`;

    try {
      const respuesta = await axios.get(url);
      const datos = respuesta.data;

      let temp = Math.round(datos.currentConditions.feelslike);
      let windSpeed = Math.round(datos.currentConditions.windspeed);
      let weatherIcon = datos.currentConditions.icon;

      temp = Math.max(0, Math.min(temp, 100));

      setWeatherData({
        temperatura: temp,
        airSpeed: windSpeed,
        icon: weatherIcon,
      });
    } catch (error) {
      console.error("Error al obtener la temperatura:", error);
    }
  };

  useEffect(() => {
    obtenerClima();
    const interval = setInterval(obtenerClima, 600000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const actualizarHora = () => {
      setDateTime(new Date());
    };

    const interval = setInterval(actualizarHora, 1000);
    return () => clearInterval(interval);
  }, []);

  // Cortina negra basada en la hora (noche)
  const mostrarCortinaNegra = dateTime.getHours() >= 22 || dateTime.getHours() < 6;
  
  // Cortina azul basada en la temperatura (39° o menos)
  const mostrarCortinaAzul = weatherData.temperatura !== null && weatherData.temperatura <= 39;

  return (
    <div className="flex flex-col bg-white p-3 gap-2 justify-start relative w-[360px]">

      <div className="text-md absolute top-[12px] left-[18px] z-10">{version}</div>

      <Semaforo dateTime={dateTime} />
      <Hour weatherData={weatherData} dateTime={dateTime} />
      <Weather weatherData={weatherData} />
      <Calendar dateTime={dateTime} />

      {/* Cortina negra - se muestra solo de noche */}
      {mostrarCortinaNegra && (
        <div className="absolute top-0 left-0 w-screen h-screen z-30 bg-black"></div>
      )}

      {/* Cortina azul - se muestra solo cuando temperatura <= 39° */}
      {mostrarCortinaAzul && (
        <div className="absolute top-0 left-0 w-full h-full z-20 bg-[url('/img/ice.png')] bg-cover bg-center bg-no-repeat"></div>
      )}

    </div>
  );
}

export default App;