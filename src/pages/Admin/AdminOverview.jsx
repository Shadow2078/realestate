import React, { useState, useEffect } from 'react';
import { FiUsers, FiHome } from 'react-icons/fi';
import axios from 'axios';
import { toast } from 'react-toastify';
import UserProfileModal from './UserProfile';

const AdminOverview = () => {
  const [totalPropertyTypes, setTotalPropertyTypes] = useState(0);
  const [totalCountries, setTotalCountries] = useState(0);
  const [totalStates, setTotalStates] = useState(0);
  const [totalCities, setTotalCities] = useState(0);
  const [totalAgents, setTotalAgents] = useState(0);
  const [totalOwners, setTotalOwners] = useState(0);
  const [totalBuyers, setTotalBuyers] = useState(0);
  const [totalProperties, setTotalProperties] = useState(0);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const rowsPerPage = 5;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [entitiesRes, usersRes, allUsersRes] = await Promise.all([
        axios.get('http://localhost:5000/api/users/entities/count'),
        axios.get('http://localhost:5000/api/users/count-by-role'),
        axios.get('http://localhost:5000/api/users/getAllUsers')
      ]);
  
      setTotalPropertyTypes(entitiesRes.data.propertyTypes);
      setTotalCountries(entitiesRes.data.countries);
      setTotalStates(entitiesRes.data.states);
      setTotalCities(entitiesRes.data.cities);
      setTotalProperties(entitiesRes.data.properties);
      setTotalAgents(usersRes.data.agents);
      setTotalOwners(usersRes.data.owners);
      setTotalBuyers(usersRes.data.buyers);
      setUsers(allUsersRes.data);
      setTotalPages(Math.ceil(allUsersRes.data.length / rowsPerPage));
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Error fetching data');
    }
  };
  
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredUsers.slice(indexOfFirstRow, indexOfLastRow);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleViewProfile = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-wrap justify-around gap-6 bg-white p-8 rounded-lg shadow-lg mb-10">
      {/* Total Property Types */}
      <div className="bg-red-500 rounded-lg p-6 w-64 text-white shadow-md flex items-center justify-between">
        <div>
          <FiHome className="text-4xl" />
        </div>
        <div>
          <p className="text-lg font-semibold">Total Property Types</p>
          <h1 className="text-3xl font-bold">{totalPropertyTypes}</h1>
        </div>
      </div>

      {/* Total Countries */}
      <div className="bg-yellow-500 rounded-lg p-6 w-64 text-white shadow-md flex items-center justify-between">
        <div>
          <FiUsers className="text-4xl" />
        </div>
        <div>
          <p className="text-lg font-semibold">Total Countries</p>
          <h1 className="text-3xl font-bold">{totalCountries}</h1>
        </div>
      </div>

      {/* Total States */}
      <div className="bg-green-500 rounded-lg p-6 w-64 text-white shadow-md flex items-center justify-between">
        <div>
          <FiUsers className="text-4xl" />
        </div>
        <div>
          <p className="text-lg font-semibold">Total States</p>
          <h1 className="text-3xl font-bold">{totalStates}</h1>
        </div>
      </div>

      {/* Total Cities */}
      <div className="bg-blue-500 rounded-lg p-6 w-64 text-white shadow-md flex items-center justify-between">
        <div>
          <FiUsers className="text-4xl" />
        </div>
        <div>
          <p className="text-lg font-semibold">Total Cities</p>
          <h1 className="text-3xl font-bold">{totalCities}</h1>
        </div>
      </div>

      {/* Total Agents */}
      <div className="bg-purple-500 rounded-lg p-6 w-64 text-white shadow-md flex items-center justify-between">
        <div>
          <FiUsers className="text-4xl" />
        </div>
        <div>
          <p className="text-lg font-semibold">Total Agents</p>
          <h1 className="text-3xl font-bold">{totalAgents}</h1>
        </div>
      </div>

      {/* Total Owners */}
      <div className="bg-pink-500 rounded-lg p-6 w-64 text-white shadow-md flex items-center justify-between">
        <div>
          <FiUsers className="text-4xl" />
        </div>
        <div>
          <p className="text-lg font-semibold">Total Owners</p>
          <h1 className="text-3xl font-bold">{totalOwners}</h1>
        </div>
      </div>

      {/* Total Buyers */}
      <div className="bg-orange-500 rounded-lg p-6 w-64 text-white shadow-md flex items-center justify-between">
        <div>
          <FiUsers className="text-4xl" />
        </div>
        <div>
          <p className="text-lg font-semibold">Total Buyers</p>
          <h1 className="text-3xl font-bold">{totalBuyers}</h1>
        </div>
      </div>

      {/* Total Properties */}
      <div className="bg-teal-500 rounded-lg p-6 w-64 text-white shadow-md flex items-center justify-between">
        <div>
          <FiHome className="text-4xl" />
        </div>
        <div>
          <p className="text-lg font-semibold">Total Properties</p>
          <h1 className="text-3xl font-bold">{totalProperties}</h1>
        </div>
      </div>

      {/* Users */}
      <div className="rounded-lg p-6 w-full text-black shadow-md">
        <p className="text-lg font-semibold text-black mb-4">Users</p>
        <div className="mb-4 w-full">
          <input
            type="text"
            placeholder="Search by User, Role..."
            className="p-2 w-full border border-gray-300 rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
            <thead>
              <tr>
                <th className="py-3 px-4 bg-gray-100 border-b border-gray-200 text-left text-sm font-semibold text-gray-600">User</th>
                <th className="py-3 px-4 bg-gray-100 border-b border-gray-200 text-left text-sm font-semibold text-gray-600">Role</th>
                <th className="py-3 px-4 bg-gray-100 border-b border-gray-200 text-left text-sm font-semibold text-gray-600">No of Properties</th>
                <th className="py-3 px-4 bg-gray-100 border-b border-gray-200 text-left text-sm font-semibold text-gray-600">View Profile</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map((user, index) => (
                <tr key={index}>
                  <td className="py-3 px-4 border-b border-gray-200">{user.name}</td>
                  <td className="py-3 px-4 border-b border-gray-200">{user.role}</td>
                  <td className="py-3 px-4 border-b border-gray-200">{user.propertyCount}</td>
                  <td className="py-3 px-4 border-b border-gray-200">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                      onClick={() => handleViewProfile(user)}
                    >
                      View Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between items-center mt-4 w-full">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      {/* User Profile Modal */}
      {isModalOpen && (
        <UserProfileModal
          user={selectedUser}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminOverview;
