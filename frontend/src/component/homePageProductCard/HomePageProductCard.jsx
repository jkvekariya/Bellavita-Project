import React, { useEffect, useState, useContext, useRef } from "react";
import { FaStar } from "react-icons/fa";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { BsPatchCheckFill } from "react-icons/bs";
import Api from "../../Apis/backendApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Context from "../context/Context";

export default function HomePageProductCard() {
  const [products, setProducts] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  const { fetchWishlistCount, fetchCartCount, setIsCartOpen, setIsWishlistOpen, wishlistCount } = useContext(Context);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(Api.ProductgetAll.url);
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };
    fetchProducts();
  }, []);

  const fetchWishlistItems = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const response = await fetch(Api.getWishlist.url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) {
        setWishlistItems(data.items || []);
        await fetchWishlistCount();
      }
    } catch (error) {
      console.log("Error fetching wishlist items:", error);
    }
  };

  useEffect(() => {
    fetchWishlistItems();
  }, [wishlistCount]);

  const handleAddToCart = async (productId, product) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    try {
      const cartResponse = await fetch(Api.getCart.url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const cartData = await cartResponse.json();

      if (cartResponse.ok) {
        const isInCart = cartData.items?.some(item =>
          item.productId?._id === product._id || item.productId === product._id
        );

        if (isInCart) {
          toast("Already in the cart", { icon: "🛒" });
          return;
        }
        const response = await fetch(Api.addToCart.url, {
          method: Api.addToCart.method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ productId, quantity: 1 }),
        });

        if (response.ok) {
          toast.success("Added to cart");
          await fetchCartCount();
          setIsCartOpen(true);
        }
      }
    } catch (error) {
      console.error("Error in handleAddToCart:", error);
    }
  };

  const addToWishlist = async (productId, product) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first");
      return;
    }

    const isInWishlist = wishlistItems.some((item) => item?.productId?._id === product?._id);
    if (isInWishlist) {
      toast("Already in the wishlist", { icon: "❤️" });
      return;
    }

    try {
      const res = await fetch(Api.addToWishlist.url, {
        method: Api.addToWishlist.method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      });

      if (res.ok) {
        toast.success("Added to wishlist");
        fetchWishlistItems();
        setIsWishlistOpen(true);
      }
    } catch (error) {
      console.error("Request failed:", error);
    }
  };

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (!current) return;

    // Calculate one card width (card width + gap)
    const card = current.querySelector('.product-card-item');
    if (!card) return;

    const cardWidth = card.offsetWidth;
    const gap = 24; // Corresponding to gap-6
    const scrollAmount = cardWidth + gap;

    if (direction === "left") {
      current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const BestSellerProducts = products.slice(0, 12);

  return (
    <div className="px-4 md:px-16 py-10 bg-white">
      <div className="max-w-7xl mx-auto relative">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl font-semibold tracking-widest uppercase">BESTSELLERS</h2>
          <div className="flex gap-4">
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white transition-all shadow-sm"
            >
              <i className="fa-solid fa-chevron-left text-sm"></i>
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white transition-all shadow-sm"
            >
              <i className="fa-solid fa-chevron-right text-sm"></i>
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory"
        >
          {BestSellerProducts.map((product) => {
            const isInWishlist = wishlistItems.some((item) => item?.productId?._id === product?._id);

            return (
              <div
                key={product._id}
                className="product-card-item min-w-full sm:min-w-[calc(50%-12px)] lg:min-w-[calc(25%-18px)] snap-start group"
              >
                <div
                  className="relative overflow-hidden cursor-pointer bg-[#f9f9f9] rounded-sm"
                  onClick={() => navigate(`/productinfo/${product._id}`)}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToWishlist(product._id, product);
                    }}
                    className="absolute right-3 top-3 z-10 w-8 h-8 rounded-full flex items-center justify-center bg-white shadow-md hover:bg-gray-50 transition"
                  >
                    {isInWishlist ? (
                      <FaHeart className="text-red-500 text-sm" />
                    ) : (
                      <FaRegHeart className="text-gray-400 text-sm" />
                    )}
                  </button>

                  <span className={`absolute top-3 left-3 z-10 text-white text-[10px] px-2 py-0.5 tracking-wider font-medium shadow-sm ${product.condition === "NEW" ? "bg-[#e1796b]" : "bg-[#e5b17f]"
                    }`}>
                    {product.condition}
                  </span>

                  <div className="w-full h-[280px] flex items-center justify-center p-8 overflow-hidden">
                    <img
                      src={Array.isArray(product.image) ? product.image[0] : product.image}
                      alt={product.name}
                      className="h-full w-full object-contain mix-blend-multiply"
                    />
                  </div>

                  <span className="absolute bottom-3 left-3 z-10 bg-teal-500 text-white text-[9px] px-2 py-0.5 font-bold uppercase">
                    {Math.round(((product.realprice - product.discountprice) / product.realprice) * 100)}% OFF
                  </span>
                </div>

                <div className="mt-4 text-left px-1">
                  <p className="text-[9px] text-gray-400 uppercase tracking-[0.2em] mb-1">
                    {product.collection}
                  </p>
                  <h3 className="font-semibold text-[13px] text-gray-800 line-clamp-2 mb-0.5">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1 mb-1">
                    <FaStar className="text-yellow-400 text-[10px]" />
                    <span className="text-[11px] font-medium">{product.rating}</span>
                    <span className="text-gray-300 mx-1">|</span>
                    <BsPatchCheckFill className="text-blue-500 text-[10px]" />
                    <span className="text-gray-500 text-[11px]">({product.reviews})</span>
                  </div>
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="font-bold text-[15px] italic">₹{product.discountprice.toFixed(2)}</span>
                    <span className="line-through text-gray-400 text-[11px]">₹{product.realprice.toFixed(2)}</span>
                  </div>
                  <button
                    onClick={() => handleAddToCart(product._id, product)}
                    className="w-full text-black text-[11px] font-bold uppercase py-2.5 border border-black hover:bg-black hover:text-white transition-all duration-300 tracking-widest"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-center mt-12">
        <button
          onClick={() => navigate("/bestSellers")}
          className="relative overflow-hidden border border-black px-12 py-2.5 text-[11px] font-bold tracking-[0.3em] group transition-colors"
        >
          <span className="relative z-10 text-black group-hover:text-white transition-colors duration-300">
            VIEW ALL
          </span>
          <span className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0"></span>
        </button>
      </div>
    </div>
  );
}
