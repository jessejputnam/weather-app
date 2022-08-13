# Weather or Not

An app that checks the local weather report and gives that data to the user. It also allows the user to search for any city on the globe and get live weather updates as well.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)

## Overview

### The challenge

Users should be able to:

- See local weather data, including:
  - temperature, weather conditions, humidity, chance of rain, sunrise/sunset
  - The hourly forecast
  - The weekly forecast
- Convert between celsius and fahrenheit
- Search for any city in the world
  - Handle homonymous cities in search
  - Be able to specify between homonymous cities

### Screenshot

![](../dist/images/screenshot.png)

### Links

- Live Site URL: [Weather or Not](https://jessejputnam.github.io/weather-app/)

## My process

### Built with

- Flexbox
- Vanilla JavaScript
- [Open Weather API](https://openweathermap.org/api)
- [Webpack](https://webpack.js.org/) - Module Bundler

### What I learned

- Promises and API Calls
- Methods to deal with similarly named information: i.e. What to do when searching for Springfield, which is a city in many states and countries. This was solved with if statements that I used to fill vacancies in the search if found. I used the common delineator of a comma to decide whether a city alone was named, or a city in conjunction with a country/state.

```js
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
```

### Continued development

- I have discovered an annoying issue when trying to include a bottom bar or bottom information on safari-based browsers. It appears that 100vh does not take into account the bottom search bar native to the browser. This covers up information. I will need to find a solution for when I have information near the bottom of the page.
