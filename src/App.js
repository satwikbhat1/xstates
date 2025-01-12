import React, { useEffect, useState } from "react";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [selCountry, setSelCountry] = useState("");
  const [state, setState] = useState([]);
  const [selState, setSelState] = useState("");
  const [cities, setCities] = useState([]);
  const [selCity, setSelCity] = useState("");

  useEffect(() => {
    fetch("https://crio-location-selector.onrender.com/countries")
      .then((res) => res.json())
      .then((data) => setCountries(data));
  }, []);

  useEffect(() => {
    fetch(
      `https://crio-location-selector.onrender.com/country=${selCountry}/states`
    )
      .then((res) => res.json())
      .then((data) => setState(data));
  }, [selCountry]);

  useEffect(() => {
    fetch(
      `https://crio-location-selector.onrender.com/country=${selCountry}/state=${selState}/cities`
    )
      .then((res) => res.json())
      .then((data) => setCities(data));
  }, [selState]);

  return (
    <div>
      <h1>Select Location</h1>
      <select
        name="country"
        id="country"
        value={selCountry}
        onChange={(e) => setSelCountry(e.target.value)}
      >
        <option>Select Countries</option>
        {countries.map((country) => (
          <option value={country}>{country}</option>
        ))}
      </select>
      <select
        name="state"
        id="state"
        value={selState}
        onChange={(e) => setSelState(e.target.value)}
      >
        <option>Select State</option>
        {state.map((state) => (
          <option value={state}>{state}</option>
        ))}
      </select>
      <select
        name="cities"
        id="cities"
        value={selCity}
        onChange={(e) => setSelCity(e.target.value)}
      >
        <option>Select Cities</option>
        {cities.map((cities) => (
          <option value={cities}>{cities}</option>
        ))}
      </select>
    </div>
  );
};

export default App;
