"use client";

import React, { useState, useEffect } from "react";
import { Country, State, ICountry, IState } from "country-state-city";

interface LocationSelectorProps {
  onLocationChange: (location: { country: string; state: string }) => void;
  required?: boolean;
  className?: string;
  initialValues?: {
    country: string;
    state: string;
  };
}

const LocationSelector: React.FC<LocationSelectorProps> = ({ 
  onLocationChange, 
  required = false, 
  className = "",
  initialValues
}) => {
  const [countries, setCountries] = useState<ICountry[]>([]);
  const [states, setStates] = useState<IState[]>([]);

  const [selectedCountry, setSelectedCountry] = useState<string>(initialValues?.country || "");
  const [selectedState, setSelectedState] = useState<string>(initialValues?.state || "");

  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      setStates(State.getStatesOfCountry(selectedCountry));
    } else {
      setStates([]);
    }
    // Only reset state if the country actually changed and it's not the initial load
    if (selectedCountry && selectedCountry !== initialValues?.country) {
      setSelectedState("");
    }
  }, [selectedCountry]);

  useEffect(() => {
    const countryName = countries.find(c => c.isoCode === selectedCountry)?.name || "";
    const stateName = states.find(s => s.isoCode === selectedState)?.name || "";
    
    onLocationChange({
      country: countryName,
      state: stateName,
    });
  }, [selectedCountry, selectedState, countries, states]);

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${className}`}>
      <div className="relative">
        <select
          name="country"
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          required={required}
          className="w-full bg-gray-50 border border-gray-200 py-4 px-6 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none transition-all appearance-none cursor-pointer"
        >
          <option value="">Select Country</option>
          {countries.map((country) => (
            <option key={country.isoCode} value={country.isoCode}>
              {country.name}
            </option>
          ))}
        </select>
        <input type="hidden" name="countryName" value={countries.find(c => c.isoCode === selectedCountry)?.name || ""} />
      </div>

      <div className="relative">
        <select
          name="state"
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          required={required}
          disabled={!selectedCountry || states.length === 0}
          className="w-full bg-gray-50 border border-gray-200 py-4 px-6 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none transition-all appearance-none cursor-pointer disabled:opacity-50"
        >
          <option value="">Select State/Province</option>
          {states.map((state) => (
            <option key={state.isoCode} value={state.isoCode}>
              {state.name}
            </option>
          ))}
        </select>
        <input type="hidden" name="stateName" value={states.find(s => s.isoCode === selectedState)?.name || ""} />
      </div>
    </div>
  );
};

export default LocationSelector;
