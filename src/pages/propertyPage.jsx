import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const PropertyPage = () => {
  const { propertyId } = useParams();
  const [property, setProperty] = useState(null);
  const [enquiry, setEnquiry] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchPropertyDetails();
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    setUser(loggedInUser);
  }, [propertyId]);

  const fetchPropertyDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/properties/${propertyId}`);
      setProperty(response.data.property);
      setReviews(response.data.property.reviews);
    } catch (error) {
      console.error('Error fetching property details:', error);
      toast.error('Error fetching property details');
    }
  };

  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('You must be logged in to send an enquiry.');
      return;
    }
    if (user.role !== 'buyer') {
      toast.error('Only buyers can send enquiries.');
      return;
    }
    try {
      const enquiryData = { user: user.id, message: enquiry };
      await axios.post(`http://localhost:5000/api/properties/${propertyId}/enquiries`, enquiryData);
      toast.success('Enquiry sent successfully');
      setEnquiry('');
    } catch (error) {
      console.error('Error sending enquiry:', error);
      toast.error('Error sending enquiry');
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('You must be logged in to submit a review.');
      return;
    }
    if (user.role !== 'buyer') {
      toast.error('Only buyers can submit reviews.');
      return;
    }
    try {
      const reviewData = { user: user.id, rating, comment };
      await axios.post(`http://localhost:5000/api/properties/${propertyId}/reviews`, reviewData);
      toast.success('Review submitted successfully');
      setRating(0);
      setComment('');
      fetchPropertyDetails(); // Refresh reviews
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('Error submitting review');
    }
  };

  if (!property) return <p>Loading...</p>;

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-2">{property.title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img src={`http://localhost:5000/${property.image}`} alt={property.title} className="w-full h-64 object-cover rounded-lg" />
        </div>
        <div>
          <p className="text-lg mb-4"><strong>Type:</strong> {property.type.type}</p>
          <p className="text-lg mb-4"><strong>Country:</strong> {property.country.name}</p>
          <p className="text-lg mb-4"><strong>State:</strong> {property.state.name}</p>
          <p className="text-lg mb-4"><strong>City:</strong> {property.city.name}</p>
          <p className="text-lg mb-4"><strong>Owner:</strong> {property.owner.name}</p>
          <p className="text-lg mb-4"><strong>Price:</strong> $. {property.price}</p>
          <p className="text-lg mb-4"><strong>Status:</strong> {property.status}</p>
          <p className="text-lg mb-4"><strong>Description:</strong> {property.description}</p>
          {user && user.role === 'buyer' && (
            <form onSubmit={handleEnquirySubmit}>
              <label className="block text-lg font-semibold mb-2">Send Enquiry:</label>
              <textarea
                value={enquiry}
                onChange={(e) => setEnquiry(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                required
              ></textarea>
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600"
              >
                Send Enquiry
              </button>
            </form>
          )}
          {!user && (
            <p className="text-red-500">You must be logged in as a buyer to send an enquiry.</p>
          )}
        </div>
      </div>
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Leave a Review</h2>
        {user && user.role === 'buyer' && (
          <form onSubmit={handleReviewSubmit}>
            <label className="block text-lg font-semibold mb-2">Rating:</label>
            <input
              type="number"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg mb-4"
              min="1"
              max="5"
              required
            />
            <label className="block text-lg font-semibold mb-2">Comment:</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg mb-4"
              required
            ></textarea>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
            >
              Submit Review
            </button>
          </form>
        )}
        {!user && (
          <p className="text-red-500">You must be logged in as a buyer to submit a review.</p>
        )}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Reviews</h2>
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review._id} className="mb-4 p-4 bg-gray-100 rounded-lg">
                <p className="mb-1"><strong>Rating:</strong> {review.rating}</p>
                <p className="mb-1"><strong>Comment:</strong> {review.comment}</p>
                <p className="text-sm text-gray-600"><strong>User:</strong> {review.user.name}</p>
              </div>
            ))
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyPage;
