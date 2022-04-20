"use strict";

import { collateData, convertData } from "./data";

const testBtn = document.querySelector("#test-btn");
const testbtn2 = document.querySelector("#test-btn2");
const convertBtn = document.querySelector("#convert-btn");

// ################### APP FLOW #######################

let unstoredData = collateData();

// Store promise in active data
const setData = async function (unstoredData) {
  activeData = await unstoredData;
};

testBtn.addEventListener("click", () => {
  setData(unstoredData, activeData);
});
testbtn2.addEventListener("click", async () => {
  const output = await activeData;
  console.log(output);
});
convertBtn.addEventListener("click", async () => {
  convertData(activeData);
});

let activeData;
