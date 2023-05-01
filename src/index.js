function notLoadPosition(notLoad) {
  let lat = notLoad.coords.latitude;
  let lon = notLoad.coords.longitude;
  let apiKey = "35b0e07e80de2469db49b28cc9fee2cd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(currentTemperature);
}

function currentTemperature(temperature) {
  let now = new Date();
  let date = now.getDate();
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
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let hour = now.getHours();
  let minute = now.getMinutes();

  let h2 = document.querySelector("h2");
  h2.innerHTML = `${date} (${day}) / ${month}`;
  let h3 = document.querySelector("h3");
  //h3.innerHTML = ` ${hour}:${minute}`;
  let options = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };
  let timeString = now.toLocaleTimeString([], options);
  h3.innerHTML = timeString;

  let h4 = document.querySelector("h4");
  if (hour >= 5 && hour < 12) {
    h4.innerHTML =
      "🌞Good Morning🌞! Have a lovely and wonderful day ahead! Dun Skip the Breakfast nor👊!!!";
  }
  if (hour >= 12 && hour < 16) {
    h4.innerHTML = "☀Good Afternoon☀! Lunch Kg Kg srr pr!";
  }

  if (hour >= 16 && hour < 20) {
    h4.innerHTML =
      "🌆Good Evening🌆! Dinner Kg Kg srr nor..Dun Skip the Dinner nor👊!!!";
  }
  if (hour >= 20 || hour < 5) {
    h4.innerHTML =
      "😴Good night sweet dreams😴! Sw sw x nor ayan nout kya tk ahti m nay nk👊!!!";
  }
  let number = document.querySelector("span.number");
  let currentTemp = Math.round(temperature.data.main.temp);
  number.innerHTML = currentTemp;
  console.log(temperature);
  let situation = document.querySelector("span.condition");
  situation.innerHTML = temperature.data.weather[0].description;
  let condition = temperature.data.weather[0].main;
  // Get the icon element
  let icon = document.getElementById("weather-icon");

  // Set the icon source based on the weather condition
  switch (condition) {
    case "Clear":
      icon.src = "images/clear.svg";
      break;
    case "Clouds":
      icon.src = "images/clouds.svg";
      break;
    case "Rain":
    case "Drizzle":
      icon.src = "images/rain.svg";
      break;
    case "Thunderstorm":
      icon.src = "images/thunderstorm.svg";
      break;
    case "Snow":
      icon.src = "images/snow.svg";
      break;
    default:
      icon.src = "images/unknown.svg";
      break;
  }
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
navigator.geolocation.getCurrentPosition(notLoadPosition);

//current button
function position(response) {
  let lat = response.coords.latitude;
  let lon = response.coords.longitude;
  let apiKey = "35b0e07e80de2469db49b28cc9fee2cd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(currentTemperature);
}

function currentTemperature(temperature) {
  let now = new Date();
  let date = now.getDate();
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
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let hour = now.getHours();
  //let minute = now.getMinutes();

  let h2 = document.querySelector("h2");
  h2.innerHTML = `${date} (${day}) / ${month}`;
  let h3 = document.querySelector("h3");
  //h3.innerHTML = ` ${hour}:${minute}`;
  let options = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };
  let timeString = now.toLocaleTimeString([], options);
  h3.innerHTML = timeString;

  let h4 = document.querySelector("h4");
  if (hour >= 5 && hour < 12) {
    h4.innerHTML =
      "🌞Good Morning🌞! Have a lovely and wonderful day ahead! Dun Skip the Breakfast nor👊!!!";
  }
  if (hour >= 12 && hour < 16) {
    h4.innerHTML = "☀Good Afternoon☀! Lunch Kg Kg srr pr!";
  }

  if (hour >= 16 && hour < 20) {
    h4.innerHTML =
      "🌆Good Evening🌆! Dinner Kg Kg srr nor..Dun Skip the Dinner nor👊!!!";
  }
  if (hour >= 20 || hour < 5) {
    h4.innerHTML =
      "😴Good night sweet dreams😴! Sw sw x nor ayan nout kya tk ahti m nay nk👊!!!";
  }
  let number = document.querySelector("span.number");
  let currentTemp = Math.round(temperature.data.main.temp);
  number.innerHTML = currentTemp;
  console.log(temperature);
  let situation = document.querySelector("span.condition");
  situation.innerHTML = temperature.data.weather[0].description;
  let condition = temperature.data.weather[0].main;
  // Get the icon element
  let icon = document.getElementById("weather-icon");

  // Set the icon source based on the weather condition
  switch (condition) {
    case "Clear":
      icon.src = "images/clear.svg";
      break;
    case "Clouds":
      icon.src = "images/clouds.svg";
      break;
    case "Rain":
    case "Drizzle":
      icon.src = "images/rain.svg";
      break;
    case "Thunderstorm":
      icon.src = "images/thunderstorm.svg";
      break;
    case "Snow":
      icon.src = "images/snow.svg";
      break;
    default:
      icon.src = "images/unknown.svg";
      break;
  }
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

//search submit
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
    let situation = document.querySelector("span.condition");
    let description = temperature.data.weather[0].description;
    situation.innerHTML = description;

    //weather-icon
    // Get the weather condition from the API response
    let condition = temperature.data.weather[0].main;
    // Get the icon element
    let icon = document.getElementById("weather-icon");

    // Set the icon source based on the weather condition
    switch (condition) {
      case "Clear":
        icon.src = "images/clear.svg";
        break;
      case "Clouds":
        icon.src = "images/clouds.svg";
        break;
      case "Rain":
      case "Drizzle":
        icon.src = "images/rain.svg";
        break;
      case "Thunderstorm":
        icon.src = "images/thunderstorm.svg";
        break;
      case "Snow":
        icon.src = "images/snow.svg";
        break;
      default:
        icon.src = "images/unknown.svg";
        break;
    }

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
    //search time
    let timezoneOffset = temperature.data.timezone;
    let now = new Date();
    let localTime =
      now.getTime() + now.getTimezoneOffset() * 60000 + timezoneOffset * 1000;
    let localDate = new Date(localTime);

    //date/time/hour/minutes
    let date = localDate.getDate();
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
    let month = months[localDate.getMonth()];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = days[localDate.getDay()];
    //let hour = localDate.getHours();
    //let minute = localDate.getMinutes();

    let h2 = document.querySelector("h2");
    h2.innerHTML = `${date} (${day}) / ${month}`;
    //hour 12
    let h3 = document.querySelector("h3");
    //h3.innerHTML = ` ${hour}:${minute}`;
    let options = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };
    let timeString = localDate.toLocaleTimeString([], options);
    h3.innerHTML = timeString;

    //message display
    let current = localDate.getHours();

    let h4 = document.querySelector("h4");
    if (current >= 5 && current < 12) {
      h4.innerHTML =
        "🌞Good Morning🌞! Have a lovely and wonderful day ahead! Dun Skip the Breakfast nor👊!!!";
    }
    if (current >= 12 && current < 16) {
      h4.innerHTML = "☀Good Afternoon☀! Lunch Kg Kg srr pr!";
    }

    if (current >= 16 && current < 20) {
      h4.innerHTML =
        "🌆Good Evening🌆! Dinner Kg Kg srr nor..Dun Skip the Dinner nor👊!!!";
    }
    if (current >= 20 || current < 5) {
      h4.innerHTML =
        "😴Good night sweet dreams😴! Sw sw x nor ayan nout kya tk ahti m nay nk👊!!!";
    }
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
