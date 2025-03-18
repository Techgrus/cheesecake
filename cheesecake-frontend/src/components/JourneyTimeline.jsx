export default function JourneyTimeline() {
  const steps = [
    {
      number: 1,
      title: "The Beginning",
      description:
        "During the COVID-19 quarantine, Cheesecakes By Battle began as a hobby in Massillon, OH. Experimenting in the kitchen, I discovered a talent for making cheesecakes that friends, family, and neighbors loved, inspiring me to turn this passion into a business.",
    },
    {
      number: 2,
      title: "Growth & Success",
      description:
        "Starting from a small kitchen, I perfected recipes and grew a loyal customer base. Word-of-mouth and a commitment to quality fueled steady growth over the years.",
    },
    {
      number: 3,
      title: "A Turning Point",
      description:
        "On January 7, 2022, I married my wife, who became my biggest supporter. Her creativity and marketing skills helped expand our brand and offerings, elevating Cheesecakes By Battle to new heights.",
    },
    {
      number: 4,
      title: "Today’s Journey",
      description:
        "As a mechanical engineer by day, I bring precision and innovation to crafting cheesecakes. Cheesecakes By Battle is more than a business—it’s a story of passion, resilience, and hard work. Thank you for being part of our journey!",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="md:text-[64px] text-[48px] text-center mb-4 figtree-900">Our Journey</h1>

      <p className="text-center text-gray-600 mb-12 montserrat-400 md:text-xl text-lg max-w-3xl mx-auto">
        Cheesecakes By Battle started during the COVID-19 quarantine as a small
        passion project in Massillon, OH. With dedication and support, it grew
        into a thriving business known for quality and creativity.
        <br></br>
        <br></br>
        Today, it stands as a testament to hard work, resilience, and the joy of
        turning a hobby into something extraordinary.
      </p>

      <div className="flex flex-wrap justify-center gap-4 overflow-x-auto pb-4">
        {steps.map((step, index) => (
          <div
            key={step.number}
            className={` flex-shrink-0 w-full sm:w-[280px] translate-y-2 hover:scale-[1.0005] hover:translate-y-0 transition-transform duration-300 ease-in-out `}
          >
            <div className={`p-6 bg-white border border-main shadow-lg`}>
            <div className="flex items-center  gap-3 mb-4">
              <span className="w-8 h-8 flex text-lg md:text-xl montserrat-600 items-center justify-center bg-main text-white ">
                {step.number}
              </span>
              <h2 className="montserrat-600 text-lg md:text-xl text-main">{step.title}</h2>
            </div>
            <p className="text-center text-gray-800 montserrat-400 text-sm md:text-lg">
              {step.description}
            </p>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
}
