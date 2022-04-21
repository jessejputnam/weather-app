const stateConversion = {
  alabama: "al",
  alaska: "ak",
  "american samoa": "as",
  arizona: "az",
  arkansas: "ar",
  california: "ca",
  colorado: "co",
  connecticut: "ct",
  delaware: "de",
  dc: "dc",
  micronesia: "fm",
  florida: "fl",
  georgia: "ga",
  guam: "gu",
  hawaii: "hi",
  idaho: "id",
  illinois: "il",
  indiana: "in",
  iowa: "ia",
  kansas: "ks",
  kentucky: "ky",
  louisiana: "la",
  maine: "me",
  "marshall islands": "mh",
  maryland: "md",
  massachusetts: "ma",
  michigan: "mi",
  minnesota: "mn",
  mississippi: "ms",
  missouri: "mo",
  montana: "mt",
  nebraska: "ne",
  nevada: "nv",
  "new hampshire": "nh",
  "new jersey": "nj",
  "new mexico": "nm",
  "new york": "ny",
  "north carolina": "nc",
  "north dakota": "nd",
  "mariana islands": "mp",
  ohio: "oh",
  oklahoma: "ok",
  oregon: "or",
  palau: "pw",
  pennsylvania: "pa",
  "puerto rico": "pr",
  "ihode island": "ri",
  "south carolina": "sc",
  "south dakota": "sd",
  tennessee: "tn",
  texas: "tx",
  utah: "ut",
  vermont: "vt",
  "virgin islands": "vi",
  virginia: "va",
  washington: "wa",
  "west virginia": "wv",
  wisconsin: "wi",
  wyoming: "wy"
};

// const convertCountry = async function () {
//   console.log(search);
// };

// const check = new Intl.DisplayNames(["en"], { type: "region" });
// console.log(check.of("US"));

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
  af: "afghanistan",
  al: "albania",
  dz: "algeria",
  ad: "andorra",
  ao: "angola",
  ag: "antigua and barbuda",
  ar: "argentina",
  am: "armenia",
  au: "australia",
  at: "austria",
  az: "azerbaijan",
  bs: "bahamas",
  bh: "bahrain",
  bd: "bangladesh",
  bb: "barbados",
  by: "belarus",
  be: "belgium",
  bz: "belize",
  bj: "benin",
  bt: "bhutan",
  bo: "bolivia",
  ba: "bosnia and herzegovina",
  bw: "botswana",
  br: "brazil",
  bn: "brunei",
  bg: "bulgaria",
  bf: "burkina faso",
  bi: "burundi",
  cv: "cabo verde",
  kh: "cambodia",
  cm: "cameroon",
  ca: "canada",
  cf: "central african republic",
  td: "chad",
  cl: "chile",
  cn: "china",
  co: "colombia",
  km: "comoros",
  cg: "congo",
  cd: "congo",
  cr: "costa rica",
  ci: "côte d'ivoire",
  hr: "croatia",
  cu: "cuba",
  cy: "cyprus",
  cz: "czechia",
  dk: "denmark",
  dj: "djibouti",
  dm: "dominica",
  do: "dominican republic",
  ec: "ecuador",
  eg: "egypt",
  sv: "el salvador",
  gq: "equatorial guinea",
  er: "eritrea",
  ee: "estonia",
  sz: "eswatini",
  et: "ethiopia",
  fj: "fiji",
  fi: "finland",
  fr: "france",
  ga: "gabon",
  gm: "gambia",
  ge: "georgia",
  de: "germany",
  gh: "ghana",
  gr: "greece",
  gd: "grenada",
  gt: "guatemala",
  gn: "guinea",
  gw: "guinea-bissau",
  gy: "guyana",
  ht: "haiti",
  hn: "honduras",
  hu: "hungary",
  is: "iceland",
  in: "india",
  id: "indonesia",
  ir: "iran",
  iq: "iraq",
  ie: "ireland",
  il: "israel",
  it: "italy",
  jm: "jamaica",
  jp: "japan",
  jo: "jordan",
  kz: "kazakhstan",
  ke: "kenya",
  ki: "kiribati",
  kp: "north korea",
  kr: "south korea",
  kw: "kuwait",
  kg: "kyrgyzstan",
  la: "laos",
  lv: "latvia",
  lb: "lebanon",
  ls: "lesotho",
  lr: "liberia",
  ly: "libya",
  li: "liechtenstein",
  lt: "lithuania",
  lu: "luxembourg",
  mg: "madagascar",
  mw: "malawi",
  my: "malaysia",
  mv: "maldives",
  ml: "mali",
  mt: "malta",
  mh: "marshall islands",
  mr: "mauritania",
  mu: "mauritius",
  mx: "mexico",
  fm: "micronesia",
  md: "moldova",
  mc: "monaco",
  mn: "mongolia",
  me: "montenegro",
  ma: "morocco",
  mz: "mozambique",
  mm: "myanmar",
  na: "namibia",
  nr: "nauru",
  np: "nepal",
  nl: "netherlands",
  nz: "new zealand",
  ni: "nicaragua",
  ne: "niger",
  ng: "nigeria",
  mk: "north macedonia",
  no: "norway",
  om: "pman",
  pk: "pakistan",
  pw: "palau",
  pa: "panama",
  pg: "papua New Guinea",
  py: "paraguay",
  pe: "peru",
  ph: "philippines",
  pl: "poland",
  pt: "portugal",
  qa: "qatar",
  ro: "romania",
  ru: "russia",
  rw: "rwanda",
  kn: "saint kitts and nevis",
  lc: "saint lucia",
  vc: "saint vincent",
  ws: "samoa",
  sm: "san marino",
  st: "sao tome and principe",
  sa: "saudi arabia",
  sn: "senegal",
  rs: "serbia",
  sc: "seychelles",
  sl: "sierra leone",
  sg: "singapore",
  sk: "slovakia",
  si: "slovenia",
  sb: "solomon islands",
  so: "somalia",
  za: "south africa",
  ss: "south sudan",
  es: "spain",
  lk: "sri lanka",
  sd: "sudan",
  sr: "suriname",
  se: "sweden",
  ch: "switzerland",
  sy: "syria",
  tj: "tajikistan",
  tz: "tanzania",
  th: "thailand",
  tl: "timor-Leste",
  tg: "togo",
  to: "tonga",
  tt: "trinidad and tobago",
  tn: "tunisia",
  tr: "turkey",
  tm: "turkmenistan",
  tv: "tuvalu",
  ug: "uganda",
  ua: "ukraine",
  ae: "united arab emirates",
  gb: "united kingdom",
  us: "united states",
  uy: "uruguay",
  uz: "uzbekistan",
  vu: "vanuatu",
  ve: "venezuela",
  vn: "viet nam",
  ye: "yemen",
  zm: "zambia",
  zw: "zimbabwe"
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
