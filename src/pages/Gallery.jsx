import React, { useState } from "react";
import banner from "../assets/img/banner.jpg"; // Import your background image
import bathroom1 from "../assets/img/Bathroom/1.JPG";
import bathroom2 from "../assets/img/Bathroom/2.JPG";
import bathroom3 from "../assets/img/Bathroom/3.JPG";
import bathroom4 from "../assets/img/Bathroom/4.JPG";
import bathroom5 from "../assets/img/Bathroom/5.JPG";

import house1 from "../assets/img/House/1.JPG";
import house2 from "../assets/img/House/2.JPG";
import house3 from "../assets/img/House/3.JPG";
import house4 from "../assets/img/House/4.JPG";
import house5 from "../assets/img/House/5.JPG";
import house6 from "../assets/img/House/6.JPG";

import kitchen1 from "../assets/img/Kitchen/1.JPG";
import kitchen2 from "../assets/img/Kitchen/2.JPG";
import kitchen3 from "../assets/img/Kitchen/3.JPG";

import room1 from "../assets/img/Rooms/1.JPG";
import room2 from "../assets/img/Rooms/2.JPG";
import room3 from "../assets/img/Rooms/3.JPG";
import room4 from "../assets/img/Rooms/4.JPG";
import room5 from "../assets/img/Rooms/5.JPG";

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("house");

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const images = {
    house: [house1, house2, house3, house4, house5, house6],
    kitchen: [kitchen1, kitchen2, kitchen3],
    bathroom: [bathroom1, bathroom2, bathroom3, bathroom4, bathroom5],
    rooms: [room1, room2, room3, room4, room5],
  };

  const selectedImages = images[selectedCategory] || [];

  return (
    <div>
      <div
  className="relative overflow-hidden bg-cover bg-no-repeat p-12 text-center"
  style={{
    backgroundImage: `url(${banner})`,
    height: "300px",
  }}
>
  <div
    className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed"
    style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
  >
    <div className="flex h-full items-center justify-center">
      <div className="text-white max-w-lg mx-auto">
        <h2 className="mb-4 text-4xl lg:text-5xl font-semibold">
          <span className="border-b-2 border-dashed border-orange-500">
            Gallery
          </span>
        </h2>
      </div>
    </div>
  </div>
</div>
      <div className="container mx-auto px-5 py-10 lg:px-32">
        <div className="container bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 2xl:p-16 w-full md:w-3/4 lg:w-5/6 xl:w-11/12 2xl:w-4/5 flex flex-row flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12 2xl:gap-16 ">
          {/* Category buttons */}
          <div className="category-box">
            <button
              className={`category-btn ${
                selectedCategory === "house" ? "active text-orange-500" : ""
              }`}
              onClick={() => handleCategoryChange("house")}
            >
              House
            </button>
          </div>
          <div className="category-box">
            <button
              className={`category-btn ${
                selectedCategory === "kitchen" ? "active text-orange-500" : ""
              }`}
              onClick={() => handleCategoryChange("kitchen")}
            >
              Kitchen
            </button>
          </div>
          <div className="category-box">
            <button
              className={`category-btn ${
                selectedCategory === "rooms" ? "active text-orange-500" : ""
              }`}
              onClick={() => handleCategoryChange("rooms")}
            >
              Rooms
            </button>
          </div>
          <div className="category-box">
            <button
              className={`category-btn ${
                selectedCategory === "bathroom" ? "active text-orange-500" : ""
              }`}
              onClick={() => handleCategoryChange("bathroom")}
            >
              Bathroom
            </button>
          </div>
        </div>

        {/* Selected category bar and button */}
        <div className="flex justify-center items-center mb-4 mt-4">
          <div className="bg-orange-500 h-2 w-full rounded-full"></div>
          <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded ml-2">
            {selectedCategory.replace(/^./, (str) => str.toUpperCase())}
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {selectedImages.map((imageUrl, index) => (
            <div key={index} className="relative">
              <img
                alt={`gallery-${index}`}
                className="block h-full w-full rounded-lg object-cover object-center transition duration-300 transform hover:scale-105"
                src={imageUrl}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition duration-300">
                <p className="text-white font-semibold">View Details</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
