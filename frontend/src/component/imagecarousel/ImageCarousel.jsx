import React, { useContext, useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { BsPatchCheckFill } from "react-icons/bs";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Api from "../../Apis/backendApi";
import Context from "../context/Context";

export default function ImageCarousel() {
    const [hoveredId, setHoveredId] = useState(null);
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [selectedProductIndex, setSelectedProductIndex] = useState(0);
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const navigate = useNavigate();
    const context = useContext(Context);
    const { fetchCartCount } = context;
     const {
    setIsCartOpen,
  } = useContext(Context);

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

    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await fetch(Api.ProductgetAll.url);
                const data = await res.json();
                const filtered = data.filter((p) => p.category === "Carousel");
                setProducts(filtered);
            } catch (error) {
                console.error("Error fetching products", error);
            }
        }

        fetchProducts();
        fetchCartItems();
    }, []);

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

    if (products.length === 0) return <div>Loading products...</div>;

    const staticProducts = [
        {
            id: 1,
            name: "HOT Mess Woman Perfume - 100ml",
            price: "₹849.00",
            originalPrice: "₹1,099.00",
            position: { top: "70%", left: "21%" },
        },
        {
            id: 2,
            name: "OCEAN Man Perfume - 100ml",
            price: "₹849.00",
            originalPrice: "₹1,199.00",
            position: { top: "72%", left: "50%" },
        },
        {
            id: 3,
            name: "B.L.U. Man Perfume - 100ml",
            price: "₹799.00",
            originalPrice: "₹1,099.00",
            position: { top: "75%", left: "80%" },
        },
    ];


    const selectedProduct = products[selectedProductIndex];

    return (
        <div className="max-w-6xl mx-auto my-8 px-4 grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
                <img
                    src="https://bellavitaluxury.co.in/cdn/shop/files/Luxe-Perfumes_1_1.jpg?v=1715081407&width=750"
                    alt="Main Perfume"
                    className="w-full h-full object-cover"
                />
                {staticProducts.map((product) => (
                    <button
                        key={product.id}
                        onMouseEnter={() => {
                            setHoveredId(product.id);
                            setSelectedProductIndex(product.id - 1);
                        }}
                        onMouseLeave={() => setHoveredId(null)}
                        className="w-5 h-5 sm:w-7 sm:h-7 bg-white border border-gray-300 rounded-full shadow-md absolute transform -translate-x-1/2 -translate-y-1/2 opacity-70 hover:opacity-100 hover:scale-110 transition"
                        style={{
                            top: product.position.top,
                            left: product.position.left,
                        }}
                    />
                ))}
                {hoveredId && (
                    <div
                        className="absolute bg-white p-2 rounded-lg w-40 sm:w-44 text-xs z-10"
                        style={{
                            top: staticProducts.find((p) => p.id === hoveredId)?.position.top,
                            left: staticProducts.find((p) => p.id === hoveredId)?.position.left,
                            transform: "translate(-50%, -125%)",
                        }}
                    >
                        <p className="font-semibold">
                            {staticProducts.find((p) => p.id === hoveredId)?.name}
                        </p>
                        <p className="text-sm font-bold">
                            {staticProducts.find((p) => p.id === hoveredId)?.price}
                            <span className="line-through text-gray-400 font-normal text-xs ml-1">
                                {staticProducts.find((p) => p.id === hoveredId)?.originalPrice}
                            </span>
                        </p>
                        <div className="w-3 h-3 bg-white absolute bottom-[-6px] left-1/2 -translate-x-1/2 rotate-45 shadow-md" />
                    </div>
                )}
            </div>

            <div className="w-full max-w-xs mt-10 md:ml-10 ml-5 md:mx-5">
                <div
                    className="relative overflow-hidden cursor-pointer group"
                    onClick={() => navigate(`/productinfo/${selectedProduct._id}`)}
                >
                    <span
                        className={`absolute top-2 left-2 text-white text-[10px] px-2 py-1 z-10  ${selectedProduct.condition === "NEW"
                            ? "bg-[#e1796b]"
                            : selectedProduct.condition === "BESTSELLER"
                                ? "bg-[#e5b17f]"
                                : "bg-none"
                            }`}
                    >
                        {selectedProduct.condition}
                    </span>
                    <img
                        src={selectedProduct.image?.[activeImageIndex] || selectedProduct.image?.[0]}
                        alt={selectedProduct.name}
                        className="w-full h-64 sm:h-72 md:h-80 object-cover  transition-transform duration-300 group-hover:scale-105"
                    />
                    <span className="absolute bottom-2 left-2 bg-teal-500 text-white text-[10px] px-2 py-1 font-medium ">
                        {Math.round(((selectedProduct.realprice - selectedProduct.discountprice) / selectedProduct.realprice) * 100)}% OFF
                    </span>
                </div>

                <div className="mt-4 px-2">
                    <p className="text-xs text-gray-500 uppercase tracking-wider">
                        {selectedProduct.collection}
                    </p>
                    <h3 className="text-sm font-semibold text-slate-800">
                        {selectedProduct.name.substring(0, 25)}
                    </h3>
                    <div className="flex items-center gap-1 text-xs mt-1">
                        <FaStar className="text-yellow-500" />
                        <span>{selectedProduct.rating} |</span>
                        <BsPatchCheckFill className="text-blue-600 ml-1" />
                        <span className="text-slate-800">({selectedProduct.reviews} Reviews)</span>
                    </div>
                    <div className="mt-1">
                        <span className="font-semibold text-sm">
                            ₹{selectedProduct.discountprice?.toFixed(2)}
                        </span>
                        <span className="line-through text-gray-400 text-xs ml-2">
                            ₹{selectedProduct.realprice?.toFixed(2)}
                        </span>
                    </div>
                    <button
                        onClick={() => handleAddToCart(selectedProduct._id, selectedProduct)}
                        className="mt-5 w-full text-white text-sm font-semibold uppercase py-2 border border-black bg-black hover:bg-gray-900 transition-all duration-300 rounded"
                    >
                        Add to Cart
                    </button>
                </div>

                <div className="mt-6 px-2 overflow-x-auto">
                    <div className="flex justify-center space-x-3">
                        {products.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => {
                                    setSelectedProductIndex(idx);
                                    setActiveImageIndex(0);
                                }}
                                className={`h-1 w-10 rounded-full transition-all duration-300 ${selectedProductIndex === idx
                                    ? "bg-black"
                                    : "bg-gray-300 hover:bg-gray-400"
                                    }`}
                                aria-label={`Select product ${idx + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}