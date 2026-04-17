import React, { useEffect, useState, useRef, useContext } from "react";
import { FaStar } from "react-icons/fa";
import { BsPatchCheckFill } from "react-icons/bs";
import Layout from "../../layout/layout";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import Api from "../../../Apis/backendApi";
import toast from "react-hot-toast";
import Context from "../../context/Context";
import Accordion from "./Accordion";
import RelatedProducts from "./RelatedProducts";

export default function ProductInfo() {
    const { id } = useParams();
    const scrollRef = useRef(null);
    const [product, setProduct] = useState(null);
    const [mainImage, setMainImage] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [wishlistItems, setWishlistItems] = useState([]);
    const {
        setIsCartOpen,
        setIsWishlistOpen,
        wishlistCount,
    } = useContext(Context);
    const context = useContext(Context);
    const { fetchCartCount, fetchWishlistCount } = context;
    const navigate = useNavigate();

    const scroll = (direction) => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: direction === "left" ? -150 : 150,
                behavior: "smooth",
            });
        }
    };

    const handleIncrement = () => setQuantity((prev) => prev + 1);
    const handleDecrement = () => {
        if (quantity > 1) setQuantity((prev) => prev - 1);
    };

    const toggleReadMore = () => setIsExpanded(!isExpanded);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(Api.ProductById(id).url);
                const data = await res.json();
                setProduct(data);
                setMainImage(data.image?.[0] || "");
            } catch (err) {
                console.error("Error loading product:", err);
            }
        };
        fetchProduct();
    }, [id]);

    useEffect(() => {
        if (product?.category) {
            const fetchRelatedProducts = async () => {
                try {
                    const res = await fetch(Api.productsByCategory(product.category).url);
                    const data = await res.json();
                    const filtered = data.filter((p) => p._id !== product._id).slice(0, 4);
                    setRelatedProducts(filtered);
                } catch (error) {
                    console.error("Error fetching related products:", error);
                }
            };
            fetchRelatedProducts();
        }
    }, [product]);

    const fetchCartItems = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

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
        fetchCartItems();
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
            (item) => item?.productId?._id === product?._id
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


    if (!product) return <div className="text-center p-10">Loading...</div>;
    const isInWishlist = wishlistItems.some(item => item?.productId?._id === product?._id);
    return (
        <Layout>
            <div className="max-w-5xl mx-auto p-10 grid md:grid-cols-2 gap-8">
                <div className="relative">
                    <img
                        src={mainImage}
                        alt="Main Product"
                        className="object-contain w-full cursor-pointer"
                        onClick={() => setIsModalOpen(true)}
                    />
                    <button
                        onClick={() => addToWishlist(product._id, product)}
                        className={`absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center transition  ${isInWishlist ? "text-white" : " text-black"}`}
                        title={isInWishlist ? "In wishlist" : "Add to wishlist"}>
                        {isInWishlist ? <FaHeart className="text-red-500 text-2xl" /> : <FaRegHeart className="text-gray-600 text-xl" />}
                    </button>

                    <div className="mt-4 flex items-center gap-2">
                        <button onClick={() => scroll("left")} className="p-2 text-2xl text-gray-400">&lt;</button>
                        <div
                            ref={scrollRef}
                            className="flex gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-200 shadow-md px-2 py-1 rounded"
                        >
                            {product.image?.map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt={`Thumbnail ${index}`}
                                    onClick={() => setMainImage(img)}
                                    className="w-15 h-15 object-cover border border-gray-300 rounded cursor-pointer hover:border-black"
                                />
                            ))}
                        </div>
                        <button onClick={() => scroll("right")} className="p-2 text-2xl text-gray-400">&gt;</button>
                    </div>
                </div>

                <div className="px-5">
                    <h1 className="text-2xl font-semibold">{product.name}</h1>
                    <p className="text-[10px] text-gray-500 mb-2 tracking-widest">{product.collection}</p>

                    <div className="flex items-center gap-1 text-sm my-6">
                        <FaStar className="text-yellow-500 text-xs" />
                        <span className="text-xs">{product.rating} |</span>
                        <BsPatchCheckFill className="text-blue-600 ml-1 text-xs" />
                        <span className="text-slate-800 text-xs">({product.reviews} Reviews)</span>
                    </div>

                    <div className="flex">
                        <p className="text-red-500 font-bold mr-1">
                            -{Math.round(((product.realprice - product.discountprice) / product.realprice) * 100)}%
                        </p>
                        <p className="text-lg font-semibold">₹{product.discountprice}</p>
                    </div>

                    <div className="mb-4 flex justify-between mt-2">
                        <div>
                            <p className="text-[10px] line-through text-gray-500">MRP: ₹{product.realprice}</p>
                            <p className="text-[9px] tracking-widest text-gray-500">Inclusive of all taxes</p>
                        </div>
                        <div className="flex border border-gray-300">
                            <button onClick={handleDecrement} disabled={quantity === 1} className="px-3 py-1 bg-[#f5f5f5] disabled:opacity-50">-</button>
                            <span className="px-4 pt-2 text-xs">{quantity}</span>
                            <button onClick={handleIncrement} className="px-3 py-1 bg-[#f5f5f5]">+</button>
                        </div>
                    </div>

                    <div className="flex gap-4 mt-4">
                        <button
                            onClick={() => handleAddToCart(product._id, product)}
                            className="flex-1 text-white text-sm font-semibold uppercase py-2 border border-black bg-gradient-to-r from-black to-gray-800 hover:from-gray-800 hover:to-black"
                        >
                            Add to Cart
                        </button>


                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-gray-700 mt-6">
                        {[
                            { label: "LONG LASTING", src: "https://bellavitaluxury.co.in/cdn/shop/files/Long_Lasting_1_70a277fc-8142-4cfb-b036-fc4084c6cee5.svg" },
                            { label: "IFRA - CERTIFIED", src: "https://bellavitaluxury.co.in/cdn/shop/files/ifra_1.svg" },
                            { label: "IMPORTED OILS", src: "https://bellavitaluxury.co.in/cdn/shop/files/Imported_Oils_1.svg" },
                            { label: "MADE IN INDIA", src: "https://bellavitaluxury.co.in/cdn/shop/files/Bottled_in_india_2.svg" },
                        ].map((item, i) => (
                            <div key={i} className="py-3 bg-[#f5f5f5]">
                                <img src={item.src} className="w-10 mx-auto" alt={item.label} />
                                <p className="text-[10px] font-semibold mt-2">{item.label}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 text-[13px] text-gray-700">
                        <p>{isExpanded ? product.description : `${product.description?.substring(0, 190)}...`}</p>
                        <button onClick={toggleReadMore} className="mt-2 font-medium border-b border-b-gray-300 hover:border-slate-600">
                            {isExpanded ? "Read less" : "Read more"}
                        </button>
                    </div>
                </div>
            </div>

            <Accordion product={product} />

            <RelatedProducts relatedProducts={relatedProducts} handleAddToCart={handleAddToCart} wishlistItems={wishlistItems} addToWishlist={addToWishlist} />

            {isModalOpen && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center" onClick={() => setIsModalOpen(false)}>
                    <img src={mainImage} alt="Full view" className="max-w-full max-h-full rounded shadow-lg" />
                </div>
            )}

        </Layout>
    );
}


