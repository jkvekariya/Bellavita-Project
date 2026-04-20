import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";

export default function BrandLogoCarousel() {
  const logos = [
    { id: 1, src: "https://bellavitaluxury.co.in/cdn/shop/files/Ani_480x_14446b4e-c91a-46df-a133-a95092fe484e.jpg?height=160&v=1709116553", alt: "ANI" },
    { id: 2, src: "https://bellavitaluxury.co.in/cdn/shop/files/HT_4a741228-3740-4f84-97bc-3c093ceec75a.jpg?height=160&v=1709116553", alt: "HT" },
    { id: 3, src: "https://bellavitaluxury.co.in/cdn/shop/files/IDiva_480x_1617c636-c0ed-4ed2-bb06-36e1906728ff.jpg?height=160&v=1709116553", alt: "iDiva" },
    { id: 4, src: "https://bellavitaluxury.co.in/cdn/shop/files/Elle_480x_db18e8ef-2f25-4299-9c39-73af4c300969.jpg?height=160&v=1709116553", alt: "Elle" },
    { id: 5, src: "https://bellavitaluxury.co.in/cdn/shop/files/BW_460x460_dcd6c999-6863-4ea2-ae4a-5621f5a51507.png?height=160&v=1709116553", alt: "Business World" },
    { id: 6, src: "https://bellavitaluxury.co.in/cdn/shop/files/Pinkvilla_480x_a664ac7e-bd4f-45ae-b43a-b5ce25e0b530.jpg?height=160&v=1709116554", alt: "Pinkvilla" },
  ];

  return (
    <section id="brand-logos" className="py-16 bg-white scroll-smooth">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-12 tracking-widest uppercase">WHO HAVE COLLABORATES ?</h2>
        <div>
          <Swiper
            speed={3000}
            slidesPerView={4}
            spaceBetween={10}
            loop={true}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            modules={[Autoplay]}
            className="w-full"
          >
            {logos.map((logo) => (
              <SwiperSlide key={logo.id} className="flex justify-center items-center">
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-16 w-auto object-contain transition-transform duration-300"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
