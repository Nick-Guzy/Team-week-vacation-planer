import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import './flights';
import {FlightService} from './flights';

let myFlight = new FlightService();
myFlight.getFlight('LAX', 'PDX', '2023-02-24', '2023-02-26');
console.log(myFlight.flightsPrice);
console.log('hello');