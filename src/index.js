import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import './js/calendar.js';
import { Calendar } from './js/calendar.js';
import {Weather} from './js/weather.js';
import {FlightService} from './js/flights.js';
import {Hotels} from './js/hotel.js';


class NewFormCounter {
  constructor() {
    this.start = 0;
  }
  incrementStart() {
    this.start = this.start + 1;
  }
}

let globalObjectArrays = {};

function onFormSubmitWeather(minTemp, maxTemp) {
  // let myCalendar = new Calendar();
  let myWeather = new Weather();
  myWeather.minTemp = minTemp;
  myWeather.maxTemp = maxTemp;
  let appropriateCities = [];
  let i = 0;
  myWeather.checkAppropriateCities();
  console.log("bye", myWeather.returnCities);
  console.log("hello", myWeather.returnCities[0]);
  while(appropriateCities.length < 5){
    if(myWeather.checkTemperature(myWeather.returnCities[i], minTemp, maxTemp)){
      appropriateCities.push(myWeather.returnCities[i]);
    }
    i++;
  }
  console.log(appropriateCities);
  globalObjectArrays.apprCities = appropriateCities;
  //return appropriateCities;
}

function onFormSubmitFlights(appropriateCities) {
  let startingAirport = document.getElementById("startingAirportDropdown");
  let startingAirportSelected = startingAirport.value;
  let newFlightService = new FlightService();
  appropriateCities.forEach( e => {
    let myDate = new Calendar();
    newFlightService.getFlight(e[2], startingAirportSelected, new Calendar.formatHotelDate(myDate.calculateNextFriday()), new Calendar.formatHotelDate(myDate.calculateNextSunday()));
  });
  globalObjectArrays.newFlights = newFlightService;
  //return newFlightService;
}

function onFormSubmitHotels(appropriateCities) {
  let hotels = new Hotels();
  let myDate = new Calendar();
  appropriateCities.forEach( e => {
    hotels.getLocationId(e[2], new Calendar.formatHotelDate(myDate.calculateNextFriday()), new Calendar.formatHotelDate(myDate.calculateNextSunday()));
  });
  let foundHotels = hotels.foundHotels;
  globalObjectArrays.foundHotelsArr = foundHotels;
  //return foundHotels;
}




