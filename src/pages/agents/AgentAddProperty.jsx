import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FiHome, FiPlus } from 'react-icons/fi';
import {
  getPropertyTypes,
  getAllCountriesApi,
  getAllStatesApi,
  getAllCitiesApi,
  getPropertiesByUserId,
  addPropertyApi,
  updatePropertyApi
} from '../../Apis/apis';

const AgentAddProperty = () => {
  const [properties, setProperties] = useState([]);
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    country: '',
    state: '',
    city: '',
    owner: '',
    price: '',
    status: '',
    description: '',
    image: null
  });
  const [editingPropertyId, setEditingPropertyId] = useState(null);

  useEffect(() => {
    fetchPropertyTypes();
    fetchCountries();
    fetchStates();
    fetchCities();
    fetchProperties();
    setOwnerFromLocalStorage();
  }, []);

  const setOwnerFromLocalStorage = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        owner: user.id
      }));
    }
  };

  const fetchPropertyTypes = async () => {
    try {
      const res = await getPropertyTypes();
      setPropertyTypes(res.data.propertyTypes || []);
    } catch (err) {
      console.error('Failed to fetch property types:', err);
      toast.error('Failed to fetch property types');
    }
  };

  const fetchCountries = async () => {
    try {
      const res = await getAllCountriesApi();
      setCountries(res.data.countries || []);
    } catch (err) {
      console.error('Failed to fetch countries:', err);
      toast.error('Failed to fetch countries');
    }
  };

  const fetchStates = async () => {
    try {
      const res = await getAllStatesApi();
      setStates(res.data.states || []);
    } catch (err) {
      console.error('Failed to fetch states:', err);
      toast.error('Failed to fetch states');
    }
  };

  const fetchCities = async () => {
    try {
      const res = await getAllCitiesApi();
      setCities(res.data.cities || []);
    } catch (err) {
      console.error('Failed to fetch cities:', err);
      toast.error('Failed to fetch cities');
    }
  };

  const fetchProperties = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const res = await getPropertiesByUserId(user.id);
      setProperties(res.data.properties || []);
    } catch (err) {
      console.error('Failed to fetch properties:', err);
      toast.error('Failed to fetch properties');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataObj = new FormData();
      for (const key in formData) {
        formDataObj.append(key, formData[key]);
      }
      if (editingPropertyId) {
        await updatePropertyApi(editingPropertyId, formDataObj);
        toast.success('Property updated successfully!');
        setEditingPropertyId(null);
      } else {
        await addPropertyApi(formDataObj);
        toast.success('Property added successfully!');
      }
      setFormData({
        title: '',
        type: '',
        country: '',
        state: '',
        city: '',
        owner: '',
        price: '',
        status: '',
        description: '',
        image: null
      });
      fetchProperties();
    } catch (error) {
      toast.error(`Error ${editingPropertyId ? 'updating' : 'adding'} property.`);
      console.error(`Error ${editingPropertyId ? 'updating' : 'adding'} property:`, error);
    }
  };

  const handleEdit = (property) => {
    setEditingPropertyId(property._id);
    setFormData({
      title: property.title,
      type: property.type._id,
      country: property.country._id,
      state: property.state._id,
      city: property.city._id,
      owner: property.owner._id,
      price: property.price,
      status: property.status,
      description: property.description,
      image: null
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <div className="w-full bg-white p-8 rounded-lg shadow-lg mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {editingPropertyId ? 'Edit Property' : 'Add Property'}
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-green-500"
                placeholder="Enter Property Title"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-green-500"
                required
              >
                <option value="">Select Type</option>
                {propertyTypes.map((type) => (
                  <option key={type._id} value={type._id}>
                    {type.type}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Country</label>
              <select
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-green-500"
                required
              >
                <option value="">Select Country</option>
                {countries.map((country) => (
                  <option key={country._id} value={country._id}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">State</label>
              <select
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-green-500"
                required
              >
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state._id} value={state._id}>
                    {state.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">City</label>
              <select
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-green-500"
                required
              >
                <option value="">Select City</option>
                {cities.map((city) => (
                  <option key={city._id} value={city._id}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>
            <div hidden>
              <label className="block text-sm font-semibold text-gray-700">Owner</label>
              <input
                type="text"
                name="owner"
                value={formData.owner}
                readOnly
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-green-500"
                placeholder="Owner"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-green-500"
                placeholder="Enter Price"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-green-500"
                required
              >
                <option value="">Select Status</option>
                <option value="available">Available</option>
                <option value="sold">Sold</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-green-500"
                placeholder="Enter Description"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Image</label>
              <input
                type="file"
                name="image"
                onChange={handleFileChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-green-500"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 flex items-center justify-center"
          >
            <FiPlus className="mr-2" /> {editingPropertyId ? 'Update' : 'Add Property'}
          </button>
        </form>
      </div>

      <div className="w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold text-gray-900 mb-6">List of Properties</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <div key={property._id} className="bg-gray-100 p-4 rounded-lg shadow-md">
              <div className="mb-4">
                {property.image && (
                  <img
                    src={`http://localhost:5000/${property.image}`}
                    alt={property.title}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                )}
              </div>
              <h4 className="text-lg font-bold mb-2">{property.title}</h4>
              <p className="mb-2"><strong>Type:</strong> {property.type.type}</p>
              <p className="mb-2"><strong>Country:</strong> {property.country.name}</p>
              <p className="mb-2"><strong>State:</strong> {property.state.name}</p>
              <p className="mb-2"><strong>City:</strong> {property.city.name}</p>
              <p className="mb-2"><strong>Price:</strong> ${property.price}</p>
              <p className="mb-2"><strong>Status:</strong> {property.status}</p>
              <div className="flex mt-3">
                <button
                  onClick={() => handleEdit(property)}
                  className="mr-3 px-3 py-1 bg-blue-500 text-white text-sm font-semibold rounded-lg hover:bg-blue-600"
                >
                  Edit
                </button>
                {/* <button
                  onClick={() => openDeleteModal(property._id)}
                  className="px-3 py-1 bg-red-500 text-white text-sm font-semibold rounded-lg hover:bg-red-600"
                >
                  Delete
                </button> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AgentAddProperty;
