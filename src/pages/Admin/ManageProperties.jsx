import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getPropertyTypes,
  getAllCountriesApi,
  getAllStatesApi,
  getAllCitiesApi,
  getAllPropertiesApi,
  addPropertyApi,
  updatePropertyApi,
  deletePropertyApi,
  approveReviewApi,
  disapproveReviewApi,
  deleteReviewApi,
} from "../../Apis/apis";

const ManageProperties = () => {
  const [properties, setProperties] = useState([]);
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    country: "",
    state: "",
    city: "",
    owner: "",
    price: "",
    status: "",
    description: "",
    image: null,
  });
  const [editingPropertyId, setEditingPropertyId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchPropertyTypes();
    fetchCountries();
    fetchStates();
    fetchCities();
    fetchProperties();
    setOwnerFromLocalStorage();
  }, []);

  const setOwnerFromLocalStorage = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        owner: user.id,
      }));
    }
  };

  const fetchPropertyTypes = async () => {
    try {
      const res = await getPropertyTypes();
      setPropertyTypes(res.data.propertyTypes || []);
    } catch (err) {
      console.error("Failed to fetch property types:", err);
      toast.error("Failed to fetch property types");
    }
  };

  const fetchCountries = async () => {
    try {
      const res = await getAllCountriesApi();
      setCountries(res.data.countries || []);
    } catch (err) {
      console.error("Failed to fetch countries:", err);
      toast.error("Failed to fetch countries");
    }
  };

  const fetchStates = async () => {
    try {
      const res = await getAllStatesApi();
      setStates(res.data.states || []);
    } catch (err) {
      console.error("Failed to fetch states:", err);
      toast.error("Failed to fetch states");
    }
  };

  const fetchCities = async () => {
    try {
      const res = await getAllCitiesApi();
      setCities(res.data.cities || []);
    } catch (err) {
      console.error("Failed to fetch cities:", err);
      toast.error("Failed to fetch cities");
    }
  };

  const fetchProperties = async () => {
    try {
      const res = await getAllPropertiesApi();
      setProperties(res.data.properties || []);
    } catch (err) {
      console.error("Failed to fetch properties:", err);
      toast.error("Failed to fetch properties");
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
        toast.success("Property updated successfully!");
        setEditingPropertyId(null);
      } else {
        await addPropertyApi(formDataObj);
        toast.success("Property added successfully!");
      }
      setFormData({
        title: "",
        type: "",
        country: "",
        state: "",
        owner: "",
        city: "",
        price: "",
        status: "",
        description: "",
        image: null,
      });
      fetchProperties();
      setOwnerFromLocalStorage();
    } catch (error) {
      toast.error(
        `Error ${editingPropertyId ? "updating" : "adding"} property.`
      );
      console.error(
        `Error ${editingPropertyId ? "updating" : "adding"} property:`,
        error
      );
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
      image: null,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    try {
      await deletePropertyApi(id);
      toast.success("Property deleted successfully!");
      setShowDeleteModal(false);
      fetchProperties();
    } catch (error) {
      toast.error("Error deleting property.");
      console.error("Error deleting property:", error);
    }
  };

  const openDeleteModal = (id) => {
    setSelectedItemId(id);
    setShowDeleteModal(true);
  };

  const handleApproveReview = async (propertyId, reviewId) => {
    try {
      await approveReviewApi(propertyId, reviewId);
      toast.success("Review approved successfully!");
      fetchProperties();
    } catch (error) {
      toast.error("Error approving review.");
      console.error("Error approving review:", error);
    }
  };

  const handleDisapproveReview = async (propertyId, reviewId) => {
    try {
      await disapproveReviewApi(propertyId, reviewId);
      toast.success("Review disapproved successfully!");
      fetchProperties();
    } catch (error) {
      toast.error("Error disapproving review.");
      console.error("Error disapproving review:", error);
    }
  };

  const handleDeleteReview = async (propertyId, reviewId) => {
    try {
      await deleteReviewApi(propertyId, reviewId);
      toast.success("Review deleted successfully!");
      fetchProperties();
    } catch (error) {
      toast.error("Error deleting review.");
      console.error("Error deleting review:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProperties = properties.filter((property) => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    return (
      property._id.toLowerCase().includes(lowercasedSearchTerm) ||
      property.title.toLowerCase().includes(lowercasedSearchTerm) ||
      property.owner.name.toLowerCase().includes(lowercasedSearchTerm) ||
      property.owner.email.toLowerCase().includes(lowercasedSearchTerm)
    );
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <div className="w-full max bg-white p-8 rounded-lg shadow-lg mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {editingPropertyId ? "Edit Property" : "Add Property"}
        </h2>
        <form
          className="space-y-6"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div className="grid grid-cols-1 gap-6">
            {/* Form fields here */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Title
              </label>
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
              <label className="block text-sm font-semibold text-gray-700">
                Type
              </label>
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
              <label className="block text-sm font-semibold text-gray-700">
                Country
              </label>
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
              <label className="block text-sm font-semibold text-gray-700">
                State
              </label>
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
              <label className="block text-sm font-semibold text-gray-700">
                City
              </label>
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
              <label className="block text-sm font-semibold text-gray-700">
                Owner
              </label>
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
              <label className="block text-sm font-semibold text-gray-700">
                Price
              </label>
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
              <label className="block text-sm font-semibold text-gray-700">
                Status
              </label>
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
              <label className="block text-sm font-semibold text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-green-500"
                placeholder="Enter Description"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Image
              </label>
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
            className="w-full p-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600"
          >
            {editingPropertyId ? "Update" : "Save"}
          </button>
        </form>
      </div>

      <div className="w-full max bg-white p-8 rounded-lg shadow-lg mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Search Properties
        </h2>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-green-500"
          placeholder="Search by ID, Title, or User"
        />
      </div>

      <div className="w-full max bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          List of Properties
        </h2>
        <div className="space-y-6">
          {filteredProperties.map((property) => (
            <div
              key={property._id}
              className="bg-white border border-gray-100 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
            >
              <div className="flex-grow">
                <p className="text-gray-700 text-sm">
                  <strong>Title:</strong> {property.title ?? "Undefined"}
                </p>
                <p className="text-gray-700 text-sm">
                  <strong>Type:</strong> {property.type?.type ?? "Undefined"}
                </p>
                <p className="text-gray-700 text-sm">
                  <strong>Country:</strong>{" "}
                  {property.country?.name ?? "Undefined"}
                </p>
                <p className="text-gray-700 text-sm">
                  <strong>State:</strong> {property.state?.name ?? "Undefined"}
                </p>
                <p className="text-gray-700 text-sm">
                  <strong>City:</strong> {property.city?.name ?? "Undefined"}
                </p>
                <p className="text-gray-700 text-sm">
                  <strong>Owner:</strong> {property.owner?.name ?? "Undefined"}
                </p>
                <p className="text-gray-700 text-sm">
                  <strong>Price:</strong> {property.price ?? "Undefined"}
                </p>
                <p className="text-gray-700 text-sm">
                  <strong>Status:</strong> {property.status ?? "Undefined"}
                </p>
                <p className="text-gray-700 text-sm">
                  <strong>Description:</strong>{" "}
                  {property.description ?? "Undefined"}
                </p>
                <p className="text-gray-700 text-sm">
                  <strong>Reviews:</strong> {property.reviews ?? "Undefined"}
                </p>
                <div className="mt-4">
                  {property.reviews.map((review) => (
                    <div
                      key={review._id}
                      className="border-t border-gray-200 pt-4"
                    >
                      <p className="text-sm">
                        <strong>User:</strong> {review.user.name  ?? "Undefined"}
                      </p>
                      <p className="text-sm">
                        <strong>Rating:</strong> {review.rating  ?? "Undefined"}
                      </p>
                      <p className="text-sm">
                        <strong>Comment:</strong> {review.comment  ?? "Undefined"}
                      </p>
                      <p className="text-sm">
                        <strong>Approved:</strong>{" "}
                        {review.approved ? "Yes" : "No"}
                      </p>
                      <div className="flex space-x-2 mt-2">
                        <button
                          onClick={() =>
                            handleApproveReview(property._id, review._id)
                          }
                          className="px-3 py-1 bg-green-500 text-white text-sm font-semibold rounded-lg hover:bg-red-600"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() =>
                            handleDisapproveReview(property._id, review._id)
                          }
                          className="px-3 py-1 bg-yellow-500 text-white text-sm font-semibold rounded-lg hover:bg-red-600"
                        >
                          Disapprove
                        </button>
                        <button
                          onClick={() =>
                            handleDeleteReview(property._id, review._id)
                          }
                          className="px-3 py-1 bg-red-500 text-white text-sm font-semibold rounded-lg hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <img
                  src={`http://localhost:5000/${property.image}`}
                  alt="Property"
                  className="w-full h-64 object-cover rounded-lg mt-4"
                />
                <div className="flex mt-3">
                  <button
                    onClick={() => handleEdit(property)}
                    className="mr-3 px-3 py-1 bg-blue-500 text-white text-sm font-semibold rounded-lg hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => openDeleteModal(property._id)}
                    className="px-3 py-1 bg-red-500 text-white text-sm font-semibold rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-75">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="text-center">
              <h3 className="text-lg font-semibold">Delete Confirmation</h3>
              <p className="text-sm text-gray-600 mt-2">
                Are you sure you want to delete this item?
              </p>
            </div>
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg mr-2 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(selectedItemId)}
                className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProperties;