window.addEventListener("load", function () {

  //DROPDOWN1

  let formCounter = new NewFormCounter;
  let formCounterFlights1 = new NewFormCounter;
  let hotelsCounter = new NewFormCounter;

  //DROPDOWN2

  let formCounterFlights2 = new NewFormCounter;
  let hotelsCounter2 = new NewFormCounter;  

  //DROPDOWN3

  let formCounterFlights3 = new NewFormCounter;
  let hotelsCounter3 = new NewFormCounter;

  //DROPDOWN4

  let formCounterFlights4 = new NewFormCounter;
  let hotelsCounter4 = new NewFormCounter;

  //DROPDOWN5

  let formCounterFlights5 = new NewFormCounter;
  let hotelsCounter5 = new NewFormCounter;



  //GET USER INPUT FR TEMP
  let mainSubmitForm = document.getElementById("mainInput");
  mainSubmitForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let maxTemp = document.getElementById("maxTempDropdown");
    let maxTempSelectedIndex = maxTemp.value;
    let minTemp = document.getElementById("minTempDropdown");
    let minTempSelectedIndex = minTemp.value;
    onFormSubmitWeather(minTempSelectedIndex, maxTempSelectedIndex);
    onFormSubmitFlights(globalObjectArrays.apprCities);
    onFormSubmitHotels(globalObjectArrays.apprCities);
    console.log(globalObjectArrays);



  });

  //Get the button for make a new form and unhide the form on event mod 2
  let newFormButton = document.getElementById("createTripButton");
  newFormButton.addEventListener("click", () => {
    let divInputAndOutput = document.getElementById("outerDivTripFinder");
    formCounter.incrementStart();
    if (formCounter.start % 2 === 1) {
      divInputAndOutput.classList.remove("hidden");
    } else if (formCounter.start % 2 === 0 && formCounter.start > 1) {
      divInputAndOutput.classList.add("hidden");
    }
  });

  //When someone clicks save trip, generate new element with styling and name
  let saveTripButton = document.getElementById("saveTripForm");
  saveTripButton.addEventListener("submit", (e) => {
    e.preventDefault();
    let newSave = document.createElement("div");
    newSave.setAttribute("class", "TEMPLATEsave");
    let newNameForSave = document.createElement("p");
    newNameForSave.setAttribute("class", "pYourTrips");
    let deleteSave = document.createElement("button");
    deleteSave.setAttribute("class", "deleteSave");
    deleteSave.innerText = `X`;
    let newNameGrab = document.getElementById("nameTrip").value;
    newNameForSave.innerText = `${newNameGrab}`;
    newSave.appendChild(newNameForSave);
    newSave.appendChild(deleteSave);
    //append the element into the div
    let divForSaves = document.getElementById("overFlowAside");
    divForSaves.append(newSave);
    deleteSave.addEventListener("click", () => {

    });
  });

  //Onlick for the flight header
  let flightTitle = document.getElementById("pCityOutput");
  flightTitle.addEventListener("click", () => {

    let outerDiv = document.getElementById("cityOutput");

    let flightOutputFlight = document.createElement("div");
    flightOutputFlight.setAttribute("class", "flightOutput flight");
    let newFlightInfoPrice = document.createElement("p");
    newFlightInfoPrice.innerText = `[PRICE] [STARTPORT] to [ENDPORT]`;
    let newFlightInfoLeave = document.createElement("p");
    newFlightInfoLeave.innerText = `Leave: [DATE]`;
    let newFlightInfoReturn = document.createElement("p");
    newFlightInfoReturn.innerText = `Return: [DATE]`;
    let newFlightInfoAirline = document.createElement("p");
    newFlightInfoAirline.innerText = `[AIRLINE]-[FLIGHT#]`;
    let hotelsClick = document.createElement("p");
    hotelsClick.innerText = "\u25b6 Hotels";

    newFlightInfoPrice.setAttribute("class", "flightOutput flight");
    newFlightInfoLeave.setAttribute("class", "leaveDate flight");
    newFlightInfoReturn.setAttribute("class", "returnDate flight");
    newFlightInfoAirline.setAttribute("class", "flightID flight");
    hotelsClick.setAttribute("class", "hotelsClick flight");

    if (formCounterFlights1.start % 2 === 0) {
      flightOutputFlight.append(newFlightInfoPrice);
      flightOutputFlight.append(newFlightInfoLeave);
      flightOutputFlight.append(newFlightInfoReturn);
      flightOutputFlight.append(newFlightInfoAirline);
      flightOutputFlight.append(hotelsClick);
      outerDiv.append(flightOutputFlight);
      flightTitle.innerText = `\u25bc [CITY NAME, STATE]`

      hotelsClick.addEventListener("click", () => {
        let hotelDiv = document.createElement("div");
        hotelDiv.setAttribute("class", "hotelsDiv");
        let hotelName = document.createElement("p");
        hotelName.setAttribute("class", "hotel");
        let hotelPrice = document.createElement("p");
        hotelPrice.setAttribute("class", "hotelOffset");
        let hotelAddress = document.createElement("p");
        hotelAddress.setAttribute("class", "hotelOffset");
        let hotelName2 = document.createElement("p");
        hotelName2.setAttribute("class", "hotel");
        let hotelPrice2 = document.createElement("p");
        hotelPrice2.setAttribute("class", "hotelOffset");
        let hotelAddress2 = document.createElement("p");
        hotelAddress2.setAttribute("class", "hotelOffset");
        let hotelName3 = document.createElement("p");
        hotelName3.setAttribute("class", "hotel");
        let hotelPrice3 = document.createElement("p");
        hotelPrice3.setAttribute("class", "hotelOffset");
        let hotelAddress3 = document.createElement("p");
        hotelAddress3.setAttribute("class", "hotelOffset");

        hotelName.innerText = `[HOTEL NAME]`;
        hotelPrice.innerText = `[PRICE] / night`;
        hotelAddress.innerText = `[HOTEL ADDRESS, CITY, STATE]`;
        hotelName2.innerText = `[HOTEL NAME]`;
        hotelPrice2.innerText = `[PRICE] / night`;
        hotelAddress2.innerText = `[HOTEL ADDRESS, CITY, STATE]`;
        hotelName3.innerText = `[HOTEL NAME]`;
        hotelPrice3.innerText = `[PRICE] / night`;
        hotelAddress3.innerText = `[HOTEL ADDRESS, CITY, STATE]`;


        if (hotelsCounter.start % 2 === 0) {
          hotelDiv.append(hotelName);
          hotelDiv.append(hotelPrice);
          hotelDiv.append(hotelAddress);
          hotelDiv.append(hotelName2);
          hotelDiv.append(hotelPrice2);
          hotelDiv.append(hotelAddress2);
          hotelDiv.append(hotelName3);
          hotelDiv.append(hotelPrice3);
          hotelDiv.append(hotelAddress3);

          hotelsClick.innerText = `\u25bc Hotels:`
          flightOutputFlight.append(hotelDiv);
        } else if (hotelsCounter.start % 2 === 1) {
          flightOutputFlight.removeChild(flightOutputFlight.lastChild);
          hotelsClick.innerText = `\u25b6 Hotels`;  
        }
        hotelsCounter.incrementStart();
      });

    } else if (formCounterFlights1.start % 2 === 1) {
      console.log("even");
      outerDiv.removeChild(outerDiv.lastChild);
      flightTitle.innerText = `\u25b6 [CITY NAME, STATE]`
    }

    formCounterFlights1.incrementStart();
  });


