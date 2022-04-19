import { stateConversion, convertDir, convertUTC } from "./conversions";

("use strict");

const testBtn = document.querySelector("#test-btn");

// Get Coordinates from browser location
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

// Location Data
const getLocationData = async function (coords) {
  const resLocation = await fetch(
    `http://api.openweathermap.org/geo/1.0/reverse?lat=${coords.lat}&lon=${coords.long}&appid=e1c7899ad76e2db415e336ec95e711cd`
  );

  const [dataLocation] = await resLocation.json();
  return dataLocation;
};

// Weather Data
const getWeatherData = async function (coords) {
  const resWeather = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.long}&units=imperial&appid=e1c7899ad76e2db415e336ec95e711cd`
  );
  return await resWeather.json();
};

// Collect data together
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

  // Data Object
  const data = {
    // Unit of Measurement
    units: "imperial",
    // Location and Date
    location: {
      city: dataLocation.name,
      state:
        dataLocation.country === "US"
          ? stateConversion[dataLocation.state]
          : dataLocation.country,
      month: convertUTC(dataWeather.current.dt, "month"),
      day: convertUTC(dataWeather.current.dt, "day"),
      weekday: convertUTC(dataWeather.current.dt, "weekday")
    },

    // Weather
    weather: {
      // Today's Weather
      current: {
        sunrise: convertUTC(dataWeather.current.sunrise, "time"),
        sunset: convertUTC(dataWeather.current.sunset, "time"),
        temp: dataWeather.current.temp,
        feel: dataWeather.current.feels_like,
        clouds: `${dataWeather.current.clouds}%`,
        humidity: `${dataWeather.current.humidity}%`,
        windSpd: dataWeather.current.wind_speed,
        windDir: convertDir(dataWeather.current.wind_deg),
        conditionMain: dataWeather.current.weather[0].main,
        conditionDesc: dataWeather.current.weather[0].description
      },

      // Hourly
      // hourly: dataWeather.hourly.slice(23)
      hourly: dataWeather.hourly.slice(1, 25).map((hourlyItem) => {
        const arr = [];
        arr.push(convertUTC(hourlyItem.dt, "weekday"));
        arr.push(convertUTC(hourlyItem.dt, "time"));
        arr.push(hourlyItem.weather[0].main);
        arr.push(hourlyItem.temp);
        arr.push(hourlyItem.feels_like);
        arr.push(hourlyItem.pop);

        return arr;
      })
    }
  };
  return data;
};

const testData = collateData();

testBtn.addEventListener("click", async () => {
  console.log(await testData);
});
// testBtn.addEventListener("click", async () => {
//   console.log(await testData);
// });
