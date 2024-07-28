import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AdminOverview from '../Admin/AdminOverview';
import ManagePropertyTypes from '../Admin/ManagePropertyTypes';
import ManageCountries from '../Admin/ManageCountries';
import ManageStates from '../Admin/ManageState';
import ManageCities from '../Admin/ManageCities';
import ManageProperties from '../Admin/ManageProperties';
import AdminReceivedEnquiries from '../Admin/AdminReceivedEnquiries';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const path = location.pathname.split('/')[2];
    setActiveTab(path || 'overview');
  }, [location]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    navigate(`/admindashboard${tab === 'overview' ? '' : `/${tab}`}`);
  };

  const handleTabClick = (event, tab) => {
    event.preventDefault(); // Prevent the default behavior of anchor tag
    handleTabChange(tab);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login'); // Redirect to login page after logout
    window.location.reload();
  };

  return (
    <div className="flex h-screen bg-gray-100 relative">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="py-4 px-6 border-b border-gray-200">
          <h1 className="text-lg font-semibold text-gray-800">Admin Dashboard</h1>
        </div>
        <nav className="mt-6">
          <a
            className={`block py-2 px-4 text-sm text-gray-700 hover:bg-gray-200 ${
              activeTab === 'overview' ? 'bg-gray-200' : ''
            }`}
            onClick={(e) => handleTabClick(e, 'overview')}
          >
            Overview
          </a>
          <a
            className={`block py-2 px-4 text-sm text-gray-700 hover:bg-gray-200 ${
              activeTab === 'managePropertyTypes' ? 'bg-gray-200' : ''
            }`}
            onClick={(e) => handleTabClick(e, 'managePropertyTypes')}
          >
            Property Types
          </a>
          <a
            className={`block py-2 px-4 text-sm text-gray-700 hover:bg-gray-200 ${
              activeTab === 'manageCountries' ? 'bg-gray-200' : ''
            }`}
            onClick={(e) => handleTabClick(e, 'manageCountries')}
          >
            Countries
          </a>
          <a
            className={`block py-2 px-4 text-sm text-gray-700 hover:bg-gray-200 ${
              activeTab === 'manageStates' ? 'bg-gray-200' : ''
            }`}
            onClick={(e) => handleTabClick(e, 'manageStates')}
          >
            States
          </a>
          <a
            className={`block py-2 px-4 text-sm text-gray-700 hover:bg-gray-200 ${
              activeTab === 'manageCities' ? 'bg-gray-200' : ''
            }`}
            onClick={(e) => handleTabClick(e, 'manageCities')}
          >
            Cities
          </a>

          
          <a
            className={`block py-2 px-4 text-sm text-gray-700 hover:bg-gray-200 ${
              activeTab === 'manageProperties' ? 'bg-gray-200' : ''
            }`}
            onClick={(e) => handleTabClick(e, 'manageProperties')}
          >
            Properties
          </a>
          <a
            className={`block py-2 px-4 text-sm text-gray-700 hover:bg-gray-200 ${
              activeTab === 'manageSubscriptions' ? 'bg-gray-200' : ''
            }`}
            onClick={(e) => handleTabClick(e, 'manageSubscriptions')}
          >
            Subscriptions
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 flex flex-col overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Dashboard Overview</h2>
          <button
            className="py-2 px-4 text-sm text-white bg-red-500 hover:bg-red-600 rounded-lg"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
        <div className="bg-grey100">
          {/* Render different content based on activeTab */}
          {activeTab === 'overview' && <AdminOverview />}
          {activeTab === 'managePropertyTypes' && <ManagePropertyTypes />}
          {activeTab === 'manageCountries' && <ManageCountries />}
          {activeTab === 'manageStates' && <ManageStates />}
          {activeTab === 'manageCities' && <ManageCities />}
          {activeTab === 'manageProperties' && <ManageProperties />}
          {activeTab === 'manageSubscriptions' && <AdminReceivedEnquiries />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
