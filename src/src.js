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

function displayForecast(response) {
  console.log(response.data);
  let forecastElement = document.querySelector("#weekly-forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Fri", "Sat", "Sun", "Mon", "Tues", "Wed"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
  <div class="col-2">
    <div class="weekDay">${day}</div>
    <i class="fas fa-cloud-sun"></i>
    <div class="weeklyTemperature">
      <span class="maxTemp"> 18° |</span>
      <span class="minTemp"> 12° </span>
    </div>
  </div>
`;
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
  celciusTemperature = Math.round(response.data.main.temp);
  let tempValue = document.querySelector("#degrees");
  tempValue.innerHTML = celciusTemperature;
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

let celciusButton = document.querySelector("#celcius");
celciusButton.addEventListener("click", changeCelciusTempValue);

let fahrenheightButton = document.querySelector("#fahrenheight");
fahrenheightButton.addEventListener("click", changeFahrenheitTempValue);

let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", getLocation);

let celciusTemperature = null;

search("New York");