//REPEAT EVENT LISTENER OUTPUT 2

let flightTitle2 = document.getElementById("pCityOutput2");
  flightTitle2.addEventListener("click", () => {

    let outerDiv = document.getElementById("cityOutput2");

    let flightOutputFlight = document.createElement("div");
    flightOutputFlight.setAttribute("class", "flightOutput flight");
    let newFlightInfoPrice = document.createElement("p");
    newFlightInfoPrice.innerText = `[PRICE] [STARTPORT] to [ENDPORT]`;
    let newFlightInfoLeave = document.createElement("p");
    newFlightInfoLeave.innerText = `Leave: [DATE]`;
    let newFlightInfoReturn = document.createElement("p");
    newFlightInfoReturn.innerText = `Return: [DATE]`;
    let newFlightInfoAirline = document.createElement("p");
    newFlightInfoAirline.innerText = `[AIRLINE]-[FLIGHT#]`;
    let hotelsClick2 = document.createElement("p");
    hotelsClick2.innerText = `\u25b6 Hotels`;

    newFlightInfoPrice.setAttribute("class", "flightOutput flight");
    newFlightInfoLeave.setAttribute("class", "leaveDate flight");
    newFlightInfoReturn.setAttribute("class", "returnDate flight");
    newFlightInfoAirline.setAttribute("class", "flightID flight");
    hotelsClick2.setAttribute("class", "hotelsClick flight");

    if (formCounterFlights2.start % 2 === 0) {
      flightOutputFlight.append(newFlightInfoPrice);
      flightOutputFlight.append(newFlightInfoLeave);
      flightOutputFlight.append(newFlightInfoReturn);
      flightOutputFlight.append(newFlightInfoAirline);
      flightOutputFlight.append(hotelsClick2);
      outerDiv.append(flightOutputFlight);
      flightTitle2.innerText = `\u25bc [CITY NAME, STATE]`

      hotelsClick2.addEventListener("click", () => {
        let hotelDiv = document.createElement("div");
        hotelDiv.setAttribute("class", "hotelsDiv");
        let hotelName = document.createElement("p");
        hotelName.setAttribute("class", "hotel");
        hotelName.setAttribute("id", "hotelName")
        let hotelPrice = document.createElement("p");
        hotelPrice.setAttribute("class", "hotelOffset");
        let hotelAddress = document.createElement("p");
        hotelAddress.setAttribute("class", "hotelOffset");
        let hotelName2 = document.createElement("p");
        hotelName2.setAttribute("class", "hotel");
        let hotelPrice2 = document.createElement("p");
        hotelPrice2.setAttribute("class", "hotelOffset");
        let hotelAddress2 = document.createElement("p");
        hotelAddress2.setAttribute("class", "hotelOffset");
        let hotelName3 = document.createElement("p");
        hotelName3.setAttribute("class", "hotel");
        let hotelPrice3 = document.createElement("p");
        hotelPrice3.setAttribute("class", "hotelOffset");
        let hotelAddress3 = document.createElement("p");
        hotelAddress3.setAttribute("class", "hotelOffset");

        hotelName.innerText = `[HOTEL NAME]`;
        hotelPrice.innerText = `[PRICE] / night`;
        hotelAddress.innerText = `[HOTEL ADDRESS, CITY, STATE]`;
        hotelName2.innerText = `[HOTEL NAME]`;
        hotelPrice2.innerText = `[PRICE] / night`;
        hotelAddress2.innerText = `[HOTEL ADDRESS, CITY, STATE]`;
        hotelName3.innerText = `[HOTEL NAME]`;
        hotelPrice3.innerText = `[PRICE] / night`;
        hotelAddress3.innerText = `[HOTEL ADDRESS, CITY, STATE]`;


        if (hotelsCounter2.start % 2 === 0) {
          hotelDiv.append(hotelName);
          hotelDiv.append(hotelPrice);
          hotelDiv.append(hotelAddress);
          hotelDiv.append(hotelName2);
          hotelDiv.append(hotelPrice2);
          hotelDiv.append(hotelAddress2);
          hotelDiv.append(hotelName3);
          hotelDiv.append(hotelPrice3);
          hotelDiv.append(hotelAddress3);

          hotelsClick2.innerText = `\u25bc Hotels:`
          flightOutputFlight.append(hotelDiv);
        } else if (hotelsCounter2.start % 2 === 1) {
          flightOutputFlight.removeChild(flightOutputFlight.lastChild);
          hotelsClick2.innerText = `\u25b6 Hotels`;  
        }
        hotelsCounter2.incrementStart();
      });

    } else if (formCounterFlights2.start % 2 === 1) {
      console.log("even");
      outerDiv.removeChild(outerDiv.lastChild);
      flightTitle2.innerText = `\u25b6 [CITY NAME, STATE]`
    }

    formCounterFlights2.incrementStart();
  });



