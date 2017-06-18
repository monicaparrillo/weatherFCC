$(document).ready(function() {
  addDate();
  $.ajaxSetup({ cache: false });
  $.getJSON("https://freegeoip.net/json/").then(addLoc, makeErr).then(makeWeath, makeErr);
});

function addLoc(location) {
  var api_key = "06bdce0aad9e21d625f480b4e5441326";
  if (location.city){
    $("#city").html(location.city + ", ");
  }
  $("#country").html(location.country_name);
  if (location.region_code){
    $("#region").html(location.region_code + ", ");
  }
  var lat = location.latitude;
  var long = location.longitude;
  return $.getJSON(
    "https://crossorigin.me/https://api.darksky.net/forecast/" +
      api_key +
      "/" +
      lat +
      "," +
      long
  );
}

function makeErr(err) {
  alert("This app doesn't work with ad blockers, please disable and reload!");
}

//function to add weather data to the page
function makeWeath(data) {
  var conditions = data.currently.icon;
  if (data.alerts) {
    $("#alert").html(data.alerts[0].description);
  }
  var tF = parseInt(data.currently.temperature);
  var tC = parseInt((tF - 32) * 5 / 9);
  $("#temp").html(tF + " &#176F");
  $("#current").html(data.currently.summary);
  $("#f").on("click", tF, toF);
  $("#c").on("click", tC, toC);
  makeIcon(conditions);
}

//function to add skycon
function makeIcon(val) {
  var skycons = new Skycons({ color: "#EFE6B8" });
  skycons.add("icon1", val);
  skycons.play();
}

//Function to add today's date
function addDate() {
  var d = new Date();
  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  $("#today").html(days[d.getDay()]);
}

//factor out Temp toggle functions
function toC(tempC) {
  $("#temp").html(tempC.data + " &#176C");
  $("#c").addClass("chosen");
  $("#f").removeClass("chosen");
}
function toF(tempF) {
  $("#temp").html(tempF.data + " &#176F");
  $("#f").addClass("chosen");
  $("#c").removeClass("chosen");
}
