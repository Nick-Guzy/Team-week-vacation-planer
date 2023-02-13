export default class FlightService {  
  constructor(){
  }
  static async getFlight() {
    try {
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': `${process.env.Flight_API_KEY}`,
          'X-RapidAPI-Host': 'priceline-com-provider.p.rapidapi.com'
        }
      };
      
      fetch('https://priceline-com-provider.p.rapidapi.com/v1/flights/search?date_departure=2023-07-24&location_departure=PDX&location_arrival=NYC&class_type=ECO&sort_order=PRICE&itinerary_type=ROUND_TRIP&price_min=100&date_departure_return=2023-07-26&number_of_passengers=1&price_max=20000&duration_max=2051&number_of_stops=0', options)
        .then(response => response.json())
        .then(response2 => console.log(response2))
        .catch(err => console.error(err));
    } finally {
      console.log('hello');
   }
  }
}

// https://priceline-com-provider.p.rapidapi.com/v1/flights/search?date_departure=2023-02-24&class_type=ECO&location_departure=PDX&location_arrival=NYC&sort_order=PRICE&itinerary_type=ROUND_TRIP&date_departure_return=2023-02-26&number_of_stops=0


