export class FlightService {  
  constructor(){
    this.flightsPrice = [];
  }
  async getFlight(inputDestAir, inputOriginAir, dateDepart, returnDate) {
    this.flightsPrice = [];
    try {

      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': `${process.env.Flights_API_KEY}`,
          'X-RapidAPI-Host': 'priceline-com-provider.p.rapidapi.com'
        }
      };
      
      fetch(`https://priceline-com-provider.p.rapidapi.com/v1/flights/search?date_departure=${dateDepart}&location_departure=${inputOriginAir}&location_arrival=${inputDestAir}&class_type=ECO&sort_order=PRICE&itinerary_type=ROUND_TRIP&price_min=100&date_departure_return=${returnDate}&number_of_passengers=1&price_max=20000&duration_max=2051&number_of_stops=0`, options)
        
        .then(response => response.json())
        .then(response2 => {
          let myResponse = response2;
          let mySegment = myResponse.segment;
          mySegment.forEach((element, index) => {
            let arrivalTime = element.arrivalDateTime;
            let departTime = element.departDateTime;
            let destinationAirport = element.destAirport;
            let originalAirport = element.origAirport;
            let marketingAirline = element.marketingAirline;
            let flightNumber = element.flightNumber;
            let flightDuration = myResponse.totalTripSummary.minDuration;
            let price = myResponse.pricedItinerary[index].pricingInfo;
            this.flightsPrice.push([arrivalTime,departTime,destinationAirport,originalAirport,marketingAirline,flightNumber,price,flightDuration]);
            
          });
          })
        .catch(err => console.error(err));
    } finally {
    }
  }
}