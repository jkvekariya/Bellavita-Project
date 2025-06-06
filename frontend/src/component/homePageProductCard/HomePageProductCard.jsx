import React, { useEffect, useState, useContext } from "react";
import { FaStar } from "react-icons/fa";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { BsPatchCheckFill } from "react-icons/bs";
import Api from "../../Apis/backendApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Context from "../context/Context";

export default function HomePageProductCard() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const navigate = useNavigate();

  const context = useContext(Context);
  const { fetchWishlistCount, fetchCartCount, setCartCount } = context;
  const {
    setIsCartOpen,
    setIsWishlistOpen,
    wishlistCount,
  } = useContext(Context);
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

    const fetchCartItems = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch(Api.getCart.url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setCartItems(data.items || []);
        }
      } catch (error) {
        console.log("Error fetching cart items:", error);
      }
    };

    fetchProducts();
    fetchCartItems();
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
      } else {
        console.error("Error fetching wishlist:", data);
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
          item.productId?._id === product._id ||
          item.productId === product._id
        );

        if (isInCart) {
          toast("Already in the cart", { icon: "🛒" });
          // setIsCartOpen(true);
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

        const data = await response.json();
        if (response.ok) {
          toast.success("Added to cart");
          await fetchCartCount();
          setIsCartOpen(true);
        } else {
          toast.error(data.error || "Failed to add to cart");
        }
      }
    } catch (error) {
      console.error("Error in handleAddToCart:", error);
      toast.error("Something went wrong");
    }
  };

  const addToWishlist = async (productId, product) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first");
      return;
    }

    const isInWishlist = wishlistItems.some(
      (item) => item.productId._id === product._id
    );
    if (isInWishlist) {
      toast("Already in the wishlist", { icon: "❤️" });
      // setIsWishlistOpen(true); 
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

      const data = await res.json();

      if (!res.ok) {
        console.error("Error adding to wishlist:", data);
        toast.error(data.error || "Failed to add to wishlist");
        return;
      }

      toast.success("Added to wishlist");
      fetchWishlistItems();
      setWishlistItems(data.items || []);
      fetchWishlistCount();
      setIsWishlistOpen(true);
    } catch (error) {
      console.error("Request failed:", error);
      toast.error("Something went wrong");
    }
  };

  const BestSellerProducts = products
    .filter((product) => product.category === "BestSeller")
    .slice(0, 8);

  return (
    <div className="px-4 md:px-16 py-10">
      <h2 className="text-center text-2xl font-semibold mb-6">BESTSELLERS</h2>

      <div className="max-w-5xl mx-auto overflow-x-auto scrollbar-hide">
        <div className="flex gap-6">
          {BestSellerProducts.map((product) => {
            const isInWishlist = wishlistItems.some(
              (item) => item.productId._id === product._id
            );

            return (
              <div key={product._id} className="flex-shrink-0 group">
                <div
                  className="relative overflow-hidden cursor-pointer group"
                  onClick={() => navigate(`/productinfo/${product._id}`)}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToWishlist(product._id, product);
                    }}
                    className="absolute right-3 z-10 w-10 h-10 rounded-full flex items-center justify-center bg-opacity-80 hover:bg-opacity-100 transition"
                    title={isInWishlist ? "In wishlist" : "Add to wishlist"}
                  >
                    {isInWishlist ? (
                      <FaHeart className="text-red-500 text-xl" />
                    ) : (
                      <FaRegHeart className="text-gray-600 text-xl" />
                    )}
                  </button>

                  <span
                    className={`absolute top-2 left-2 z-10 text-white text-[10px] px-2 py-1 ${product.condition === "NEW"
                      ? "bg-[#e1796b]"
                      : product.condition === "BESTSELLER"
                        ? "bg-[#e5b17f]"
                        : ""
                      }`}
                  >
                    {product.condition}
                  </span>

                  <img
                    src={Array.isArray(product.image) ? product.image[0] : product.image}
                    alt={product.name}
                    className="h-60 w-full object-cover transition-transform duration-300 group-hover:scale-105 z-0"
                  />

                  <span className="absolute bottom-2 left-2 z-10 bg-teal-500 text-white text-[10px] px-1 py-1 font-medium">
                    {Math.round(
                      ((product.realprice - product.discountprice) / product.realprice) * 100
                    )}
                    % OFF
                  </span>
                </div>

                <div className="p-2 text-left">
                  <p className="inline-block text-[9px] text-gray-500 uppercase tracking-widest">
                    {product.collection}
                  </p>
                  <h3 className="font-semibold text-[12px] text-slate-800">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1 text-sm mt-1">
                    <FaStar className="text-yellow-500 text-xs" />
                    <span className="text-xs">{product.rating} |</span>
                    <BsPatchCheckFill className="text-blue-600 ml-1 text-xs" />
                    <span className="text-slate-800 text-xs">
                      ({product.reviews} Reviews)
                    </span>
                  </div>
                  <div className="mt-1">
                    <span className="font-semibold text-sm">
                      ₹{product.discountprice.toFixed(2)}
                    </span>
                    <span className="line-through text-gray-400 text-xs ml-2">
                      ₹{product.realprice.toFixed(2)}
                    </span>
                  </div>
                  <button
                    onClick={() => handleAddToCart(product._id, product)}
                    className="mt-3 w-full text-white text-sm font-semibold uppercase py-2 border border-black bg-gradient-to-r from-black to-gray-800 hover:from-gray-800 hover:to-black transition-all duration-300"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={() => navigate("/bestSellers")}
          className="relative overflow-hidden border border-black px-16 py-2 text-sm tracking-widest group"
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
