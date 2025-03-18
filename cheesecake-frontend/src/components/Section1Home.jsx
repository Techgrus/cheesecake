import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "./Button"; // Adjust the path according to where the Button component is located
import hb from "../assets/hamburger.svg"; // Adjust the path to your image

const Section1Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  

  const getHeaderText = () => {
    switch (location.pathname) {
      case "/":
        return "HOME";
      case "/pickup":
        return "PICK UP";
      case "/catering":
        return "CATERING";
      case "/partner":
        return "PARTNER";
      case "/ourstory":
        return "OUR STORY";
      case "/merch":
        return "MERCH";
      case "/contact":
        return "CONTACT";
      default:
        return "HOME";
    }
  };

  return (
    <>
      <section
        style={{
          background:
            "radial-gradient(28.52% 50% at 50% 50%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.1) 100%)",
        }}
        className="h-[570px] w-full relative"
      >
        <div className="w-full h-[102px] bg-pinkOverlay flex items-center pl-9 relative z-10">
          {/* Hamburger Icon */}
          <img
            src={hb}
            alt="Hamburger Icon"
            width={45}
            height={27}
            onClick={toggleMenu}
            className="cursor-pointer"
          />

          {/* Header Text */}
          <div className="ml-4">
            <h3>{getHeaderText()}</h3>
          </div>

          {/* Menu */}
          {menuOpen && (
            <div className="absolute top-[102px] left-9 w-[283px] h-[303px] bg-white shadow-lg flex flex-col items-start justify-around px-1 py-4 space-y-4 z-20">
              <div className="flex items-center cursor-pointer">
                <div className="cursor-pointer">
                  <img src={hb} alt="Menu Icon" width={25} height={15} />
                </div>
                <Link to="/" className="ml-4" onClick={toggleMenu}>
                  Home
                </Link>
              </div>

              <div className="flex items-center cursor-pointer">
                <div className="cursor-pointer">
                  <img src={hb} alt="Menu Icon" width={25} height={15} />
                </div>
                <Link to="/pickup" className="ml-4" onClick={toggleMenu}>
                  Pick Up
                </Link>
              </div>

              <div className="flex items-center cursor-pointer">
                <div className="cursor-pointer">
                  <img src={hb} alt="Menu Icon" width={25} height={15} />
                </div>
                <Link to="/catering" className="ml-4" onClick={toggleMenu}>
                  Catering
                </Link>
              </div>

              <div className="flex items-center cursor-pointer">
                <div className="cursor-pointer">
                  <img src={hb} alt="Menu Icon" width={25} height={15} />
                </div>
                <Link to="/partner" className="ml-4" onClick={toggleMenu}>
                  Partner
                </Link>
              </div>

              <div className="flex items-center cursor-pointer">
                <div className="cursor-pointer">
                  <img src={hb} alt="Menu Icon" width={25} height={15} />
                </div>
                <Link to="/ourstory" className="ml-4" onClick={toggleMenu}>
                  Our Story
                </Link>
              </div>

              <div className="flex items-center cursor-pointer">
                <div className="cursor-pointer">
                  <img src={hb} alt="Menu Icon" width={25} height={15} />
                </div>
                <Link to="/merch" className="ml-4" onClick={toggleMenu}>
                  Merch
                </Link>
              </div>

              <div className="flex items-center cursor-pointer">
                <div className="cursor-pointer">
                  <img src={hb} alt="Menu Icon" width={25} height={15} />
                </div>
                <Link to="/contact" className="ml-4" onClick={toggleMenu}>
                  Contact
                </Link>
              </div>
            </div>
          )}
        </div>
        <div className="h-full w-full flex flex-col items-center relative">
          <div
            style={{
              background: "#FFE6F5",
              borderBottomLeftRadius: "16px",
              borderBottomRightRadius: "16px",
              backdropFilter: "blur(80px)",
            }}
            className="w-[671px] h-[42px] text-white flex items-center justify-center"
          >
            <p>We Only Offer Pickups - On Saturdays (10am - 10pm)</p>
          </div>

          {location.pathname === "/catering" ? (
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-black text-8xl font-bold mt-150">We're Here</h1>
            </div>
          ) : (
            <div className="mt-[304px]">
              <Button
                onClick={order}
                txt="Order Now"
                br="100000000px"
                bg="rgba(0, 0, 0, 1)"
                color="rgba(255, 255, 255, 1)"
                bc="rgba(0, 0, 0, 1)"
                w="228"
                h="60"
              />
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Section1Home;
