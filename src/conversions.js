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

// const convertCountry = async function () {
//   console.log(search);
// };

const check = new Intl.DisplayNames(["en"], { type: "region" });
console.log(check.of("US"));

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

const convertIconID = function (id) {
  // Thunderstorm
  if (id >= 200 && id < 300) return "11d";

  // Drizzle
  if (id >= 300 && id < 400) return "09d";

  // Rain
  if (id >= 500 && id < 505) return "10d";
  if (id === 511) return "13d";
  if (id >= 520 && id < 600) return "09d";

  // Snow
  if (id >= 600 && id < 700) return "13d";

  // Atmosphere
  if (id >= 700 && id < 800) return "50d";

  // Clear
  if (id === 800) return "01d";

  // Clouds
  if (id === 801) return "02d";
  if (id === 802) return "03d";
  if (id === 803 || id === 804) return "04d";
};

const convertTempUnits = function (temp, unit) {
  if (unit === "metric") return (temp - 32) * (5 / 9);
  if (unit === "imperial") return temp * 1.8 + 32;
};

const convertSpdUnits = function (spd, unit) {
  if (unit === "metric") return spd / 2.237;
  if (unit === "imperial") return spd * 2.237;
};

const countryConversion = {
  af: "Afghanistan",
  al: "Albania",
  dz: "Algeria",
  ad: "Andorra",
  ao: "Angola",
  ag: "Antigua and Barbuda",
  ar: "Argentina",
  am: "Armenia",
  au: "Australia",
  at: "Austria",
  az: "Azerbaijan",
  bs: "Bahamas",
  bh: "Bahrain",
  bd: "Bangladesh",
  bb: "Barbados",
  by: "Belarus",
  be: "Belgium",
  bz: "Belize",
  bj: "Benin",
  bt: "Bhutan",
  bo: "Bolivia",
  ba: "Bosnia and Herzegovina",
  bw: "Botswana",
  br: "Brazil",
  bn: "BruneDarussalam",
  bg: "Bulgaria",
  bf: "Burkina Faso",
  bi: "Burundi",
  cv: "Cabo Verde",
  kh: "Cambodia",
  cm: "Cameroon",
  ca: "Canada",
  cf: "Central African Republic",
  td: "Chad",
  cl: "Chile",
  cn: "China",
  co: "Colombia",
  km: "Comoros",
  cg: "Congo",
  cd: "Congo",
  cr: "Costa Rica",
  ci: "Côte d'Ivoire",
  hr: "Croatia",
  cu: "Cuba",
  cy: "Cyprus",
  cz: "Czechia",
  dk: "Denmark",
  dj: "Djibouti",
  dm: "Dominica",
  do: "Dominican Republic",
  ec: "Ecuador",
  eg: "Egypt",
  sv: "El Salvador",
  gq: "Equatorial Guinea",
  er: "Eritrea",
  ee: "Estonia",
  sz: "Eswatini",
  et: "Ethiopia",
  fj: "Fiji",
  fi: "Finland",
  fr: "France",
  ga: "Gabon",
  gm: "Gambia",
  ge: "Georgia",
  de: "Germany",
  gh: "Ghana",
  gr: "Greece",
  gd: "Grenada",
  gt: "Guatemala",
  gn: "Guinea",
  gw: "Guinea-Bissau",
  gy: "Guyana",
  ht: "Haiti",
  hn: "Honduras",
  hu: "Hungary",
  is: "Iceland",
  in: "India",
  id: "Indonesia",
  ir: "Iran",
  iq: "Iraq",
  ie: "Ireland",
  il: "Israel",
  it: "Italy",
  jm: "Jamaica",
  jp: "Japan",
  jo: "Jordan",
  kz: "Kazakhstan",
  ke: "Kenya",
  ki: "Kiribati",
  kp: "North Korea",
  kr: "South Korea",
  kw: "Kuwait",
  kg: "Kyrgyzstan",
  la: "Laos",
  lv: "Latvia",
  lb: "Lebanon",
  ls: "Lesotho",
  lr: "Liberia",
  ly: "Libya",
  li: "Liechtenstein",
  lt: "Lithuania",
  lu: "Luxembourg",
  mg: "Madagascar",
  mw: "Malawi",
  my: "Malaysia",
  mv: "Maldives",
  ml: "Mali",
  mt: "Malta",
  mh: "Marshall Islands",
  mr: "Mauritania",
  mu: "Mauritius",
  mx: "Mexico",
  fm: "Micronesia",
  md: "Moldova",
  mc: "Monaco",
  mn: "Mongolia",
  me: "Montenegro",
  ma: "Morocco",
  mz: "Mozambique",
  mm: "Myanmar",
  na: "Namibia",
  nr: "Nauru",
  np: "Nepal",
  nl: "Netherlands",
  nz: "New Zealand",
  ni: "Nicaragua",
  ne: "Niger",
  ng: "Nigeria",
  mk: "North Macedonia",
  no: "Norway",
  om: "Oman",
  pk: "Pakistan",
  pw: "Palau",
  pa: "Panama",
  pg: "Papua New Guinea",
  py: "Paraguay",
  pe: "Peru",
  ph: "Philippines",
  pl: "Poland",
  pt: "Portugal",
  qa: "Qatar",
  ro: "Romania",
  ru: "Russia",
  rw: "Rwanda",
  kn: "Saint Kitts and Nevis",
  lc: "Saint Lucia",
  vc: "Saint Vincent",
  ws: "Samoa",
  sm: "San Marino",
  st: "Sao Tome and Principe",
  sa: "Saudi Arabia",
  sn: "Senegal",
  rs: "Serbia",
  sc: "Seychelles",
  sl: "Sierra Leone",
  sg: "Singapore",
  sk: "Slovakia",
  si: "Slovenia",
  sb: "Solomon Islands",
  so: "Somalia",
  za: "South Africa",
  ss: "South Sudan",
  es: "Spain",
  lk: "SrLanka",
  sd: "Sudan",
  sr: "Suriname",
  se: "Sweden",
  ch: "Switzerland",
  sy: "Syria",
  tj: "Tajikistan",
  tz: "Tanzania",
  th: "Thailand",
  tl: "Timor-Leste",
  tg: "Togo",
  to: "Tonga",
  tt: "Trinidad and Tobago",
  tn: "Tunisia",
  tr: "Turkey",
  tm: "Turkmenistan",
  tv: "Tuvalu",
  ug: "Uganda",
  ua: "Ukraine",
  ae: "United Arab Emirates",
  gb: "United Kingdom",
  us: "United States",
  uy: "Uruguay",
  uz: "Uzbekistan",
  vu: "Vanuatu",
  ve: "Venezuela",
  vn: "Viet Nam",
  ye: "Yemen",
  zm: "Zambia",
  zw: "Zimbabwe"
};

export {
  stateConversion,
  countryConversion,
  convertDir,
  convertUTC,
  convertIconID,
  convertSpdUnits,
  convertTempUnits
};
