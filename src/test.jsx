import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import the AOS styles
import img1 from "../src/assets/Houses1.png";
import img2 from "../src/assets/House2.png";
import img3 from "../src/assets/Houses3.png";

import banner from "../src/assets/img/banner.jpg";

const Test = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

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
                  Finance
                </span>
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div className="relative max-w-7xl mx-auto p-6 bg-white ">
        <p
          className="text-lg md:text-xl text-center mb-8 text-justify text-gray-700"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Suvedi Homes, at suvedihomes.com, is dedicated to providing
          comprehensive assistance to customers seeking financial support for
          purchasing properties. With our new finance help page, we aim to
          bridge the gap between aspiring homeowners and financial stability. We
          cater to three distinct groups:
        </p>
        <div className="space-y-12">
          <div
            className="bg-white shadow-md rounded-lg p-6 flex flex-col md:flex-row items-center transition transform hover:shadow-lg hover:-translate-y-1"
            data-aos="fade-right"
          >
            <div className="md:w-1/2 p-4">
              <h2 className="text-2xl font-semibold mb-4">Individual Buyers</h2>
              <p className="text-gray-700 mb-2 text-justify">
                Through strategic partnerships with multiple banks and lenders,
                we connect our customers with a broad network to help finance
                their first or second home. We offer competitive interest rates,
                with a maximum of 5.99% for those with a credit score of 550 or
                higher. For customers with a credit score above 550 and a down
                payment of 3.5% or more, the interest rate will be lower based
                on the down payment amount and credit score.
              </p>

              <p className="text-gray-700 text-justify">
                Our minimum credit score requirement is 550, with a down payment
                of at least 3.5%. Additionally, individuals who directly
                approach us to build their new homes will receive exclusive discounts
                worth upto $12,000. We ensure a seamless and efficient experience
                for buyers, guiding them through the financial intricacies of purchasing a home.
              </p>
            </div>
            <div className="md:w-1/2 flex justify-center mt-4 md:mt-0">
              <img
                src={img1}
                alt="Individual Buyers Infographic"
                className="w-full md:w-3/4"
              />
            </div>
          </div>
          <div
            className="bg-white shadow-md rounded-lg p-6 flex flex-col md:flex-row items-center transition transform hover:shadow-lg hover:-translate-y-1"
            data-aos="fade-left"
          >
            <div className="md:w-1/2 flex justify-center mt-4 md:mt-0">
              <img
                src={img2}
                alt="Agents and Brokers Infographic"
                className="w-full md:w-3/4"
              />
            </div>
            <div className="md:w-1/2 p-4">
              <h2 className="text-2xl font-semibold mb-4">
                Agents and Brokers
              </h2>
              <p className="text-gray-700 mb-2 text-justify">
                We warmly welcome agents and brokers, recognizing their integral
                role in the home buying process. By collaborating with agents,
                we aim to streamline communication and facilitate smoother
                transactions for their clients.
              </p>
              <p className="text-gray-700 mb-2 text-justify">
                Agents can leverage our extensive network of lenders and
                exclusive discounts to provide enhanced services to their
                clients, ensuring mutually beneficial outcomes for all parties
                involved. We value our partnerships with agents and are
                committed to supporting their success in every way possible.
              </p>
            </div>
          </div>
          <div
            className="bg-white shadow-md rounded-lg p-6 flex flex-col md:flex-row items-center transition transform hover:shadow-lg hover:-translate-y-1"
            data-aos="fade-right"
          >
            <div className="md:w-1/2 p-4 bg-white">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Builders</h2>
              <p className="text-gray-700 mb-2 text-justify">
                For builders interested in purchasing lots from us, we offer
                special packages that include significant discounts based on the
                number of lots purchased at one time. To inquire about these
                exclusive offers, builders are encouraged to contact us using
                our contact form and check the attached PDF for more information
                on buying lots with discounts.
              </p>
              <p className="text-gray-700 text-justify">
                Disclaimer: Terms and conditions apply. Contact us for further
                details on eligibility and availability.
              </p>
              <a href="/plots" className="mt-4 inline-block text-green-600 font-bold hover:text-green-800 transition duration-300 ease-in-out">
                Check Lots
              </a>
            </div>

            <div className="md:w-1/2 flex justify-center mt-4 md:mt-0">
              <img
                src={img3}
                alt="Builders Infographic"
                className="w-full md:w-3/4"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test;
