import React, { useEffect } from "react";
import backgroundImage from "../assets/img/Background.png"; // Import your background image
import banner from "../assets/img/banner.jpg"; // Import your background image
import mission from "../assets/img/1.png";
import vision from "../assets/img/2.png";
import value from "../assets/img/3.png";
import AOS from "aos";

const Mission = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      offset: 200, // Offset (in px) from the top of the screen
    });
  }, []);
  return (
    <div style={{ backgroundColor: "#F4FAF0" }}>
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
                  Who are we?
                </span>
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div id="about" class="relative bg-white overflow-hidden ">
        <div class="max-w-7xl mx-auto ">
          <div class="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <svg
              class="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
              fill="currentColor"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polygon points="50,0 100,0 50,100 0,100"></polygon>
            </svg>

            <div class="pt-1"></div>

            <main class="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28 ">
              <div class="sm:text-center lg:text-left">
                <h2 class="my-6 text-2xl tracking-tight font-extrabold text-gray-900 sm:text-3xl md:text-4xl">
                  About Us
                </h2>
                <p className="text-justify lg:mr-12">
                  Welcome to Kathmandu Realty, your premier destination for real
                  estate solutions in the heart of Nepal's vibrant capital. Our
                  mission is to simplify the property search process and connect
                  you seamlessly with your dream home or ideal commercial space.
                  We offer an extensive and regularly updated database of
                  residential and commercial properties, including houses,
                  apartments, and office spaces, all across Kathmandu.
                </p>
                <br></br>
                <p className="text-justify lg:mr-12">
                  Our user-friendly interface allows you to explore listings
                  effortlessly, compare prices, and access detailed property
                  information. At Kathmandu Realty, we pride ourselves on
                  providing expert guidance, with our team of seasoned real
                  estate professionals ready to assist you through every step of
                  your journey, from property tours to negotiations. We
                  collaborate with reputable developers, property owners, and
                  agents to bring you verified listings and reliable
                  information, ensuring a secure and transparent experience.
                </p>
              </div>
            </main>
          </div>
        </div>
        <div class="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            class="h-56 w-full object-cover object-top sm:h-72 md:h-96 lg:w-full lg:h-full"
            src={backgroundImage}
            alt=""
          />
        </div>
      </div>
      <section className="py-16">
        <div className="text-center p-8">
          <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
            Objectives
          </h2>

          <div className="flex flex-wrap items-center mt-20 text-left text-center">
            <div className="w-full md:w-1/2 lg:w-3/5 px-4" data-aos="fade-up">
              <img src={mission} alt="mission" className="inline-block" />
            </div>
            <div className="w-full md:w-1/2 lg:w-2/5 px-4 text-center md:text-left lg:pl-12">
              <h3 className="font-bold mt-8 text-xl md:mt-0 sm:text-2xl">
                Our Mission
              </h3>
              <p className="sm:text-lg mt-6">
                Building quality homes for an inexpensive price so our customers
                feel pride in occupying it.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center mt-20 text-left text-center">
            <div className="w-full md:w-1/2 lg:w-3/5 px-4" data-aos="fade-up">
              <img src={vision} alt="vision" className="inline-block" />
            </div>
            <div className="w-full md:w-1/2 lg:w-2/5 px-4 md:order-first text-center md:text-left lg:pr-12">
              <h3 className="font-bold mt-8 text-xl md:mt-0 sm:text-2xl">
                Our Vision
              </h3>
              <p className="sm:text-lg mt-6">
                We envision a world where quality homes should be for all
                citizens at inexpensive prices.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center mt-20 text-left text-center">
            <div className="w-full md:w-1/2 lg:w-3/5 px-4" data-aos="fade-up">
              <img src={value} alt="values" className="inline-block" />
            </div>
            <div className="w-full md:w-1/2 lg:w-2/5 px-4 text-center md:text-left lg:pl-12">
              <h3 className="font-bold mt-8 text-xl md:mt-0 sm:text-2xl">
                Our Values
              </h3>
              <p className="sm:text-lg mt-6">
                We believe in honesty, quality, and trustworthiness for all
                individuals.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Mission;
