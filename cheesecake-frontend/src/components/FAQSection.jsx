import React, { useState } from "react";

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isHoverd, setIsHovered] = useState(false);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const [hoveredIndex, setHoveredIndex] = useState(null);

  const faqItems = [
    {
      question: "What types of cheesecakes do you offer?",
      answer:
        "We offer a wide range of flavors, including classic favorites, seasonal options, and unique specialty flavors. Check our menu or follow us on social media to see our current offerings.",
      isFirst: true, // Mark this FAQ as the first one
    },
    {
      question: "Do you offer gluten-free options?",
      answer:
        "Yes, we have several gluten-free cheesecake options available. Please ask our staff for current gluten-free selections.",
      isFirst: false,
    },
    {
      question: "Can I place a custom order?",
      answer:
        "We accept custom orders with at least 48 hours notice. Contact us directly to discuss your requirements.",
      isFirst: false,
    },
    {
      question: "Check Google Drive For FAQ",
      answer:
        "For additional frequently asked questions, please refer to our comprehensive FAQ guide on Google Drive.",
      isFirst: false,
    },
  ];

  return (
    <div className="w-full max-w-full mx-auto p-6">
      {/* Fixed Heading */}
      <div className="mt-16 top-0 left-0 figtree-900 text-black text-4xl sm:text-6xl lg:text-8xl tracking-[0] leading-[normal]">
        Frequently Asked
        <br />
        Questions
      </div>

      {/* FAQ items */}
      <div className="space-y-4 mt-16">
        {faqItems.map((item, index) => (
          <div
            key={index}
            className={`${
              hoveredIndex === index ? "bg-[#0072ff1a]" : "bg-white"
            } rounded-[10px] border-[0.84px] border-solid border-black px-4 sm:px-6 py-4 transition-all figtree-700`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div
              onClick={() => toggleAccordion(index)}
              className="flex justify-between items-center cursor-pointer"
            >
              {/* Question */}
              {/* [font-family:'Figtree-Bold',Helvetica] */}
              <p
                className={`
                text-black
                 text-[20px] sm:text-[24px] lg:text-[26px] figtree-700`}
              >
                {item.question}
              </p>
              {/* Arrow icon (using Tailwind transition classes) */}
              <img
                className="transition-all duration-300"
                src={`/assets/${
                  activeIndex === index ? "arrowUp.svg" : hoveredIndex === index ? "arrowDownSolid.svg" : "arrowDownDashed.svg"
                }`}
              />
            </div>

            {/* Answer (only visible when active) */}
            {activeIndex === index && (
              <p className="mt-2 text-xl sm:text-[18px] lg:text-xl text-[#000000b2] montserrat-400">
                {item.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
