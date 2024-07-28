import React from "react";
import LogoImage from "../../assets/logo/gharghaderi.png"; // Import your logo image

const Footer = () => {
  return (
    <>
      <footer
        style={{ backgroundColor: "#262626" }}
        className="flex flex-col items-center bg-zinc-50 text-center text-white dark:bg-neutral-700 dark:text-white"
      >
        <div className="container pt-9">
          {/* Image and Paragraph */}
          <div className="flex items-center justify-center mb-4">
            <img src={LogoImage} alt="Logo" className="w-18 h-20 mr-2" />
          </div>
          {/* Social Media Icons */}
          <div className="mb-6 flex justify-center space-x-2">
            <a href="#" target="_blank" className="text-white">
              <i className="fa fa-facebook-f"></i>
            </a>
            <a href="#" className="text-white">
              <i className="fa fa-linkedin"></i>
            </a>
            <a href="#" className="text-white">
              <i className="fa fa-twitter"></i>
            </a>
            <a href="#" className="text-white">
              <i className="fa fa-instagram"></i>
            </a>
            <a href="#" className="text-white">
              <i className="fa fa-youtube"></i>
            </a>
          </div>
          <p className="text-white text-sm">
            <strong>Ghar Ghaderi Pvt. Ltd</strong>
          </p>
          <p>Email: gharghaderi@gmail.com | Phone no: +977 9812345678</p>
        </div>

        <div className="w-full bg-black/5 p-4 text-center">
          © 2023 Copyright:
          <a
            href="https://greenmantis.com.np"
            className="text-white ml-2"
            target="_blank"
          >
            GharGhaderi
          </a>
        </div>
      </footer>
    </>
  );
};

export default Footer;
