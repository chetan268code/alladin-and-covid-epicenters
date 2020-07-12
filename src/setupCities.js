const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

module.exports = function setupCities(country) {
  var lineno = 0;
  var citiesCount = 0;
  var hotspotsCount = 0;
  var spreadDistance = 0;

  rl.on("line", function (line) {
    lineno++;

    // Fetch No of cities, hoyspots and spread distance from first line of input
    if (lineno == 1) {
      [citiesCount, hotspotsCount, spreadDistance] = line.split(" ");
      citiesCount = parseInt(citiesCount);
      spreadDistance = parseInt(spreadDistance);

      // Create {citiesCount} number of cities
      for (var c = 1; c <= citiesCount; c++) country.addCity(c.toString());

      // Set spread distance
      country.setSpreadDistance(spreadDistance);
    }
    // Fetch list of hotspot cities
    else if (lineno == 2) {
      var hotspots = line.split(" ");
      country.setHotspots(hotspots);
    }
    // From 3rd to {citiesCount+1} lines accept road path travel for all {citiesCount} cities
    else if (lineno > 2 && lineno <= citiesCount + 1) {
      var [fromCity, tocity] = line.split(" ");
      country.addRoadBetween(fromCity, tocity);

      // If it's the last line of input, calculate number of epicenters
      if (lineno == citiesCount + 1) {
        var getNoOfEpicenters = country.getNoOfEpicenters();
        rl.write(getNoOfEpicenters.toString());
        rl.write("\n");
        rl.close();
      }
    }
  });
};
