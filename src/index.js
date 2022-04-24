"use strict";

import { collateData, convertData, setLocalWeather } from "./data";

const testBtn = document.querySelector("#test-btn");
const testbtn2 = document.querySelector("#test-btn2");
const convertBtn = document.querySelector("#convert-btn");
const testText = document.querySelector("#test-txt");
const testTextBtn = document.querySelector("#test-txt-btn");

// -----------------

// const loadingScreen = document.querySelector(".loading__cntnr");
// const mainScreen = document.querySelector(".main__cntnr");

// ################### APP FLOW #######################
let activeData = collateData(null);

const curTemp = document.querySelector("#cur-temp");
const navHomes = document.querySelectorAll(".nav-home");

navHomes.forEach((home) => {
  home.addEventListener("click", async () => {
    console.log(await activeData);
  });
});

// testBtn.addEventListener("click", async () => {
//   activeData = await collateData(null);
// });
// testbtn2.addEventListener("click", () => {
//   console.log(activeData);
// });
// convertBtn.addEventListener("click", () => {
//   convertData(activeData);
// });

// testTextBtn.addEventListener("click", async () => {
//   activeData = await collateData(testText.value);
// });

/* ################### HTML for add ################### */
/*

Hourly 
-- In forecast__heading --
-- Heading
<h2 class="txt--2">Hourly Forecast</h2>
<p class="city-name txt--3">Alford</p>

-- In forecast__cntnr --
-- Subheading
<h3 class="forecast__subheading txt--2">Friday</h3>
<hr />

<div class="forecast__row txt--3">
  <div>8:00 AM</div>
  <img
    src="./images/10d@2x.png"
    alt="weather conditions"
    height="40px"
  />
  <div class="temp">40°F</div>
  <div class="temp">(45°F)</div>
  <div class="forecast__data__cntnr">
    <div class="material-symbols-outlined">water_drop</div>
    <p>0%</p>
  </div>
</div>
<!-- end forecast__row -->



Daily 
-- Heading
<section class="heading forecast__heading">
  <h2 class="txt--2">Daily Forecast</h2>
  <p class="city-name txt--3">Alford</p>
</section>

-- In forecast__cntnr --
-- Subheading
<h3 class="forecast__subheading txt--2">Friday</h3>
<hr />

<div class="forecast__row txt--3">
  <div class="forecast__day">Fri 22</div>
  <img
    src="./images/10d@2x.png"
    alt="weather conditions"
    class="forecast-condition"
    height="40px"
  />
  <div class="forecast__data__cntnr">
    <img
      src="./images/arrow-up.png"
      alt="Arrow up"
      height="14px"
      class="arrow__img"
    />
    <div class="temp">45°F</div>
  </div>
  <div class="forecast__data__cntnr">
    <img
      src="./images/arrow-down.png"
      alt="Arrow down"
      height="14px"
      class="arrow__img"
    />
    <div class="temp">21°F</div>
  </div>
  <div class="forecast__data__cntnr">
    <div class="material-symbols-outlined">water_drop</div>
    <p>0%</p>
  </div>
</div>
<!-- end forecast__row -->

*/
