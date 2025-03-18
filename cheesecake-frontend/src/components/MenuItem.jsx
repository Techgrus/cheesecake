import React, { useState, useContext, useEffect, useRef } from "react";
import Button from "./Button";
import { UserContext } from "../contexts/UserContext";

// TODO: seasonal menue

const MenuItem = ({ id, countId, heading, text, bg, img }) => {
  const { user, authenticatedFetch } = useContext(UserContext);
  const BASE_URL = import.meta.env.VITE_BACKEND_URL; // Get the base URL from .env file

  const [isHovered, setIsHovered] = useState(false);

  // Dynamic background class
  const bgClass = bg === "blueOverlay" ? "bg-blueOverlay" : "transparent";

  // Order function (async call)
  const order = async () => {
    if (!user) {
      const loginConfirmed = window.confirm(
        "You must be logged in to add items to the cart. Click OK to log in."
      );
      if (loginConfirmed) {
        window.location.href = "/auth"; // Replace with your actual login page URL
      }
      return;
    }
    try {
      const response = await authenticatedFetch(
        `${BASE_URL}/api/cart/addItem`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            product_id: id,
            quantity: 1,
          }),
        }
      );

      if (response.status === 201) {
        alert("Product added to cart successfully!");
      } else {
        const data = await response.json();
        alert(data.message || "Failed to add product to cart.");
      }
    } catch (error) {
      alert(error.message || "Failed to add product to cart.");
    }
  };

  const isOdd = countId % 2 === 1;

  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.7 } // Adjust this value to control when it triggers
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div
      style={{
        border: isHovered || isInView ? "0.89px solid #000000" : "0px",
        borderRadius: 30,
      }}
      className={`w-full min-h-[380px] flex flex-col transition-all duration-500 lg:flex-row justify-center items-center p-4 sm:p-6 lg:p-10 ${
        isHovered || isInView
          ? "bg-[url('/assets/Frame113.png')]"
          : "bg-transparent"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Mobile Layout (stacked) */}
      <div ref={sectionRef} className="lg:hidden w-full space-y-6">
        <div className="w-full flex justify-center items-center">
          {img && (
            <img
              className="w-full max-w-[340px] sm:max-w-[400px] h-auto object-contain"
              src={img}
              alt={heading}
            />
          )}
        </div>
        <div className="w-full flex flex-col justify-center items-center lg:items-start">
          <h1 className="text-3xl sm:text-5xl lg:text-[85px] figtree-700 text-center lg:text-left">
            {heading || "Default Heading"}
          </h1>
          <p className="mt-3 sm:mt-4 text-center font-montserrat lg:text-left">
            {text || "Default text content."}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 mt-4">
            <button
              style={{
                borderRadius: "6.6px",
                border: isInView ? "1px solid black" : "none",
              }}
              className="h-[50px] w-[156px] py-3 px-4 flex justify-center items-center text-sm sm:text-base transition-all duration-300 hover:opacity-90"
            >
              <p
                style={{
                  color: isInView ? "black" : "rgba(0, 0, 0, 1)",
                }}
                className="montserrat-500 text-xl"
              >
                Read More
              </p>
            </button>
            <button
              style={{
                background: isInView ? "rgba(0, 0, 0, 1)" : "transparent",
                borderRadius: "6.6px",
                border: isInView ? "1px solid black" : "none",
              }}
              className="h-[50px] w-[156px] p-3 flex justify-center items-center text-sm sm:text-base transition-all duration-300 hover:opacity-90"
              onClick={order}
            >
              <p
                style={{
                  color: isInView
                    ? "rgba(255, 255, 255, 1)"
                    : "rgba(0, 0, 0, 1)",
                }}
                className=" montserrat-500 text-xl"
              >
                Order Now
              </p>
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Layout (side by side) */}
      {isOdd ? (
        <>
          <div className="hidden lg:flex w-[50%] h-full px-5 justify-center items-center">
            {img && (
              <img
                className="max-w-[560px] w-full h-[340px] object-contain"
                src={img}
                alt={heading}
              />
            )}
          </div>
          <div className="hidden lg:flex w-[50%] h-full px-5 flex-col justify-center">
            <h1 className="text-[85px] figtree-700 ">
              {heading || "Default Heading"}
            </h1>
            <p className="mt-5 montserrat-400 text-xl">
              {text || "Default text content."}
            </p>
            <div className="flex gap-5 mt-4">
              <button
                style={{
                  borderRadius: "6.6px",
                  border: isHovered ? "1px solid black" : "none",
                }}
                className="h-[50px] w-[156px] py-3 px-4 flex justify-center items-center text-sm sm:text-base transition-all duration-300 hover:opacity-90"
              >
                <p
                  style={{
                    color: isHovered ? "black" : "rgba(0, 0, 0, 1)",
                  }}
                  className="montserrat-500 text-xl"
                >
                  Read More
                </p>
              </button>
              <button
                style={{
                  background: isHovered ? "rgba(0, 0, 0, 1)" : "transparent",
                  borderRadius: "6.6px",
                  border: isHovered ? "1px solid black" : "none",
                }}
                className="h-[50px] w-[156px] p-3 flex justify-center items-center text-sm sm:text-base transition-all duration-300 hover:opacity-90"
                onClick={order}
              >
                <p
                  style={{
                    color: isHovered
                      ? "rgba(255, 255, 255, 1)"
                      : "rgba(0, 0, 0, 1)",
                  }}
                  className=" montserrat-500 text-xl"
                >
                  Order Now
                </p>
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="hidden lg:flex w-[50%] h-full px-5 flex-col justify-center">
            <h1 className="text-[85px] figtree-700">
              {heading || "Default Heading"}
            </h1>
            <p className="mt-5 montserrat-400 text-xl">
              {text || "Default text content."}
            </p>
            <div className="flex gap-5 mt-7">
              <button
                style={{
                  borderRadius: "6.6px",
                  border: isHovered ? "1px solid black" : "none",
                }}
                className="h-[50px] w-[156px] p-3 flex justify-center items-center text-sm sm:text-base transition-all duration-300 hover:opacity-90"
              >
                <p
                  style={{
                    color: isHovered ? "black" : "rgba(0, 0, 0, 1)",
                  }}
                  className="montserrat-500 text-xl"
                >
                  Read More
                </p>
              </button>
              <button
                style={{
                  background: isHovered ? "rgba(0, 0, 0, 1)" : "transparent",
                  borderRadius: "6.6px",
                  border: isHovered ? "1px solid black" : "none",
                }}
                className="h-[50px] w-[156px] p-3 flex justify-center items-center text-sm sm:text-base transition-all duration-300 hover:opacity-90"
                onClick={order}
              >
                <p
                  style={{
                    color: isHovered
                      ? "rgba(255, 255, 255, 1)"
                      : "rgba(0, 0, 0, 1)",
                  }}
                  className="montserrat-500 text-xl"
                >
                  Order Now
                </p>
              </button>
            </div>
          </div>
          <div className="hidden lg:flex w-[50%] h-full px-5 justify-center items-center">
            {img && (
              <img
                className="max-w-[560px] w-full h-[340px] object-contain"
                src={img}
                alt={heading}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default MenuItem;
