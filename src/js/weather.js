import {Calendar} from "./calendar.js";

export class Weather{
  constructor(){
    //takes in time from calendar
    this.lowestTemp;
    this.highestTemp;
    this.returnCities = []; //format? : ICAO Code

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
    //['Orange County', 'CA', 'SNA'], //test?
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

  checkAppropriateCities(){
    this.searchCities.forEach(ele => {
      this.getWeekendForecast(ele);
    });
  }
  
  getWeekendForecast(place){ 
    fetch(`https://api.weatherbit.io/v2.0/forecast/daily?city=${place[0]},${place[1]}&key=${process.env.Weather_API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        this.returnCities.push([place[0], place[1], place[2] , Weather.parseData(data)[0], Weather.parseData(data)[1]]);
      });
  }

  static parseData(inputJSON){
    //get today's date
    let data = inputJSON;
    let fridayNum = new Calendar().getDaysTilFriday();
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
    return [weekendLow, weekendHigh];
  }

  static checkTemperature(placeData, low, high){ //placeData in the format of [city, state, iata, low, high]
    if (placeData[3] < low || placeData[4] > high){
      return false;
    } else return true;
  }


}

