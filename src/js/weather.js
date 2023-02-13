import {Calendar} from "./calendar.js";

export class Weather{
  constructor(){
    //takes in time from calendar
    this.lowestTemp;
    this.highestTemp;
    this.returnCiites = []; //format? : ICAO Code

    //https://en.wikipedia.org/wiki/List_of_the_busiest_airports_in_the_United_States
    this.searchCities = [ //[City, State, IATA
    ['Atlanta', 'GA', 'ATL'],
    ['Dallas', 'TX', 'DFW'],
    ['Denver', 'CO', 'DEN'],
    ['Chicago', 'IL', 'ORD'],
    ['Los Angeles', 'CA', 'LAX'],
    ['Charlotte', 'NC', 'CLT'],
    ['Orlando', 'FL', 'MCO'],
    ['Las Vegas', 'NV', 'LAS'],
    ['Phoenix', 'AZ', 'PHX'],
    ['Miami', 'FL', 'MIA'],
    ['Seattle', 'WA', 'SEA'],
    ['Houston', 'TX', 'IAH'],
    ['New York City', 'NY', 'JFK'],
    ['Newark', 'NJ', 'EWR'],
    ['Fort Lauderdale', 'FL', 'FLL'],
    ['Minneapolis', 'MN', 'MSP'],
    ['San Francisco', 'CA', 'SFO'],
    ['Detroit', 'MI', 'DTW'],
    ['Boston', 'MA', 'BOS'],
    ['Salt Lake City', 'UT', 'SLC'],
    ['Philadelphia', 'PA', 'PHL'],
    ['Baltimore', 'MD', 'BWI'],
    ['Tampa', 'FL', 'TPA'],
    ['San Diego', 'CA', 'SAN'],
    ['New York City', 'NY', 'LGA'],
    ['Chicago', 'IL', 'MDW'],
    ['Nashville', 'TN', 'BNA'],
    ['Washington, D.C.', 'VA', 'IAD'],
    ['Washington, D.C.', 'DCA', 'VA'],
    ['Austin', 'TX', 'AUS'],
    ['Dallas', 'TX', 'DAL'], 
    ['Honolulu', 'HI', 'HNL'], 
    ['Portland', 'OR', 'PDX'],
    ['Houston', 'TX', 'HOU'],
    ['Fort Myers', 'FL', 'RSW'],
    ['St. Louis', 'MO', 'STL'],
    ['Sacramento', 'CA', 'SMF'],
    //['San Juan', 'PR', 'SJU'],
    ['Raleigh', 'NC', 'RDU'],
    ['New Orleans', 'LA', 'MSY'],
    ['Oakland', 'CA', 'OAK'],
    ['Orange County', 'CA', 'SNA'], //test?
    ['Kansas City', 'MO', 'MCI'],
    ['San Antonio', 'TX', 'SAT'],
    ['San Jose', 'CA', 'SJC'],
    ['Cleaveland', 'OH', 'CLE'],
    ['Indianapolis', 'IN', 'IND'],
    ['Pittsburgh', 'PA', 'PIT'],
    ['Cincinnati', 'OH', 'CVG'],
    ['Kahului', 'HI', 'OGG'],
    ['Columbus', 'OH', 'CMH'],
    ['West Palm Beach', 'FL', 'PBI'],
    ['Jacksonville', 'FL', 'JAX'],
    ['Hartford', 'CT', 'BDL'],
    ['Milwaukee', 'WI', 'MKE'],
    ['Ontario', 'CA', 'ONT'],
    ['Anchorage', 'AK', 'ANC'],
    ['Charleston', 'SC', 'CHS'],
    ['Burbank', 'CA', 'BUR'],
    ['Omaha', 'NE', 'OMA'],
    ['Boise', 'ID', 'BOI'],
    ['Memphis', 'TN', 'MEM'],
    ['Reno', 'NV', 'RNO'],
    ['Alburquerque', 'NM', 'ABQ'],
    ['Norfolk', 'VA', 'ORF']
    ];
    //
  }

  getWeekendForecast(city, state){ 
    fetch(`https://api.weatherbit.io/v2.0/forecast/daily?city=${city},${state}&key=${process.env.Weather_API_KEY}`)
      .then((response) => response.json())
      .then((data) => this.parseData(data));

      //from here, get today's date, 
      //index 0 of this json is today's forecast
      //so we need to find the index of friday, sat, sun, FROM today (so if today is monday, we need index 4, 5, 6]
      //formula is get today's day in terms of 0, 1, 2, 3
      //subtract delta from friday
      //add that
  }

  parseData(inputData){
    
  }

  checkTemp(inputData){ //return true or false depending on if the temperature is within the correct range
    //get today's date
    let data = inputData;
    let fridayNum = new Calendar().getDaysTilFriday();
    console.log(data.data[fridayNum]);
    var weekendLow = data.data[fridayNum].low_temp;
    var weekendHigh = data.data[fridayNum].high_temp;
    if(data.data[fridayNum + 1].low_temp < weekendLow){
      weekendLow = data.data[fridayNum + 1].low_temp;
    }
    if(data.data[fridayNum + 2].low_temp < weekendLow){
      weekendLow = data.data[fridayNum + 1].low_temp;
    }

    if(data.data[fridayNum + 1].high_temp > weekendHigh){
      weekendHigh = data.data[fridayNum + 1].high_temp;
    }
    if(data.data[fridayNum + 2].high_temp > weekendHigh){
      weekendHigh = data.data[fridayNum + 2].high_temp;
    }
    if(weekendLow < this.lowestTemp || weekendHigh > this.highestTemp){
      //do not add
      return false;
    } else {
      //add
      return true;
    }
  }
}

