import React, { useEffect, useState } from 'react';
import { FiUsers } from 'react-icons/fi';
import { RiLandscapeLine } from "react-icons/ri";
import { getAllBookingsApi } from '../../Apis/apis';

const DashboardOverview = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [houseBookings, setHouseBookings] = useState([]);
  const [plotBookings, setPlotBookings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const rowsPerPage = 5;

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    // if (userData) {
    //   const userId = userData._id;
    //   getAllBookingsApi(userId)
    //     .then(response => {
    //       console.log("API response:", response.data);
    //       setHouseBookings(response.data.houseBookings);
    //       setPlotBookings(response.data.plotBookings);
    //       const totalHousePages = Math.ceil(response.data.houseBookings.length / rowsPerPage);
    //       const totalPlotPages = Math.ceil(response.data.plotBookings.length / rowsPerPage);
    //       setTotalPages(Math.max(totalHousePages, totalPlotPages));
    //     })
    //     .catch(error => {
    //       console.error('Error fetching bookings:', error);
    //     });
    // } else {
    //   console.warn("No user data found in localStorage.");
    // }
  }, []);
  const getStatusBadge = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-200 text-green-800";
      case "Rejected":
        return "bg-red-200 text-red-800";
      case "Pending":
        return "bg-yellow-200 text-yellow-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };
  
  const allBookings = [...houseBookings, ...plotBookings];

  const filteredData = allBookings.filter(item =>
    (item.house && item.house.propertyType && item.house.propertyType.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (item.plot && item.plot.propertyType && item.plot.propertyType.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (item.tourType && item.tourType.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-full overflow-hidden">
      <div className="flex flex-wrap justify-around gap-6 mb-8 w-full">
        <div className="bg-red-600 rounded-lg p-6 w-64 text-white shadow-lg flex items-center justify-between transform hover:scale-105 transition-transform duration-300 ease-in-out">
          <div>
            <FiUsers className="text-4xl" />
          </div>
          <div>
            <p className="text-lg font-semibold">Total Scheduled House</p>
            <h1 className="text-3xl font-bold">{houseBookings.length}</h1>
          </div>
        </div>

        <div className="bg-yellow-600 rounded-lg p-6 w-64 text-white shadow-lg flex items-center justify-between transform hover:scale-105 transition-transform duration-300 ease-in-out">
          <div>
            <RiLandscapeLine className="text-4xl" />
          </div>
          <div>
            <p className="text-lg font-semibold">Total Schedule Plots</p>
            <h1 className="text-3xl font-bold">{plotBookings.length}</h1>
          </div>
        </div>
      </div>

      <div className="mb-4 w-full">
        <input
          type="text"
          placeholder="Search by Property Type or Status..."
          className="p-2 w-full border border-gray-300 rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto w-full">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
          <thead>
            <tr>
              <th className="py-3 px-4 bg-gray-100 border-b border-gray-200 text-left text-sm font-semibold text-gray-600">SN</th>
              <th className="py-3 px-4 bg-gray-100 border-b border-gray-200 text-left text-sm font-semibold text-gray-600">HouseImg</th>
              <th className="py-3 px-4 bg-gray-100 border-b border-gray-200 text-left text-sm font-semibold text-gray-600">Property Type</th>
              <th className="py-3 px-4 bg-gray-100 border-b border-gray-200 text-left text-sm font-semibold text-gray-600">Schedule Time</th>
              <th className="py-3 px-4 bg-gray-100 border-b border-gray-200 text-left text-sm font-semibold text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((booking, index) => (
              <tr key={index}>
                <td className="py-3 px-4 border-b border-gray-200">{index + 1}</td>
                <td className="py-3 px-4 border-b border-gray-200">
                  <img
                    src={`http://localhost:5000/${booking.house ? booking.house.images[0] : booking.plot.plotImage[0]}`}
                    alt={booking.house ? "House" : "Plot"}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                </td>
                <td className="py-3 px-4 border-b border-gray-200">
                  {booking.house ? "House" : "Plot"}
                </td>
                <td className="py-3 px-4 border-b border-gray-200">
                  {new Date(booking.time).toLocaleString([], {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true,
                  })}
                </td>

          <td className="py-3  border-b border-gray-200 text-center">
  <span className={`inline-block py-1 px-3 text-sm font-semibold rounded-full ${getStatusBadge(booking.status)}`}>
    {booking.status ? booking.status : "Unknown"}
  </span>
</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4 w-full">
        <button
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DashboardOverview;
