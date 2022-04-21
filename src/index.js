"use strict";

import { collateData, convertData } from "./data";

const testBtn = document.querySelector("#test-btn");
const testbtn2 = document.querySelector("#test-btn2");
const convertBtn = document.querySelector("#convert-btn");
const testText = document.querySelector("#test-txt");
const testTextBtn = document.querySelector("#test-txt-btn");
// ################### APP FLOW #######################

testBtn.addEventListener("click", async () => {
  activeData = await collateData(null);
});
testbtn2.addEventListener("click", () => {
  console.log(activeData);
});
convertBtn.addEventListener("click", () => {
  convertData(activeData);
});

let activeData;

testTextBtn.addEventListener("click", async () => {
  activeData = await collateData(testText.value);
});
