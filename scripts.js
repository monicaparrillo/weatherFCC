$(document).ready(function() {
  var tF, tC;
  var lat, long;
  var celsius = false;
  var api_key = "06bdce0aad9e21d625f480b4e5441326";
  $.getJSON("https://freegeoip.net/json/", function(location){
      $("#city").html(location["city"]);
      $("#country").html(location["country_name"]);
      $("#region").html(location["region_code"]);
      lat = location.latitude;
      long = location.longitude;
      $.getJSON("https://crossorigin.me/https://api.darksky.net/forecast/" + api_key + "/" + lat + "," + long, function(data){
        tF = parseInt(data.currently.temperature);
        tC = parseInt((tF - 32) * 5/9);
        $("#temp").html(tF + " &#176F");
        $("#current").html(data.currently.summary);
        $("#f").on("click",function(){
          $("#temp").html((tF)+ " &#176F");
          $("#f").addClass("chosen");
          $("#c").removeClass("chosen")
        });
        $("#c").on("click",function(){
          $("#temp").html((tC)+ " &#176C");
          $("#c").addClass("chosen")
          $("#f").removeClass("chosen")
        });
      });
    });


  });
