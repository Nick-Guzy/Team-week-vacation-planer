export class Weather{
  constructor(){
    //takes in time from calendar

    this.returnCiites; //format? : ICAO Code

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

  getWeekendForecast(){

  } 
}