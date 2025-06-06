import React from 'react';

const productgallery = [
  {
    image: 'https://bellavitaluxury.co.in/cdn/shop/files/1_e3a8356d-1e07-4f9e-b006-463aee598ee0.jpg?v=1709113653&width=300',
  },
  {
    image: 'https://bellavitaluxury.co.in/cdn/shop/files/2_2453e5e3-fecb-46e3-ad9e-00bea4baa462.jpg?v=1709113653&width=300',
  },
  {
    image: 'https://bellavitaluxury.co.in/cdn/shop/files/3_d271220e-4353-4fea-a475-33e62f47e1dc.jpg?v=1709113653&width=300',
  },
  {
    image: 'https://bellavitaluxury.co.in/cdn/shop/files/4_68a3c022-75df-4304-8d47-6a1671886316.jpg?v=1709113653&width=300',
  },
  {
    image: 'https://bellavitaluxury.co.in/cdn/shop/files/5_b43e7ec7-8e4b-464f-b5a4-78854aa116d8.jpg?v=1709113653&width=300',
  }
];

const ProductGallery = () => {
  return (
    <section className="py-10">
      <div className="">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {productgallery.map((item, index) => (
            <div key={index} className="overflow-hidden ">
              <img 
                src={item.image} 
                alt="Product" 
                className="w-full h-48 sm:h-60 md:h-64 lg:h-72 "
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductGallery;
