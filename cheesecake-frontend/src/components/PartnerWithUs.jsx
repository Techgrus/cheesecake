export default function PartnerWithUs() {
  const pageData = {
    title: "Partner With Us",
     features: [
      { title: "Custom Cakes", description: "Whether it's a birthday, anniversary, wedding, or any special occasion, our custom cheesecakes are made to order, tailored to your specific flavors, designs, and themes. Let us bring your vision to life with our handcrafted cheesecakes." },
      { title: "Protected Contracts", description: "Partner with us for guaranteed supply and special agreements tailored to your business or event needs. Our protected contracts ensure priority service, consistency, and reliability for bulk or recurring cheesecake orders." },
      { title: "Limited Time Deals", description: "Enjoy exclusive seasonal flavors, promotional discounts, and special offers for a limited time. Stay tuned for unique cheesecake varieties and savings that you won't want to miss!" },
    ],
    partnersTitle: "Our Current Partners",
    partners: [
      { name: "Kozmo's Grille", logo: "/assets/partners(2).webp", location: "Massillon, OH", desc: "A vibrant American bistro located in the heart of Massillon, OH, Kozmo’s Grille is known for its upscale casual dining experience. With a menu full of handcrafted dishes and fresh ingredients, it’s the perfect place to enjoy a great meal. Now featuring our signature cheesecakes, adding a sweet touch to their delicious offerings." },
      { name: "Harter’s 6th Street Pizza and Wings", logo: "/assets/partners(1).webp", location: "Massillon, OH", desc: "Harter’s brings bold flavor to 6th Street with their signature hot honey pepperoni and gyro pizzas — local favorites that keep customers coming back. We’re proud to partner with this rising star to add a sweet twist to their savory lineup with our handcrafted cheesecakes." },
    ],
    notEveryoneGetsIn: {
      title: "Not Everyone Gets In.",
      paragraphs: [
        "Thank you for your interest in carrying Cheesecakes by Battle in your establishment! Please fill out the form below, and we'll be in touch soon to discuss our wholesale options.",
        "At Cheesecakes by Battle, we aim to carefully space out our offerings to avoid oversaturating the market. We strive to minimize conflicts between businesses carrying our products by ensuring each location provides a unique experience for customers. This approach allows us to support each partner's success while maintaining the exclusivity of our cheesecakes in the area.",
        "Please keep this in mind as you apply. We appreciate your understanding and look forward to discussing how we can work together!",
      ],
    },
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Partner With Us Section */}
      <h1 className="text-4xl w-full text-center md:text-5xl lg:text-6xl xl:text-8xl mb-6 figtree-900">
        {pageData.title}
      </h1>

      {/* Features Grid */}
      <div className="flex justify-center">
        <div className="grid lg:grid-cols-2 gap-12 mb-20 w-3/4 lg:w-[90%]">
          {pageData.features.map((feature, index) => (
            <div
              key={index}
              className={`${
                pageData.features.length % 2 !== 0 && index === pageData.features.length - 1
                  ? "col-span-1 lg:col-span-2 flex flex-col items-start text-start lg:w-full lg:max-w-[484px] lg:mx-auto"
                  : ""
              }`}
            >
              <h3 className="mb-2 text-main montserrat-500 md:text-xl lg:text-2xl flex items-center mx-auto lg:mx-0 w-full justify-center lg:justify-start">
                <span className="w-2 h-2 bg-main rounded-full mr-2"></span>
                {feature.title}
              </h3>
              <p className="text-gray-600 montserrat-400 md:text-lg lg:text-xl lg:ml-4 w-[484px]  mx-auto text-center lg:mx-0 lg:text-start">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Current Partners Section */}
      <h2 className="text-center mb-4 figtree-900 text-3xl md:text-4xl lg:text-6xl">
        {pageData.partnersTitle}
      </h2>
      <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto montserrat-400 text-lg md:text-xl">
        {pageData.description}
      </p>

      {/* Partners Grid */}
      <div className="grid md:grid-cols-2 mx-8 gap-8 mb-20 md:max-w-4-xl lg:max-w-5xl lg:mx-auto">
        {pageData.partners.map((partner, index) => (
          <div className="text-center" key={index}>
            <div className=" mb-4">
              <img
                src={partner.logo}
                alt={`${partner.name} Logo`}
                className="mx-auto"
                width={180}
                height={180}
              />
            </div>
            <h3 className="montserrat-600 text-main text-md md:text-lg lg:text-xl">{partner.name}</h3>
            <h3 className="montserrat-400 text-main text-md md:text-lg lg:text-xl mb-4">- {partner.location}</h3>
            <span className="montserrat-300 text-md md:text-lg lg:text-xl">
              {partner.desc}
            </span>
          </div>
        ))}
      </div>

      {/* Not Everyone Gets In Section */}
      <h2 className="text-center mb-8 figtree-900 text-3xl md:text-4xl lg:text-6xl">
        {pageData.notEveryoneGetsIn.title}
      </h2>
      <div className="max-w-4xl mx-auto text-center space-y-6 montserrat-400 text-lg md:text-xl">
        {pageData.notEveryoneGetsIn.paragraphs.map((paragraph, index) => (
          <p className="text-gray-600" key={index}>
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}
