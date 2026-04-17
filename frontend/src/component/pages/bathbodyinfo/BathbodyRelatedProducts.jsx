import React from "react";
import { useNavigate } from "react-router-dom";
import { FaStar, FaHeart, FaRegHeart } from "react-icons/fa";
import { BsPatchCheckFill } from "react-icons/bs";

export default function BathbodyRelatedProducts({ products, handleAddToCart, wishlistItems, addToWishlist }) {
    const navigate = useNavigate();

    if (!products?.length) return null;

    return (
        <div className="max-w-5xl mx-auto my-12 p-10 lg:p-0">
            <h2 className="text-3xl font-medium mb-4 text-center">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-10">
                {products.map((product) => {
                    const isInWishlist = wishlistItems?.some(item => item?.productId?._id === product?._id);
                    return (
                        <div
                            key={product._id}
                            className="relative overflow-hidden cursor-pointer group"
                            onClick={() => navigate(`/Bathbodyinfo/${product._id}`)}
                        >
                            {product.condition && (
                                <span className={`absolute top-2 left-2 text-white text-[10px] px-2 py-1 z-10 ${product.condition === "NEW" ? "bg-[#e1796b]" :
                                    product.condition === "BESTSELLER" ? "bg-[#e5b17f]" : ""
                                    }`}>
                                    {product.condition}
                                </span>
                            )}

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    addToWishlist(product._id, product);
                                }}
                                title={isInWishlist ? "In wishlist" : "Add to wishlist"}
                                className="absolute top-2 right-2 z-10"
                            >
                                {isInWishlist ? (
                                    <FaHeart className="text-red-500 text-xl" />
                                ) : (
                                    <FaRegHeart className="text-gray-600 text-xl" />
                                )}
                            </button>
                            <img
                                src={product.image?.[0]}
                                alt={product.name}
                                className="lg:h-60 h-96 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />

                            <span className="absolute bottom-39 left-2 bg-teal-500 text-white text-[10px] px-1 py-1 font-medium z-10">
                                {Math.round(((product.realprice - product.discountprice) / product.realprice) * 100)}% OFF
                            </span>

                            <div className="mt-2 text-left">
                                <p className="inline-block text-[9px] text-gray-500 uppercase tracking-widest">{product.collection}</p>
                                <h3 className="font-semibold text-[12px] text-slate-800">{product.name.substring(0, 25)}</h3>
                                <div className="flex items-center gap-1 text-sm mt-1">
                                    <FaStar className="text-yellow-500 text-xs" />
                                    <span className="text-xs">{product.rating} |</span>
                                    <BsPatchCheckFill className="text-blue-600 ml-1 text-xs" />
                                    <span className="text-slate-800 text-xs">({product.reviews} Reviews)</span>
                                </div>
                                <div className="mt-1">
                                    <span className="font-semibold text-sm">₹{product.discountprice.toFixed(2)}</span>
                                    <span className="line-through text-gray-400 text-xs ml-2">₹{product.realprice.toFixed(2)}</span>
                                </div>
                                <button
                                    onClick={(e) => { e.stopPropagation(); handleAddToCart(product._id, product); }}
                                    className="mt-5 w-full text-white text-sm font-semibold uppercase py-2 border border-black bg-gradient-to-r from-black to-gray-800 hover:from-gray-800 hover:to-black transition-all duration-300"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
