import React from "react";
import { FaCalendarAlt } from "react-icons/fa"; // Import calendar icon
import { HiLocationMarker } from "react-icons/hi"; // Use HiLocationMarker for location dot

const Line = () => {
  

  return (
    <div className="flex flex-col sm:flex-row justify-start items-start sm:items-center gap-4 sm:gap-[30px]">
      {/* First Section - Pick Up By */}
      <div className="flex items-center flex-wrap gap-[5px]">
        <img src="/assets/calender.svg" alt="calendar icon" className="w-6 h-6" />
        <div className="text-black text-xl md:text-2xl font-bold font-['Montserrat']">
          Pick Up By
        </div>
        <div className="text-black text-xl md:text-2xl font-normal font-['Montserrat']">
          - Saturday 17th
        </div>
      </div>
  
      {/* Second Section - Address */}
      <div className="flex items-center flex-wrap gap-[5px]">
      <img src="/assets/location.svg" alt="calendar icon" className="w-6 h-6" />

        <div className="text-black text-xl md:text-2xl font-bold font-['Montserrat']">
          954 Lincoln Wy
        </div>
        <div>
          <span className="text-black text-xl md:text-2xl font-normal font-['Montserrat']">
            -{" "}
          </span>
          <span className="text-black text-xl md:text-2xl font-normal font-['Montserrat'] underline cursor-pointer hover:text-gray-700">
            Get Directions
          </span>
        </div>
      </div>
    </div>
  );

};

export default Line;
