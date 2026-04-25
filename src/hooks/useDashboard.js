// src/hooks/useDashboard.js
import { useState, useEffect } from "react";
import axios from "axios";

export const useDashboard = () => {
  const [dateTime, setDateTime] = useState(new Date());
  const [params, setParams] = useState(null);
  const [weatherData, setWeatherData] = useState({
    temperatura: null,
    airSpeed: 0,
    icon: null,
  });

  // 1. Reloj único centralizado
  useEffect(() => {
    const interval = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // 2. Carga de datos (Clima y Parámetros)
  const fetchData = async () => {
    try {
      // Cargamos ambas APIs al mismo tiempo para ahorrar tiempo
      const [weatherRes, paramsRes] = await Promise.all([
        axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Bentonville,AR?key=MJKZY85NQXXSP4NGC69T62JS9`),
        axios.get("https://dashtodd.visssible.com/backend/parameters.php")
      ]);

      // Procesar Clima
      const current = weatherRes.data.currentConditions;
      setWeatherData({
        temperatura: Math.max(0, Math.min(Math.round(current.feelslike), 100)),
        airSpeed: Math.round(current.windspeed),
        icon: current.icon,
      });

      // Procesar Parámetros
      if (paramsRes.data) {
        setParams({
          wakeUp: parseInt(paramsRes.data.wakeUpHour) * 60 + parseInt(paramsRes.data.wakeUpMinute),
          sleep: parseInt(paramsRes.data.sleepHour) * 60 + parseInt(paramsRes.data.sleepMinute),
          wakeUpInterval: parseInt(paramsRes.data.wakeUpInterval),
          sleepInterval: parseInt(paramsRes.data.sleepInterval),
          raw: paramsRes.data // Guardamos los datos originales por si ocupas los strings
        });
      }
    } catch (error) {
      console.error("Error cargando datos:", error);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 600000); // 10 min
    return () => clearInterval(interval);
  }, []);

  return { dateTime, weatherData, params };
};