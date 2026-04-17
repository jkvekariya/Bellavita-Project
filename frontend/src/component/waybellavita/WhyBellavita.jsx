function WhyBellavita() {
  const features = [
    {
      icon: "/perfume.png",
      title: "LONG LASTING FRAGRANCE",
      description: "Crafted with high-quality ingredients that stay fresh for hours.",
    },
    {
      icon: "/badge.png",
      title: "PREMIUM QUALITY",
      description: "Crafted with high-grade ingredients for a rich, long-lasting fragrance experience.",
    },
    {
      icon: "/affordable.png",
      title: "AFFORDABLE PRODUCTS",
      description: "Luxury-inspired perfumes at prices everyone can enjoy.",
    },
    {
      icon: "/package.png",
      title: "ELEGANT PACKAGING",
      description: "Beautifully designed bottles that look as good as they smell.",
    },
  ];

  return (
    <section className="py-26 bg-white text-center">
      <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-19">
        WHY BELLAVITA?
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-6  max-w-7xl mx-auto md:px-20">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="w-16 h-16 flex items-center justify-center mb-4 transition-transform duration-300 hover:-translate-y-2">
              <img
                src={feature.icon}
                alt={feature.title}
                className="w-full h-full object-contain"
              />
            </div>
            <h3 className="text-md font-semibold mt-4">{feature.title}</h3>
            <p className="text-gray-600 text-sm mt-2">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WhyBellavita