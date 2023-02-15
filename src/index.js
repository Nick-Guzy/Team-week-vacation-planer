import Hotels from './js/hotel.js';


function handleFormSubmission(event) {
  event.preventDefault();
  const airportCode = document.querySelector('#airportCodeInput').value;
  document.querySelector('#airportCodeInput').value = null;
  const checkIn = document.querySelector('#checkInInput').value;
  const checkOut = document.querySelector('#checkOutInput').value;
  let myHotels = new Hotels();
  myHotels.getLocationId(airportCode, checkIn, checkOut);
}

window.addEventListener("load", function() {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
});