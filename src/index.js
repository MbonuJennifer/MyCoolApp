let apiKey = "de2c40e370d58e257faf07ba4ea95840";
let apiUrl = "https://api.openweathermap.org/data/2.5/";

let now = new Date();
let hour = now.getHours().toString().padStart(2, "0");
let minutes = now.getMinutes().toString().padStart(2, "0");

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
document.querySelector("#day").innerHTML = `${day}`;
document.querySelector("#hour").innerHTML = `${hour}`;
document.querySelector("#minutes").innerHTML = `${minutes}`;

let form = document.querySelector("#submitForm");

function displaySearch(event) {
  event.preventDefault();
  let input = document.querySelector("#inputValue");
  let inputValue = input.value;
  document.querySelector("#searchCountry").innerHTML = `${inputValue}`;
  //let apiUrl ="https://api.openweathermap.org/data/2.5/weather?q=Sydney&units=metric";
  let urlSearch = `${apiUrl}weather?q=${inputValue}&units=metric`;

  function showRealTimeTemp(response) {
    let temperature = Math.round(response.data.main.temp);
    console.log(response.data);
    document.querySelector("#tempOutput").textContent = `${temperature}`;
    let description = response.data.weather[0].description;
    document.querySelector("#description").textContent = `${description}`;
    let humidity = Math.round(response.data.main.humidity);
    document.querySelector("#moist").textContent = `${humidity}`;
    let wind = Math.round(response.data.wind.speed);
    document.querySelector("#breeze").textContent = `${wind}`;
  }
  axios.get(`${urlSearch}&appid=${apiKey}`).then(showRealTimeTemp);
}

form.addEventListener("submit", displaySearch);
let f = document.querySelector("#fahrenheit");
let c = document.querySelector("#centigrade");
let temp = document.querySelector("#tempOutput");
let cOutput = 16;

function convertTemp() {
  temp.innerHTML = `${cOutput}`;
}
function convertCensuis() {
  let fOutput = Math.round((cOutput * 9) / 5 + 32);
  temp.innerHTML = `${fOutput}`;
}

c.addEventListener("click", convertTemp);
f.addEventListener("click", convertCensuis);

function showPostion(position) {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  console.log(latitude);
  console.log(longitude);

  let url = `${apiUrl}onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  function showTemp(response) {
    // console.log(response.data.current.temp);
    let city = response.data.timezone.split("/").pop().replace("_", " ");

    document.getElementById("searchCountry").textContent = city;

    let currentTemperature = Math.round(response.data.current.temp);
    // console.log(response.data)
    document.querySelector("#tempOutput").textContent = `${currentTemperature}`;

    let description = response.data.current.weather[0].main;
    document.querySelector("#description").textContent = `${description}`;

    let humidity = Math.round(response.data.current.humidity);
    document.querySelector("#moist").textContent = `${humidity}`;
    let wind = Math.round(response.data.current.wind_speed);
    document.querySelector("#breeze").textContent = `${wind}`;
  }
  axios.get(url).then(showTemp);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPostion);
}

let button = document.querySelector("#currentBtn");
button.addEventListener("click", getCurrentPosition);
