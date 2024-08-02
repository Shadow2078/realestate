import React, { useEffect, useState } from "react";
import AOS from "aos";
import backgroundImage from "../assets/img/Background.png"; // Import your background image
import banner from "../assets/img/banner.jpg"; // Import your background image
import mission from "../assets/img/1.png";
import vision from "../assets/img/2.png";
import value from "../assets/img/3.png";
import { getAboutInfoApi } from '../Apis/apis';

const Mission = () => {
  const [aboutInfo, setAboutInfo] = useState({
    paragraph: '',
    objective1: '',
    objective2: '',
    objective3: ''
  });

  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: 200,
    });
    fetchAboutInfo();
  }, []);

  const fetchAboutInfo = async () => {
    try {
      const response = await getAboutInfoApi();
      setAboutInfo(response.data);
    } catch (error) {
      console.error('Failed to fetch about information:', error);
    }
  };

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

      <div id="about" className="relative bg-white overflow-hidden ">
        <div className="max-w-7xl mx-auto ">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <svg
              className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
              fill="currentColor"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polygon points="50,0 100,0 50,100 0,100"></polygon>
            </svg>

            <div className="pt-1"></div>

            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28 ">
              <div className="sm:text-center lg:text-left">
                <h2 className="my-6 text-2xl tracking-tight font-extrabold text-gray-900 sm:text-3xl md:text-4xl">
                  About Us
                </h2>
                <p className="text-justify lg:mr-12">
                  {aboutInfo.paragraph}
                </p>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover object-top sm:h-72 md:h-96 lg:w-full lg:h-full"
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
                {aboutInfo.objective1}
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
                {aboutInfo.objective2}
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
                {aboutInfo.objective3}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Mission;
