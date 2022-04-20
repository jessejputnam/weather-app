import {
  stateConversion,
  convertDir,
  convertUTC,
  convertIconID,
  convertSpdUnits,
  convertTempUnits
} from "./conversions";

("use strict");

const testBtn = document.querySelector("#test-btn");
const testbtn2 = document.querySelector("#test-btn2");
const convertBtn = document.querySelector("#convert-btn");

// Get Coordinates from browser location
const getCoords = async function () {
  try {
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
  } catch (err) {
    console.error(err);
  }
};

// Location Data
const getLocationData = async function (coords) {
  try {
    const resLocation = await fetch(
      `http://api.openweathermap.org/geo/1.0/reverse?lat=${coords.lat}&lon=${coords.long}&appid=e1c7899ad76e2db415e336ec95e711cd`
    );

    const [dataLocation] = await resLocation.json();
    return dataLocation;
  } catch (err) {
    console.error(err);
  }
};

// Weather Data
const getWeatherData = async function (coords) {
  try {
    const resWeather = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.long}&units=imperial&appid=e1c7899ad76e2db415e336ec95e711cd`
    );
    return await resWeather.json();
  } catch (err) {
    console.error(err);
  }
};

// Fetch correct weather icon
const getIcon = async function (day) {
  try {
    const iconID = convertIconID(day.weather[0].id);
    const response = await fetch(
      `http://openweathermap.org/img/wn/${iconID}@2x.png`
    );
    return response.url;
  } catch (err) {
    console.error(err);
  }
};

const fillForecastedArr = async function (instance, units, type) {
  const thisIcon = await getIcon(instance);
  const arr = [];

  arr.push(convertUTC(instance.dt, "weekday"));
  arr.push(convertUTC(instance.dt, "time"));
  arr.push(instance.weather[0].main);
  arr.push(thisIcon);
  if (type !== "daily")
    arr.push([instance.temp, units === "imperial" ? "℉" : "℃"]);
  if (type !== "daily")
    arr.push([instance.feels_like, units === "imperial" ? "℉" : "℃"]);
  if (type !== "hourly")
    arr.push([instance.temp.max, units === "imperial" ? "℉" : "℃"]);
  if (type !== "hourly")
    arr.push([instance.temp.min, units === "imperial" ? "℉" : "℃"]);
  arr.push(instance.pop);

  return arr;
};

// Collect data together
const collateData = async function () {
  try {
    const coords = await getCoords();
    const dataLocation = await getLocationData(coords);
    const dataWeather = await getWeatherData(coords);

    const locationHourly = dataWeather.hourly;
    const locationDaily = dataWeather.daily;

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
          temp: [dataWeather.current.temp, "℉"],
          feel: [dataWeather.current.feels_like, "℉"],
          humidity: `${dataWeather.current.humidity}%`,
          windSpd: [dataWeather.current.wind_speed, "mph"],
          windDir: convertDir(dataWeather.current.wind_deg),
          conditionIcon: await getIcon(dataWeather.current),
          conditionDesc: dataWeather.current.weather[0].description
        },

        // Hourly
        hourly: [],

        // Daily
        daily: []
      }
    };

    for (let instance of locationHourly)
      fillForecastedArr(instance, data.units, "hourly").then((value) =>
        data.weather.hourly.push(value)
      );

    for (let instance of locationDaily) {
      fillForecastedArr(instance, data.units, "daily").then((value) =>
        data.weather.daily.push(value)
      );
    }

    console.log("complete");
    return data;
  } catch (err) {
    console.error(err);
  }
};

const setData = async function (unstoredData) {
  finalData = await unstoredData;
};

// ######################## APP FLOW ##########################

let unstoredData = collateData();

testBtn.addEventListener("click", () => {
  setData(unstoredData);
});
testbtn2.addEventListener("click", async () => {
  const output = await finalData;
  console.log(output);
});
convertBtn.addEventListener("click", async () => {
  // Copy data to manipulate
  const data = await finalData;

  // If converting to metric
  if (data.units !== "metric") {
    // Change unit measurement
    data.units = "metric";

    // Change current feel
    data.weather.current.feel = [
      convertTempUnits(data.weather.current.feel[0], data.units),
      "℃"
    ];
    // Change current temp
    data.weather.current.temp = [
      convertTempUnits(data.weather.current.temp[0], data.units),
      "℃"
    ];

    // Change daily temps
    data.weather.daily.forEach((instance) => {
      const tempMax = instance[4];
      const tempMin = instance[5];
      instance[4] = [convertTempUnits(tempMax[0], data.units), "℃"];
      instance[5] = [convertTempUnits(tempMin[0], data.units), "℃"];
    });

    // Change hourly temps
    data.weather.hourly.forEach((instance) => {
      const tempReal = instance[4];
      const tempFeel = instance[5];
      instance[4] = [convertTempUnits(tempReal[0], data.units), "℃"];
      instance[5] = [convertTempUnits(tempFeel[0], data.units), "℃"];
    });
  }

  // Save converted data
  finalData = data;
});

let finalData;

// ℃
// ℉
