export default class Hotels {
  constructor() {
    this.foundHotels = [];

  }
  async locateHotel(airportCode) {
    return new Promise(function (resolve, reject) {
      let locationRequest = new XMLHttpRequest();
      const hotelLocationUrl = `https://priceline-com-provider.p.rapidapi.com/v1/hotels/locations?search_type=AIRPORT&name=${airportCode}`;
      locationRequest.addEventListener("loadend", function () {
        const response = JSON.parse(this.responseText);
        if (this.status === 200) {
          resolve([response, airportCode]);
        } else {
          reject([this, response]);
        }
      });
      locationRequest.open("GET", hotelLocationUrl, true);
      locationRequest.setRequestHeader('X-RapidAPI-Key', process.env.HOTEL_API_KEY);
      locationRequest.send();
    });
  }

  getLocationId(airportCode, checkIn, checkOut) {
    this.locateHotel(airportCode).then(ele => {
      let foundCityID = ele[0][0].cityID;
      console.log(ele);
      this.parseHotels(foundCityID, checkIn, checkOut);
    },
    function (errorArray) {
      this.printError(errorArray);
    });
  }

  async searchHotels(locationID, checkIn, checkOut) {
    return new Promise(function (resolve, reject) {
      let searchRequest = new XMLHttpRequest();
      const hotelSearchUrl = `https://priceline-com-provider.p.rapidapi.com/v1/hotels/search?date_checkout=${checkOut}&sort_order=PROXIMITY&date_checkin=${checkIn}&location_id=${locationID}&star_rating_ids=3.0,3.5,4.0,4.5,5.0`;
      searchRequest.addEventListener("loadend", function () {
        console.log(this);
        const response = JSON.parse(this.responseText);
        if (this.status === 200) {
          resolve([response, locationID]);
        } else {
          reject([this, response]);
        }
      });
      searchRequest.open("GET", hotelSearchUrl, true);
      searchRequest.setRequestHeader('X-RapidAPI-Key', process.env.HOTEL_API_KEY);
      searchRequest.send();
    });

  }

  parseHotels(locationID, checkIn, checkOut) {
    this.searchHotels(locationID, checkIn, checkOut).then(ele => {
      let foundHotelsArray = ele[0].hotels;
      console.log(foundHotelsArray);
      let counter = 0;
      while (this.foundHotels.length < 3) {
        if (foundHotelsArray[counter].name) {
          let addressString = foundHotelsArray[counter].location.address.addressLine1 + " " + foundHotelsArray[counter].location.address.cityName + " " + foundHotelsArray[counter].location.address.provinceCode + " " + foundHotelsArray[counter].location.address.zip;
          this.foundHotels.push([foundHotelsArray[counter].name, foundHotelsArray[counter].ratesSummary.minPrice, addressString, foundHotelsArray[counter].media.url]);
        }
        counter++;
      }
      console.log(this.foundHotels);
    },
    function (errorArray) {
      this.printError(errorArray);
    });
  }
  printError(error) {
    document.querySelector('#response').setAttribute("class", "error");
    document.querySelector('#response').innerText = `There was an error accessing the exchange data: ${error[0].status}: ${error[0].response}`;
  }

}
