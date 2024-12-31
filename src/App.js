import React, { useEffect, useState } from "react";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [selCountry, setSelCountry] = useState("");
  const [states, setStates] = useState([]);
  const [selState, setSelState] = useState("");
  const [cities, setCities] = useState([]);
  const [selCity, setSelCity] = useState("");
  const [error, setError] = useState("");

  // Fetch list of countries
  useEffect(() => {
    fetch("https://crio-location-selector.onrender.com/countries")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch countries");
        return res.json();
      })
      .then((data) => {
        setCountries(data);
        setError("");
      })
      .catch((err) => {
        setError("Unable to load countries. Please try again later.");
        console.error(err);
        setCountries([]); // Reset countries on error
      });
  }, []);

  // Fetch list of states when a country is selected
  useEffect(() => {
    if (!selCountry) {
      setStates([]);
      return;
    }
    fetch(`https://crio-location-selector.onrender.com/country=${selCountry}/states`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch states");
        return res.json();
      })
      .then((data) => {
        setStates(data);
        setError("");
      })
      .catch((err) => {
        setError("Unable to load states. Please try again later.");
        console.error(err);
        setStates([]); // Reset states on error
      });
  }, [selCountry]);

  // Fetch list of cities when a state is selected
  useEffect(() => {
    if (!selState) {
      setCities([]);
      return;
    }
    fetch(`https://crio-location-selector.onrender.com/country=${selCountry}/state=${selState}/cities`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch cities");
        return res.json();
      })
      .then((data) => {
        setCities(data);
        setError("");
      })
      .catch((err) => {
        setError("Unable to load cities. Please try again later.");
        console.error(err);
        setCities([]); // Reset cities on error
      });
  }, [selState]);

  return (
    <div>
      <h1>Location Selector</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Country Dropdown */}
      <select
        name="country"
        id="country"
        value={selCountry}
        onChange={(e) => {
          setSelCountry(e.target.value);
          setStates([]);
          setSelState("");
          setCities([]);
          setSelCity("");
        }}
      >
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option value={country} key={country}>
            {country}
          </option>
        ))}
      </select>

      {/* State Dropdown */}
      <select
        name="state"
        id="state"
        value={selState}
        onChange={(e) => {
          setSelState(e.target.value);
          setCities([]);
          setSelCity("");
        }}
        disabled={!selCountry}
      >
        <option value="">Select State</option>
        {states.map((state) => (
          <option value={state} key={state}>
            {state}
          </option>
        ))}
      </select>

      {/* City Dropdown */}
      <select
        name="city"
        id="city"
        value={selCity}
        onChange={(e) => setSelCity(e.target.value)}
        disabled={!selState}
      >
        <option value="">Select City</option>
        {cities.map((city) => (
          <option value={city} key={city}>
            {city}
          </option>
        ))}
      </select>

      {/* Selected Location Display */}
      <div>
        <p>
          <strong>Selected Location:</strong>{" "}
          {selCity ? `${selCity}, ` : ""}
          {selState ? `${selState}, ` : ""}
          {selCountry}
        </p>
      </div>
    </div>
  );
};

export default App;
