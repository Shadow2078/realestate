import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getPropertyTypes, addPropertyType } from '../../Apis/apis';

const ManagePropertyTypes = () => {
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [formData, setFormData] = useState({ type: '' });

  useEffect(() => {
    fetchPropertyTypes();
  }, []);

  const fetchPropertyTypes = async () => {
    try {
      const res = await getPropertyTypes();
      if (Array.isArray(res.data.propertyTypes)) {
        setPropertyTypes(res.data.propertyTypes);
      } else {
        setPropertyTypes([]);
      }
    } catch (err) {
      console.error('Failed to fetch property types:', err);
      toast.error('Failed to fetch property types');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addPropertyType(formData);
      toast.success('Property type added successfully!');
      setFormData({ type: '' });
      fetchPropertyTypes();
    } catch (error) {
      toast.error('Error adding property type.');
      console.error('Error adding property type:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <div className="w-full max bg-white p-8 rounded-lg shadow-lg mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Add Property Type</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Type</label>
            <input
              type="text"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-green-500"
              placeholder="Enter Property Type Name"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600"
          >
            Save
          </button>
        </form>
      </div>

      <div className="w-full max bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold text-gray-900 mb-6">List of Property Types</h2>
        <div className="space-y-6">
          {propertyTypes.length > 0 ? (
            propertyTypes.map((propertyType) => (
              <div
                key={propertyType._id}
                className="bg-white border border-gray-100 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
              >
                <p className="text-gray-700 text-sm">
                  <strong>Type:</strong> {propertyType.type}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-700 text-sm">No property types found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManagePropertyTypes;
