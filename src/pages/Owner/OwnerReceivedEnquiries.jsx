import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const OwnerReceivedEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [response, setResponse] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    setUser(loggedInUser);
    if (loggedInUser && loggedInUser.role === 'owner') {
      fetchOwnerEnquiries(loggedInUser.id);
    } else {
      toast.error('You must be logged in as an owner to view this page.');
    }
  }, []);

  const fetchOwnerEnquiries = async (ownerId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/properties/owner/${ownerId}/enquiries`);
      setEnquiries(response.data.enquiries);
    } catch (error) {
      console.error('Error fetching owner enquiries:', error);
      toast.error('Error fetching owner enquiries');
    }
  };

  const handleResponseSubmit = async (enquiryId) => {
    try {
      await axios.post(`http://localhost:5000/api/properties/enquiries/${enquiryId}/respond`, { response });
      toast.success('Response sent successfully');
      setResponse('');
      fetchOwnerEnquiries(user.id); // Refresh enquiries
    } catch (error) {
      console.error('Error sending response:', error);
      toast.error('Error sending response');
    }
  };

  return (
    <div className="flex flex-wrap justify-around gap-6 bg-white p-8 rounded-lg shadow-lg mb-10">
      {/* Enquiries Table */}
      <div className="w-full mt-10">
        <h3 className="text-xl font-semibold mb-4">Received Enquiries</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
            <thead>
              <tr>
                <th className="py-3 px-4 bg-gray-100 border-b border-gray-200 text-left text-sm font-semibold text-gray-600">Property</th>
                <th className="py-3 px-4 bg-gray-100 border-b border-gray-200 text-left text-sm font-semibold text-gray-600">Image</th>
                <th className="py-3 px-4 bg-gray-100 border-b border-gray-200 text-left text-sm font-semibold text-gray-600">Message</th>
                <th className="py-3 px-4 bg-gray-100 border-b border-gray-200 text-left text-sm font-semibold text-gray-600">Response</th>
                <th className="py-3 px-4 bg-gray-100 border-b border-gray-200 text-left text-sm font-semibold text-gray-600">Action</th>
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
                    <td className="py-3 px-4 border-b border-gray-200">
                      <form onSubmit={(e) => { e.preventDefault(); handleResponseSubmit(enquiry._id); }}>
                        <textarea
                          value={response}
                          onChange={(e) => setResponse(e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg mb-2"
                          required
                        ></textarea>
                        <button
                          type="submit"
                          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
                        >
                          Send Response
                        </button>
                      </form>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-3 px-4 text-center text-gray-500">No enquiries received yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OwnerReceivedEnquiries;
