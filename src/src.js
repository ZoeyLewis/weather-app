function formatDate(timestamp) {
  let now = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let weekDay = days[now.getDay()];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let month = months[now.getMonth()];
  let date = now.getDate();
  let year = now.getFullYear();
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = now.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  return `${weekDay}  ${month}  ${date}  ${year}  ${hour}:${minute}`;
}

function formatWeekDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return weekDays[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weekly-forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
  <div class="col-2">
    <div class="weekDay">${formatWeekDay(forecastDay.dt)}</div>
    <img class="forecastIcons"
    src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
  />
    <div class="weeklyTemperature">
      <span class="maxTemp"> ${Math.round(forecastDay.temp.max)}° |</span>
      <span class="minTemp"> ${Math.round(forecastDay.temp.min)}° </span>
    </div>
  </div>
`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayForecast);
}

function displayTemperature(response) {
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name.toUpperCase();
  celsiusTemperature = Math.round(response.data.main.temp);
  let tempValue = document.querySelector("#degrees");
  tempValue.innerHTML = celsiusTemperature;
  let weatherDescription = document.querySelector("#today-temp-tag");
  weatherDescription.innerHTML = response.data.weather[0].main;
  let humidity = document.querySelector("#humidity-value");
  humidity.innerHTML = response.data.main.humidity;
  let windSpeed = document.querySelector("#wind-speed-value");
  windSpeed.innerHTML = response.data.wind.speed;
  let date = document.querySelector("#today-date");
  date.innerHTML = formatDate(response.data.dt * 1000);
  let weatherIcon = document.querySelector("#today-weather-emoji");
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecast(response.data.coord);
}

function getAPILocation(position) {
  let apiKey = `eb9c72edfe9b2e4dc537230ab5404717`;
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiURL).then(displayTemperature);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getAPILocation);
}

function search(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-search-input");
  search(cityInputElement.value);
}

let citySearch = document.querySelector("#city-form");
citySearch.addEventListener("submit", handleSubmit);

let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", getLocation);

let celsiusTemperature = null;

search("New York");
