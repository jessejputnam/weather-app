const stateConversion = {
  Alabama: "AL",
  Alaska: "AK",
  "American Samoa": "AS",
  Arizona: "AZ",
  Arkansas: "AR",
  California: "CA",
  Colorado: "CO",
  Connecticut: "CT",
  Delaware: "DE",
  "District Of Columbia": "DC",
  "Federated States Of Micronesia": "FM",
  Florida: "FL",
  Georgia: "GA",
  Guam: "GU",
  Hawaii: "HI",
  Idaho: "ID",
  Illinois: "IL",
  Indiana: "IN",
  Iowa: "IA",
  Kansas: "KS",
  Kentucky: "KY",
  Louisiana: "LA",
  Maine: "ME",
  "Marshall Islands": "MH",
  Maryland: "MD",
  Massachusetts: "MA",
  Michigan: "MI",
  Minnesota: "MN",
  Mississippi: "MS",
  Missouri: "MO",
  Montana: "MT",
  Nebraska: "NE",
  Nevada: "NV",
  "New Hampshire": "NH",
  "New Jersey": "NJ",
  "New Mexico": "NM",
  "New York": "NY",
  "North Carolina": "NC",
  "North Dakota": "ND",
  "Northern Mariana Islands": "MP",
  Ohio: "OH",
  Oklahoma: "OK",
  Oregon: "OR",
  Palau: "PW",
  Pennsylvania: "PA",
  "Puerto Rico": "PR",
  "Rhode Island": "RI",
  "South Carolina": "SC",
  "South Dakota": "SD",
  Tennessee: "TN",
  Texas: "TX",
  Utah: "UT",
  Vermont: "VT",
  "Virgin Islands": "VI",
  Virginia: "VA",
  Washington: "WA",
  "West Virginia": "WV",
  Wisconsin: "WI",
  Wyoming: "WY"
};

const convertDir = function (dir) {
  let output;
  if ((dir >= 337.5 && dir <= 360) || (dir >= 0 && dir < 22.5)) output = "N";
  if (dir >= 22.5 && dir < 67.5) output = "NE";
  if (dir >= 67.5 && dir < 112.5) output = "E";
  if (dir >= 112.5 && dir < 157.5) output = "SE";
  if (dir >= 157.5 && dir < 202.5) output = "S";
  if (dir >= 202.5 && dir < 247.5) output = "SW";
  if (dir >= 247.5 && dir < 292.5) output = "W";
  if (dir >= 292.5 && dir < 337.5) output = "NW";
  return output;
};

const convertUTC = function (utc, format) {
  if (format === "time") {
    return new Date(utc * 1000).toLocaleString(navigator.language, {
      hour: "numeric",
      minute: "2-digit"
    });
  } else if (format === "day") {
    return new Date(utc * 1000).toLocaleString(navigator.language, {
      [format]: "2-digit"
    });
  } else {
    return new Date(utc * 1000).toLocaleString(navigator.language, {
      [format]: "short"
    });
  }
};

export { stateConversion, convertDir, convertUTC };
