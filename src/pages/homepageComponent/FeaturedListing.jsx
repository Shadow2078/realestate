import React, { useEffect, useState } from 'react';
import bedIcon from "../../assets/img/bed.png"; 
import showerIcon from "../../assets/img/shower.png";
import { Link } from "react-router-dom";
import { getAllPropertiesApi } from '../../Apis/apis';
import AOS from 'aos';

const FeaturedListing = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      offset: 150, // Offset (in px) from the top of the screen
      easing: 'ease-in-out', // Easing type for the animation
    });
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const res = await getAllPropertiesApi();
      setProperties(res.data.properties.slice(0, 3)); // Show only 3 properties
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-2" data-aos="fade-up">
        Featured Listing
      </h2>
      <p className="text-lg text-center text-gray-600" data-aos="fade-up">
        The ones you want to see in person!
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {properties.map((property, index) => (
          <Link to={`/property/${property._id}`} key={property._id} data-aos="fade-up">
            <div
              className={`relative overflow-hidden rounded-lg shadow-lg ${
                index % 2 === 0 ? "bg-green-400" : "bg-gray-600"
              }`}
            >
              <div className="absolute top-0 right-0 mt-2 mr-2">
                <span
                  className={`inline-block px-2 py-1 rounded-lg text-white text-xs ${
                    property.status === "available"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                >
                  {property.status}
                </span>
              </div>

              <img
                src={`http://localhost:5000/${property.image}`}
                alt={`Featured Property ${index + 1}`}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="bg-black bg-opacity-50 p-4 text-center">
                <p className="text-white font-bold text-lg mb-2">
                  {property.title}
                </p>
                <p className="text-gray-300 text-lg mb-2">$. {property.price}</p>
                <p className="text-white text-sm mb-4">
                  {property.type?.type ?? 'Undefined'}
                </p>
               
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default FeaturedListing;
