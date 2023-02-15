import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import './flights';
import {FlightService} from './flights';

function handleFormSubmission(event) {
  event.preventDefault();
  let myFlight = new FlightService();
myFlight.getFlight('LAX', 'PDX', '2023-02-24', '2023-02-26')
}

window.addEventListener("load", function() {
  this.document.querySelector("form").addEventListener("submit", handleFormSubmission);
});