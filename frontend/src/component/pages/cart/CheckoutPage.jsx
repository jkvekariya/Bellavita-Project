import { useState, useEffect, useContext } from "react";
import { ArrowRight, ShoppingBag } from "lucide-react";
import Api from "../../../Apis/backendApi";
import toast from "react-hot-toast";
import AddressForm from "../../pages/cart/AddressForm";
import Razorpayscript from "../../../helper/RazorpayScript";
import { useNavigate } from "react-router-dom";
import Layout from "../../layout/layout";
import Context from "../../context/Context";

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileNumber, setMobileNumber] = useState("");
  const [isMobileValid, setIsMobileValid] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [userInfo, setUserInfo] = useState({});
  const { setCartCount } = useContext(Context);

  const SHIPPING_COST = 70;
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const getUserIdFromToken = () => {
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.id;
    } catch {
      return null;
    }
  };

  const userId = getUserIdFromToken();

  useEffect(() => {
    const fetchCart = async () => {
      if (!token) {
        toast.error("Please login to view your cart");
        return;
      }

      try {
        const res = await fetch(Api.getCart.url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (res.ok) {
          setCart(data?.items || []);
        } else {
          toast.error(data.error || "Failed to fetch cart");
        }
      } catch {
        toast.error("Error fetching cart");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const subtotal = cart.reduce(
    (acc, item) => acc + (item.productId?.discountprice || 0) * item.quantity,
    0
  );
  const totalAmount = subtotal + SHIPPING_COST;

  const handleMobileNumberChange = (e) => {
    const value = e.target.value;
    setMobileNumber(value);
    setIsMobileValid(/^\d{10}$/.test(value));
  };

  const clearCart = async () => {
    try {
      const res = await fetch(Api.clearCart.url, {
        method: Api.clearCart.method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (res.ok) {
        setCart([]);
        setCartCount(0);
        toast.success("Cart cleared successfully");
      } else {
        toast.error(data.error || "Failed to clear cart");
      }
    } catch {
      toast.error("Error clearing cart");
    }
  };

  const handlePayment = async () => {
    if (!selectedAddress) {
      toast.error("Please select a shipping address.");
      return;
    }

    const sdkLoaded = await Razorpayscript();
    if (!sdkLoaded) {
      toast.error("Failed to load Razorpay SDK.");
      return;
    }

    const address = {
      line1: selectedAddress?.line1 || selectedAddress?.address?.line1 || "",
      city: selectedAddress?.city || selectedAddress?.address?.city || "",
      state: selectedAddress?.state || selectedAddress?.address?.state || "",
      pincode: selectedAddress?.pincode || selectedAddress?.address?.pincode || "",
    };

    if (!address.line1 || !address.city || !address.state || !address.pincode) {
      toast.error("Address information is incomplete.");
      return;
    }

    try {
      const res = await fetch(Api.CreateRazorpayOrder.url, {
        method: Api.CreateRazorpayOrder.method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: totalAmount,
          mobileNumber,
          address,
        }),
      });

      const data = await res.json();

      if (!data.orderId) {
        toast.error("Failed to create Razorpay order");
        return;
      }

      const options = {
        key: data.key,
        amount: data.amount,
        currency: data.currency,
        name: "LaMont Perfume",
        description: "Order Payment",
        order_id: data.orderId,
        handler: async function (response) {
          toast.success("Payment Successful!");

          const currentUser = JSON.parse(localStorage.getItem("user"));

          const orderData = {
            userId: currentUser._id,
            fullName: userInfo.fullName,
            email: userInfo.email,
            mobileNumber,
            address,
            items: cart.map((item) => ({
              productId: item.productId?._id,
              quantity: Number(item.quantity),
            })),
            totalAmount,
            paymentId: response.razorpay_payment_id,
          };

          try {
            const saveRes = await fetch(Api.placeOrder.url, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(orderData),
            });

            const result = await saveRes.json();

            if (saveRes.ok) {
              clearCart();
              toast.success("Order placed successfully!");
              navigate("/AllProduct");
            } else {
              console.error("Order Save Failed:", result);
              toast.error(result.error || "Order failed to save.");
            }
          } catch (err) {
            console.error("Order Save Error:", err);
            toast.error("Failed to store order.");
          }
        },
        prefill: {
          name: userInfo.fullName,
          email: userInfo.email,
          contact: mobileNumber,
        },
        theme: {
          color: "#000000",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment Init Error:", err);
      toast.error("Payment failed to initiate.");
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="max-w-md mx-auto py-8">
            <h3 className="text-xl font-bold font-['Jost'] mb-6 text-gray-900 text-center">
              Login / Guest Checkout
            </h3>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 shadow-sm">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mobile Number
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">+91</span>
                <input
                  type="text"
                  placeholder="Enter your 10-digit number"
                  className={`w-full pl-12 pr-4 py-3 border rounded-md outline-none transition-colors ${!isMobileValid && mobileNumber ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-black"
                    }`}
                  value={mobileNumber}
                  onChange={handleMobileNumberChange}
                  maxLength={10}
                />
              </div>
              {!isMobileValid && mobileNumber && (
                <p className="text-red-500 text-xs mt-1">
                  Please enter a valid 10-digit mobile number
                </p>
              )}
              <button
                onClick={() => {
                  if (!mobileNumber.trim()) {
                    toast.error("Please enter a mobile number");
                    return;
                  }
                  if (!isMobileValid) {
                    toast.error("Invalid mobile number");
                    return;
                  }
                  setStep(2);
                }}
                disabled={loading || !isMobileValid}
                className="bg-black text-white w-full py-3.5 rounded-md flex items-center justify-center gap-2 mt-6 hover:bg-gray-800 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue to Delivery <ArrowRight size={18} />
              </button>
            </div>


          </div>
        );
      case 2:
        return (
          <AddressForm
            setStep={setStep}
            cartItems={cart}
            totalAmount={totalAmount}
            userId={userId}
            mobileNumber={mobileNumber}
            setSelectedAddress={setSelectedAddress}
            setUserInfo={setUserInfo}
          />
        );
      case 3:
        return (
          <div className="max-w-lg mx-auto py-4">
            <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden mb-6">
              <div className="p-4 border-b border-gray-200 bg-gray-100 flex justify-between items-center">
                <h3 className="font-semibold text-gray-900">Review & Pay</h3>
                <button onClick={() => setStep(2)} className="text-xs text-blue-600 hover:underline">Change Address</button>
              </div>
              <div className="p-5">
                <div className="mb-4">
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Delivering To</p>
                  <h4 className="font-bold text-gray-900">{userInfo.fullName}</h4>
                  <p className="text-sm text-gray-600 mt-1">{mobileNumber}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    {`${selectedAddress?.line1 || selectedAddress?.address?.line1 || ""}, ${selectedAddress?.city || selectedAddress?.address?.city || ""} - ${selectedAddress?.pincode || selectedAddress?.address?.pincode || ""}`}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-gray-600 text-sm">Total Amount</span>
                    <span className="font-bold text-xl text-gray-900">₹{totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              className="bg-black text-white w-full py-4 rounded-md font-bold text-lg hover:bg-gray-800 transition-all shadow-lg flex items-center justify-center gap-2"
              onClick={handlePayment}
            >
              <i className="fa-solid fa-lock text-sm"></i> Pay Securely Now
            </button>

            <p className="text-center text-xs text-gray-500 mt-4 mb-8">
              <i className="fa-solid fa-shield-halved mr-1"></i>
              Your payment information is encrypted and secure.
            </p>

            {/* Trust Badges - Visible on Step 3 as well */}
            <div className="grid grid-cols-3 gap-3">
              <div className="flex flex-col items-center text-center p-3 bg-white border border-gray-100 rounded-lg shadow-[0px_2px_8px_rgba(0,0,0,0.05)]">
                <i className="fa-solid fa-shield-halved text-2xl text-gray-700 mb-2"></i>
                <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wide">Protect Privacy</p>
              </div>
              <div className="flex flex-col items-center text-center p-3 bg-white border border-gray-100 rounded-lg shadow-[0px_2px_8px_rgba(0,0,0,0.05)]">
                <i className="fa-solid fa-star text-2xl text-gray-700 mb-2"></i>
                <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wide">100% Satisfaction</p>
              </div>
              <div className="flex flex-col items-center text-center p-3 bg-white border border-gray-100 rounded-lg shadow-[0px_2px_8px_rgba(0,0,0,0.05)]">
                <i className="fa-solid fa-lock text-2xl text-gray-700 mb-2"></i>
                <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wide">Secure Payment</p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="px-4 py-12 mt-20 min-h-screen bg-white">
        <div className="flex flex-col lg:flex-row w-full max-w-6xl mx-auto bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.08)] rounded-lg border border-gray-100 overflow-hidden">
          {/* Order Summary Sidebar */}
          <div className="w-full lg:w-1/3 bg-white p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-gray-200">
            <h2 className="text-xl font-medium text-gray-800 flex justify-between items-center mb-6 font-['Jost']">
              Order Summary <ShoppingBag size={20} className="text-gray-600" />
            </h2>
            {loading ? (
              <p className="text-gray-500">Loading...</p>
            ) : (
              <>
                <div className="max-h-96 overflow-y-auto pr-2 space-y-4">
                  {cart.map((item) => (
                    <div key={item._id} className="flex items-start">
                      <div className="w-16 h-16 flex-shrink-0 border border-gray-200 rounded overflow-hidden">
                        <img
                          src={item.productId?.image?.[0] || "/placeholder.png"}
                          alt={item.productId?.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="ml-4 flex-1">
                        <p className="text-sm font-medium text-gray-900 line-clamp-2">{item.productId?.name}</p>
                        <div className="flex justify-between mt-2 text-sm text-gray-600">
                          <p>Qty: {item.quantity}</p>
                          <p className="font-medium">₹{item.productId?.realprice * item.quantity}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200 space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>₹{SHIPPING_COST.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold text-gray-900 pt-3 border-t border-gray-100 mt-3">
                    <span>Total</span>
                    <span>₹{totalAmount.toFixed(2)}</span>
                  </div>


                </div>
              </>
            )}
          </div>

          {/* Checkout Form Section */}
          <div className="w-full lg:flex-1 bg-white p-6 lg:p-8">
            <div className="flex items-center mb-8 border-b border-gray-200 pb-4">
              <div className={`flex items-center gap-2 cursor-pointer ${step === 1 ? "text-black font-semibold" : "text-gray-400"}`} onClick={() => setStep(1)}>
                <span className={`flex items-center justify-center w-6 h-6 rounded-full text-xs ${step === 1 ? "bg-black text-white" : "bg-gray-200 text-gray-600"}`}>1</span>
                <span className="hidden sm:inline">Contact</span>
              </div>
              <div className="mx-4 h-px w-8 bg-gray-300"></div>
              <div className={`flex items-center gap-2 cursor-pointer ${step === 2 ? "text-black font-semibold" : "text-gray-400"}`} onClick={() => setStep(2)}>
                <span className={`flex items-center justify-center w-6 h-6 rounded-full text-xs ${step === 2 ? "bg-black text-white" : "bg-gray-200 text-gray-600"}`}>2</span>
                <span className="hidden sm:inline">Address</span>
              </div>
              <div className="mx-4 h-px w-8 bg-gray-300"></div>
              <div className={`flex items-center gap-2 cursor-pointer ${step === 3 ? "text-black font-semibold" : "text-gray-400"}`} onClick={() => setStep(3)}>
                <span className={`flex items-center justify-center w-6 h-6 rounded-full text-xs ${step === 3 ? "bg-black text-white" : "bg-gray-200 text-gray-600"}`}>3</span>
                <span className="hidden sm:inline">Payment</span>
              </div>
            </div>

            <div className="min-h-[400px]">
              {renderStepContent()}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
