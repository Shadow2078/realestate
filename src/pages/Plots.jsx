import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllPropertiesApi } from '../Apis/apis'; // Adjust the import based on your API file location

import banner from "../assets/img/banner.jpg";
import { toast } from "react-toastify";

const Plots = () => {
  const [plots, setPlots] = useState([]);
  const [selectedPlot, setSelectedPlot] = useState(null);
  const [selectedViewPlot, setSelectedViewPlot] = useState(null);

  useEffect(() => {
    fetchPlots();
  }, []);

  const fetchPlots = async () => {
    try {
      const res = await getAllPropertiesApi();
      setPlots(res.data.properties); // Assuming properties are returned in res.data.properties
    } catch (err) {
      console.error("Failed to fetch plots:", err);
      toast.error("Failed to fetch plots");
    }
  };

  const closeViewModal = () => {
    setSelectedViewPlot(null); // Reset selected plot modal when closed
  };

  return (
    <div style={{ backgroundColor: "#F4FAF0" }}>
      {/* Banner section */}
      <div
        className="relative overflow-hidden bg-cover bg-no-repeat p-12 text-center"
        style={{
          backgroundImage: `url(${banner})`,
          height: "300px",
        }}
      >
        {/* Banner content */}
        <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}>
          <div className="flex h-full items-center justify-center">
            <div className="text-white max-w-lg mx-auto">
              <h2 className="mb-4 text-4xl lg:text-5xl font-semibold">
                <span className="border-b-2 border-dashed border-orange-500">
                  Our Properties
                </span>
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Plot cards section */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto py-8">
          {/* Placeholder for promotional text */}
          <div className="text-center text-lg text-gray-700 mb-4 overflow-hidden">
            <marquee className="marquee" behavior="scroll" direction="left">
              We offer prime plots for sale. Contact us at +977 9812345678 or email us at raybiner@gmail.com for more information.
            </marquee>
          </div>

          {/* Grid layout for plots */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
            {plots.map((plot, index) => (
              <Link to={`/property/${plot._id}`} key={plot._id}>
                <div
                  className={`relative overflow-hidden rounded-lg shadow-lg ${
                    index % 2 === 0 ? "bg-green-400" : "bg-gray-600"
                  }`}
                >
                  <div className="absolute top-0 right-0 mt-2 mr-2">
                    <span
                      className={`inline-block px-2 py-1 rounded-lg text-white text-xs ${
                        plot.status === "available"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    >
                      {plot.status}
                    </span>
                  </div>

                  <img
                    src={`http://localhost:5000/${plot.image}`}
                    alt={`Featured Property ${index + 1}`}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="bg-black bg-opacity-50 p-4 text-center">
                    <p className="text-white font-bold text-lg mb-2">
                      {plot.title}
                    </p>
                    <p className="text-gray-300 text-lg mb-2">$. {plot.price}</p>
                    <p className="text-white text-sm mb-4">
                      {plot.type?.type ?? 'Undefined'}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plots;
