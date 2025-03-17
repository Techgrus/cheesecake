import React, { useState, useEffect, useContext, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import UserProfileIcon from "./UserProfileicon";
import { ShoppingCart } from "react-feather";
import { UserContext } from "../contexts/UserContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HeaderTest = () => {
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const location = useLocation();
  const { user } = useContext(UserContext);

  const menuItems = new Map([
    ["/home", "HOME"],
    ["/pickup", "PICK UP"],
    ["/catering", "CATERING"],
    ["/partner", "PARTNER"],
    ["/ourstory", "OUR STORY"],
    ["/merch", "MERCH"],
    ["/contact", "CONTACT"],
  ]);

  if (user?.isAdmin) {
    menuItems.set("/backend", "ADMIN DASHBOARD");
  }

  const picItems = new Map([
    ["/home", "home.png"],
    ["/catering", "catering.png"],
    ["/ourstory", "story.png"],
  ]);

  const imagePosItems = new Map([
    ["/home", "object-[0px_90px]"],
    ["/catering", "object-[0px_-40px]"],
    ["/ourstory", "object-[0px_-567px]"],
  ]);

  const mobileImagePosItems = new Map([
    ["/home", "object-[0px_50px]"],
    ["/catering", "object-[0px_-20px]"],
    ["/ourstory", "object-[0px_-40px]"],
  ]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { headerText, picture, imagePos } = useMemo(() => {
    return {
      headerText: menuItems.get(location.pathname) || "HOME",
      picture: picItems.get(location.pathname) || "",
      imagePos: (isMobile ? mobileImagePosItems : imagePosItems).get(location.pathname) || "",
    };
  }, [location.pathname, isMobile]);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className={`relative ${picture ? "h-auto" : "md:h-[144px] h-[112px]"}`}>
      <ToastContainer />
      <div className="w-full flex flex-col absolute z-10">
        <div className="relative shadow-md px-4 md:px-9 flex h-[70px] md:h-[102px] justify-between bg-lightgray bg-cover bg-no-repeat bg-[url('/assets/header_bg.png')]">
          <div className="flex items-center">
            <img src="/assets/hamburger.svg" alt="Menu" className="cursor-pointer md:w-6 md:h-6 w-4 h-4" onClick={toggleMenu} />
            <div className="ml-2 md:ml-6">
              <h3 className="text-xl md:text-2xl font-semibold">{headerText}</h3>
            </div>
          </div>

          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-[10px] border border-white/50 bg-white/15 shadow-md backdrop-blur-sm">
            <Link to="/">
              <img src="/assets/Logo.png" className="md:w-20 md:h-20 w-14 h-14" width="80px" height="80px" alt="Logo"  />
            </Link>  
          
          </div>

          <div className="flex items-center space-x-2 md:space-x-4">
            <UserProfileIcon />
            {user && (
              <Link to="/cart">
                <ShoppingCart size={24} className="text-black cursor-pointer hover:text-gray-700 transition" />
              </Link>
            )}
          </div>

          {menuOpen && (
            <div className="absolute top-[70px] md:top-[102px] left-0 md:left-9 w-full md:w-[283px] bg-white shadow-lg flex flex-col items-start px-4 py-4 space-y-4 z-20 menu-container">
              {[...menuItems.entries()].map(([path, label]) => (
                <Link key={path} to={path} className="ml-4" onClick={toggleMenu}>
                  {label}
                </Link>
              ))}
            </div>
          )}
        </div>

        {location.pathname !== "/ourstory" && (
          <div
            style={{
              background: "#FFE6F5",
              borderBottomLeftRadius: "16px",
              borderBottomRightRadius: "16px",
              backdropFilter: "blur(80px)",
            }}
            className="w-[90%] p-2 md:w-[671px] md:h-[42px] h-[35px] text-black flex items-center justify-center mx-auto"
          >
            <p className="text-xs md:text-base text-center font-montserrat">
              We Only Offer Pickups - On Saturdays (10am - 10pm)
            </p>
          </div>
        )}
      </div>

      {picture && (
        <div className="md:h-[780px] h-[450px]">
          <img src={`/assets/${picture}`} className={`object-cover w-full h-full ${imagePos}`} alt="Page Background" />
        </div>
      )}
    </header>
  );
};

export default HeaderTest;
