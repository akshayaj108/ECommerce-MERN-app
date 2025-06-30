import React from "react";
import { assets } from "../assets/frontend_assets/assets";

const Footer = () => {
  const footerTextStyle = "text-xl font-medium mb-5";
  const footerULStyle = "flex flex-col gap-1 text-gray-600";
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <img src={assets.logo} className="mb-5 w-32" />
          <p className="w-full md:w-2/3 text-gray-600">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Voluptatum, ratione?
          </p>
        </div>
        <div>
          <p className={footerTextStyle}>COMPANY</p>
          <ul className={footerULStyle}>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div>
          <p className={footerTextStyle}>GET IN TOUCH</p>
          <ul className={footerULStyle}>
            <li>+91 212-456-1930</li>
            <li>support@mind.com</li>
          </ul>
        </div>
      </div>
      <div>
        <hr className="text-gray-300" />
        <p className="py-5 text-sm text-center">
          Copyright 2025@ MindWithTend.com - All Right Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
