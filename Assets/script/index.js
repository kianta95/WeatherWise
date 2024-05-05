document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("search-form");
    const cityInput = document.getElementById("city-input");
    const currentWeatherSection = document.getElementById("current-weather");
    const forecastSection = document.getElementById("forecast");
    const searchHistorySection = document.getElementById("search-history");

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const cityName = cityInput.value.trim();
        if (cityName) {
            getWeatherData(cityName);
            cityInput.value = "";
        } else {
            alert("Please enter a city name.");
        }
    });

    searchHistorySection.addEventListener("click", (event) => {
        if (event.target.classList.contains("city-item")) {
            const cityName = event.target.textContent;
            getWeatherData(cityName);
        }
    });

    function getWeatherData(cityName) {
        const apiKey = "d126f237ff726a2a4c1e34811353729e";
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                displayCurrentWeather(data);

                
                return fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`);
            })
            .then(response => response.json())
            .then(data => {
                
                displayForecast(data.list);
            })
            .catch(error => console.error('Error fetching weather data:', error));
    }

    function displayCurrentWeather(data) {
        
        const cityName = data.name;
        const temperature = Math.round(data.main.temp - 273.15); 
        const description = data.weather[0].description;

        currentWeatherSection.innerHTML = `
            <h2>${cityName}</h2>
            <p>Temperature: ${temperature}°C</p>
            <p>Description: ${description}</p>
        `;
    }

    function displayForecast(forecastData) {
        
        forecastSection.innerHTML = "<h2>5-Day Forecast</h2>";

        
        for (let i = 0; i < forecastData.length; i += 8) {
            const forecast = forecastData[i];
            const date = new Date(forecast.dt * 1000);
            const dateString = date.toLocaleDateString();
            const temperature = Math.round(forecast.main.temp - 273.15); 
            const description = forecast.weather[0].description;

            const forecastItem = document.createElement("div");
            forecastItem.classList.add("forecast-item");
            forecastItem.innerHTML = `
                <p>Date: ${dateString}</p>
                <p>Temperature: ${temperature}°C</p>
                <p>Description: ${description}</p>
            `;
            forecastSection.appendChild(forecastItem);
        }
    }

    function updateSearchHistory(cityName) {
        
        const cityItem = document.createElement("div");
        cityItem.classList.add("city-item");
        cityItem.textContent = cityName;
        searchHistorySection.appendChild(cityItem);
    }
});
