import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/img/Backgrounds.jpg";
import FeaturedListing from "./homepageComponent/FeaturedListing";
import { IoMdArrowDropright } from "react-icons/io";
import axios from "axios";

const HomePage = () => {
  const navigate = useNavigate();
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [searchDisabled, setSearchDisabled] = useState(true);
  const [showPropertyTypeMessage, setShowPropertyTypeMessage] = useState(false);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    setSearchDisabled(country === "");
  }, [country]);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/countries');
      setCountries(response.data.countries);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const fetchStates = async (countryId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/states`);
      setStates(response.data.states);
      setCities([]); // Reset cities when country changes
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  const fetchCities = async (stateId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/cities`);
      setCities(response.data.cities);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
    fetchStates(e.target.value);
  };

  const handleStateChange = (e) => {
    setState(e.target.value);
    fetchCities(e.target.value);
  };

  const handleSearch = async () => {
    if (country === "") {
      setShowPropertyTypeMessage(true);
      return;
    }

    try {
      navigate("/explore", {
        state: {
          country,
          state,
          city,
        },
      });
    } catch (error) {
      console.error("Error fetching data for search:", error);
    }
  };

  return (
    <div style={{ backgroundColor: "#F4FAF0" }}>
      <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
        <div className="flex justify-center items-center">
          <div className="max-w-md mx-auto">
            <div className="text-6xl font-black tracking-tighter leading-10 text-black">
              <div className="pb-6">New Homes</div>
              <div className="pb-6">
                for <span className="text-lime-500">Everyone</span>
              </div>
            </div>
            <p className="text-sm text-gray-700">
              Helping people get their perfect homes at affordable prices.
            </p>
            <div className="mt-6">
              <div className="mt-6 bg-white rounded-xl p-3 absolute shadow border border-lime-500">
                <div className="grid grid-cols-4 md:grid-cols-4 gap-3 items-center">
                 
                  <div className="flex flex-col border-r-2 px-2">
                    <select
                      className="border-0 font-bold lg:text-[14px] text-[12px]"
                      value={country}
                      onChange={handleCountryChange}
                    >
                      <option value="">Select Country</option>
                      {countries.map((country) => (
                        <option key={country._id} value={country.name}>{country.name}</option>
                      ))}
                    </select>
                    <div className="lg:text-[12px] text-[8px]">Select Country</div>
                  </div>
                  <div className="flex flex-col border-r-2 px-2">
                    <select
                      className="border-0 font-bold lg:text-[14px] text-[12px]"
                      value={state}
                      onChange={handleStateChange}
                      disabled={country === ""}
                    >
                      <option value="">Select State</option>
                      {states.map((state) => (
                        <option key={state._id} value={state.name}>{state.name}</option>
                      ))}
                    </select>
                    <div className="lg:text-[12px] text-[8px]">Select State</div>
                  </div>
                  <div className="flex flex-col border-r-2 px-2">
                    <select
                      className="border-0 font-bold lg:text-[14px] text-[12px]"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      disabled={state === ""}
                    >
                      <option value="">Select City</option>
                      {cities.map((city) => (
                        <option key={city._id} value={city.name}>{city.name}</option>
                      ))}
                    </select>
                    <div className="lg:text-[12px] text-[8px]">Select City</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <button
                      className={`flex items-center text-white font-bold px-4 py-2 bg-lime-500 rounded-full lg:text-[14px] text-[12px] ${searchDisabled ? 'cursor-not-allowed opacity-50' : ''}`}
                      onClick={handleSearch}
                      disabled={searchDisabled}
                    >
                      Explore Now <IoMdArrowDropright className="ml-1" />
                    </button>
                    {showPropertyTypeMessage && (
                      <div className="text-red-500 text-[10px] mt-1">Please select Property Type to filter.</div>
                    )}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-[150px]">
                <div className="flex flex-col items-center">
                  <div className="text-4xl font-bold mb-2 md:mb-1">12+</div>
                  <div className="text-sm md:text-xs">Years of experience</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-4xl font-bold mb-2 md:mb-1">120+</div>
                  <div className="text-sm md:text-xs">Properties Sold</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-4xl font-bold mb-2 md:mb-1">250+</div>
                  <div className="text-sm md:text-xs">Satisfied Customers</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="hidden md:block bg-cover"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            height: "100vh",
          }}
        ></div>
      </div>
      <FeaturedListing />
    </div>
  );
};

export default HomePage;
