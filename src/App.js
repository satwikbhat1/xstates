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
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch countries");
        return response.json();
      })
      .then((data) => setCountries(data))
      .catch((error) => {
        console.error("Error fetching countries:", error);
        alert("Failed to load countries. Please try again later.");
      });
  }, []);

  // Fetch States when a Country is Selected
  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    setSelectedState("");
    setStates([]);
    setCities([]);
    if (!country) return; // Exit if no country is selected

    fetch(`https://crio-location-selector.onrender.com/countries/${country}/states`)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch states");
        return response.json();
      })
      .then((data) => setStates(data))
      .catch((error) => {
        console.error("Error fetching states:", error);
        alert("Failed to load states for the selected country.");
      });
  };

  // Fetch Cities when a State is Selected
  const handleStateChange = (state) => {
    setSelectedState(state);
    setSelectedCity("");
    setCities([]);
    if (!state) return; // Exit if no state is selected

    fetch(
      `https://crio-location-selector.onrender.com/countries/${selectedCountry}/states/${state}/cities`
    )
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch cities");
        return response.json();
      })
      .then((data) => setCities(data))
      .catch((error) => {
        console.error("Error fetching cities:", error);
        alert("Failed to load cities for the selected state.");
      });
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
