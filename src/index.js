function refreshWeather(response) {
  let weatherCity = document.querySelector("#weather-city");
  let timeElement = document.querySelector("#time");
  let conditionElement = document.querySelector("#condition");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind-speed");
  let iconElement = document.querySelector("#icon");
  let tempElement = document.querySelector("#current-temperature");

  let date = new Date(response.data.time * 1000);
  let temperature = response.data.temperature.current;
  weatherCity.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  conditionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="icon" />`;
  tempElement.innerHTML = Math.round(temperature);
  getForecast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "59b3fc01054638ecba59foc51366fa4t";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchBoxInput = document.querySelector("#search-box");

  searchCity(searchBoxInput.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKeyForecast = "59b3fc01054638ecba59foc51366fa4t";
  let apiUrlForecast = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKeyForecast}&units=metric`;

  axios.get(apiUrlForecast).then(displayForecast);
}

function displayForecast(response) {
  let forecastHTML = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
        <div class="weather-forecast">
            <div class="weather-forecast-date">${formatDay(day.time)}</div>

            <img src=${day.condition.icon_url} class="weather-forecast-icon" />
            <div class="weather-forecast-temperatures">
              <div class="weather-forecast-temperature">
                <strong>${Math.round(day.temperature.maximum)}°</strong> </div>
              <div class="weather-forecast-temperature">${Math.round(
                day.temperature.minimum
              )}°</div>
            </div>
        </div>
        `;
    }
  });

  let forecastElement = document.querySelector("#weather-forecast");
  forecastElement.innerHTML = forecastHTML;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Tehran");
