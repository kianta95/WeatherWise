const apiKey = ""
const apiUrl = `https://api.openweathermap.org/data/2.5/&appid=${apiKey}`
const searchFormEl = document.querySelector ("#weather-search")





function getCitySearchCoords(query="") {
    console.log("Getting Coords");
    fetch (`${apiUrl}/forecast?lat=${lat}&lon=${lon}`)
}

function getDailyForecast(coords ={}) {
    console.log('Getting Daily Forecast');
}

function displayDailyForecast(data = []) {
    console.log("Display Daily");
    const dailyForecastSection = document.querySelector ("#daily-forecast")
}

function handleSubmit(event) {
    console.log(event);
    event.preventDefault();
}









searchFormEl.addEventListener("submit", handleSubmit)