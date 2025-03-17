import React, { useState } from "react";
import axios from "axios";

const WholesaleContactForm = () => {
  const [formData, setFormData] = useState({
    businessName: "",
    businessType: "",
    zipCode: "",
    businessWebsite: "",
    cityState: "",
    businessAddress: "",
    contactName: "",
    positionTitle: "",
    emailAddress: "",
    phoneNumber: "",
    weeklyOrders: "",
    preferredFlavors: "",
    storageCapacity: "",
    offerReason: "",
    specificRequirements: "",
    howDidYouHear: "",
  });

  const BASE_URL = import.meta.env.VITE_BACKEND_URL; // Get the base URL from .env file


  const [success, setSuccess] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false); // Track form submission
  const [videoEnded, setVideoEnded] = useState(false); // Track if the video has ended

  const [errors, setErrors] = useState([]);
  const [successMessage, setSuccessMessage] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setSuccess(false);

    try {
      const response = await axios.post(
        `${BASE_URL}/api/mail/wholeSaleContact`,
        formData
      );
      setSuccess(true);
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        error(error);
        setErrors(["An error occurred. Please try again."]);
      }
    }
  };

  const handleVideoEnd = () => {
    setVideoEnded(true); // Once the video ends, update the state
    setIsSubmitted(false); // Reset the form submission state
  };

  const inputClasses =
    "w-full p-3 border border-dashed border-gray-600 text-base bg-white focus:border-solid focus:outline-none focus:border-black focus:ring-2 focus:ring-black focus:ring-opacity-10";
  const labelClasses = "block mb-2 font-medium font-montserrat";
  const requiredClasses = "text-red-500 ml-1";

  return (
    <div className="max-w-4xl p-4 mx-auto md:p-8 border border-black mb-16">
      <h1 className="md:text-5xl text-center mb-2 figtree-900 text-4xl">
        Contact Us
      </h1>
      <h2 className=" md:text-5xl text-gray-600  text-center mb-8 figtree-700 text-3xl">
        Wholesale
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Business Info Section */}
        <div className="p-4">
          <h3 className="text-lg font-semibold italic underline mb-2 font-montserrat">
            Business Info
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
            <div className="mb-2">
              <label className={labelClasses}>
                Business Name<span className={requiredClasses}>*</span>
              </label>
              <input
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                placeholder="Cheese Cake by battle LLC"
                className={inputClasses}
                required
              />
            </div>

            <div className="mb-2">
              <label className={labelClasses}>
                Business Type<span className={requiredClasses}>*</span>
              </label>
              <select
                name="businessType"
                value={formData.businessType}
                onChange={handleChange}
                className={inputClasses}
                required
              >
                <option value="">Select your option</option>
                <option value="retail">Retail</option>
                <option value="wholesale">Wholesale</option>
                <option value="distributor">Distributor</option>
              </select>
            </div>

            <div className="mb-2">
              <label className={labelClasses}>
                Zip Code<span className={requiredClasses}>*</span>
              </label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                placeholder="10002"
                className={inputClasses}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
            <div className="mb-2">
              <label className={labelClasses}>
                Business Website<span className={requiredClasses}>*</span>
              </label>
              <input
                type="url"
                name="businessWebsite"
                value={formData.businessWebsite}
                onChange={handleChange}
                placeholder="www.company.com"
                className={inputClasses}
                required
              />
            </div>

            <div className="mb-2">
              <label className={labelClasses}>
                City, State<span className={requiredClasses}>*</span>
              </label>
              <input
                type="text"
                name="cityState"
                value={formData.cityState}
                onChange={handleChange}
                placeholder="New York, NY"
                className={inputClasses}
                required
              />
            </div>
          </div>

          <div className="mb-2">
            <label className={labelClasses}>
              Business Address<span className={requiredClasses}>*</span>
            </label>
            <input
              type="text"
              name="businessAddress"
              value={formData.businessAddress}
              onChange={handleChange}
              placeholder="1234 Mount Everest St."
              className={inputClasses}
              required
            />
          </div>
        </div>

        {/* Contact Info Section */}
        <div className="mb-2 p-4">
          <h3 className="text-lg font-semibold italic underline mb-2">
            Contact Info
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
            <div className="mb-2">
              <label className={labelClasses}>
                Contact Name<span className={requiredClasses}>*</span>
              </label>
              <input
                type="text"
                name="contactName"
                value={formData.contactName}
                onChange={handleChange}
                placeholder="Michael Jackson"
                className={inputClasses}
                required
              />
            </div>

            <div className="mb-2">
              <label className={labelClasses}>
                Position/Title<span className={requiredClasses}>*</span>
              </label>
              <input
                type="text"
                name="positionTitle"
                value={formData.positionTitle}
                onChange={handleChange}
                placeholder="CEO / Founder"
                className={inputClasses}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-2">
              <label className={labelClasses}>
                Email Address<span className={requiredClasses}>*</span>
              </label>
              <input
                type="email"
                name="emailAddress"
                value={formData.emailAddress}
                onChange={handleChange}
                placeholder="Michael@company.com"
                className={inputClasses}
                required
              />
            </div>

            <div className="mb-2">
              <label className={labelClasses}>
                Phone Number<span className={requiredClasses}>*</span>
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="1 234 5678"
                className={inputClasses}
                required
              />
            </div>
          </div>
        </div>

        {/* Order Details Section */}
        <div className="mb-2 p-4">
          <h3 className="text-lg font-semibold italic underline mb-2">
            Order Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
            <div className="mb-2">
              <label className={labelClasses}>
                Estimated Weekly Orders
                <span className={requiredClasses}>*</span>
              </label>
              <input
                type="text"
                name="weeklyOrders"
                value={formData.weeklyOrders}
                onChange={handleChange}
                placeholder="Range (1 - 9) / n/a if not sure"
                className={inputClasses}
                required
              />
            </div>

            <div className="mb-2">
              <label className={labelClasses}>
                Preferred Flavors (if known)
              </label>
              <input
                type="text"
                name="preferredFlavors"
                value={formData.preferredFlavors}
                onChange={handleChange}
                placeholder="List your preferred flavors"
                className={inputClasses}
              />
            </div>
          </div>

          <div className="mb-2">
            <label className={labelClasses}>
              Storage Capacity for Cheesecake
              <span className={requiredClasses}>*</span>
            </label>
            <input
              type="text"
              name="storageCapacity"
              value={formData.storageCapacity}
              onChange={handleChange}
              placeholder="E.g. refrigeration space, freezer space / n/a for nothing yet"
              className={inputClasses}
              required
            />
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="mb-2 p-4">
          <h3 className="text-lg font-semibold italic underline mb-2">
            Additional Info
          </h3>

          <div className="mb-2">
            <label className={labelClasses}>
              Why would you like to offer Cheesecakes By Battle in your
              business?<span className={requiredClasses}>*</span>
            </label>
            <input
              name="offerReason"
              value={formData.offerReason}
              onChange={handleChange}
              placeholder="2 - 4 lines"
              className={`${inputClasses}`}
              required
            />
          </div>

          <div className="mb-2">
            <label className={labelClasses}>
              Any specific requirements or requests?
            </label>
            <input
              name="specificRequirements"
              value={formData.specificRequirements}
              onChange={handleChange}
              placeholder="2 - 4 lines"
              className={`${inputClasses}`}
            />
          </div>

          <div className="mb-2">
            <label className={labelClasses}>
              How did you hear about us?
              <span className={requiredClasses}>*</span>
            </label>
            <input
              type="text"
              name="howDidYouHear"
              value={formData.howDidYouHear}
              onChange={handleChange}
              placeholder="Friends, Online, Neighborhood..."
              className={inputClasses}
              required
            />
          </div>
        </div>

        <div className="flex justify-center">
          {success && !videoEnded ? (
            <div className="w-20 h-10 bg-black rounded-[4px] flex items-center justify-center">
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
 px-6 rounded-[4px] montserrat-400 md:px-8 py-2 md:py-3 bg-black text-white text-base md:text-lg font-medium flex items-center gap-2 hover:bg-[rgba(0,0,0,0.03)] hover:text-black transition-colors"
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
        {errors.length > 0 && (
          <div className="mt-4">
            <h3 className="text-red-600">Errors:</h3>
            <ul>
              {errors.map((error, index) => (
                <li key={index} className="text-red-600">
                  {error}
                </li>
              ))}
            </ul>
          </div>
        )}
        {successMessage && (
          <div className="mt-4 text-green-600">{successMessage}</div>
        )}
      </form>
    </div>
  );
};

export default WholesaleContactForm;
