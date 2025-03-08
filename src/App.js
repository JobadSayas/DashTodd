import { useEffect, useState } from "react";
import Semaforo from "./components/semaforo";
import Hour from "./components/hour";
import Weather from "./components/weather";
import Calendar from "./components/calendar";
import axios from "axios";

function App() {
  const version = "10.7";
  const [weatherData, setWeatherData] = useState({
    temperatura: null,
    airSpeed: 0,
    icon: null,
  });
  const [dateTime, setDateTime] = useState(new Date()); // Estado centralizado para la hora y fecha

  // Función para obtener datos del clima
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

      temp = Math.max(0, Math.min(temp, 100)); // Limitar temperatura entre 0 y 100

      setWeatherData({
        temperatura: temp,
        airSpeed: windSpeed,
        icon: weatherIcon,
      });
    } catch (error) {
      console.error("Error al obtener la temperatura:", error);
    }
  };

  //Comentar para desactivar clima on testing
  // useEffect(() => {
  //   obtenerClima();
  //   const interval = setInterval(obtenerClima, 600000); // Actualizar cada 10 minutos
  //   return () => clearInterval(interval);
  // }, []);

  useEffect(() => {
    const actualizarHora = () => {
      setDateTime(new Date()); // Actualiza la fecha y hora
    };

    const interval = setInterval(actualizarHora, 1000); // Actualiza cada segundo
    return () => clearInterval(interval);
  }, []);

  // Cortina basada en la hora actual
  const mostrarCortina = dateTime.getHours() >= 22 || dateTime.getHours() < 6;

  return (
    <div className="flex flex-col bg-white p-3 gap-2 justify-start relative w-[360px]">

      <div className="text-md absolute top-[12px] left-[18px] z-10">{version}</div>

      <Semaforo dateTime={dateTime} />
      <Hour weatherData={weatherData} dateTime={dateTime} />
      <Weather weatherData={weatherData} />
      <Calendar dateTime={dateTime} />

      {mostrarCortina && (
        <div className="absolute top-0 left-0 w-screen h-screen z-20 bg-black"></div>
      )}
    </div>
  );
}

export default App;