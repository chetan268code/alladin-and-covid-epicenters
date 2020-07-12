var Queue = require("./queue.js");

module.exports = class Country {
  constructor() {
    this.cities = [];
    this.adjCities = {};
    this.hotspots = [];
    this.spreadDistance;
  }

  addCity(city) {
    this.cities.push(city);
    this.adjCities[city] = [];
  }

  addRoadBetween(city1, city2) {
    this.adjCities[city1].push(city2);
    this.adjCities[city2].push(city1);
  }

  setHotspots(cities) {
    this.hotspots = cities;
  }

  setSpreadDistance(distance) {
    this.spreadDistance = distance;
  }

  findFarthestCity(city, distanceMap) {
    // farthestHotspot
    var farthestHotspot;

    // Create a Queue and add our initial non-hotspot city to it
    let q = new Queue(this.cities.length);
    // Create a map of explored cities
    let explored = [];

    // Mark the first non-hotspot city as explored.
    q.enqueue(city);
    explored.push(city);
    distanceMap[city] = 0;

    while (!q.isEmpty()) {
      let currentCity = q.dequeue();

      // If the current city is a hotspost, temporarily mark it as farthest
      if (this.hotspots.includes(currentCity)) farthestHotspot = currentCity;

      // In the adjCities object, we search for cities this {currentCity} is directly connected to.
      // We filter out the cities that have already been explored.
      // Then we mark each unexplored city as explored and add it to the queue.
      // Also, we keep a map of distance this city is from our initial {city}
      this.adjCities[currentCity]
        .filter((adjCity) => !explored.includes(adjCity))
        .forEach((adjCity) => {
          q.enqueue(adjCity);
          explored.push(adjCity);
          distanceMap[adjCity] = distanceMap[currentCity] + 1;
        });
    }

    // We return the distance of each city from our initial {city}
    return farthestHotspot;
  }

  getNoOfEpicenters() {
    // We randomly choose a non-hotspot city
    var nonHotspotCity = this.cities.find(
      (city) => !this.hotspots.includes(city)
    );

    // We find the farthest hotspot city from {nonHotspotCity}
    var tempDistanceMap = {};
    var firstDistantHotspotCity = this.findFarthestCity(
      nonHotspotCity,
      tempDistanceMap
    );

    // We find farthest hotspot city from {firstDistantHotspotCity}
    // and keep a distance map of all cities from {firstDistantHotspotCity}
    var firstDistantHotspotDistanceMap = {};
    var secondDistantHotspotCity = this.findFarthestCity(
      firstDistantHotspotCity,
      firstDistantHotspotDistanceMap
    );

    // We find the distance of all cities for {secondDistantHotspotCity}
    var secondDistantHotspotDistanceMap = {};
    this.findFarthestCity(
      secondDistantHotspotCity,
      secondDistantHotspotDistanceMap
    );

    var epicenters = 0;
    for (var city of this.cities) {
      // increase epicenters by 1, if current city has distance
      // less than {spreadDistance} from both extreme hotspots
      if (
        firstDistantHotspotDistanceMap[city] <= this.spreadDistance &&
        secondDistantHotspotDistanceMap[city] <= this.spreadDistance
      ) {
        epicenters += 1;
      }
    }
    return epicenters;
  }
};
