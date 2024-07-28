import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";

const SearchComponent = () => {
  const location = useLocation();
  const { country, state, city } = location.state;
  const [filteredResults, setFilteredResults] = useState({ properties: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/properties/search/filter`, {
          params: { country, state, city },
        });
        setFilteredResults(response.data);
      } catch (error) {
        console.error("Error fetching filtered data:", error);
        setFilteredResults({ properties: [] });
      }
    };

    fetchData();
  }, [country, state, city]);

  return (
    <div className="container mx-auto py-10">
      <div
        className="flex items-center justify-between mb-6"
        style={{
          backgroundImage: `url('https://img.freepik.com/premium-vector/blue-gradient-color-background-website-banner-creative-graphic-design_120819-1373.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "2rem",
          borderRadius: "0.5rem",
          boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
        }}
      >
        <h1 className="text-3xl font-bold text-white">Filtered Results</h1>
        <Link to="/" className="text-blue-500 hover:underline">
          <span className="text-lg font-medium text-gray-100">Back to Home Page</span>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResults.properties.length > 0 ? (
          filteredResults.properties.map((property) => (
            <Link  to={`/property/${property._id}`} key={property._id}>
            <div key={property._id} className="bg-white shadow-md rounded-lg overflow-hidden">
              <img
                src={`http://localhost:5000/${property.image}`}
                alt={property.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold">{property.title}</h3>
                <p className="text-gray-600">{property.description}</p>
                <p className="text-gray-600">Price: {property.price}</p>
                <p className="text-gray-600">
                  Location: {property.city.name}, {property.state.name}, {property.country.name}
                </p>
              </div>
            </div>
            </Link>
            
          ))
        ) : (
          <p className="text-center col-span-3 text-gray-500">No properties found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchComponent;
