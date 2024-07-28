import React, { useEffect, useState } from "react";
import { FaBed, FaBath, FaCar, FaCalendarAlt } from "react-icons/fa";
import MortgageCalculator from "./MortgageCalculator";
import EnergyClass from "./EnergyClass";
import { getHouseByIdApi } from "../Apis/apis";
import { useNavigate, useParams } from "react-router-dom";
import SwiperCore from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Navigation, Pagination } from "swiper/modules";
import { FaPrint, FaShareAlt } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import HouseScheduleVisitSlideOver from "./homepageComponent/HouseScheduleVisit";
import bg from "../assets/adminBg.png";

SwiperCore.use([Navigation, Pagination]);

const HouseDetails = () => {
  const { id } = useParams();
  const [houseData, setHouseData] = useState(null);
  const history = useNavigate();
  const [selectedHouse, setSelectedHouse] = useState(null);

  useEffect(() => {
    const fetchHouseData = async () => {
      try {
        const response = await getHouseByIdApi(id);
        setHouseData(response.data.house);
      } catch (error) {
        console.error("Error fetching house data:", error);
        // Handle error, show error message, etc.
      }
    };

    fetchHouseData();
  }, [id]);
  const handleOpenInMap = () => {
    // Replace with your logic to open the location in a map application or service
    window.open(`https://www.google.com/maps/place/27%C2%B043'23.2%22N+85%C2%B021'50.4%22E/@27.723122,85.363986,712m/data=!3m2!1e3!4b1!4m4!3m3!8m2!3d27.723122!4d85.363986?entry=ttu`, "_blank");
  };

  const handleScheduleVisit = (houseId) => {
    const isLoggedIn = localStorage.getItem("token");
    const isAdmin = localStorage.getItem("isAdmin") === "true";

    if (!isLoggedIn) {
      toast.error("Please login to schedule a visit.");
      history("/login");
    } else if (isAdmin) {
      toast.error("Admins cannot schedule a visit.");
    } else {
      setSelectedHouse(houseId); // Set selected plot for scheduling
    }
  };
  const closeSlideOver = () => {
    setSelectedHouse(null); // Reset selected plot when slide over closes
  };

  const [showPopup, setShowPopup] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openPopup = (index) => {
    setCurrentImageIndex(index);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };
  const handlePrint = () => {
    const detailsTable = `
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="font-weight: bold;">Price:</td>
          <td>${houseData.price}</td>
        </tr>
        <tr>
          <td style="font-weight: bold;">Garage Size:</td>
          <td>${houseData.garageSize}</td>
        </tr>
        <tr>
          <td style="font-weight: bold;">Property Size:</td>
          <td>${houseData.propertySize}</td>
        </tr>
        <tr>
          <td style="font-weight: bold;">Year Built:</td>
          <td>${houseData.yearBuilt}</td>
        </tr>
        <tr>
          <td style="font-weight: bold;">Bedrooms:</td>
          <td>${houseData.bedrooms}</td>
        </tr>
        <tr>
          <td style="font-weight: bold;">Property Type:</td>
          <td>${houseData.propertyType}</td>
        </tr>
        <tr>
          <td style="font-weight: bold;">Bathrooms:</td>
          <td>${houseData.bathrooms}</td>
        </tr>
        <tr>
          <td style="font-weight: bold;">Property Status:</td>
          <td>${houseData.propertyStatus}</td>
        </tr>
        <tr>
          <td style="font-weight: bold;">Garages:</td>
          <td>${houseData.garages}</td>
        </tr>
      </table>
    `;

    const printableContent = `
      <h3>${houseData.houseName}</h3>
      <div>
        <img src="http://localhost:5000/${houseData.images[0]}" alt="Image" style="width: 100%; height: 400px;">
      </div>
      <div>
      <h3 className="text-2xl font-bold">Description</h3>
        <p>${houseData.description}</p>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h3 className="text-2xl font-bold">Details</h3>
        <div className="mt-6 text-center">
          <div className="mt-4 relative bg-white rounded-xl p-6">
            ${detailsTable}
          </div>
        </div>
      </div>
    `;

    const printWindow = window.open("", "", "height=400,width=600");

    printWindow.document.write(`
      <html>
        <head>
          <title>House Details</title>
          <style>
            body {
              font-family: Arial, sans-serif;
            }
            table {
              border-collapse: collapse;
              width: 100%;
            }
            th, td {
              border: 1px solid #dddddd;
              text-align: left;
              padding: 8px;
            }
          </style>
        </head>
        <body>${printableContent}</body>
      </html>
    `);

    printWindow.document.close();
    printWindow.print();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: houseData.houseName,
          text: houseData.description,
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error sharing house details:", error);
        // Handle error, show error message, etc.
      }
    } else {
      console.error("Web Share API not supported");
      // Handle error, show error message, etc.
    }
  };

  return (
    <>
      {houseData ? (
        <div style={{ backgroundColor: "#F4FAF0" }}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* House Name, Location, and Price */}
            <div className="flex justify-end items-center">
              <div className="flex space-x-2 mt-3">
                <div className="flex items-center space-x-4">
                  <FaPrint
                    className="text-gray-500 cursor-pointer hover:text-black text-2xl md:text-2xl"
                    onClick={handlePrint}
                    title="Print"
                  />
                  <FaShareAlt
                    className="text-gray-500 cursor-pointer hover:text-black text-2xl md:text-2xl"
                    onClick={handleShare}
                    title="Share"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center ">
              <div className="mt-2">
                <h3 className="text-xl font-bold">{houseData.houseName}</h3>
                <div className="flex items-center">
                  <FaMapMarkerAlt className="text-gray-500 mr-1" />
                  <p>{houseData.location}</p>
                </div>
              </div>
              <div>
                <p className="text-xl font-bold">$. {houseData.price}</p>
              </div>
            </div>
            <div className="mt-4 grid gap-4 sm:mt-6 md:mt-8 md:grid-cols-2 lg:mt-10 lg:grid-cols-5">
              <div className="col-span-2 lg:col-span-3 h-full lg:h-[500px] w-full">
                <img
                  src={`http://localhost:5000/${houseData.images[0]}`}
                  alt="Image"
                  className="h-full w-full rounded-xl object-cover cursor-pointer"
                  onClick={() => openPopup(0)}
                />
              </div>
              <div className="col-span-2 lg:col-span-2">
                <div className="grid h-full w-full grid-cols-2 gap-4 md:grid-cols-1">
                  {houseData.images.slice(1, 2).map((imageUrl, index) => (
                    <div
                      className="h-full w-full"
                      key={index}
                      onClick={() => openPopup(index + 1)}
                    >
                      <img
                        src={`http://localhost:5000/${imageUrl}`}
                        alt="Image"
                        className="h-full w-full lg:h-[240px] rounded-xl object-cover cursor-pointer"
                      />
                    </div>
                  ))}
                  {houseData.images.length > 3 && (
                    <div className="h-full w-full relative" onClick={openPopup}>
                      <img
                        src={`http://localhost:5000/${houseData.images[2]}`}
                        alt="Image"
                        className="h-full w-full lg:h-[240px] rounded-xl object-cover"
                        onClick={() => openPopup(2)}
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50 rounded-xl">
                        <p className="text-lg font-bold text-white">
                          +{houseData.images.length - 2}
                        </p>
                      </div>
                    </div>
                  )}
                  {houseData.images.length <= 3 && (
                    <img
                      src={`http://localhost:5000/${houseData.images[2]}`}
                      alt="Image"
                      className="h-full w-full lg:h-[240px] rounded-xl object-cover cursor-pointer"
                      onClick={() => openPopup(2)}
                    />
                  )}
                </div>
              </div>
              {showPopup && (
                <div
                  className="fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-75 flex justify-center items-center"
                  onClick={(e) => {
                    if (
                      !e.target.classList.contains("swiper-button-next") &&
                      !e.target.classList.contains("swiper-button-prev")
                    ) {
                      closePopup();
                    }
                  }}
                >
                  <div className="relative w-full h-full flex justify-center items-center">
                    <Swiper
                      navigation
                      pagination={{ clickable: true }}
                      onSlideChange={(swiper) =>
                        setCurrentImageIndex(swiper.activeIndex)
                      }
                      initialSlide={currentImageIndex}
                      className="h-[80vh] w-[80vw] object-contain"
                    >
                      {houseData.images.map((imageUrl, index) => (
                        <SwiperSlide
                          key={index}
                          className="flex items-center justify-center"
                        >
                          <img
                            src={`http://localhost:5000/${imageUrl}`}
                            alt="Image"
                            className="h-full w-full object-contain"
                            style={{ maxHeight: "100%", maxWidth: "100%" }}
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 grid gap-4 sm:mt-6 md:mt-8 lg:grid-cols-5 lg:mt-10">
              <div className="col-span-3">
                <div className="bg-white grid lg:grid-cols-5 md:grid-cols-2 sm:grid-cols-2 rounded-xl p-3">
                  <div className="col-span-1 flex flex-col justify-center items-center border-r-2 pr-4">
                    <span className="font-bold text-center">
                      {houseData.propertyType}
                    </span>
                    <span className="text-center text-sm">Property Type</span>
                  </div>
                  <div className="col-span-1 flex flex-col justify-center items-center border-r-2 pr-4">
                    <div className="flex items-center">
                      <FaBed size={24} />
                      <span className="ml-2">{houseData.bedrooms}</span>
                    </div>
                    <span>Beds</span>
                  </div>
                  <div className="col-span-1 flex flex-col justify-center items-center border-r-2 pr-4">
                    <div className="flex items-center">
                      <FaBath size={24} />
                      <span className="ml-2">{houseData.bathrooms}</span>
                    </div>
                    <span>Baths</span>
                  </div>
                  <div className="col-span-1 flex flex-col justify-center items-center border-r-2 pr-4">
                    <div className="flex items-center">
                      <FaCar size={24} />
                      <span className="ml-2">{houseData.garages}</span>
                    </div>
                    <span>Garages</span>
                  </div>
                  <div className="col-span-1 flex flex-col justify-center items-center pr-4">
                    <div className="flex items-center">
                      <FaCalendarAlt size={24} />
                      <span className="ml-2">{houseData.yearBuilt}</span>
                    </div>
                    <span>Year Built</span>
                  </div>
                </div>
              </div>
              <div className="col-span-2">
                <button
                  style={{
                    backgroundColor: "#2C3143",
                    fontFamily: "'Red Hat Display', sans-serif",
                    fontSize: "1.2rem",
                    textAlign: "center",
                    lineHeight: "1.5",
                  }}
                  className="text-white py-2 px-4 rounded w-full h-full"
                  onClick={() => handleScheduleVisit(houseData._id)} // Open Slide-over on button click
                >
                  SCHEDULE A VISIT
                </button>
              </div>
              {selectedHouse && (
                <HouseScheduleVisitSlideOver
                  houseId={selectedHouse} // Pass selectedPlot as plotId prop
                  onClose={closeSlideOver}
                />
              )}
            </div>
          </div>

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mt-8">
              <h3 className="text-2xl font-bold">Description</h3>
              <p className="mt-2 text-justify	">{houseData.description}</p>
            </div>
          </div>
          <hr className="my-4 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h3 className="text-2xl font-bold">Details</h3>
            <div className="mt-6 text-center">
              <div className="mt-4 relative bg-white rounded-xl p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 z-10">
                  <div className="flex justify-between items-center">
                    <p className="font-bold">Price:</p>
                    <p className="ml-4 sm:mr-4">$. {houseData.price}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="font-bold">Garage Size:</p>
                    <p className="ml-4 sm:mr-4">{houseData.garageSize} Sq Ft</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="font-bold">Property Size:</p>
                    <p className="ml-4 sm:mr-4">
                      {houseData.propertySize} 
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="font-bold">Year Built:</p>
                    <p className="ml-4 sm:mr-4">{houseData.yearBuilt}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="font-bold">Bedrooms:</p>
                    <p className="ml-4 sm:mr-4">{houseData.bedrooms}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="font-bold">Property Type:</p>
                    <p className="ml-4 sm:mr-4">{houseData.propertyType}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="font-bold">Bathrooms:</p>
                    <p className="ml-4 sm:mr-4">{houseData.bathrooms}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="font-bold">Property Status:</p>
                    <p className="ml-4 sm:mr-4">{houseData.propertyStatus}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="font-bold">Garages:</p>
                    <p className="ml-4 sm:mr-4">{houseData.garages}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr className="my-4 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold">Address</h3>
              </div>
              <div>
                <button
                  onClick={handleOpenInMap}
                  style={{
                    backgroundColor: "#457C73",
                    padding: "8px 16px",
                    fontSize: "16px",
                    borderRadius: "8px",
                  }}
                  className=" text-white font-bold rounded flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Open in Google Maps
                </button>
              </div>
            </div>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 p-6">
              <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-4 col-span-2">
                <div className="flex flex-col items-center justify-center sm:flex-row sm:justify-between">
                  <p className="font-bold sm:mr-4">Address:</p>
                  <p className="text-center sm:text-left sm:mr-4">
                    {houseData.address}
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center sm:flex-row sm:justify-between">
                  <p className="font-bold sm:mr-4">Zip/Postal Code:</p>
                  <p className="text-center sm:text-left sm:mr-4">
                    {houseData.zipCode}
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center sm:flex-row sm:justify-between">
                  <p className="font-bold sm:mr-4">City:</p>
                  <p className="text-center sm:text-left sm:mr-4">
                    {houseData.city}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <hr className="my-4 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-2xl font-bold">Property Documents</h3>
              </div>
            </div>
            <div className="flex items-center bg-gray-100 rounded-lg p-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-3 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <div>
                <p style={{ color: "#726868" }} className="text-lg font-bold">
                  Documents
                </p>
              </div>
              <a
                href={`http://localhost:5000/${houseData.propertyDocument}`}
                target="_blank"
                download
                style={{ color: "#457C73" }}
                className="ml-auto font-bold py-2 px-4 rounded"
              >
                DOWNLOAD
              </a>
            </div>
          </div>

          <hr className="my-4 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" />

          <MortgageCalculator housePrice={houseData.price} />
          {/* <hr className="my-4 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" />
          <EnergyClass energyLevel={houseData.energyClass} /> */}
          {/* <div className="w-full ">
            <img src={bg} alt="" className="w-full object-cover" />
          </div> */}

        </div>

      ) : (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1>Loading...</h1>
        </div>
      )}
    </>
  );
};

export default HouseDetails;
