const app = Vue.createApp({
    data() {
      return {
        version: "3.0",
        temperature: 0,
        currentTime: new Date(),
        weekDays: Array(7).fill(0),
        currentDay: new Date().getDay(),
        ampm: 'AM',
        showCortina: false,
      };
    },
    computed: {
      // Formato de hora
      formattedTime() {
        const hours = this.currentTime.getHours();
        const minutes = String(this.currentTime.getMinutes()).padStart(2, '0');
        const formatHours = hours % 12 || 12;
        this.ampm = hours >= 12 ? 'PM' : 'AM';
        return `${formatHours}:${minutes}`;
      },
      // Actualiza la imagen de la hora según la hora del día
      horaImg() {
        const hours = this.currentTime.getHours();
        if (hours >= 0 && hours < 6) return 'img/noche.jpg';
        if (hours >= 6 && hours < 7) return 'img/crepusculo.jpg';
        if (hours >= 7 && hours < 8) return 'img/amanecer.jpg';
        if (hours >= 8 && hours < 14) return 'img/manana.jpg';
        if (hours >= 14 && hours < 19) return 'img/tarde.jpg';
        if (hours >= 19 && hours < 20) return 'img/atardecer.jpg';
        return 'img/noche.jpg';
      },
      horaClass() {
        const hours = this.currentTime.getHours();
        if (hours < 6 || hours >= 20) return 'bg-indigo-900 text-white';
        if (hours >= 6 && hours < 7) return 'bg-indigo-900 text-white';
        if (hours >= 7 && hours < 8) return 'bg-blue-500 text-black';
        if (hours >= 8 && hours < 14) return 'bg-sky-300 text-black';
        return 'bg-orange-400 text-black';
      },
      // Actualiza la imagen y fondo del semáforo según la hora
      semaforoImg() {
        const hours = this.currentTime.getHours();
        if (hours < 6 || (hours >= 22 && hours <= 23)) return 'img/rojo.jpg';
        if (hours === 6 || hours === 19) return 'img/amarillo.jpg';
        return 'img/verde.jpg';
      },
      semaforoClass() {
        const hours = this.currentTime.getHours();
        if (hours < 6 || (hours >= 22 && hours <= 23)) return 'bg-red-400';
        if (hours === 6 || hours === 19) return 'bg-yellow-400';
        return 'bg-green-400';
      },
      // Mostrar temperatura
      temperatureDisplay() {
        return this.temperature;
      },
      // Dynamic left position for the temperature indicator based on the temperature value
      temperaturePosition() {
        // Map the temperature (0 to 100) to a percentage value (0% to 100%)
        const minTemp = 0;  // Minimum possible temperature
        const maxTemp = 100; // Maximum possible temperature
        const leftPercentage = ((this.temperature - minTemp) / (maxTemp - minTemp)) * 100;
        return `${leftPercentage}%`;  // Return percentage string for the "left" CSS property
      }
    },
    methods: {
      actualizarCalendario() {
        const currentDate = new Date();
        const firstDayOfWeek = currentDate.getDate() - currentDate.getDay(); // Primer día de la semana
        const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate(); // Último día del mes
        let currentDay = firstDayOfWeek;
  
        this.weekDays = this.weekDays.map((_, index) => {
          if (currentDay > lastDayOfMonth) currentDay = 1;
          return currentDay++;
        });
      },
      async mostrarTemperatura() {
        const apiKey = 'MJKZY85NQXXSP4NGC69T62JS9';
        const ciudad = 'Bentonville,AR';
        const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${ciudad}?key=${apiKey}`;
        try {
          const response = await fetch(url);
          const data = await response.json();
          this.temperature = Math.round(data.currentConditions.feelslike);
          if (this.temperature < 0) this.temperature = 0;
          if (this.temperature > 100) this.temperature = 100;
        } catch (error) {
          console.error('Error al obtener la temperatura:', error);
        }
      },
      mostrarCortina() {
        const hours = this.currentTime.getHours();
        this.showCortina = hours >= 22 || hours < 6;
      },
      actualizarDatos() {
        this.currentTime = new Date();
        this.actualizarCalendario();
        this.mostrarCortina();
      }
    },
    mounted() {
      this.mostrarTemperatura();
      setInterval(() => {
        this.actualizarDatos();
      }, 1000); // Actualizar cada segundo
  
      setInterval(() => {
        this.mostrarTemperatura(); // Actualiza la temperatura cada 10 minutos
      }, 600000); // 10 minutos
    }
  });
  
  app.mount("#app");
  