//REPEAT EVENT LISTENER OUTPUT 3

let flightTitle3 = document.getElementById("pCityOutput3");
  flightTitle3.addEventListener("click", () => {

    let outerDiv = document.getElementById("cityOutput3");

    let flightOutputFlight = document.createElement("div");
    flightOutputFlight.setAttribute("class", "flightOutput flight");
    let newFlightInfoPrice = document.createElement("p");
    newFlightInfoPrice.innerText = `[PRICE] [STARTPORT] to [ENDPORT]`;
    let newFlightInfoLeave = document.createElement("p");
    newFlightInfoLeave.innerText = `Leave: [DATE]`;
    let newFlightInfoReturn = document.createElement("p");
    newFlightInfoReturn.innerText = `Return: [DATE]`;
    let newFlightInfoAirline = document.createElement("p");
    newFlightInfoAirline.innerText = `[AIRLINE]-[FLIGHT#]`;
    let hotelsClick3 = document.createElement("p");
    hotelsClick3.innerText = `\u25b6 Hotels`;

    newFlightInfoPrice.setAttribute("class", "flightOutput flight");
    newFlightInfoLeave.setAttribute("class", "leaveDate flight");
    newFlightInfoReturn.setAttribute("class", "returnDate flight");
    newFlightInfoAirline.setAttribute("class", "flightID flight");
    hotelsClick3.setAttribute("class", "hotelsClick flight");

    if (formCounterFlights3.start % 2 === 0) {
      flightOutputFlight.append(newFlightInfoPrice);
      flightOutputFlight.append(newFlightInfoLeave);
      flightOutputFlight.append(newFlightInfoReturn);
      flightOutputFlight.append(newFlightInfoAirline);
      flightOutputFlight.append(hotelsClick3);
      outerDiv.append(flightOutputFlight);
      flightTitle3.innerText = `\u25bc [CITY NAME, STATE]`

      hotelsClick3.addEventListener("click", () => {
        let hotelDiv = document.createElement("div");
        hotelDiv.setAttribute("class", "hotelsDiv");
        let hotelName = document.createElement("p");
        hotelName.setAttribute("class", "hotel");
        let hotelPrice = document.createElement("p");
        hotelPrice.setAttribute("class", "hotelOffset");
        let hotelAddress = document.createElement("p");
        hotelAddress.setAttribute("class", "hotelOffset");
        let hotelName2 = document.createElement("p");
        hotelName2.setAttribute("class", "hotel");
        let hotelPrice2 = document.createElement("p");
        hotelPrice2.setAttribute("class", "hotelOffset");
        let hotelAddress2 = document.createElement("p");
        hotelAddress2.setAttribute("class", "hotelOffset");
        let hotelName3 = document.createElement("p");
        hotelName3.setAttribute("class", "hotel");
        let hotelPrice3 = document.createElement("p");
        hotelPrice3.setAttribute("class", "hotelOffset");
        let hotelAddress3 = document.createElement("p");
        hotelAddress3.setAttribute("class", "hotelOffset");

        hotelName.innerText = `[HOTEL NAME]`;
        hotelPrice.innerText = `[PRICE] / night`;
        hotelAddress.innerText = `[HOTEL ADDRESS, CITY, STATE]`;
        hotelName2.innerText = `[HOTEL NAME]`;
        hotelPrice2.innerText = `[PRICE] / night`;
        hotelAddress2.innerText = `[HOTEL ADDRESS, CITY, STATE]`;
        hotelName3.innerText = `[HOTEL NAME]`;
        hotelPrice3.innerText = `[PRICE] / night`;
        hotelAddress3.innerText = `[HOTEL ADDRESS, CITY, STATE]`;


        if (hotelsCounter3.start % 2 === 0) {
          hotelDiv.append(hotelName);
          hotelDiv.append(hotelPrice);
          hotelDiv.append(hotelAddress);
          hotelDiv.append(hotelName2);
          hotelDiv.append(hotelPrice2);
          hotelDiv.append(hotelAddress2);
          hotelDiv.append(hotelName3);
          hotelDiv.append(hotelPrice3);
          hotelDiv.append(hotelAddress3);

          hotelsClick3.innerText = `\u25bc Hotels:`
          flightOutputFlight.append(hotelDiv);
        } else if (hotelsCounter3.start % 2 === 1) {
          flightOutputFlight.removeChild(flightOutputFlight.lastChild);
          hotelsClick3.innerText = `\u25b6 Hotels`;  
        }
        hotelsCounter3.incrementStart();
      });

    } else if (formCounterFlights3.start % 2 === 1) {
      console.log("even");
      outerDiv.removeChild(outerDiv.lastChild);
      flightTitle3.innerText = `\u25b6 [CITY NAME, STATE]`
    }

    formCounterFlights3.incrementStart();
  });











