function changeCityName(event) {
  event.preventDefault();
  let searchValue = document.querySelector("#city-search-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${searchValue.value.toUpperCase()}`;
}

function displayCelciusTemp(response) {
  celciusTemperature = Math.round(response.data.main.temp);
  let tempValue = document.querySelector("#degrees");
  tempValue.innerHTML = celciusTemperature;
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

function changeCelciusTempValue(event) {
  event.preventDefault();
  let tempValue = document.querySelector("#degrees");
  tempValue.innerHTML = celciusTemperature;
}

function changeFahrenheitTempValue(event) {
  event.preventDefault();
  let tempValue = document.querySelector("#degrees");
  let fahrenheightTemperature = (celciusTemperature * 9) / 5 + 32;
  tempValue.innerHTML = Math.round(fahrenheightTemperature);
}

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

function search(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayCelciusTemp);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-search-input");
  search(cityInputElement.value);
}

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

let citySearch = document.querySelector("#city-form");
citySearch.addEventListener("submit", handleSubmit);
citySearch.addEventListener("submit", changeCityName);

let celciusButton = document.querySelector("#celcius");
celciusButton.addEventListener("click", changeCelciusTempValue);

let fahrenheightButton = document.querySelector("#fahrenheight");
fahrenheightButton.addEventListener("click", changeFahrenheitTempValue);

let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", getLocation);

let celciusTemperature = null;

search("New York");
