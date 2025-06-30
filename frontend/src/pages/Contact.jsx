import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import NewsLetter from "../components/NewsLetter";
import React from "react";

const Contact = () => {
  return (
    <React.Fragment className="w-[95%]">
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>
      <div className="my-10  flex flex-col md:flex-row gap-10 mb-28">
        <img
          src={assets.contact_img}
          className="w-full md:max-w-[480px]"
          alt=""
        />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="text-xl font-semibold text-gray-600">Our Store</p>
          <p className="text-gray-500">
            54709 Willms Station <br /> Suite 350, Newyork, USA
          </p>
          <p className="text-gray-500">
            Contact Number: (415) 333-0321 <br />
            Email: admin@mindwithtrend.com
          </p>
          <p className="text-xl font-semibold text-gray-600">
            Careers at MindWithTrend
          </p>
          <p className="text-gray-500">Learn more about teams.</p>
          <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-300">
            Explore Jobs
          </button>
        </div>
      </div>
      <NewsLetter />
    </React.Fragment>
  );
};

export default Contact;
