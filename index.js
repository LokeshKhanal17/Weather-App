const apiKey = "4357de1742a730fe5f563cad59fea0f8";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";

async function getWeatherData(city) {
    try {
        const response = await fetch(`${apiUrl}&q=${city}&appid=${apiKey}`);
        const data = await response.json();
        showWeatherData(data);
    } catch (error) {
        console.error("Error fetching weather data:", error);
        showError();
    }
}

function showWeatherData(data) {
    if (data.cod === "404") {
        showError();
        return;
    }
    
    const location = document.querySelector(".location");
    const temperature = document.querySelector(".temperature");
    const humidity = document.querySelector(".humidity");
    const wind = document.querySelector(".wind");
    const weatherIcon = document.querySelector(".weather-icon");

    location.innerText = `${data.name}, ${data.sys.country}`;
    temperature.innerText = `${Math.round(data.main.temp)}°C`;
    humidity.innerText = data.main.humidity;
    wind.innerText = `${data.wind.speed} km/h`;

    switch (data.weather[0].main) {
        case "Clear":
            weatherIcon.src = "images/clear.png";
            break;
        case "Clouds":
            weatherIcon.src = "images/clouds.png";
            break;
        case "Rain":
            weatherIcon.src = "images/rain.png";
            break;
        // Add other weather cases here...
        default:
            // Handle unknown weather
            weatherIcon.src = "";
    }
}

function showError() {
    const weatherDisplay = document.querySelector(".Weather");
    weatherDisplay.style.display = "none";
    const error = document.querySelector(".error");
    error.innerText = "City Not Found";
}

function initWeatherDataFetching() {
    const searchButton = document.querySelector(".search button");
    const searchInput = document.querySelector(".search input");

    searchButton.addEventListener("click", () => getWeatherData(searchInput.value));
    searchInput.addEventListener("keyup", (event) => {
        if (event.key === "Enter") {
            getWeatherData(searchInput.value);
        }
    });
}

// Initialization
document.addEventListener("DOMContentLoaded", () => {
    const weatherDisplay = document.querySelector(".Weather");
    weatherDisplay.style.display = "block";
    initWeatherDataFetching();
});
