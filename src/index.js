// import 'bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './css/styles.css';

class NewFormCounter {
  constructor() {
    this.start = 0;
  }
  incrementStart() {
    this.start = this.start + 1;
  }
}

window.addEventListener("load", function () {

  let formCounter = new NewFormCounter;
  let formCounterFlights1 = new NewFormCounter;

  //Get the button for make a new form and unhide the form on event mod 2
  let newFormButton = document.getElementById("createTripButton");
  newFormButton.addEventListener("click", () => {
    let divInputAndOutput = document.getElementById("outerDivTripFinder");
    formCounter.incrementStart();
    console.log(formCounter.start);
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
    let newNameForSave = this.document.createElement("p");
    newNameForSave.setAttribute("class", "pYourTrips");
    let newNameGrab = document.getElementById("nameTrip").value;
    newNameForSave.innerText = `${newNameGrab}`;
    newSave.appendChild(newNameForSave);
    //append the element into the div
    let divForSaves = document.getElementById("overFlowAside");
    divForSaves.append(newSave);
  });

  //Onlick for the flight header
  let flightTitle = document.getElementById("pCityOutput");
  flightTitle.addEventListener("click", () => {

    let outerDiv = document.getElementById("cityOutput");

    let flightOutputFlight = document.createElement("div");
    flightOutputFlight.setAttribute("class", "flightOutput flight");
    let newFlightInfoPrice = document.createElement("p");
    newFlightInfoPrice.innerText = "[PRICE] [STARTPORT] to [ENDPORT]";
    let newFlightInfoLeave = document.createElement("p");
    newFlightInfoLeave.innerText = "Leave: [DATE]";
    let newFlightInfoReturn = document.createElement("p");
    newFlightInfoReturn.innerText = "Return: [DATE]";
    let newFlightInfoAirline = document.createElement("p");
    newFlightInfoAirline.innerText = "[AIRLINE]-[FLIGHT#]";
    let hotelsClick = document.createElement("p");
    hotelsClick.innerText = "\u25BA Hotels";
    newFlightInfoPrice.setAttribute("class", "flightOutput flight");
    newFlightInfoLeave.setAttribute("class", "leaveDate flight");
    newFlightInfoReturn.setAttribute("class", "returnDate flight");
    newFlightInfoAirline.setAttribute("class", "flightID flight");
    hotelsClick.setAttribute("class", "hotelsClick flight");
    
    console.log(formCounterFlights1.start);

    if (formCounterFlights1.start % 2 === 0) {
      flightOutputFlight.append(newFlightInfoPrice);
      flightOutputFlight.append(newFlightInfoLeave);
      flightOutputFlight.append(newFlightInfoReturn);
      flightOutputFlight.append(newFlightInfoAirline);
      flightOutputFlight.append(hotelsClick);
      outerDiv.append(flightOutputFlight);
    } else if (formCounterFlights1.start % 2 === 1) {
      console.log("even");
      newFlightInfoPrice.remove();
      newFlightInfoPrice.classList.add("hidden");
      newFlightInfoLeave.classList.add("hidden");
      newFlightInfoReturn.classList.add("hidden");
      newFlightInfoAirline.classList.add("hidden");
      flightOutputFlight.classList.add("hidden");
      console.log(flightOutputFlight.classList);
    }

    formCounterFlights1.incrementStart();
  });

});