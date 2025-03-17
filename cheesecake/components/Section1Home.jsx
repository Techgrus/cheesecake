import Button from "@/components/Button";
import hb from "@/public/hamburger.png";
import Image from "next/image";
import { useState } from "react";
import Option from "./Option";
const Section1Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const order = () => { alert("heloooo Ahmed Snake!!!!!!!!!!!!!!") };
  return (
    <>
      <section
        style={{
          background:
            "radial-gradient(28.52% 50% at 50% 50%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.1) 100%)",
        }}
        className="h-[570px] w-full  "
      >
        <div className="w-full h-[102px] bg-pinkOverlay flex items-center pl-9">
          {/* Hamburger Icon */}
          <Image
            src={hb}
            alt="Hamburger Icon"
            width={45}
            height={27}
            onClick={toggleMenu}
            className="cursor-pointer"
          />

          {/* Header Text */}
          <div className="ml-4">
            <h3>HOME</h3>
          </div>

          {/* Menu */}
          {menuOpen && (
            <div className="absolute top-[102px] left-9 w-[283px] h-[303px]  bg-white shadow-lg flex flex-col items-start justify-around px-1 py-4 space-y-4">
              <div
                className="flex items-center cursor-pointer"
                onClick={toggleMenu}
              >
                <div className="cursor-pointer">
                  <Image src={hb} alt="Menu Icon" width={25} height={15} />
                </div>
                <p className="ml-4">Home</p>
              </div>

              <div
                className="flex items-center cursor-pointer"
                onClick={toggleMenu}
              >
                <div className="cursor-pointer">
                  <Image src={hb} alt="Menu Icon" width={25} height={15} />
                </div>
                <p className="ml-4">Pick Up</p>
              </div>

              <div
                className="flex items-center cursor-pointer"
                onClick={toggleMenu}
              >
                <div className="cursor-pointer">
                  <Image src={hb} alt="Menu Icon" width={25} height={15} />
                </div>
                <p className="ml-4">Catering</p>
              </div>
            </div>
          )}
        </div>
        <div className="h-full w-full flex flex-col items-center  relative">
          <div
            style={{
              background: "rgba(0, 0, 0, 0.9)",
              borderBottomLeftRadius: "16px",
              borderBottomRightRadius: "16px",
              backdropFilter: "blur(80px)",
            }}
            className="w-[671px] h-[42px] text-white flex items-center justify-center"
          >
            <p>We Only Offer Pickups - On Saturdays (10am - 10pm)</p>
          </div>
          <div className=" mt-[304px]  ">
            <Button onClick={order} txt="Order Now" br='100000000px' bg="rgba(0, 0, 0, 1)" color=' rgba(255, 255, 255, 1)' bc="rgba(0, 0, 0, 1)" w="228" h="60" />
          </div>
        </div>

      </section>
    </>
  )

}
export default Section1Home;