//REPEAT EVENT LISTENER OUTPUT 4

let flightTitle4 = document.getElementById("pCityOutput4");
  flightTitle4.addEventListener("click", () => {

    let outerDiv = document.getElementById("cityOutput4");

    let flightOutputFlight = document.createElement("div");
    flightOutputFlight.setAttribute("class", "flightOutput flight");
    let newFlightInfoPrice = document.createElement("p");
    newFlightInfoPrice.innerText = `[PRICE] [STARTPORT] to [ENDPORT]`;
    let newFlightInfoLeave = document.createElement("p");
    newFlightInfoLeave.innerText = `Leave: [DATE]`;
    let newFlightInfoReturn = document.createElement("p");
    newFlightInfoReturn.innerText = `Return: [DATE]`;
    let newFlightInfoAirline = document.createElement("p");
    newFlightInfoAirline.innerText = `[AIRLINE]-[FLIGHT#]`;
    let hotelsClick4 = document.createElement("p");
    hotelsClick4.innerText = `\u25b6 Hotels`;

    newFlightInfoPrice.setAttribute("class", "flightOutput flight");
    newFlightInfoLeave.setAttribute("class", "leaveDate flight");
    newFlightInfoReturn.setAttribute("class", "returnDate flight");
    newFlightInfoAirline.setAttribute("class", "flightID flight");
    hotelsClick4.setAttribute("class", "hotelsClick flight");

    if (formCounterFlights4.start % 2 === 0) {
      flightOutputFlight.append(newFlightInfoPrice);
      flightOutputFlight.append(newFlightInfoLeave);
      flightOutputFlight.append(newFlightInfoReturn);
      flightOutputFlight.append(newFlightInfoAirline);
      flightOutputFlight.append(hotelsClick4);
      outerDiv.append(flightOutputFlight);
      flightTitle4.innerText = `\u25bc [CITY NAME, STATE]`

      hotelsClick4.addEventListener("click", () => {
        let hotelDiv = document.createElement("div");
        hotelDiv.setAttribute("class", "hotelsDiv");
        let hotelName = document.createElement("p");
        hotelName.setAttribute("class", "hotel");
        let hotelPrice = document.createElement("p");
        hotelPrice.setAttribute("class", "hotelOffset");
        let hotelAddress = document.createElement("p");
        hotelAddress.setAttribute("class", "hotelOffset");
        let hotelName2 = document.createElement("p");
        hotelName2.setAttribute("class", "hotel");
        let hotelPrice2 = document.createElement("p");
        hotelPrice2.setAttribute("class", "hotelOffset");
        let hotelAddress2 = document.createElement("p");
        hotelAddress2.setAttribute("class", "hotelOffset");
        let hotelName3 = document.createElement("p");
        hotelName3.setAttribute("class", "hotel");
        let hotelPrice3 = document.createElement("p");
        hotelPrice3.setAttribute("class", "hotelOffset");
        let hotelAddress3 = document.createElement("p");
        hotelAddress3.setAttribute("class", "hotelOffset");

        hotelName.innerText = `[HOTEL NAME]`;
        hotelPrice.innerText = `[PRICE] / night`;
        hotelAddress.innerText = `[HOTEL ADDRESS, CITY, STATE]`;
        hotelName2.innerText = `[HOTEL NAME]`;
        hotelPrice2.innerText = `[PRICE] / night`;
        hotelAddress2.innerText = `[HOTEL ADDRESS, CITY, STATE]`;
        hotelName3.innerText = `[HOTEL NAME]`;
        hotelPrice3.innerText = `[PRICE] / night`;
        hotelAddress3.innerText = `[HOTEL ADDRESS, CITY, STATE]`;


        if (hotelsCounter4.start % 2 === 0) {
          hotelDiv.append(hotelName);
          hotelDiv.append(hotelPrice);
          hotelDiv.append(hotelAddress);
          hotelDiv.append(hotelName2);
          hotelDiv.append(hotelPrice2);
          hotelDiv.append(hotelAddress2);
          hotelDiv.append(hotelName3);
          hotelDiv.append(hotelPrice3);
          hotelDiv.append(hotelAddress3);

          hotelsClick4.innerText = `\u25bc Hotels:`
          flightOutputFlight.append(hotelDiv);
        } else if (hotelsCounter4.start % 2 === 1) {
          flightOutputFlight.removeChild(flightOutputFlight.lastChild);
          hotelsClick4.innerText = `\u25b6 Hotels`;  
        }
        hotelsCounter4.incrementStart();
      });

    } else if (formCounterFlights4.start % 2 === 1) {
      console.log("even");
      outerDiv.removeChild(outerDiv.lastChild);
      flightTitle4.innerText = `\u25b6 [CITY NAME, STATE]`
    }

    formCounterFlights4.incrementStart();
  });











