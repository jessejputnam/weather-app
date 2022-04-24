// #################################################
// * DOM VARIABLES
// #################################################
const background = document.querySelector(".main__cntnr");

const curWeekday = document.querySelector("#cur-weekday");
const curDate = document.querySelector("#cur-date");
const curCity = document.querySelector("#cur-city");
const curState = document.querySelector("#cur-state");

const curTemp = document.querySelector("#cur-temp");
const curFeel = document.querySelector("#cur-feel");
const curConditionsIcon = document.querySelector("#weather-icon");
const curConditions = document.querySelector("#cur-conditions");

const curHi = document.querySelector("#cur-hi");
const curLo = document.querySelector("#cur-lo");
const curPop = document.querySelector("#cur-pop");
const curWind = document.querySelector("#cur-wind");
const curSunrise = document.querySelector("#cur-sunrise");
const curSunset = document.querySelector("#cur-sunset");

const cityNames = document.querySelectorAll(".city-name");
const hourlyForecastCntnr = document.querySelector("#hourly-forecast");
const hourlyDay = document.querySelector("#hourly-day");

const dailyForecastCntnr = document.querySelector("#daily-forecast");
const dailyMonth = document.querySelector("#daily-month");

// #################################################
// * Update Pages
// #################################################

const updateCurrentPage = function (data) {
  curWeekday.textContent = data.location.weekday;
  curDate.textContent = `${data.location.month} ${data.location.day}`;
  curCity.textContent = data.location.city;
  curState.textContent = data.location.state;

  curTemp.textContent = `${data.weather.current.temp[0].toFixed(0)} ${
    data.weather.current.temp[1]
  }`;
  curFeel.textContent = `${data.weather.current.feel[0].toFixed(0)} ${
    data.weather.current.feel[1]
  }`;
  curConditionsIcon.src = data.weather.current.conditionIcon;
  curConditions.textContent = data.weather.current.conditionDesc;

  curHi.textContent = `Hi: ${data.weather.daily[0][4][0].toFixed(0)} ${
    data.weather.daily[0][4][1]
  }`;
  curLo.textContent = `Lo: ${data.weather.daily[0][5][0].toFixed(0)} ${
    data.weather.daily[0][5][1]
  }`;
  curPop.textContent = data.weather.daily[0][6];
  curWind.textContent = `Wind: ${
    data.weather.current.windDir
  } ${data.weather.current.windSpd.join(" ")}`;
  curSunrise.textContent = data.weather.current.sunrise;
  curSunset.textContent = data.weather.current.sunset;
};

const updateHourlyPage = function (data) {
  cityNames.forEach((cityName) => (cityName.textContent = data.location.city));

  hourlyDay.textContent = data.location.weekday;

  data.weather.hourly.forEach((hour) => {
    if (hour[4] === "12:00 AM") {
      hourlyForecastCntnr.insertAdjacentHTML(
        "beforeend",
        `
          <h3 class="forecast__subheading txt--2">${hour[1]}</h3>
          <hr />
        `
      );
    }

    hourlyForecastCntnr.insertAdjacentHTML(
      "beforeend",
      `
      <div class="forecast__row txt--3">
        <div>${hour[4]}</div>
        <img
          src="${hour[3]}"
          alt="weather conditions"
          height="40px"
        />
        <div class="temp">${hour[5][0].toFixed() + hour[5][1]}</div>
        <div class="temp">(${hour[6][0].toFixed() + hour[6][1]})</div>
        <div class="forecast__data__cntnr">
          <div class="material-symbols-outlined">water_drop</div>
          <p>${hour[7]}</p>
        </div>
      </div>
    `
    );
  });
};

const updateDailyPage = function (data) {
  dailyMonth.textContent = data.location.month;

  data.weather.daily.forEach((day) => {
    if (day[2] === "01") {
      dailyForecastCntnr.insertAdjacentHTML(
        "beforeend",
        `
            <h3 class="forecast__subheading txt--2">${day[0]}</h3>
            <hr />
        `
      );
    }

    dailyForecastCntnr.insertAdjacentHTML(
      "beforeend",
      `
        <div class="forecast__row txt--3">
          <div class="forecast__day">${day[1] + " " + day[2]}</div>
          <img
            src="${day[3]}"
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
            <div class="temp">${day[4][0].toFixed() + day[4][1]}</div>
          </div>
          <div class="forecast__data__cntnr">
            <img
              src="./images/arrow-down.png"
              alt="Arrow down"
              height="14px"
              class="arrow__img"
            />
            <div class="temp">${day[5][0].toFixed() + day[5][1]}</div>
          </div>
          <div class="forecast__data__cntnr">
            <div class="material-symbols-outlined">water_drop</div>
            <p>${day[6]}</p>
          </div>
        </div>
      `
    );
  });
};

const updateUI = function (data) {
  // switch (data.current.weather.conditionDesc) {
  //   case "clear sky":
  //     background.style.backgroundImg = "url('../../dist/images/bkgrd-clear.jpg')";
  //     break;
  //   case ""
  //   default:
  // }
  // background.style.backgroundImage = "url('../../dist/images/bkgrd-rain.jpg')";

  updateCurrentPage(data);
  updateHourlyPage(data);
  updateDailyPage(data);
};

export { updateUI };
