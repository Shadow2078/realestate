import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getAboutInfoApi, getContactInfoApi, updateAboutInfoApi, updateContactInfoApi } from '../../Apis/apis';

const ManagePages = () => {
  const [aboutUsData, setAboutUsData] = useState({ paragraph: '', objective1: '', objective2: '', objective3: '' });
  const [contactInfoData, setContactInfoData] = useState({ address: '', contact: '', workingHours: '' });

  useEffect(() => {
    fetchAboutUsData();
    fetchContactInfoData();
  }, []);

  const fetchAboutUsData = async () => {
    try {
      const response = await getAboutInfoApi();
      setAboutUsData(response.data);
    } catch (error) {
      toast.error('Failed to fetch About Us data.');
    }
  };

  const fetchContactInfoData = async () => {
    try {
      const response = await getContactInfoApi();
      setContactInfoData(response.data);
    } catch (error) {
      toast.error('Failed to fetch Contact Info data.');
    }
  };

  const handleInputChange = (e, form) => {
    const { name, value } = e.target;
    if (form === 'aboutUs') {
      setAboutUsData({ ...aboutUsData, [name]: value });
    } else if (form === 'contactInfo') {
      setContactInfoData({ ...contactInfoData, [name]: value });
    }
  };

  const handleAboutUsSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateAboutInfoApi(aboutUsData);
      toast.success('About Us page updated successfully!');
      fetchAboutUsData();
    } catch (error) {
      toast.error('Error updating About Us page.');
      console.error('Error updating About Us page:', error);
    }
  };

  const handleContactInfoSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateContactInfoApi(contactInfoData);
      toast.success('Contact Us page updated successfully!');
      fetchContactInfoData();
    } catch (error) {
      toast.error('Error updating Contact Us page.');
      console.error('Error updating Contact Us page:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">

      <div className="w-full max bg-white p-8 rounded-lg shadow-lg mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Update About Us</h2>
        <form className="space-y-6" onSubmit={handleAboutUsSubmit}>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Paragraph</label>
            <textarea
              name="paragraph"
              value={aboutUsData.paragraph}
              onChange={(e) => handleInputChange(e, 'aboutUs')}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-green-500"
              placeholder="Enter About Us Paragraph"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Mission</label>
            <input
              type="text"
              name="objective1"
              value={aboutUsData.objective1}
              onChange={(e) => handleInputChange(e, 'aboutUs')}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-green-500"
              placeholder="Enter Objective 1"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Vision</label>
            <input
              type="text"
              name="objective2"
              value={aboutUsData.objective2}
              onChange={(e) => handleInputChange(e, 'aboutUs')}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-green-500"
              placeholder="Enter Objective 2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Values</label>
            <input
              type="text"
              name="objective3"
              value={aboutUsData.objective3}
              onChange={(e) => handleInputChange(e, 'aboutUs')}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-green-500"
              placeholder="Enter Objective 3"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600"
          >
            Update
          </button>
        </form>
      </div>

      <div className="w-full max bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Update Contact Us</h2>
        <form className="space-y-6" onSubmit={handleContactInfoSubmit}>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              value={contactInfoData.address}
              onChange={(e) => handleInputChange(e, 'contactInfo')}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-green-500"
              placeholder="Enter Address"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Contact</label>
            <input
              type="text"
              name="contact"
              value={contactInfoData.contact}
              onChange={(e) => handleInputChange(e, 'contactInfo')}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-green-500"
              placeholder="Enter Contact Information"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Working Hours</label>
            <input
              type="text"
              name="workingHours"
              value={contactInfoData.workingHours}
              onChange={(e) => handleInputChange(e, 'contactInfo')}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-green-500"
              placeholder="Enter Working Hours"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default ManagePages;
