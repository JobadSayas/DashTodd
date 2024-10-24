# DashTodd - Time and Weather Dashboard for Toddlers

## Project Description

DashTodd is a web app I developed to help my curious toddler with understanding the time, weather, and calendar. My child used to ask endless questions like "Is it cold outside?", "Can I go out and play?", "How much longer until nap time?", "What day is it?", "What are we going to do today?". These questions sparked the idea for DashTodd, which not only answers these questions but also helps my child follow a routine.

I've set it up on an old phone mounted inside a frame to resemble a dashboard, hanging on the wall. The app runs continuously, updating in real-time, just like a clock. It has been a game-changer in helping my child grasp concepts of time, weather, and daily structure.

## Features

- **Dynamic Clock and Visuals**: 
  - Displays the current time in a 12-hour format, updating every second.
  - Adjusts the background and associated visuals based on the time of day (morning, afternoon, evening, night).

- **Traffic Light (Semaphore) System**:
  - Changes colors based on specific time ranges during the day.
  - Initiates countdowns for specific events and periods, e.g., work breaks, lunchtime, etc.

- **Real-Time Temperature Display**:
  - Fetches and displays the real-time temperature of the selected city (Bentonville, AR).
  - Updates every 30 minutes and moves a thermometer slider according to the temperature.

- **Weekly Calendar**:
  - Automatically updates and highlights the current day of the week.
  - Displays the current and upcoming days dynamically, adapting to changes in months and years.

- **Night Mode**:
  - A "curtain" effect is shown during night hours (10:00 PM - 6:00 AM) to simulate nighttime.

## Technologies Used

- **HTML/CSS**: 
  - Used for creating the structure and styling of the UI, including dynamic background changes.
  
- **JavaScript**: 
  - Provides the logic for updating time, temperature, semaphore, and calendar.
  - Uses `fetch()` for API calls to retrieve weather data from the Visual Crossing Weather API.
  
- **Visual Crossing Weather API**: 
  - Provides real-time temperature data for the application.
