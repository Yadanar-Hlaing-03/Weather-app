function notLoadPosition(notLoad) {
  let lat = notLoad.coords.latitude;
  let lon = notLoad.coords.longitude;
  let apiKey = "35b0e07e80de2469db49b28cc9fee2cd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  let forecastKey = "070e254694aef1c0135f35c0fc082206";
  let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${forecastKey}&units=metric`;

  axios.get(apiUrl).then(currentTemperature);
  axios.get(forecastUrl).then(forecastTemperature);
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
  celsiusTemperature = temperature.data.main.temp;
  number.innerHTML = Math.round(celsiusTemperature);
  console.log(temperature);
  let situation = document.querySelector("span.condition");
  situation.innerHTML = temperature.data.weather[0].description;
  //weather icons
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
  //background videos
  // Get the weather condition from the API response

  // Set the video source based on the weather condition
  let background = temperature.data.weather[0].main;
  let bgVideo = document.getElementById("background-video");
  let videoSource = document.getElementById("video-source");

  switch (background) {
    case "Clear":
      videoSource.src = "videos/clear.mp4";
      break;
    case "Clouds":
      videoSource.src = "videos/clouds.mp4";
      break;
    case "Rain":
    case "Drizzle":
      videoSource.src = "videos/rain.mp4";
      break;
    case "Thunderstorm":
      videoSource.src = "videos/thunderstorm.mp4";
      break;
    case "Snow":
      videoSource.src = "videos/snow.mp4";
      break;
    default:
      videoSource.src = "videos/default.mp4";
      break;
  }

  bgVideo.load(); // Reload the video element to load the new source
  console.log();
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

//forecast 5 days

function forecastTemperature(forecast) {
  // Get the forecast data for the specific hours
  console.log(forecast);
  let forecastData = [
    forecast.data.list[8],
    forecast.data.list[16],
    forecast.data.list[24],
    forecast.data.list[32],
    forecast.data.list[39],
  ];

  // Loop through the forecast data and update the HTML on the page
  for (let i = 0; i < forecastData.length; i++) {
    let forecastDayElement = document.getElementById(`forecast-day${i + 1}`);
    let forecastDateElement = document.getElementById(`forecast-date${i + 1}`);
    let forecastTempElement = document.getElementById(`forecast-temp${i + 1}`);
    let forecastIconElement = document.getElementById(`forecast-icon${i + 1}`);

    // Get the forecast date, temperature, and weather condition
    let forecastDate = new Date(forecastData[i].dt_txt);
    let forecastDay = forecastDate.toLocaleDateString("en-US", {
      weekday: "short",
    });
    let forecastDateString = forecastDate.toLocaleDateString("en-US", {
      month: "numeric",
      day: "numeric",
    });
    let forecastTemp = Math.round(forecastData[i].main.temp);
    let forecastCondition = forecastData[i].weather[0].main;

    // Update the HTML on the page with the forecast data
    forecastDayElement.innerHTML = forecastDay;
    forecastDateElement.innerHTML = forecastDateString;
    forecastTempElement.innerHTML = `${forecastTemp}&deg;C`;
    forecastIconElement.src = getIconUrl(forecastCondition);
  }
}

function getIconUrl(condition) {
  switch (condition) {
    case "Clear":
      return "images/clear.svg";
    case "Clouds":
      return "images/clouds.svg";
    case "Rain":
    case "Drizzle":
      return "images/rain.svg";
    case "Thunderstorm":
      return "images/thunderstorm.svg";
    case "Snow":
      return "images/snow.svg";
    default:
      return "images/unknown.svg";
  }
}
navigator.geolocation.getCurrentPosition(notLoadPosition);

//current button
function position(response) {
  let lat = response.coords.latitude;
  let lon = response.coords.longitude;
  let apiKey = "35b0e07e80de2469db49b28cc9fee2cd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  let forecastKey = "070e254694aef1c0135f35c0fc082206";
  let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${forecastKey}&units=metric`;

  axios.get(apiUrl).then(currentTemperature);
  axios.get(forecastUrl).then(forecastTemperatureCurrent);
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
  celsiusTemperature = temperature.data.main.temp;
  number.innerHTML = Math.round(celsiusTemperature);
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

  let background = temperature.data.weather[0].main;
  let bgVideo = document.getElementById("background-video");
  let videoSource = document.getElementById("video-source");

  switch (background) {
    case "Clear":
      videoSource.src = "videos/clear.mp4";
      break;
    case "Clouds":
      videoSource.src = "videos/clouds.mp4";
      break;
    case "Rain":
    case "Drizzle":
      videoSource.src = "videos/rain.mp4";
      break;
    case "Thunderstorm":
      videoSource.src = "videos/thunderstorm.mp4";
      break;
    case "Snow":
      videoSource.src = "videos/snow.mp4";
      break;
    default:
      videoSource.src = "videos/default.mp4";
      break;
  }

  bgVideo.load();
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

//forecast 5 days

function forecastTemperatureCurrent(forecast) {
  // Get the forecast data for the specific hours
  console.log(forecast);
  let forecastData = [
    forecast.data.list[8],
    forecast.data.list[16],
    forecast.data.list[24],
    forecast.data.list[32],
    forecast.data.list[39],
  ];

  // Loop through the forecast data and update the HTML on the page
  for (let i = 0; i < forecastData.length; i++) {
    let forecastDayElement = document.getElementById(`forecast-day${i + 1}`);
    let forecastDateElement = document.getElementById(`forecast-date${i + 1}`);
    let forecastTempElement = document.getElementById(`forecast-temp${i + 1}`);
    let forecastIconElement = document.getElementById(`forecast-icon${i + 1}`);

    // Get the forecast date, temperature, and weather condition
    let forecastDate = new Date(forecastData[i].dt_txt);
    let forecastDay = forecastDate.toLocaleDateString("en-US", {
      weekday: "short",
    });
    let forecastDateString = forecastDate.toLocaleDateString("en-US", {
      month: "numeric",
      day: "numeric",
    });
    let forecastTemp = Math.round(forecastData[i].main.temp);
    let forecastCondition = forecastData[i].weather[0].main;

    // Update the HTML on the page with the forecast data
    forecastDayElement.innerHTML = forecastDay;
    forecastDateElement.innerHTML = forecastDateString;
    forecastTempElement.innerHTML = `${forecastTemp}&deg;C`;
    forecastIconElement.src = getIconUrl(forecastCondition);
  }
}

function getIconUrl(condition) {
  switch (condition) {
    case "Clear":
      return "images/clear.svg";
    case "Clouds":
      return "images/clouds.svg";
    case "Rain":
    case "Drizzle":
      return "images/rain.svg";
    case "Thunderstorm":
      return "images/thunderstorm.svg";
    case "Snow":
      return "images/snow.svg";
    default:
      return "images/unknown.svg";
  }
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
  let forecastKey = "070e254694aef1c0135f35c0fc082206";
  let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${forecastKey}&units=metric`;
  axios.get(forecastUrl).then(forecastTemperatureSearch);

  axios.get(url).then(showTemperature);

  //forecast 5 days

  function forecastTemperatureSearch(forecast) {
    // Get the forecast data for the specific hours
    console.log(forecast);
    let forecastData = [
      forecast.data.list[8],
      forecast.data.list[16],
      forecast.data.list[24],
      forecast.data.list[32],
      forecast.data.list[39],
    ];

    // Loop through the forecast data and update the HTML on the page
    for (let i = 0; i < forecastData.length; i++) {
      let forecastDayElement = document.getElementById(`forecast-day${i + 1}`);
      let forecastDateElement = document.getElementById(
        `forecast-date${i + 1}`
      );
      let forecastTempElement = document.getElementById(
        `forecast-temp${i + 1}`
      );
      let forecastIconElement = document.getElementById(
        `forecast-icon${i + 1}`
      );

      // Get the forecast date, temperature, and weather condition
      let forecastDate = new Date(forecastData[i].dt_txt);
      let forecastDay = forecastDate.toLocaleDateString("en-US", {
        weekday: "short",
      });
      let forecastDateString = forecastDate.toLocaleDateString("en-US", {
        month: "numeric",
        day: "numeric",
      });
      let forecastTemp = Math.round(forecastData[i].main.temp);
      let forecastCondition = forecastData[i].weather[0].main;

      // Update the HTML on the page with the forecast data
      forecastDayElement.innerHTML = forecastDay;
      forecastDateElement.innerHTML = forecastDateString;
      forecastTempElement.innerHTML = `${forecastTemp}&deg;C`;
      forecastIconElement.src = getIconUrl(forecastCondition);
    }
  }

  function getIconUrl(condition) {
    switch (condition) {
      case "Clear":
        return "images/clear.svg";
      case "Clouds":
        return "images/clouds.svg";
      case "Rain":
      case "Drizzle":
        return "images/rain.svg";
      case "Thunderstorm":
        return "images/thunderstorm.svg";
      case "Snow":
        return "images/snow.svg";
      default:
        return "images/unknown.svg";
    }
  }

  function showTemperature(temperature) {
    let number = document.querySelector("span.number");
    celsiusTemperature = temperature.data.main.temp;
    number.innerHTML = Math.round(celsiusTemperature);
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

    let background = temperature.data.weather[0].main;
    let bgVideo = document.getElementById("background-video");
    let videoSource = document.getElementById("video-source");

    switch (background) {
      case "Clear":
        videoSource.src = "videos/clear.mp4";
        break;
      case "Clouds":
        videoSource.src = "videos/clouds.mp4";
        break;
      case "Rain":
      case "Drizzle":
        videoSource.src = "videos/rain.mp4";
        break;
      case "Thunderstorm":
        videoSource.src = "videos/thunderstorm.mp4";
        break;
      case "Snow":
        videoSource.src = "videos/snow.mp4";
        break;
      default:
        videoSource.src = "videos/default.mp4";
        break;
    }

    bgVideo.load();
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

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("span.number");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("span.number");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let search = document.querySelector("form.search-form");
search.addEventListener("submit", searchCity);

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("a.°F");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("a.celsius");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
