import React, { useState, useEffect } from 'react';
import { FiHome, FiMail } from 'react-icons/fi';
import axios from 'axios';
import { toast } from 'react-toastify';

const OwnerOverview = () => {
  const [totalHouses, setTotalHouses] = useState(0);
  const [totalEnquiries, setTotalEnquiries] = useState(0);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetchOwnerData();
  }, []);

  const fetchOwnerData = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const ownerId = user ? user.id : null;

      if (ownerId) {
        const response = await axios.get(`http://localhost:5000/api/properties/users/${ownerId}/properties`);
        setTotalHouses(response.data.properties.length);
        setProperties(response.data.properties);
        // Assuming that each property has an enquiries field that is an array
        const enquiriesCount = response.data.properties.reduce((acc, property) => acc + property.enquiries.length, 0);
        setTotalEnquiries(enquiriesCount);
      } else {
        toast.error('Owner not found');
      }
    } catch (error) {
      console.error('Error fetching owner data:', error);
      toast.error('Error fetching owner data');
    }
  };

  return (
    <div className="flex flex-wrap justify-around gap-6 bg-white p-8 rounded-lg shadow-lg mb-10">
      {/* Total Houses Added */}
      <div className="bg-blue-500 rounded-lg p-6 w-64 text-white shadow-md flex items-center justify-between">
        <div>
          <FiHome className="text-4xl" />
        </div>
        <div>
          <p className="text-lg font-semibold">Total Houses Added</p>
          <h1 className="text-3xl font-bold">{totalHouses}</h1>
        </div>
      </div>

      {/* Total Enquiries Received */}
      <div className="bg-green-500 rounded-lg p-6 w-64 text-white shadow-md flex items-center justify-between">
        <div>
          <FiMail className="text-4xl" />
        </div>
        <div>
          <p className="text-lg font-semibold">Total Enquiries Received</p>
          <h1 className="text-3xl font-bold">{totalEnquiries}</h1>
        </div>
      </div>

      {/* Properties Table */}
      <div className="w-full">
        <h3 className="text-xl font-semibold mb-4">Properties Added</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <div key={property._id} className="bg-gray-100 p-4 rounded-lg shadow-md">
              <div className="mb-4">
                {property.image && (
                  <img
                    src={`http://localhost:5000/${property.image}`}
                    alt={property.title}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                )}
              </div>
              <h4 className="text-lg font-bold mb-2">{property.title}</h4>
              <p className="mb-2"><strong>Type:</strong> {property.type.type}</p>
              <p className="mb-2"><strong>Price:</strong> ${property.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OwnerOverview;
