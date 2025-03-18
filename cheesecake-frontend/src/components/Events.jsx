import React from "react";
// import placeholderImage from '../assets/cakes.png';
const EventSection = ({ title, subTitle, items }) => {
  return (
    <div className="w-full  flex flex-col md:mb-0 mb-12  gap-4">
      <h2 className="text-black text-[40px] md:text-[64px] figtree-900">
        {title}
      </h2>
      <p className="text-black/70 mt-2 text-sm   md:text-xl montserrat-400 ">
        {subTitle}
      </p>
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
  const subTitle = "We specialize in providing premium cheesecakes for a variety of events, ensuring a memorable dessert experience for you and your guests."
  const eventItems = [
    {
      title: "Weddings",
      description:
        "Make your special day even sweeter with our elegant, handcrafted cheesecakes. Whether you prefer classic flavors or custom designs, we create stunning and delicious cheesecakes that complement your wedding theme perfectly.",
    },
    {
      title: "Birthday Parties",
      description:
        "Celebrate another year of life with a cheesecake that steals the show! From rich and creamy classics to fun and creative flavors, we offer options that cater to all ages and preferences.",
    },
    {
      title: "Graduation Ceremonies",
      description:
        "Honor your graduate’s achievements with a celebratory cheesecake. Our flavors and designs can be customized to match school colors, themes, or personal preferences, making it a unique and delicious part of the celebration.",
    },
    {
      title: "Private Events",
      description:
        "Hosting a corporate gathering, holiday party, or intimate get-together? Our cheesecakes add a touch of indulgence to any private event. Choose from our signature flavors or request a custom creation to match your event’s theme.",
    },
  ];

  return (
    <>
      <div className="flex flex-col lg:flex-row items-center md:px-20 px-8  gap-2 lg:gap-8">
        {/* Left Section: Placeholder or Image */}
        <div className="w-full lg:w-[48%] h-[250px] sm:h-[300px] md:h-[387px] lg:h-[711px] bg-main rounded-2xl border border-black flex items-center justify-center mt-6 md:mt-14">
          {/* TODO change svg color */}
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
          <EventSection  title="Events We Cover" subTitle={subTitle} items={eventItems} />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-start md:px-20 px-8  gap-2 lg:gap-8">
        
        {/* Right Section: Events */}
        {/* <div className="flex flex-col gap-6 md:gap-8 w-full lg:w-[48%]">
          <EventSection title="Catering Menu" items={eventItems} />
        </div> */}
        
        {/* Left Section: Placeholder or Image */}
        {/* <div className="w-full lg:w-[48%] h-[250px] sm:h-[300px] md:h-[387px] bg-pink-100 rounded-2xl border border-black flex items-center justify-center mt-6 md:mt-14">
          <img
            src="/assets/vector.svg"
            width="63.75px"
            height="63.75px"
            alt="Add Image"
            className="object-center"
          />
        </div> */}

        
      </div>

      
    </>
  );
};

export default EventsAndCatering;
