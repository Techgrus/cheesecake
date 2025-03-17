import React from "react";

const Inquiries = () => {
  return (
    <div className="w-[90%] md:w-[75%] mx-auto px-4 py-12 text-center">
      <h2 className="md:text-[96px] text-[64px]  font-black tracking-tight figtree-900 mb-6">
        For Inquiries
      </h2>
      <p className="text-lg md:text-xl montserrat-400 text-gray-700 mx-auto mb-6">
        Have questions, custom requests, or need more information about our
        cheesecakes? We’re here to help! Whether you’re looking to place a
        catering order, resolve an issue, or partner with us, simply fill out
        the form below and we’ll get back to you as soon as possible.
        <br></br>
        <i>You can also reach us directly via <u>Email.</u></i> 
        <br></br>
        <br></br>
        <i>We look forward to hearing
        from you and making your cheesecake experience unforgettable!</i>
      </p>
      <div className="flex justify-center montserrat-500 text-lg md:text-xl items-center gap-4 ">
        <a href="#" className="hover:underline">
          Instagram
        </a>
        <span>-</span>
        <a href="#" className="hover:underline">
          Email
        </a>
      </div>
    </div>
  );
};

export default Inquiries;
