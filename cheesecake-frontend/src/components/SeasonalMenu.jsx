// import React from "react";
// import { FaEye } from "react-icons/fa"; // Import the eye icon

// const SeasonalMenu = ({ menuItems = [] }) => {
//   // Set colors for alternating pattern
//   const getBackgroundColor = (index) => {
//     return index % 2 === 0 ? "bg-pink-100" : "bg-blue-100";
//   };

//   return (
//     <div className="container mx-auto px-4 py-8 mb-12">
//       {/* Header Section */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-black text-4xl md:text-6xl font-black font-['Figtree'] ml-3">
//           Seasonal Menu
//         </h1>
//         <div className="px-4 py-2 bg-pink-100 ">
//           <span className="text-black text-lg font-normal font-['Montserrat']">
//             From Sat (Nov 9 - 16)
//           </span>
//         </div>
//       </div>

//       {/* Menu Items Section */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//         {menuItems.length > 0 ? (
//           menuItems.map((item, index) => {
//             const bgColor = getBackgroundColor(index); // Apply alternating background color
//             return (
//               <div key={index} className="p-6 rounded-2xl">
//                 {/* Item Image with Border */}
//                 <div className={`mb-4 p-4 rounded-xl ${bgColor} border border-black`}>
//                   <img
//                     src={item.imageUrl || '/default-image.jpg'} // Placeholder image if no image URL is provided
//                     alt={item.name}
//                     style={{ width: "423px", height: "257px" }}
//                     className="object-cover rounded-xl"
//                   />
//                 </div>

//                 {/* Item Details */}
//                 <div className="mb-4">
//                   <h2 className="text-black text-2xl font-bold font-['Montserrat']">
//                     {item.name}
//                   </h2>
//                   <div className="flex items-center gap-2">
//                     <span className="text-black text-lg font-normal font-['Montserrat']">
//                       ${item.price}
//                     </span>
//                     {item.tags?.map((tag, idx) => (
//                       <div
//                         key={idx}
//                         className="px-2 py-1 bg-pink-100 rounded-md text-black text-sm font-normal font-['Montserrat']"
//                       >
//                         {tag}
//                         {tag === "Customize" && (
//                           <span className="text-red-500"> *</span>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Actions Section */}
//                 <div className="flex items-center gap-4">
//                   <button className="px-3 py-1 bg-black text-white rounded-md text-md font-medium font-['Montserrat'] flex items-center gap-2">
//                     Order Now
//                   </button>
//                   <FaEye className="text-gray-500" />
//                 </div>
//               </div>
//             );
//           })
//         ) : (
//           <p>No menu items available.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SeasonalMenu;

import React, { useContext, useState, useEffect } from "react";
import { FaEye } from "react-icons/fa"; // Import the eye icon
import { UserContext } from "../contexts/UserContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SeasonalMenu = ({ menuItems = [] }) => {
  const BASE_URL = import.meta.env.VITE_BACKEND_URL; // Get the base URL from .env file
  const { user, authenticatedFetch } = useContext(UserContext);

  // Set colors for alternating pattern
  const getBackgroundColor = (index) => {
    return index % 2 === 0 ? "bg-pink-100" : "bg-blue-100";
  };

  const order = async (id) => {
    if (!user) {
      toast.error("You must be logged in to add items to the cart.");
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
        toast.success("Product added to cart successfully!");
      } else {
        const data = await response.json();
        toast.error(data.message || "Failed to add product to cart.");
      }
    } catch (error) {
      toast.error(error.message || "Failed to add product to cart.");
    }
  };

  const getNextWeekFormattedDates = (days) => {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const today = new Date();
    const nextWeekStart = new Date(today);
    nextWeekStart.setDate(today.getDate() + (7 - today.getDay())); // Move to next week's Sunday

    let nextWeekDates = [];

    days.split(",").forEach((day) => {
      const dayIndex = daysOfWeek.indexOf(day.trim());
      if (dayIndex !== -1) {
        const date = new Date(nextWeekStart);
        const diff = dayIndex - nextWeekStart.getDay();
        date.setDate(nextWeekStart.getDate() + (diff >= 0 ? diff : diff + 7));
        nextWeekDates.push(date);
      }
    });

    nextWeekDates.sort((a, b) => a - b); // Sort dates in ascending order

    return formatDateRanges(nextWeekDates);
  };

  const formatDateRanges = (dates) => {
    let formattedDates = [];
    let start = null,
      end = null;

    dates.forEach((date, index) => {
      const currentDate = date.getDate();
      const nextDate = dates[index + 1] ? dates[index + 1].getDate() : null;
      const month = date.toLocaleString("en-US", { month: "long" });

      if (start === null) start = currentDate;
      if (nextDate === currentDate + 1) {
        end = nextDate;
      } else {
        if (end) {
          formattedDates.push(`${month} (${start} - ${end})`);
        } else {
          formattedDates.push(`${month} (${start})`);
        }
        start = end = null;
      }
    });

    return formattedDates;
  };

  const [pickupDates, setPickupDates] = useState([]);

  useEffect(() => {
    const fetchPickupDays = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/pick-up-days`);
        const data = await response.json();
        if (data?.value) {
          const formattedDates = getNextWeekFormattedDates(data.value);
          setPickupDates(formattedDates);
        }
      } catch (error) {
      }
    };

    fetchPickupDays();
  }, []);

 

  return (
    <div className="mt-32">
      <ToastContainer /> {/* Add ToastContainer here */}
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-black text-4xl md:text-6xl figtree-900">
          Seasonal Menu
        </h1>
        <div className="px-4 py-2 bg-pink-100 ">
          <span className="text-black text-lg font-normal font-['Montserrat']">
            {pickupDates}
          </span>
        </div>
      </div>
      {/* Menu Items Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:gap-10">
        {menuItems.length > 0 ? (
          menuItems.map((item, index) => {
            const bgColor = getBackgroundColor(index); // Apply alternating background color
            return (
              <div key={index} className="md:mb-0 mb-6 rounded-2xl">
                {/* Item Image with Border */}
                <div
                  className={`mb-4 p-4 rounded-xl ${bgColor} border border-black`}
                >
                  <img
                    src={item.imageUrl || "/default-image.jpg"} // Placeholder image if no image URL is provided
                    alt={item.name}
                    style={{ width: "423px", height: "257px" }}
                    className="object-cover rounded-xl"
                  />
                </div>

                {/* Item Details */}
                <div className="mb-4">
                  <h2 className="text-black md:text-2xl text-xl montserrat-700">
                    {item.name}
                  </h2>
                  <div className="flex items-center gap-2">
                    <span className="text-black md:text-lg text-sm montserrat-400 ">
                      ${item.price}
                    </span>
                    {item.tags?.map((tag, idx) => (
                      <div
                        key={idx}
                        className="px-2 py-1 bg-pink-100 rounded-md text-black text-sm font-normal font-['Montserrat']"
                      >
                        {tag}
                        {tag === "Customize" && (
                          <span className="text-red-500"> *</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions Section */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => order(item.id)}
                    className="p-2 bg-black text-white rounded-md md:text-lg text-sm montserrat-500 flex items-center gap-2"
                  >
                    Order Now
                  </button>
                  <img className="md:w-[37px] md:h-[37px] w-[35px] h-[20px]" src={"/assets/eye.png"} />
                </div>
              </div>
            );
          })
        ) : (
          <p>No menu items available.</p>
        )}
      </div>
    </div>
  );
};

export default SeasonalMenu;
