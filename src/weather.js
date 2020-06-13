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
      console.log(json);
      const temp = json.main.temp;
      const place = json.name;
      const weather = json.weather[0].description;
      weatherPlace.innerHTML = `${place} Info.`;
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
  console.log(lon);
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
