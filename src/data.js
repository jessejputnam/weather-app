"use strict";

import {
  stateConversion,
  countryConversion,
  convertDir,
  convertUTC,
  convertIconID,
  convertSpdUnits,
  convertTempUnits
} from "./conversions";

/**
 * TABLE OF CONTENTS
 * ** COORDINATE FUNCTIONS
 * ** WEATHER API FUNCTIONS
 * ** META/COLLATING FUNCTIONS
 * ** CONVERSION FUNCTIONS
 */

// ###########################################################
// ** LOCATION FUNCTIONS
// ###########################################################

// Get Coordinates from browser location
const getCoordsLocal = async function () {
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

// Get location from search
const getCoordsSearch = async function (search) {
  try {
    let city = "";
    let state = "";
    let country = "";

    // ############# SEARCH RULES #############
    // Get search and look for errors
    const searchArr = search
      .split(",")
      .map((item) => item.trim().toLowerCase());

    // ############ ASSIGN SEARCH #############
    // Assign city
    city = searchArr[0];

    // If only city then search, else...
    if (searchArr.length !== 1) {
      if (searchArr.length > 2)
        throw new Error("Search must be 'city, state' or 'city, country'");
      if (searchArr[1].length < 2)
        throw new Error("Incorrect format for state/country");

      // Assign country/state
      if (searchArr[1].length === 2) {
        // If state/country input is 2-digit code
        if (Object.values(stateConversion).includes(searchArr[1])) {
          // If US state
          state = searchArr[1];
          country = "us";
        } else {
          // If not US state
          state = "";
          country = searchArr[1];
        }
      } else {
        // If state/country input is full name
        if (Object.keys(stateConversion).includes(searchArr[1])) {
          // If US State
          state = searchArr[1];
          country = "us";
        } else {
          // If not US state
          if (Object.values(countryConversion).includes(searchArr[1])) {
            const countryCode = Object.entries(countryConversion).filter(
              (entry) => entry[1] === searchArr[1]
            )[0][0];
            state = "";
            country = countryCode;
          } else {
            throw new Error("Could not find country");
          }
        }
      }
    }

    // ############# GET SEARCH #############
    const resSearch = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${country}&appid=e1c7899ad76e2db415e336ec95e711cd`
    );
    const [dataSearchLocation] = await resSearch.json();
    if (dataSearchLocation === undefined)
      throw new Error("Could not find city");
    const { lat: lat, lon: long } = await dataSearchLocation;
    return lat, long;
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

// ###########################################################
// ** WEATHER API FUNCTIONS
// ###########################################################

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
  if (type !== "daily") {
    arr.push([instance.temp, units === "imperial" ? "℉" : "℃"]);
    arr.push([instance.feels_like, units === "imperial" ? "℉" : "℃"]);
  }
  if (type !== "hourly") {
    arr.push([instance.temp.max, units === "imperial" ? "℉" : "℃"]);
    arr.push([instance.temp.min, units === "imperial" ? "℉" : "℃"]);
  }
  arr.push(`${(instance.pop * 100).toFixed(0)}%`);

  return arr;
};

// ###########################################################
// ** META/COLLATING FUNCTIONS
// ###########################################################

// Collect data together
const collateData = async function (input) {
  try {
    const coords = await getCoordsLocal();
    // const coords = input === null ? await getCoordsLocal() : await getCoordsSearch();

    const dataLocation = await getLocationData(coords);
    const dataWeather = await getWeatherData(coords);

    const locationHourly = await dataWeather.hourly;
    const locationDaily = await dataWeather.daily;

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
      await fillForecastedArr(instance, data.units, "hourly").then((value) =>
        data.weather.hourly.push(value)
      );

    for (let instance of locationDaily) {
      await fillForecastedArr(instance, data.units, "daily").then((value) =>
        data.weather.daily.push(value)
      );
    }

    console.log("complete");
    return data;
  } catch (err) {
    console.error(err);
  }
};

// ###########################################################
// ** CONVERSION FUNCTIONS
// ###########################################################

// Change Temp Units and symbols
const changeTemp = function (temp, data) {
  return [
    convertTempUnits(temp[0], data.units),
    `${data.units === "metric" ? "℃" : "℉"}`
  ];
};

// const changeSpd = function

// Convert data
const convertData = async function (activeData) {
  // Copy data to manipulate
  const data = await activeData;

  // Change unit measurement
  data.units = data.units === "metric" ? "imperial" : "metric";

  // Change current feel
  data.weather.current.feel = changeTemp(data.weather.current.feel, data);

  // Change current temp
  data.weather.current.temp = changeTemp(data.weather.current.temp, data);

  // Change windspeed
  data.weather.current.windSpd = [
    convertSpdUnits(data.weather.current.windSpd[0], data.units),
    `${data.units === "metric" ? "m/s" : "mph"}`
  ];

  // Change daily temps
  data.weather.daily.forEach((instance) => {
    const tempMax = instance[4];
    const tempMin = instance[5];
    instance[4] = changeTemp(tempMax, data);
    instance[5] = changeTemp(tempMin, data);
  });

  // Change hourly temps
  data.weather.hourly.forEach((instance) => {
    const tempReal = instance[4];
    const tempFeel = instance[5];
    instance[4] = changeTemp(tempReal, data);
    instance[5] = changeTemp(tempFeel, data);
  });

  // Replace unconverted data
  activeData = data;
};

export { collateData, convertData, getCoordsSearch };
