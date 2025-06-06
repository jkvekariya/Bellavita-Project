import React, { useEffect, useState, useContext } from 'react';
import toast from 'react-hot-toast';
import Api from '../../../Apis/backendApi';
import Context from '../../context/Context';
import { useNavigate } from 'react-router-dom';

const CartPage = ({ isOpen, onClose }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setCartCount, fetchCartCount } = useContext(Context);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const fetchCart = async () => {
    if (!token) {
      toast.error("Please login to view your cart");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(Api.getCart.url, {
        method: Api.getCart.method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setCart(data.items || []);
        setCartCount(data.items?.length || 0);
        await fetchCartCount();
      } else {
        toast.error(data.error || "Failed to load cart");
      }
    } catch (error) {
      toast.error("Error fetching cart");
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (productId) => {
  try {
    const res = await fetch(Api.removeFromCart.url, {
      method: Api.removeFromCart.method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId }),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("Item removed");

      setCart(data.items);
      setCartCount(data.items?.length || 0);
      await fetchCartCount();
    } else {
      toast.error(data?.error || "Remove failed");
    }
  } catch (error) {
    console.error("Remove item error:", error); 
    toast.error("Network error while removing item");
  }
};

  const changeQuantity = async (productId, delta) => {
    const item = cart.find(i => i.productId._id === productId);
    if (!item) return;

    const newQty = Math.max(1, item.quantity + delta);
    try {
      const res = await fetch(Api.updateQuantity.url, {
        method: Api.updateQuantity.method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity: newQty }),
      });
      const data = await res.json();
      if (res.ok) {
        setCart(data.items);
        setCartCount(data.items?.length || 0);
        toast.success("Quantity updated");
      } else {
        toast.error(data.error || "Update failed");
      }
    } catch (error) {
      toast.error("Error updating quantity");
    }
  };

  useEffect(() => {
    if (isOpen) fetchCart();
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


  const subtotal = cart.reduce((sum, item) => sum + item.productId.discountprice * item.quantity, 0);
  const shipping = 80;
  const total = subtotal + shipping;

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-30 flex justify-end font-sans h-screen">
          <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
          <div className="relative w-full sm:w-[490px] h-full bg-white z-50 p-6 overflow-y-auto">
            <button onClick={onClose} className="absolute top-4 right-4 text-2xl font-bold text-gray-500">×</button>
            <p className="text-sm text-orange-600 font-semibold mb-4">
              FREE GIFT WORTH ₹99 ON ALL PREPAID ORDERS
            </p>
            {loading ? (
              <p>Loading...</p>
            ) : cart.length === 0 ? (
              <div className="mt-20 text-center">
                <p className="text-lg font-medium mb-6">Your cart is empty</p>
                <div className="space-y-3">
                  <button onClick={() => { onClose(); navigate("/newarrivals"); }} className="w-2/3 py-2 border text-xs font-semibold">NEW ARRIVALS</button>
                  <button onClick={() => { onClose(); navigate("/allproduct"); }} className="w-2/3 py-2 border text-xs font-semibold">ALL PRODUCTS</button>
                  <button onClick={() => { onClose(); navigate("/bestSellers"); }} className="w-2/3 py-2 border text-xs font-semibold">BEST SELLERS</button>
                </div>
              </div>
            ) : (
              <>
                {cart.map(item => (
                  <div key={item.productId._id} className="flex items-start gap-4 mb-6">
                    <img src={item.productId.image[0]} alt={item.productId.name} className="w-16 h-16 object-cover" />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="font-medium">{item.productId.name}</p>
                        <button onClick={() => removeItem(item.productId._id)} className="text-lg font-bold text-gray-600">×</button>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <button onClick={() => changeQuantity(item.productId._id, -1)} disabled={item.quantity <= 1} className="px-2 border disabled:opacity-50">−</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => changeQuantity(item.productId._id, 1)} className="px-2 border">+</button>
                      </div>
                    </div>
                    <div className="text-right font-medium">₹{item.productId.discountprice * item.quantity}</div>
                  </div>
                ))}
                <div className="pt-4 text-sm text-gray-500">
                  Tax included. <span className="underline">Shipping</span> calculated at checkout.
                </div>
                <button
                  onClick={() => { onClose(); navigate("/checkoutpage"); }}
                  className="mt-4 w-full bg-black text-white py-3 font-bold text-sm tracking-wider"
                >
                  CHECKOUT — ₹{total.toFixed(2)}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CartPage;