import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaTachometerAlt, FaUser, FaSignOutAlt, FaHome, FaEnvelope } from 'react-icons/fa';
import DashboardOverview from './DashboardOverview';
import LogoutModal from '../components/LogoutModel';
import OwnerUserProfile from '../Owner/OwnerUserProfile';
import OwnerOverview from '../Owner/OwnerOverview';
import OwnerAddProperty from '../Owner/OwnerAddProperty';
import OwnerMyProperties from '../Owner/OwnerMyProperties';
import OwnerReceivedEnquiries from '../Owner/OwnerReceivedEnquiries';
import OwnerProfile from '../Owner/OwnerUserProfile';

const OwnerDashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [activeTab, setActiveTab] = useState('overview');
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const path = location.pathname.split('/')[2];
        setActiveTab(path || 'overview');
    }, [location]);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        navigate(`/ownerdashboard${tab === 'overview' ? '' : `/${tab}`}`);
    };

    const handleTabClick = (event, tab) => {
        event.preventDefault();
        handleTabChange(tab);
    };

    const handleLogout = () => {
        setShowModal(true);
    };

    const confirmLogout = () => {
        localStorage.clear();
        navigate('/login');
        window.location.reload();
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <aside className="w-64 bg-white shadow-md">
                <div className="py-4 px-6 border-b border-gray-200">
                    <h1 className="text-lg font-semibold text-gray-800">Owner Dashboard</h1>
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
                            activeTab === 'profile' ? 'bg-blue-200 text-blue-700' : ''
                        }`}
                        onClick={(e) => handleTabClick(e, 'profile')}
                    >
                        <FaUser className="mr-3" /> Your Profile
                    </a>
                    <a
                        className={`flex items-center py-3 px-4 text-lg text-gray-700 hover:bg-blue-200 ${
                            activeTab === 'addProperty' ? 'bg-blue-200 text-blue-700' : ''
                        }`}
                        onClick={(e) => handleTabClick(e, 'addProperty')}
                    >
                        <FaHome className="mr-3" /> Add Property
                    </a>
                
                    <a
                        className={`flex items-center py-3 px-4 text-lg text-gray-700 hover:bg-blue-200 ${
                            activeTab === 'receivedEnquiries' ? 'bg-blue-200 text-blue-700' : ''
                        }`}
                        onClick={(e) => handleTabClick(e, 'receivedEnquiries')}
                    >
                        <FaEnvelope className="mr-3" /> Received Enquiries
                    </a>
                    <a
                        className={`flex items-center py-3 px-4 text-lg text-gray-700 hover:bg-blue-200`}
                        onClick={handleLogout}
                    >
                        <FaSignOutAlt className="mr-3" /> Logout
                    </a>
                </nav>
            </aside>

            <div className="flex-1 p-8 flex flex-col overflow-y-auto">
                <div className="bg-white shadow-md rounded-lg p-6">
                    {activeTab === 'overview' && <OwnerOverview />}
                    {activeTab === 'profile' && <OwnerProfile />}
                    {activeTab === 'addProperty' && <OwnerAddProperty />}
                    {activeTab === 'receivedEnquiries' && <OwnerReceivedEnquiries />}
                </div>
            </div>

            {showModal && (
                <LogoutModal closeModal={closeModal} confirmLogout={confirmLogout} />
            )}
        </div>
    );
};

export default OwnerDashboard;
