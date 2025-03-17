import React from "react";
// import placeholderImage from '../assets/cakes.png';
const EventSection = ({ title, items }) => {
  return (
    <div className="w-full  flex flex-col md:mb-0 mb-12  gap-4">
      <h2 className="text-black text-[40px] md:text-[64px] figtree-900 mb-4">
        {title}
      </h2>
      <div className={`md:ml-12 ml-0 flex flex-col gap-4`}>
        {items.map((item, index) => (
          <div key={index} className="flex items-start gap-4">
            <img src="/assets/ellipse.svg" className="mt-2" />
            <div>
              <h3 className="text-black text-lg md:text-2xl montserrat-400">
                {item.title}
              </h3>
              <p className="text-black/70 mt-2 text-sm   md:text-xl montserrat-400">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const EventsAndCatering = () => {
  const eventItems = [
    {
      title: "Weddings",
      description:
        "The classic—you can't go wrong. Thick, soft, and packed with milk chocolate chips.",
    },
    {
      title: "Birthday Parties",
      description:
        "The classic—you can't go wrong. Thick, soft, and packed with milk chocolate chips.",
    },
    {
      title: "Graduation Ceremonies",
      description:
        "The classic—you can't go wrong. Thick, soft, and packed with milk chocolate chips.",
    },
    {
      title: "Private Events",
      description:
        "The classic—you can't go wrong. Thick, soft, and packed with milk chocolate chips.",
    },
  ];

  return (
    <>
      <div className="flex flex-col lg:flex-row items-start md:px-20 px-8  gap-2 lg:gap-8">
        {/* Left Section: Placeholder or Image */}
        <div className="w-full lg:w-[48%] h-[250px] sm:h-[300px] md:h-[387px] bg-pink-100 rounded-2xl border border-black flex items-center justify-center mt-6 md:mt-14">
          <img
            src="/assets/vector.svg"
            width="63.75px"
            height="63.75px"
            alt="Add Image"
            className="object-center"
          />
        </div>

        {/* Right Section: Events */}
        <div className="flex flex-col gap-6 md:gap-8 w-full lg:w-[48%]">
          <EventSection  title="Events We Cover" items={eventItems} />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-start md:px-20 px-8  gap-2 lg:gap-8">
        
        {/* Right Section: Events */}
        <div className="flex flex-col gap-6 md:gap-8 w-full lg:w-[48%]">
          <EventSection title="Catering Menu" items={eventItems} />
        </div>
        
        {/* Left Section: Placeholder or Image */}
        <div className="w-full lg:w-[48%] h-[250px] sm:h-[300px] md:h-[387px] bg-pink-100 rounded-2xl border border-black flex items-center justify-center mt-6 md:mt-14">
          <img
            src="/assets/vector.svg"
            width="63.75px"
            height="63.75px"
            alt="Add Image"
            className="object-center"
          />
        </div>

        
      </div>

      
    </>
  );
};

export default EventsAndCatering;
