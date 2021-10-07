let currentDateTime = document.querySelector("#today-date");
let now = new Date();
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
currentDateTime.innerHTML = `${weekDay}  ${month}  ${date}  ${year}  ${hour}:${minute}`;

function changeCityName(event) {
  event.preventDefault();
  let searchValue = document.querySelector("#city-search-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${searchValue.value.toUpperCase()}`;
}

function changeCelciusTempValue(response) {
  let temperature = Math.round(response.data.main.temp);
  let tempValue = document.querySelector("#degrees");
  tempValue.innerHTML = temperature;
  let weatherDescription = document.querySelector("#today-temp-tag");
  weatherDescription.innerHTML = response.data.weather[0].main;
  let humidity = document.querySelector("#humidity-value");
  humidity.innerHTML = response.data.main.humidity;
  let windSpeed = document.querySelector("#wind-speed-value");
  windSpeed.innerHTML = response.data.wind.speed;
  let weatherIcon = document.querySelector("#today-weather-emoji");
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function changeFahrenheitTempValue(response) {
  let temperature = Math.round(response.data.main.temp);
  let tempValue = document.querySelector("#degrees");
  tempValue.innerHTML = temperature;
  let weatherDescription = document.querySelector("#today-temp-tag");
  weatherDescription.innerHTML = response.data.weather[0].main;
  let humidity = document.querySelector("#humidity-value");
  humidity.innerHTML = response.data.main.humidity;
  let windSpeed = document.querySelector("#wind-speed-value");
  windSpeed.innerHTML = response.data.wind.speed;
  let weatherIcon = document.querySelector("#today-weather-emoji");
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}
function getCelciusWeatherAPI(event) {
  let city = document.querySelector("#city-search-input").value;
  let apiKey = `eb9c72edfe9b2e4dc537230ab5404717`;
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiURL).then(changeCelciusTempValue);
}
function getFahrenheitWeatherAPI(event) {
  let city = document.querySelector("#city-search-input").value;
  let apiKey = `eb9c72edfe9b2e4dc537230ab5404717`;
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
  axios.get(apiURL).then(changeFahrenheitTempValue);
}

let citySearch = document.querySelector("#city-form");
citySearch.addEventListener("submit", changeCityName);
citySearch.addEventListener("submit", getCelciusWeatherAPI);

let celciusButton = document.querySelector("#celcius");
celciusButton.addEventListener("click", getCelciusWeatherAPI);

let fahrenheightButton = document.querySelector("#fahrenheight");
fahrenheightButton.addEventListener("click", getFahrenheitWeatherAPI);

function showCurrentLocationWeather(response) {
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name.toUpperCase();
  let temperature = Math.round(response.data.main.temp);
  let tempValue = document.querySelector("#degrees");
  tempValue.innerHTML = temperature;
  let weatherDescription = document.querySelector("#today-temp-tag");
  weatherDescription.innerHTML = response.data.weather[0].main;
  let humidity = document.querySelector("#humidity-value");
  humidity.innerHTML = response.data.main.humidity;
  let windSpeed = document.querySelector("#wind-speed-value");
  windSpeed.innerHTML = response.data.wind.speed;
  let weatherIcon = document.querySelector("#today-weather-emoji");
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function getAPILocation(position) {
  let apiKey = `eb9c72edfe9b2e4dc537230ab5404717`;
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiURL).then(showCurrentLocationWeather);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getAPILocation);
}
let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", getLocation);
