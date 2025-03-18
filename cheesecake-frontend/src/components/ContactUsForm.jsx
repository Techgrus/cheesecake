import React, { useState } from "react";
import axios from "axios";

const ContactUs = ({ className }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    reason: "",
    message: "",
  });

  const BASE_URL = import.meta.env.VITE_BACKEND_URL; // Get the base URL from .env file
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false); // Track form submission
  const [videoEnded, setVideoEnded] = useState(false); // Track if the video has ended

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleReasonChange = (reason) => {
    setFormData((prevState) => ({
      ...prevState,
      reason,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setSuccess(false);
    setIsSubmitted(true); // Set submission 

    try {
      const response = await axios.post(
        `${BASE_URL}/api/mail/contactUs`,
        formData
      );
      setSuccess(true);
    } catch (error) {
      if (error.response && error.response.data.message) {
        setErrors([error.response.data.message]);
      } else {
        setErrors(["An error occurred. Please try again."]);
        setIsSubmitted(false); // Reset the form submission state
      }
    }
  };

  const handleVideoEnd = () => {
    setVideoEnded(true); // Once the video ends, update the state
    setIsSubmitted(false); // Reset the form submission state
  };

  return (
    <div
      className={`w-full max-w-[1058px] mx-auto p-4 md:p-8 bg-main shadow rounded-2xl ${className} mb-12 md:mb-28`}
    >
      <h1 className="text-center text-white text-[28px] sm:text-[48px] md:text-[64px] figtree-900 mb-6 md:mb-8">
        Contact Us
      </h1>
      <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
        {/* Name Input */}
        <div>
          <label
            htmlFor="name"
            className="block text-white text-base sm:text-lg md:text-xl montserrat-400 mb-2"
          >
            Name: <span className="text-red-600">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 md:px-4 py-2 md:py-3 border-dashed border-2 text-white border-white text-base bg-transparent"
            required
          />
        </div>

        {/* Email Input */}
        <div>
          <label
            htmlFor="email"
            className="block text-white text-base sm:text-lg md:text-xl font-normal font-['Montserrat'] mb-2"
          >
            Email: <span className="text-red-600">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 md:px-4 py-2 md:py-3 border-dashed border-2 text-white border-white bg-transparent text-base"
            required
          />
        </div>

        {/* Reason of Contact */}
        <div>
          <label className="block text-white text-base sm:text-lg md:text-xl font-normal font-['Montserrat'] mb-2">
            Reason of Contact: <span className="text-red-600">*</span>
          </label>
          <div className="flex flex-wrap gap-2 md:gap-4">
            {["Catering", "Retail", "Order Issue"].map((reason) => (
              <button
                key={reason}
                type="button"
                className={`px-3 md:px-4 py-2 md:py-3 bg-white/5 text-white  montserrat-400 border-2 border-white  text-sm sm:text-base whitespace-nowrap
                  ${
                    formData.reason === reason
                      ? "border-solid "
                      : "border-dashed"
                  }`}
                onClick={() => handleReasonChange(reason)}
              >
                {reason}
              </button>
            ))}
          </div>
        </div>

        {/* Message Input */}
        <div>
          <label
            htmlFor="message"
            className="block text-white text-base sm:text-lg md:text-xl font-normal font-['Montserrat'] mb-2"
          >
            Your Message: <span className="text-red-600">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full px-3 md:px-4 py-2 md:py-3 border-dashed border-2 border-white bg-transparent text-white text-base min-h-[120px]"
            required
          />
        </div>

        {/* Submit Button / Video */}
        <div className="flex justify-center pt-2">
          {success && !videoEnded ? (
            <div className="w-20 h-10 bg-white rounded-[4px] flex items-center justify-center">
              <video
                width="35"
                height="1000"
                autoPlay
                muted
                onEnded={handleVideoEnd}
              >
                <source src="/assets/submit.webm" type="video/webm" />
              </video>
            </div>
          ) : (
            !isSubmitted && (
              <button
                type="submit"
                className="border border-black
 px-6 rounded-[4px] montserrat-500 md:px-8 py-2 md:py-3 bg-white text-black text-base md:text-lg font-medium flex items-center gap-2 hover:bg-white/80 hover:text-black transition-colors"
              >
                Submit
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 md:size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                  />
                </svg>
              </button>
            )
          )}
        </div>

        {/* Error Messages */}
        {errors.length > 0 && (
          <div className="mt-4">
            <h3 className="text-red-600 font-medium">Errors:</h3>
            <ul className="list-disc pl-5">
              {errors.map((error, index) => (
                <li key={index} className="text-red-600 text-sm md:text-base">
                  {error}
                </li>
              ))}
            </ul>
          </div>
        )}
      </form>
    </div>
  );
};

export default ContactUs;
