import { stateConversion } from "./stateConversion";

("use strict");

const testBtn = document.querySelector("#test-btn");

const getCoords = async function () {
  const getCurrentPosition = function () {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position),
        (error) => reject(error)
      );
    });
  };

  const position = await getCurrentPosition();
  const { latitude: lat, longitude: long } = position.coords;
  return { lat, long };
};

const getLocationData = async function (coords) {
  const resLocation = await fetch(
    `http://api.openweathermap.org/geo/1.0/reverse?lat=${coords.lat}&lon=${coords.long}&appid=e1c7899ad76e2db415e336ec95e711cd`
  );

  const [dataLocation] = await resLocation.json();
  return dataLocation;
};

const getWeatherData = async function (coords) {
  const resWeather = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.long}&appid=e1c7899ad76e2db415e336ec95e711cd`
  );
  return await resWeather.json();
};

const collateData = async function () {
  const coords = await getCoords();
  const dataLocation = await getLocationData(coords);
  const dataWeather = await getWeatherData(coords);

  console.log(dataLocation);
  console.log(
    dataLocation.name,
    stateConversion[dataLocation.state],
    dataLocation.country
  );
  console.log(dataWeather);
};

collateData();

testBtn.addEventListener("click", async () => {
  console.log(await getCoords());
});
