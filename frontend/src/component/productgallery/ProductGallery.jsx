import React, { useRef } from 'react';

const productgallery = [
  { image: '/poster1.jpg' },
  { image: '/poster5.jpg' },
  { image: '/poster2.jpg' },
  { image: '/poster3.jpg' },
  { image: '/poster4.jpg' },
  { image: '/poster6.jpg' },
];

const ProductGallery = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (!current) return;

    const card = current.querySelector('.gallery-item');
    if (!card) return;

    const cardWidth = card.offsetWidth;
    const gap = 16; // gap-4 is 16px
    const scrollAmount = cardWidth + gap;

    if (direction === "left") {
      current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-16 relative">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-widest uppercase">PHOTO GALLERY</h2>
          <div className="flex gap-4">
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white transition-all shadow-sm"
              aria-label="Scroll left"
            >
              <i className="fa-solid fa-chevron-left text-sm"></i>
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white transition-all shadow-sm"
              aria-label="Scroll right"
            >
              <i className="fa-solid fa-chevron-right text-sm"></i>
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
        >
          {productgallery.map((item, index) => (
            <div
              key={index}
              className="gallery-item flex-shrink-0 min-w-full sm:min-w-[calc(50%-8px)] lg:min-w-[calc(25%-12px)] snap-start overflow-hidden rounded-md group"
            >
              <img
                src={Array.isArray(item.image) ? item.image[0] : item.image}
                alt={`Gallery image ${index + 1}`}
                className="w-full h-44 sm:h-60 md:h-72 lg:h-96 object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductGallery;
