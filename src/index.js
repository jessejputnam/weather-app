"use strict";

import { collateData, convertData, setLocalWeather } from "./data";
import { updateUI, resetSlider, clearActiveNav } from "./visual";

// const testText = document.querySelector("#test-txt");
// const testTextBtn = document.querySelector("#test-txt-btn");

// -----------------
const convertContainer = document.querySelector(".convert__container");
const convertOptions = document.querySelectorAll(".convert__opt");

const mainContainer = document.querySelector(".main__cntnr");
const slider = document.querySelector(".slider");
const navHomes = document.querySelectorAll(".nav-home");
const navHourlies = document.querySelectorAll(".nav-hourly");
const navDailies = document.querySelectorAll(".nav-daily");

// #################################################
// * APP FLOW
// #################################################
// Load Local Weather Data
let activeData = setLocalWeather();

// Display Local Weather Data
(async function () {
  const data = await activeData;
  updateUI(data);
})();

// Convert Weather Data Button
convertContainer.addEventListener("click", async (e) => {
  const clicked = e.target.closest(".convert__opt");
  if (!clicked) return;

  const data = await activeData;

  convertOptions.forEach((option) => {
    option.classList.toggle("convert--active");
  });

  convertData(data);
  updateUI(data);
});

// Move Slides
navHomes.forEach((home) => {
  home.addEventListener("click", () => {
    resetSlider();
    clearActiveNav();

    slider.classList.add("slide-home");
    navHomes.forEach((home) => home.classList.add("nav--active"));
    mainContainer.scrollTo({ top: 0, behavior: "smooth" });
  });
});

navHourlies.forEach((hourly) => {
  hourly.addEventListener("click", () => {
    resetSlider();
    clearActiveNav();

    slider.classList.add("slide-hourly");
    navHourlies.forEach((hourly) => hourly.classList.add("nav--active"));
    mainContainer.scrollTo({ top: 0, behavior: "smooth" });
  });
});

navDailies.forEach((daily) => {
  daily.addEventListener("click", () => {
    resetSlider();
    clearActiveNav();

    slider.classList.add("slide-daily");
    navDailies.forEach((daily) => daily.classList.add("nav--active"));
    mainContainer.scrollTo({ top: 0, behavior: "smooth" });
  });
});

// testTextBtn.addEventListener("click", async () => {
//   activeData = await collateData(testText.value);
// });
