import React, { useContext, useEffect, useState } from "react";
import { FaStar, FaHeart, FaRegHeart } from "react-icons/fa";
import { BsPatchCheckFill } from "react-icons/bs";
import Api from "../../Apis/backendApi";
import { useNavigate } from "react-router-dom";
import Layout from "../../component/layout/layout";
import toast from "react-hot-toast";
import Context from "../context/Context";
import FilterSortBar from "../../component/filtersortbar/FilterSortBar";

export default function Luxuryperfumes() {
    const [products, setProducts] = useState([]);
    const [filteredSortedProducts, setFilteredSortedProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [wishlistItems, setWishlistItems] = useState([]);
    const navigate = useNavigate();
    const {
        fetchCartCount,
        fetchWishlistCount,
        setIsCartOpen,
        setIsWishlistOpen,
        wishlistCount,
    } = useContext(Context);

    const fetchProducts = async () => {
        try {
            const res = await fetch(Api.ProductgetAll.url);
            const data = await res.json();
            setProducts(data);
            const luxury = data.filter((p) => p.category === "LuxuryPerfume");
            setProducts(luxury);
            setFilteredSortedProducts(luxury);
        } catch (error) {
            console.error("Error fetching products", error);
        }
    };

    const fetchCartItems = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;
            const response = await fetch(Api.getCart.url, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await response.json();
            if (response.ok) setCartItems(data.items || []);
        } catch (error) {
            console.log("Error fetching cart items:", error);
        }
    };

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
        fetchProducts();
        fetchCartItems();
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
    return (
        <Layout>
            <div className=" py-10 max-w-6xl mx-auto mt-8">
                <h2 className="text-center text-2xl font-semibold mb-6">
                    <span className="pb-1">- Premium Fragrances -</span>
                </h2>

                <div className="flex justify-between items-center">
                    <FilterSortBar
                        products={products}
                        onFilteredSorted={setFilteredSortedProducts}
                    />
                    <p className="text-gray-500 text-sm whitespace-nowrap">
                        {filteredSortedProducts.length} products
                    </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-10">
                    {filteredSortedProducts.map((product) => {
                        const isInWishlist = wishlistItems.some(
                            (item) => item.productId._id === product._id
                        );

                        return (
                            <div key={product._id} className="group my-5">
                                <div
                                    className="relative overflow-hidden cursor-pointer"
                                    onClick={() => navigate(`/productinfo/${product._id}`)}
                                >
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            addToWishlist(product._id, product);
                                        }}
                                        className={`absolute right-2 w-10 h-10 rounded-full flex items-center justify-center transition z-1
                                           ${isInWishlist ? "text-white" : "text-black"}`}
                                        title={isInWishlist ? "In wishlist" : "Add to wishlist"}
                                    >
                                        {isInWishlist ? (
                                            <FaHeart className="text-red-500 text-xl" />
                                        ) : (
                                            <FaRegHeart className="text-gray-600  text-xl" />
                                        )}
                                    </button>

                                    <span
                                        className={`absolute top-2 left-2 text-white text-[10px] px-2 py-1 z-10 ${product.condition === "NEW"
                                            ? "bg-[#e1796b]"
                                            : product.condition === "BESTSELLER"
                                                ? "bg-[#e5b17f]"
                                                : ""
                                            }`}
                                    >
                                        {product.condition}
                                    </span>

                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full object-cover transition-transform duration-300 group-hover:scale-105 h-40 sm:h-48 md:h-60"
                                    />

                                    <span className="absolute bottom-2 left-2 bg-teal-500 text-white text-[10px] px-1 py-1 font-medium z-10">
                                        {Math.round(
                                            ((product.realprice - product.discountprice) / product.realprice) * 100
                                        )}
                                        % OFF
                                    </span>
                                </div>

                                <div className="mt-2 text-left">
                                    <p className="inline-block text-[9px] text-gray-500 uppercase tracking-widest">
                                        {product.collection}
                                    </p>
                                    <h3 className="font-semibold text-[12px] text-slate-800">
                                        {product.name.substring(0, 25)}
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
                                </div>

                                <button
                                    onClick={() => handleAddToCart(product._id, product)}
                                    className="mt-5 w-full text-white text-sm font-semibold uppercase py-2 border border-black bg-gradient-to-r from-black to-gray-800 hover:from-gray-800 hover:to-black transition-all duration-300"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </Layout>
    );
}
