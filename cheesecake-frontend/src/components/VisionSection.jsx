import React from "react";

const VisionSection = () => {
  const visionItems = [
    { title: "Trust", color: "bg-[#e6f1ff]", rotate: "-rotate-2",content:"At Cheesecakes By Battle, trust is the foundation of everything we do. From the ingredients we use to the care we put into every cheesecake, you can count on us to deliver products that exceed your expectations every time." },
    { title: "Taste", color: "bg-[#ffe6f5]", rotate: "rotate-2", content:"Taste is at the heart of our mission. Each cheesecake is carefully crafted to deliver bold, memorable flavors and the perfect balance of sweetness and creaminess in every bite." },
    { title: "Quality", color: "bg-[#e6f1ff]", rotate: "-rotate-2", content:"We take pride in our commitment to quality. From sourcing premium ingredients to refining our techniques, we ensure every cheesecake reflects the highest level of craftsmanship and care." },
    { title: "Standard", color: "bg-[#ffe6f5]", rotate: "rotate-2" , content:"Our standard is excellence. We hold ourselves to the highest level of precision, ensuring every cheesecake meets the same level of perfection that our customers have come to love and trust."},
  ];

  return (
    <div className="w-full px-4 max-w-[1368px] mx-auto flex flex-col items-center gap-[15px] mb-24">
      <h2 className="text-black md:text-[64px] text-[48px] figtree-900">
        Our Vision
      </h2>
      <div className="flex flex-col items-center gap-5">
        <p className="max-w-[1012px] text-center text-black/70 montserrat-400 md:text-xl text-lg">
          At Cheesecakes By Battle, we craft more than desserts—we create
          unforgettable experiences. Blending tradition with innovation, our
          goal is to bring handcrafted cheesecakes to homes nationwide while
          staying true to comforting, beloved flavors.
          <br></br>
          <br></br>
          With a commitment to quality, community, and creativity, we aim to
          inspire others to pursue their dreams and elevate the art of
          cheesecake-making, one bite at a time.{" "}
        </p>
        <div className="flex flex-wrap justify-center">
          {visionItems.map((item, index) => (
            <div
              key={index}
              className={`${item.rotate} rounded-sm flex flex-col items-center gap-2.5 overflow-hidden w-[264px]`}
            >
              <div className={`shadow-[0px_2px_10px_0px_rgba(0,0,0,0.10)]  p-6 text-center ${
              index % 2 === 0 ? " bg-blue-100" : "bg-pink-100"
            }`}>
                <h3 className="text-black text-lg md:text-xl montserrat-600 ">
                  {item.title}
                </h3>
                <p className=" text-black/80 montserrat-400 text-sm md:text-lg">
                  {item.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VisionSection;
