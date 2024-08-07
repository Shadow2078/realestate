import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getPropertyTypes, addPropertyType, updatePropertyType, deletePropertyType } from '../../Apis/apis';

const ManagePropertyTypes = () => {
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [formData, setFormData] = useState({ type: '' });
  const [editingPropertyTypeId, setEditingPropertyTypeId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

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
      if (editingPropertyTypeId) {
        await updatePropertyType(editingPropertyTypeId, formData);
        toast.success('Property type updated successfully!');
        setEditingPropertyTypeId(null);
      } else {
        await addPropertyType(formData);
        toast.success('Property type added successfully!');
      }
      setFormData({ type: '' });
      fetchPropertyTypes();
    } catch (error) {
      toast.error(`Error ${editingPropertyTypeId ? 'updating' : 'adding'} property type.`);
      console.error(`Error ${editingPropertyTypeId ? 'updating' : 'adding'} property type:`, error);
    }
  };

  const handleEdit = (propertyType) => {
    setEditingPropertyTypeId(propertyType._id);
    setFormData({ type: propertyType.type });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    try {
      await deletePropertyType(id);
      toast.success('Property type deleted successfully!');
      fetchPropertyTypes();
    } catch (error) {
      toast.error('Error deleting property type.');
      console.error('Error deleting property type:', error);
    }
  };

  const openDeleteModal = (id) => {
    setSelectedItemId(id);
    setShowDeleteModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <div className="w-full max bg-white p-8 rounded-lg shadow-lg mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {editingPropertyTypeId ? 'Edit Property Type' : 'Add Property Type'}
        </h2>
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
            {editingPropertyTypeId ? 'Update' : 'Save'}
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
                <div className="flex mt-3">
                  <button
                    onClick={() => handleEdit(propertyType)}
                    className="mr-3 px-3 py-1 bg-blue-500 text-white text-sm font-semibold rounded-lg hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => openDeleteModal(propertyType._id)}
                    className="px-3 py-1 bg-red-500 text-white text-sm font-semibold rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-700 text-sm">No property types found.</p>
          )}
        </div>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-75">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="text-center">
              <h3 className="text-lg font-semibold">Delete Confirmation</h3>
              <p className="text-sm text-gray-600 mt-2">Are you sure you want to delete this item?</p>
            </div>
            <div className="flex justify-center mt-4">
              <button onClick={() => setShowDeleteModal(false)} className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg mr-2 hover:bg-gray-400">Cancel</button>
              <button onClick={() => { handleDelete(selectedItemId); setShowDeleteModal(false); }} className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagePropertyTypes;
