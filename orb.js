const request = require('request');
const hueAPI = require('node-hue-api');
const hue = require("node-hue-api");
var brightness = 100;


var displayResult = function(result) {
    console.log(result);
};

var displayError = function(err) {
    console.error(err);
};



function setOrb(weather,bright)
{

  var r,g,b;

  switch (weather){
    case "Thunder":
     break;
    case "Sunny":
        r=255,g=255,b=51;
        break;
    case "Fair":
        r=255,g=255,b=255;
        break;
    case "Snow":
        r=100,g=98,b=98;
        break;
    case "Cloudy":
        //r=124,g=124,b=124;
        r=201,g=206,b=255;
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

//************************
// Lightning
//************************

function lightning()
{

}

//***********************
// isColour parameter
//***********************

function isColour(strparm)
{
var colour = true;
 switch (strparm){
  case "Sunset":
        break;
    case "Moonlight":
        break;
    case "Red":
        break;
    case "White":
        break;
    case "Green":
        break;
    case "Blue":
        break;
    case "Yellow":
        break;
    case "Orange":
        break;
    case "Purple":
        break;
    default:
        colour=false;
    }
 return colour;
}



// ******************
// MAIN 
// *****************
  var bulbNumber=23;   //  2 for oldHue

 //    var huehost = "192.168.2.46";   // Hue v2 
    var huehost = "192.168.2.2";  // Ethernet Adapter

  var hueOldusername="aDRZYBIO3EJ-JeFSxPQHXZhi2OvclOF7s5ga6jRT";
//  var hueNewusername="FWuScIwopktU8j8JvrwfvnB5SRopJQOM46hLmS9J";
var hueNewusername="omEnscXeuN2t-vblvt4CC8QgywiM4sTCRmqf3GqY";  // {"devicetype":"terrarium#arw Andy"}
  var hueusername=hueNewusername;;

    var HueApi = hue.HueApi;
    var lightState = hue.lightState;
    api = new HueApi(huehost, hueusername);


if ( ! process.argv[2] ){
  console.log("City not defined, please run node hue.js <city>")
  process.exit(1)
}

if ( process.argv[3]){
   brightness = process.argv[3]
}


const city = process.argv[2]

if ( isColour(city) == true)
{
  console.log("Not city, Just set the color");
  setOrb(city,brightness);
} else
{

 let url = "http://127.0.0.1:3000/weatherReport?city="+city;
    request(url, { json: true }, (err, res, body) => {
      if (err) { return console.log(err); }
      var forecast=body.weather;
      var rc=setOrb(forecast,brightness);
      console.log("Forecast :",forecast);
    } 
    );
}
