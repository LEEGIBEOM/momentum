const weatherPlace = document.querySelector(".weather__place"),
  weatherTemp = document.querySelector(".weather__temp"),
  weatherInfo = document.querySelector(".weather__info");

const API_KEY = "475787a546935b57620cd3c43ddae1e1";
const COORDS = "coords";

const getWeather = (lat, lon) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )
    .then((res) => res.json())
    .then((json) => {
      const temp = json.main.temp;
      const place = json.name;
      const weather = json.weather[0].description;
      weatherPlace.innerHTML = `${place} Info. 
      <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="sync-alt" class="svg-inline--fa fa-sync-alt fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path fill="currentColor" d="M370.72 133.28C339.458 104.008 298.888 87.962 255.848 88c-77.458.068-144.328 53.178-162.791 126.85-1.344 5.363-6.122 9.15-11.651 9.15H24.103c-7.498 0-13.194-6.807-11.807-14.176C33.933 94.924 134.813 8 256 8c66.448 0 126.791 26.136 171.315 68.685L463.03 40.97C478.149 25.851 504 36.559 504 57.941V192c0 13.255-10.745 24-24 24H345.941c-21.382 0-32.09-25.851-16.971-40.971l41.75-41.749zM32 296h134.059c21.382 0 32.09 25.851 16.971 40.971l-41.75 41.75c31.262 29.273 71.835 45.319 114.876 45.28 77.418-.07 144.315-53.144 162.787-126.849 1.344-5.363 6.122-9.15 11.651-9.15h57.304c7.498 0 13.194 6.807 11.807 14.176C478.067 417.076 377.187 504 256 504c-66.448 0-126.791-26.136-171.315-68.685L48.97 471.03C33.851 486.149 8 475.441 8 454.059V320c0-13.255 10.745-24 24-24z"></path>
      </svg>`;
      const weatherRefresh = weatherPlace.querySelector("svg");
      weatherRefresh.addEventListener("click", askForCoords);
      weatherTemp.innerText = `${temp.toFixed(1)}ºC`;
      weatherInfo.innerText = `${weather}`;
    });
};

const saveCoords = (coordsObj) => {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
};

const handleGetGeoSucces = (position) => {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const coordsObj = {
    lat,
    lon,
  };
  saveCoords(coordsObj);
  getWeather(lat, lon);
};

const handleGetGeoError = () => {
  console.error("Can't access geo location");
};

const askForCoords = () => {
  navigator.geolocation.getCurrentPosition(
    handleGetGeoSucces,
    handleGetGeoError
  );
};

const loadCoords = () => {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords) {
    const parsedCoords = JSON.parse(loadedCoords);
    getWeather(parsedCoords.lat, parsedCoords.lon);
  } else {
    askForCoords();
  }
};

const weatherInit = () => {
  loadCoords();
};

weatherInit();
