let now = new Date();
let date = now.getDate();
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "August",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];
let days = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];
let day = days[now.getDay()];
let hour = now.getHours();
let minute = now.getMinutes();

let h2 = document.querySelector("h2");
h2.innerHTML = `${date} / ${month} <br /> ${day} ${hour}:${minute}`;

function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-search");
  let city = cityInput.value;
  let h1 = document.querySelector("h1");
  let cityReturn = city
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  h1.innerHTML = cityReturn;
  let key = "1361f00332c90f7a8c486d88dcd1f268";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`;
  axios.get(url).then(showTemperature);

  function showTemperature(temperature) {
    let number = document.querySelector("span.number");
    let currentTemp = Math.round(temperature.data.main.temp);
    number.innerHTML = currentTemp;
    console.log(temperature);
    let condition = document.querySelector("span.condition");
    condition.innerHTML = temperature.data.weather[0].description;

    let precipitation = document.querySelector("span.precipitation");
    precipitation.innerHTML = temperature.data.rain
      ? temperature.data.rain["1h"]
      : temperature.data.snow
      ? temperature.data.snow["1h"]
      : 0;

    let wind = document.querySelector("span.wind");
    wind.innerHTML = Math.round(temperature.data.wind.speed * 3.6);

    let humidity = document.querySelector("span.humidity");
    humidity.innerHTML = temperature.data.main.humidity;
  }
}

let search = document.querySelector("form.search-form");
search.addEventListener("submit", searchCity);

function degreeCelsius(event) {
  event.preventDefault();
  let number = document.querySelector("span.number");
  number.innerHTML = 31;
}
let degree = document.querySelector("a.celsius");
degree.addEventListener("click", degreeCelsius);

function degreeFahrenheit(event) {
  event.preventDefault();
  let number = document.querySelector("span.number");
  number.innerHTML = 66;
}
let Fahrenheit = document.querySelector("a.°F");
Fahrenheit.addEventListener("click", degreeFahrenheit);

function position(response) {
  let lat = response.coords.latitude;
  let lon = response.coords.longitude;
  let apiKey = "35b0e07e80de2469db49b28cc9fee2cd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(currentTemperature);
}

function currentTemperature(temperature) {
  let number = document.querySelector("span.number");
  let currentTemp = Math.round(temperature.data.main.temp);
  number.innerHTML = currentTemp;
  console.log(temperature);
  let condition = document.querySelector("span.condition");
  condition.innerHTML = temperature.data.weather[0].description;

  let precipitation = document.querySelector("span.precipitation");
  precipitation.innerHTML = temperature.data.rain
    ? temperature.data.rain["1h"]
    : temperature.data.snow
    ? temperature.data.snow["1h"]
    : 0;

  let wind = document.querySelector("span.wind");
  wind.innerHTML = Math.round(temperature.data.wind.speed * 3.6);

  let humidity = document.querySelector("span.humidity");
  humidity.innerHTML = temperature.data.main.humidity;
  let h1 = document.querySelector("h1");
  h1.innerHTML = temperature.data.name;
}
function currentPosition() {
  navigator.geolocation.getCurrentPosition(position);
}

let currentButton = document.querySelector("#current");
currentButton.addEventListener("click", currentPosition);
