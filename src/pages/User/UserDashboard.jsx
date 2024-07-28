import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaTachometerAlt, FaUser, FaSignOutAlt } from 'react-icons/fa';
import DashboardOverview from './DashboardOverview';
import LogoutModal from '../components/LogoutModel';
import UserProfile from './UserProfile';

const UserDashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [activeTab, setActiveTab] = useState('overview');
    const [showModal, setShowModal] = useState(false); // State to control the modal

    useEffect(() => {
        const path = location.pathname.split('/')[2];
        setActiveTab(path || 'overview');
    }, [location]);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        navigate(`/dashboard${tab === 'overview' ? '' : `/${tab}`}`);
    };

    const handleTabClick = (event, tab) => {
        event.preventDefault(); // Prevent the default behavior of anchor tag
        handleTabChange(tab);
    };

    const handleLogout = () => {
        // Show the logout modal
        setShowModal(true);
    };

    const confirmLogout = () => {
        localStorage.clear();
        navigate('/login'); // Redirect to login page after logout
        window.location.reload();
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md">
                <div className="py-4 px-6 border-b border-gray-200">
                    <h1 className="text-lg font-semibold text-gray-800">User Dashboard</h1>
                </div>
                <nav className="mt-6">
                    <a
                        className={`flex items-center py-3 px-4 text-lg text-gray-700 hover:bg-blue-200 ${
                            activeTab === 'overview' ? 'bg-blue-200 text-blue-700' : ''
                        }`}
                        onClick={(e) => handleTabClick(e, 'overview')}
                    >
                        <FaTachometerAlt className="mr-3" /> Dashboard
                    </a>
                    <a
                        className={`flex items-center py-3 px-4 text-lg text-gray-700 hover:bg-blue-200 ${
                            activeTab === 'addCommunity' ? 'bg-blue-200 text-blue-700' : ''
                        }`}
                        onClick={() => handleTabChange('addCommunity')}
                    >
                        <FaUser className="mr-3" /> Your Profile
                    </a>
                    <a
                        className={`flex items-center py-3 px-4 text-lg text-gray-700 hover:bg-blue-200 ${
                            activeTab === 'viewCommunity' ? 'bg-blue-200 text-blue-700' : ''
                        }`}
                        onClick={handleLogout} // Call handleLogout on click
                    >
                        <FaSignOutAlt className="mr-3" /> Logout
                    </a>
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 p-8 flex flex-col overflow-y-auto">
                <div className="bg-white shadow-md rounded-lg p-6">
                    {/* Render different content based on activeTab */}
                    {activeTab === 'overview' && <DashboardOvervie/>}
                    {activeTab === 'addCommunity' && <UserProfile/>}
                </div>
            </div>

            {/* Logout Modal */}
            {showModal && (
                <LogoutModal closeModal={closeModal} confirmLogout={confirmLogout} />
            )}
        </div>
    );
};

export default UserDashboard;
