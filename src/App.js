import React, {useEffect, useState} from 'react';

const App = () => {
  const [countries,setCountries] = useState([]);
  const [selCountry,setSelCountry] = useState("");
  const [states,setStates] = useState([]); 
  const [selState,setSelState] = useState("");

  useEffect(() => {
    fetch("https://crio-location-selector.onrender.com/countries")
    .then((res) => res.json())
    .then(data => setCountries(data));
  }, []);

  useEffect(() => {
    if(!selCountry)
      return
    fetch(`https://crio-location-selector.onrender.com/country=${selCountry}/states`)
    .then((res) => res.json())
    .then((data) => setStates(data)); 
  },[selCountry]);

  console.log(selCountry, selState);

  return (
    <div>
      <select name="country"
       id="country" 
       value={selCountry} 
       onChange={(e)=>setSelCountry(e.target.value)}
      >
        {countries.map(country=>
        <option value={country} key={country}>{country}</option>)}
      </select>

      <select name="country"
      id="country"
      value={selState}
      onChange={(e) => setSelState(e.target.value)}
      >
        <option>Select State</option>
        {states.map(state=>
        <option value={state} key={state}>{state}</option>)}
      </select>
    </div>
  );
}

export default App;
