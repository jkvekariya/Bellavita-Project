function WhyBellavita() {
    const features = [
      {
        icon: "🐰",
        title: "CRUELTY FREE",
        description: "Kindness in every bottle: Our commitment to cruelty-free Products.",
      },
      {
        icon: "💐",
        title: "FRAGRANCE FORWARD",
        description: "Luxurious & imported perfume oils in every product.",
      },
      {
        icon: "💰",
        title: "AFFORDABLE LUXURY",
        description: "Offering Premium Quality and Elegance at a Reasonable Price.",
      },
      {
        icon: "⚧️",
        title: "GENDER NEUTRAL",
        description: "Elevate your self-care routine with bath, body and personal care for all.",
      },
    ];
  
    return (
      <section className="py-16 bg-white text-center">
        <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-8">
          WHY BELLAVITA?
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-6  max-w-7xl mx-auto md:px-20">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="text-4xl text-gray-600">{feature.icon}</div>
              <h3 className="text-md font-semibold mt-4">{feature.title}</h3>
              <p className="text-gray-600 text-sm mt-2">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }
  
  export default WhyBellavita