import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiMail } from 'react-icons/fi';
import { toast } from 'react-toastify';

const BuyerOverview = () => {
  const [totalEnquiries, setTotalEnquiries] = useState(0);
  const [enquiries, setEnquiries] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    setUser(loggedInUser);
    if (loggedInUser && loggedInUser.role === 'buyer') {
      console.log('User ID:', loggedInUser.id); // Log user ID
      fetchBuyerData(loggedInUser.id);
    } else {
      toast.error('You must be logged in as a buyer to view this page.');
    }
  }, []);

  const fetchBuyerData = async (buyerId) => {
    try {
      console.log('Fetching data for buyer ID:', buyerId); // Log buyer ID
      const response = await axios.get(`http://localhost:5000/api/properties/user/${buyerId}`);
      setTotalEnquiries(response.data.enquiries.length);
      setEnquiries(response.data.enquiries);
    } catch (error) {
      console.error('Error fetching buyer data:', error);
      toast.error('Error fetching buyer data');
    }
  };

  return (
    <div className="flex flex-wrap justify-around gap-6 bg-white p-8 rounded-lg shadow-lg mb-10">
      {/* Total Enquiries Made */}
      <div className="bg-green-500 rounded-lg p-6 w-64 text-white shadow-md flex items-center justify-between">
        <div>
          <FiMail className="text-4xl" />
        </div>
        <div>
          <p className="text-lg font-semibold">Total Enquiries Made</p>
          <h1 className="text-3xl font-bold">{totalEnquiries}</h1>
        </div>
      </div>

      {/* Enquiries Table */}
      <div className="w-full mt-10">
        <h3 className="text-xl font-semibold mb-4">Enquiries</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
            <thead>
              <tr>
                <th className="py-3 px-4 bg-gray-100 border-b border-gray-200 text-left text-sm font-semibold text-gray-600">Property</th>
                <th className="py-3 px-4 bg-gray-100 border-b border-gray-200 text-left text-sm font-semibold text-gray-600">Image</th>
                <th className="py-3 px-4 bg-gray-100 border-b border-gray-200 text-left text-sm font-semibold text-gray-600">Message</th>
                <th className="py-3 px-4 bg-gray-100 border-b border-gray-200 text-left text-sm font-semibold text-gray-600">Response</th>
              </tr>
            </thead>
            <tbody>
              {enquiries.length > 0 ? (
                enquiries.map((enquiry) => (
                  <tr key={enquiry._id}>
                    <td className="py-3 px-4 border-b border-gray-200">{enquiry.property.title}</td>
                    <td className="py-3 px-4 border-b border-gray-200">
                      <div className="w-24 h-24 overflow-hidden rounded-lg">
                        <img 
                          src={`http://localhost:5000/${enquiry.property.image}`} 
                          alt={enquiry.property.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="py-3 px-4 border-b border-gray-200">{enquiry.message}</td>
                    <td className="py-3 px-4 border-b border-gray-200">{enquiry.response || 'No response yet'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-3 px-4 text-center text-gray-500">No enquiries made yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BuyerOverview;
