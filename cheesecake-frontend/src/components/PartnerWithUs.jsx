export default function PartnerWithUs() {
  const pageData = {
    title: "Partner With Us",
    description:
      "A written work: A piece of writing that is published in a print or electronic medium to share news, research, academic analysis, or debate. A part of a document: A separate part of a document that deals with a single subject, such as an article in the U.S. Constitution.",
    features: [
      { title: "Custom Cakes", description: "A part of a document: A separate part of a document that deals with a single subject." },
      { title: "Protected Contracts", description: "The classic—you can't go wrong. Thick, soft, and packed with milk chocolate chips." },
      { title: "Up to 50 Cheese Cakes", description: "The classic—you can't go wrong. Thick, soft, and packed with milk chocolate chips." },
      { title: "Limited Time Deals", description: "A part of a document: A separate part of a document." },
    ],
    partnersTitle: "Our Current Partners",
    partners: [
      { name: "Kozmo's Grille", logo: "/assets/vector.svg" },
      { name: "Fat Head's Brewery", logo: "/assets/vector.svg" },
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
      <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-8xl mb-4 figtree-900">
        {pageData.title}
      </h1>
      <p className="text-gray-600 montserrat-400 text-lg md:text-xl lg:text-2xl mb-12 max-w-3xl ml-8">
        {pageData.description}
      </p>

      {/* Features Grid */}
      <div className="flex justify-center">
        <div className="grid md:grid-cols-2 gap-8 mb-20 w-2/3">
          {pageData.features.map((feature, index) => (
            <div key={index}>
              <h3 className="mb-2 montserrat-400 text-xl md:text-2xl flex items-center">
                <span className="w-2 h-2 bg-black rounded-full mr-2"></span>
                {feature.title}
              </h3>
              <p className="text-gray-600 montserrat-400 text-lg md:text-xl">
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
      <div className="grid md:grid-cols-2 gap-8 mb-20 max-w-2xl mx-auto">
        {pageData.partners.map((partner, index) => (
          <div className="text-center" key={index}>
            <div className="bg-gray-100 p-12 mb-4">
              <img
                src={partner.logo}
                alt={`${partner.name} Logo`}
                className="mx-auto"
                width={32}
                height={32}
              />
            </div>
            <h3 className="montserrat-400 text-lg md:text-xl">{partner.name}</h3>
          </div>
        ))}
      </div>

      {/* Not Everyone Gets In Section */}
      <h2 className="text-center mb-8 figtree-900 text-3xl md:text-4xl lg:text-6xl">
        {pageData.notEveryoneGetsIn.title}
      </h2>
      <div className="max-w-3xl mx-auto text-center space-y-6 montserrat-400 text-lg md:text-xl">
        {pageData.notEveryoneGetsIn.paragraphs.map((paragraph, index) => (
          <p className="text-gray-600" key={index}>
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}