//REPEAT EVENT LISTENER OUTPUT 5


let flightTitle5 = document.getElementById("pCityOutput5");
  flightTitle5.addEventListener("click", () => {

    let outerDiv = document.getElementById("cityOutput5");

    let flightOutputFlight = document.createElement("div");
    flightOutputFlight.setAttribute("class", "flightOutput flight");
    let newFlightInfoPrice = document.createElement("p");
    newFlightInfoPrice.innerText = `[PRICE] [STARTPORT] to [ENDPORT]`;
    let newFlightInfoLeave = document.createElement("p");
    newFlightInfoLeave.innerText = `Leave: [DATE]`;
    let newFlightInfoReturn = document.createElement("p");
    newFlightInfoReturn.innerText = `Return: [DATE]`;
    let newFlightInfoAirline = document.createElement("p");
    newFlightInfoAirline.innerText = `[AIRLINE]-[FLIGHT#]`;
    let hotelsClick5 = document.createElement("p");
    hotelsClick5.innerText = `\u25b6 Hotels`;

    newFlightInfoPrice.setAttribute("class", "flightOutput flight");
    newFlightInfoLeave.setAttribute("class", "leaveDate flight");
    newFlightInfoReturn.setAttribute("class", "returnDate flight");
    newFlightInfoAirline.setAttribute("class", "flightID flight");
    hotelsClick5.setAttribute("class", "hotelsClick flight");

    if (formCounterFlights5.start % 2 === 0) {
      flightOutputFlight.append(newFlightInfoPrice);
      flightOutputFlight.append(newFlightInfoLeave);
      flightOutputFlight.append(newFlightInfoReturn);
      flightOutputFlight.append(newFlightInfoAirline);
      flightOutputFlight.append(hotelsClick5);
      outerDiv.append(flightOutputFlight);
      flightTitle5.innerText = `\u25bc [CITY NAME, STATE]`

      hotelsClick5.addEventListener("click", () => {
        let hotelDiv = document.createElement("div");
        hotelDiv.setAttribute("class", "hotelsDiv");
        let hotelName = document.createElement("p");
        hotelName.setAttribute("class", "hotel");
        hotelName.setAttribute("id", "hotelName")
        let hotelPrice = document.createElement("p");
        hotelPrice.setAttribute("class", "hotelOffset");
        let hotelAddress = document.createElement("p");
        hotelAddress.setAttribute("class", "hotelOffset");
        let hotelName2 = document.createElement("p");
        hotelName2.setAttribute("class", "hotel");
        let hotelPrice2 = document.createElement("p");
        hotelPrice2.setAttribute("class", "hotelOffset");
        let hotelAddress2 = document.createElement("p");
        hotelAddress2.setAttribute("class", "hotelOffset");
        let hotelName3 = document.createElement("p");
        hotelName3.setAttribute("class", "hotel");
        let hotelPrice3 = document.createElement("p");
        hotelPrice3.setAttribute("class", "hotelOffset");
        let hotelAddress3 = document.createElement("p");
        hotelAddress3.setAttribute("class", "hotelOffset");

        hotelName.innerText = `[HOTEL NAME]`;
        hotelPrice.innerText = `[PRICE] / night`;
        hotelAddress.innerText = `[HOTEL ADDRESS, CITY, STATE]`;
        hotelName2.innerText = `[HOTEL NAME]`;
        hotelPrice2.innerText = `[PRICE] / night`;
        hotelAddress2.innerText = `[HOTEL ADDRESS, CITY, STATE]`;
        hotelName3.innerText = `[HOTEL NAME]`;
        hotelPrice3.innerText = `[PRICE] / night`;
        hotelAddress3.innerText = `[HOTEL ADDRESS, CITY, STATE]`;


        if (hotelsCounter5.start % 2 === 0) {
          hotelDiv.append(hotelName);
          hotelDiv.append(hotelPrice);
          hotelDiv.append(hotelAddress);
          hotelDiv.append(hotelName2);
          hotelDiv.append(hotelPrice2);
          hotelDiv.append(hotelAddress2);
          hotelDiv.append(hotelName3);
          hotelDiv.append(hotelPrice3);
          hotelDiv.append(hotelAddress3);

          hotelsClick5.innerText = `\u25bc Hotels:`
          flightOutputFlight.append(hotelDiv);
        } else if (hotelsCounter5.start % 2 === 1) {
          flightOutputFlight.removeChild(flightOutputFlight.lastChild);
          hotelsClick5.innerText = `\u25b6 Hotels`;  
        }
        hotelsCounter5.incrementStart();
      });

    } else if (formCounterFlights5.start % 2 === 1) {
      console.log("even");
      outerDiv.removeChild(outerDiv.lastChild);
      flightTitle5.innerText = `\u25b6 [CITY NAME, STATE]`
    }

    formCounterFlights5.incrementStart();
  });












});

