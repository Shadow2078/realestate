import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const UserProfileModal = ({ user, onClose }) => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetchUserProperties();
  }, [user._id]);

  const fetchUserProperties = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/properties/${user._id}/properties`);
      setProperties(response.data.properties);
    } catch (error) {
      console.error('Error fetching properties:', error);
      toast.error('Error fetching properties');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden w-11/12 md:w-3/4 lg:w-1/2 relative">
        <div className="p-4 border-b">
          <h2 className="text-2xl font-bold">User Profile</h2>
          <button
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div className="p-4">
          <div className="mb-4">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
          </div>
          <h3 className="text-xl font-semibold mb-2">Properties</h3>
          {properties.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {properties.map((property) => (
                <div key={property._id} className="bg-gray-100 p-2 rounded-lg shadow-md">
                  <div className="mb-2">
                    {property.image && (
                      <img
                        src={`http://localhost:5000/${property.image}`}
                        alt={property.title}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    )}
                  </div>
                  <h4 className="text-sm font-bold mb-1">{property.title}</h4>
                  <p className="text-xs mb-1"><strong>Type:</strong> {property.type.type}</p>
                  <p className="text-xs mb-1"><strong>Country:</strong> {property.country.name}</p>
                  <p className="text-xs mb-1"><strong>State:</strong> {property.state.name}</p>
                  <p className="text-xs mb-1"><strong>City:</strong> {property.city.name}</p>
                  <p className="text-xs mb-1"><strong>Price:</strong> ${property.price}</p>
                  <p className="text-xs mb-1"><strong>Status:</strong> {property.status}</p>
                  <p className="text-xs mb-1"><strong>Description:</strong> {property.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm">No properties added by this user.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfileModal;
