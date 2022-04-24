"use strict";

import { collateData, convertData } from "./data";
import { updateUI } from "./visual";

// const testBtn = document.querySelector("#test-btn");
// const testbtn2 = document.querySelector("#test-btn2");
// const convertBtn = document.querySelector("#convert-btn");
// const testText = document.querySelector("#test-txt");
// const testTextBtn = document.querySelector("#test-txt-btn");

// -----------------

// const loadingScreen = document.querySelector(".loading__cntnr");
// const mainScreen = document.querySelector(".main__cntnr");
const background = document.querySelector(".main__cntnr");

// #################################################
// * APP FLOW
// #################################################
let activeData = collateData(null);

(async function () {
  const data = await activeData;
  updateUI(data);
})();

const navHomes = document.querySelectorAll(".nav-home");
// const

//////////////////////////////
//////////////////////////////

navHomes.forEach((home) => {
  home.addEventListener("click", async () => {
    console.log(await activeData);
    background.style.backgroundImage =
      "url('../../dist/images/bkgrd-rain.jpg')";
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
