// Manage cities in Country
var Country = require("./src/Country.js");
var setupCities = require("./src/setupCities.js");

// Setup country
var wadiya = new Country();

// Get inputs from user to setup country (wadiya), roads, hotspots and spread distance in country
// and calculate number of epicenters in the country based on hotspots provided
setupCities(wadiya);
