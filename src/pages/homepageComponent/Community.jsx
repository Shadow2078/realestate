import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md'; 
import { getAllCommunitiesApi } from '../../Apis/apis';
import { toast } from 'react-toastify';
import AOS from 'aos';

const Community = () => {
  const [communities, setCommunities] = useState([]);
 
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      offset: 150, // Offset (in px) from the top of the screen
      easing: 'ease-in-out', // Easing type for the animation
    });
    getAllCommunitiesApi()
      .then((res) => {
        console.log(res.data);
        setCommunities(res.data.communities || []);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to fetch communities");
      });
  }, []);

  return (
    <div style={{ backgroundColor: "#475B39" }} className="bg-gray-900 rounded-lg p-4 md:p-8 mt-[-50px] md:mt-0 relative z-10">
      <div className="container mx-auto py-10">
        <h2 className="text-3xl font-bold text-white mb-6" data-aos="fade-left">Explore by Community</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4" data-aos="fade-up">
          {/* House 1 */}
          {communities.map((community) => (
          <Link key={community._id} to={`/community/${community._id}`} >
            <div className="relative overflow-hidden rounded-lg shadow-lg">
              <img
                src={`http://localhost:5000/${community.image}`}
                alt={community.name}
                className="w-full h-96 object-cover" 
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4">
                <p className="text-white font-bold text-lg">{community.name}</p>
                <div className="flex items-center">
                  <MdLocationOn className="text-gray-300 mr-2" />
                  <p className="text-gray-300 text-sm">{community.location}</p>
                </div>
              </div>
            </div>
          </Link>
          
        ))}
        </div>
      </div>
    </div>
  );
};

export default Community;
