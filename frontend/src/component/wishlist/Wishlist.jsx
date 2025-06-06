import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Api from '../../Apis/backendApi'
import Context from '../context/Context';

const WishlistPage = ({ isOpen, onClose }) => {
  const [Wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setWishlistCount, fetchWishlistCount } = useContext(Context);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchWishlist = async () => {
    if (!token) {
      toast.error("Please login to view your Wishlist");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(Api.getWishlist.url, {
        method: Api.getWishlist.method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setWishlist(data.items || []);
        fetchWishlistCount(data.items?.length || 0);
        await fetchWishlistCount();
      }
      else {
        toast.error(data.error || "Failed to load wishlist");
      }
    } catch (error) {
      toast.error("Error fetching wishlist");
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (productId) => {
    try {
      const res = await fetch(Api.removeFromWishlist.url, {
        method: Api.removeFromWishlist.method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Item removed");

        setWishlist(data.items);
        setWishlistCount(data.items?.length || 0);
        await fetchWishlistCount();
      } else {
        toast.error(data?.error || "Remove failed");
      }
    } catch (error) {
      console.error("Remove item error:", error);
      toast.error("Network error while removing item");
    }
  };

 useEffect(() => {
     if (isOpen) fetchWishlist();
   }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-30 flex justify-end font-sans h-screen">
          <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
          <div className="relative w-full sm:w-[490px] h-full bg-white z-50 p-6 overflow-y-auto">
            <button onClick={onClose} className="absolute top-4 right-4 text-2xl font-bold text-gray-500">×</button>
            <p className="text-sm text-orange-600 font-semibold mb-4">
              YOUR WISHLIST..
            </p>
            {loading ? (
              <p>Loading...</p>
            ) : Wishlist.length === 0 ? (
              <div className="mt-20 text-center">
                <p className="text-lg font-medium mb-6">Your removeFromWishlist is empty</p>
                <div className="space-y-3">
                  <button onClick={() => { onClose(); navigate("/newarrivals"); }} className="w-2/3 py-2 border text-xs font-semibold">NEW ARRIVALS</button>
                  <button onClick={() => { onClose(); navigate("/allproduct"); }} className="w-2/3 py-2 border text-xs font-semibold">ALL PRODUCTS</button>
                  <button onClick={() => { onClose(); navigate("/bestSellers"); }} className="w-2/3 py-2 border text-xs font-semibold">BEST SELLERS</button>
                </div>
              </div>
            ) : (
              <>
                {Wishlist.map(item => (
                  <div key={item.productId._id} className="flex items-start gap-4 mb-6">
                    <img src={item.productId.image[0]} alt={item.productId.name} className="w-16 h-16 object-cover" />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="font-medium">{item.productId.name}</p>
                        <button onClick={() => removeItem(item.productId._id)} className="text-lg font-bold
                text-gray-600">×</button>
                      </div>
                    </div>
                    <div className="text-right font-medium">₹{item.productId.discountprice}</div>
                  </div>
                ))}

              </>
            )}
          </div>
        </div>
      )}

    </>
  );
};

export default WishlistPage;
