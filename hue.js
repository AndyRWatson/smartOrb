const request = require('request');
const hueAPI = require('node-hue-api');
const hue = require("node-hue-api");
var sleep = require('sleep'); 
var brightness = 100;

var spawn = require('child_process').spawn;

if ( ! process.argv[2] ){
  console.log("City not defined, please run node hue.js <city>")
  process.exit(1)
}

if ( process.argv[3]){
   brightness = process.argv[3]
}

function weatherNow(wc){
 if (wc >=31 && wc <=36 && wc != 33) {

   return ("Sunny");
}
 else
  if  (wc <=4 || wc >=37) {
     return ("Thunder");
}
else
{
   return ("Cloudy");
 }

}

var displayResult = function(result) {
    console.log(result);
};

var displayError = function(err) {
    console.error(err);
};



function setHue(weather,bright)
{

  var r,g,b;

  switch (weather){
    case "Thunder":
     break;
    case "Sunny":
        r=255,g=255,b=51;
        break;
    case "Cloudy":
        r=100,g=100,b=100;
        break;
    case "Sunset":
        r=230,g=139,b=0;
        break;
    case "Moonlight":
        r=102,g=0,b=102;
        break;
   case "White":
	r=255, g=255, b=255
	 break; 
   case "Red":
        r=255,g=0,b=0;
        break;
    case "Green":
        r=0,g=255,b=0;
        break;
    case "Blue":
        r=0,g=0,b=255;
        break;
    case "Yellow":
        r=255,g=255,b=0;
        break;
    case "Orange":
        r=230,g=139,b=0;
        break;
    case "Purple":
        r=102,g=0,b=102;
        break;
    default:
        r=0,g=70,b=100;
}

var state=lightState.create().on().rgb(r,g,b).brightness(bright);
api.setLightState(bulbNumber, state)
    .then(displayResult)
    .fail(displayError)
    .done();

}



function lightning()
{

    function shspawn(command) {
      spawn('sh', ['-c', command], { stdio: 'inherit' });
}

shspawn('afplay thunder.wav');

var state=lightState.create().on().white(250,100);

api.setLightState(bulbNumber, state)
    .then(displayResult)
    .fail(displayError)
    .done();
sleep.sleep(1);
state=lightState.create().on().white(250,50);
api.setLightState(bulbNumber, state)
    .then(displayResult)
    .fail(displayError)
    .done();
sleep.sleep(1);
state=lightState.create().on().white(250,200);
api.setLightState(bulbNumber, state)
    .then(displayResult)
    .fail(displayError)
    .done();
sleep.sleep(1);
state=lightState.create().off().white(250,200);
api.setLightState(bulbNumber, state)
    .then(displayResult)
    .fail(displayError)
    .done();
sleep.sleep(1);
state=lightState.create().on().white(250,200);
api.setLightState(bulbNumber, state)
    .then(displayResult)
    .fail(displayError)
    .done();



}

  //var bulbNumber=23;   // was 2 for oldHue
  var bulbNumber=3;
  var hueOldusername="aDRZYBIO3EJ-JeFSxPQHXZhi2OvclOF7s5ga6jRT";
//  var hueNewusername="FWuScIwopktU8j8JvrwfvnB5SRopJQOM46hLmS9J";
//var hueNewusername="omEnscXeuN2t-vblvt4CC8QgywiM4sTCRmqf3GqY";  // {"devicetype":"terrarium#arw Andy"}  //HueHome  new
  var hueusername=hueOldusername;;

    var HueApi = hue.HueApi;
    var lightState = hue.lightState;
//    var huehost = "192.168.2.18";   // Hue v1 (Philips-HueOld)
//    var huehost = "192.168.2.46";   // Hue v2 (Home)
//    var huehost = "9.173.152.69"; 
    var huehost = "192.168.2.2";  // Ethernet Adapter
    hueusername = hueOldusername;
    api = new HueApi(huehost, hueusername);


const city = process.argv[2]
var isColor = false;
 switch (city){ 
  case "Sunset":
        isColor=true;
        break;
    case "Moonlight":
       isColor=true;
        break;
    case "Red":
        isColor=true;
        break;
    case "White":
        isColor=true;
        break;
    case "Green":
        isColor=true;
        break;
    case "Blue":
        isColor=true;
        break;
    case "Yellow":
        isColor=true;
        break;
    case "Orange":
        isColor=true;
        break;
    case "Purple":
        isColor=true;
        break;
    default:
        isColor=false;
 
}
if (isColor == true)
{
  console.log("Just set the color");
  setHue(city,brightness);
} else
{
let geolocation = "http://open.mapquestapi.com/geocoding/v1/address?key=BrlRnuf0IpXHl1ubie8ZeBY7BLhlu86W&location=" + city;

request(geolocation, { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
    let lat = JSON.stringify(body.results[0].locations[0].latLng.lat)
    let long = JSON.stringify(body.results[0].locations[0].latLng.lng)

    console.log(lat, long)

  let url="https://40e8a128-041e-43ef-8940-dc633dad734f:vbidsyUzG9@twcservice.eu-gb.mybluemix.net/api/weather/v1/geocode/" + lat + "/" + long + "/observations.json?language=en-US";

  request(url, { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }

    var observation=body.observation;
    var city=observation.obs_name;
    var forecast=observation.wx_phrase;
    var weather_code=observation.wx_icon;
    
    console.log("Brightness = ",brightness);
    console.log("The Weather in ",process.argv[2]," is ",forecast,"[",weather_code,"]");
    console.log("Set Hue Bulb to ",weatherNow(weather_code) );

    function shspawn(command) {
      spawn('sh', ['-c', command], { stdio: 'inherit' });
}
    shspawn(`say The Weather in ${process.argv[2]} is ${forecast}`);
    var rc=setHue(weatherNow(weather_code),brightness);
 // var rc=lightning();
  });
}
);
}
