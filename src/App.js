// src/components/LocationSelector.js
import React, { useState, useEffect } from "react";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");

  // Fetch Countries on Component Mount
  useEffect(() => {
    fetch("https://crio-location-selector.onrender.com/countries")
      .then(response => response.json())
      .then(data => setCountries(data))
      .catch(error => console.error("Error fetching countries:", error));
  }, []);

  // Fetch States when a Country is Selected
  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    setSelectedState("");
    setCities([]);
    fetch(`https://crio-location-selector.onrender.com/country=${country}/states`)
      .then(response => response.json())
      .then(data => setStates(data))
      .catch(error => console.error("Error fetching states:", error));
  };

  // Fetch Cities when a State is Selected
  const handleStateChange = (state) => {
    setSelectedState(state);
    setSelectedCity("");
    fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${state}/cities`)
      .then(response => response.json())
      .then(data => setCities(data))
      .catch(error => console.error("Error fetching cities:", error));
  };

  return (
    <div style={{ margin: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Location Selector</h2>

      {/* Country Dropdown */}
      <select
        onChange={(e) => handleCountryChange(e.target.value)}
        value={selectedCountry}
        style={{ margin: "10px 0", padding: "10px", width: "200px" }}
      >
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>

      {/* State Dropdown */}
      <select
        onChange={(e) => handleStateChange(e.target.value)}
        value={selectedState}
        disabled={!selectedCountry}
        style={{ margin: "10px 0", padding: "10px", width: "200px" }}
      >
        <option value="">Select State</option>
        {states.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>

      {/* City Dropdown */}
      <select
        onChange={(e) => setSelectedCity(e.target.value)}
        value={selectedCity}
        disabled={!selectedState}
        style={{ margin: "10px 0", padding: "10px", width: "200px" }}
      >
        <option value="">Select City</option>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>

      {/* Selected Location Statement */}
      {selectedCity && (
        <p style={{ marginTop: "20px", fontSize: "16px" }}>
          You selected <strong>{selectedCity}</strong>, <strong>{selectedState}</strong>,{" "}
          <strong>{selectedCountry}</strong>.
        </p>
      )}
    </div>
  );
};

export default App;
