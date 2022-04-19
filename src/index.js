"use strict";

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

const getWeatherData = async function () {
  const coords = await getCoords();
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.long}&appid=e1c7899ad76e2db415e336ec95e711cd`
  );
  const data = await response.json();
  //! has weather, now need promise.all() for api of city name as well
  console.log(data);
};

getWeatherData();

testBtn.addEventListener("click", async () => {
  console.log(await getCoords());
});
