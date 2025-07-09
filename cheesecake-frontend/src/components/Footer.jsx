import React from "react";

export const Footer = () => {
  return (
    <footer className="flex flex-col items-center gap-12 sm:gap-16 relative ">
      {/* Footer Main Content */}
      <div className="px-4 sm:px-8 flex flex-col items-center gap-12 sm:gap-16 w-full">
        <div className="text-center text-3xl sm:text-6xl lg:text-8xl text-black figtree-900">
          The End.
        </div>

        <div className="w-full flex flex-col md:flex-row gap-10 md:gap-0 md:justify-center justify-between items-baseline">
          {/* Left Section */}
          <div className="flex flex-col items-start gap-6 sm:gap-8 w-full md:w-1/3">
            <div className="text-xl sm:text-2xl lg:text-3xl figtree-700 text-main">
              Cheese Cakes By Battle
            </div>
            <p className="text-base sm:text-lg text-black montserrat-400">
              Check our menu or follow us on social media to see our current
              offerings.
            </p>
            <div className="flex gap-4 sm:gap-6 text-base sm:text-lg">
              <a
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-600 font-bold montserrat-500"
              >
                Instagram
              </a>
              <span>-</span>
              <a
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-600 montserrat-500 font-bold"
              >
                Facebook
              </a>
            </div>
          </div>

          {/* Middle Section */}
          <div className="flex flex-col items-center gap-6 sm:gap-8 w-full md:w-1/3 justify-center">
            <div className="text-xl sm:text-2xl lg:text-3xl text-main figtree-700">
              Quick Links
            </div>
            <div className="flex flex-col gap-3 sm:gap-4 items-center">
              <div className="flex justify-center font-bold gap-4 sm:gap-6 text-base sm:text-lg">
                <a href="/" className="hover:text-gray-600 montserrat-400">
                  Home
                </a>
                <a href="/pickup" className="hover:text-gray-600 montserrat-400">
                  Pick Up
                </a>
                <a href="/catering" className="hover:text-gray-600 montserrat-400">
                  Catering
                </a>
                <a href="/partner" className="hover:text-gray-600 montserrat-400">
                  Partner
                </a>
              </div>
              <div className="font-bold flex justify-center gap-4 sm:gap-6 text-base sm:text-lg">
                <a href="/ourstory" className="hover:text-gray-600 montserrat-400">
                  Our Story
                </a>
                <a href="/merch" className="hover:text-gray-600 montserrat-400">
                  Merch
                </a>
                <a href="/contact" className="hover:text-gray-600 montserrat-400">
                  Contact
                </a>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex flex-col items-end gap-6 sm:gap-4 w-full md:w-1/3">
            <div className="figtree-700 text-xl sm:text-2xl lg:text-3xl text-main">
              Contact Us
            </div>
            <div className="text-base sm:text-lg text-black text-right montserrat-500">
              {/* <div>Phone: +1 234 5678</div> */}
              <div className="mt-2">Contact@CCByBattle.com</div>
            </div>
            <div className="figtree-700 text-xl sm:text-2xl lg:text-3xl text-main">
              opening hours
            </div>
            <div className="text-base sm:text-lg text-black text-right montserrat-500">
              <div>Saturday 12pm-5pm</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="w-full bg-main text-white sm:py-2 flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-3 sm:gap-0 px-4 sm:px-48 mt-6 sm:mt-8">
        <p className="text-sm sm:text-lg text-center sm:text-left">
          <span className="montserrat-500 ">Copyright © 2024 </span>
          <span className="montserrat-700">Cheese Cakes By Battle</span>
        </p>
        <p className="text-sm sm:text-lg text-center sm:text-left">
          <span className="montserrat-500">Powered By </span>
          <span className="montserrat-700"><a href="https://techgrus.com">techgrus</a></span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
