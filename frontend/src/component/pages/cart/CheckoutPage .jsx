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
    (acc, item) => acc + (item.productId?.realprice || 0) * item.quantity,
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
        key: "rzp_test_ovPLb7nFwiBEGM",
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
          <div className="flex justify-center items-center h-96">
            <div className="w-full max-w-xs p-5">
              <h3 className="text-xl text-center font-semibold mb-4">
                Enter Mobile Number
              </h3>
              <input
                type="text"
                placeholder="Enter your Mobile Number"
                className={`border rounded-md w-full p-2 mb-2 text-sm ${!isMobileValid ? "border-red-500" : "border-black"}`}
                value={mobileNumber}
                onChange={handleMobileNumberChange}
              />
              {!isMobileValid && (
                <p className="text-red-500 text-xs">
                  Mobile number must be 10 digits
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
                className="bg-black text-white w-full py-3 rounded-md flex items-center justify-center gap-2 mt-3"
              >
                Continue to Address <ArrowRight size={16} />
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
          <div>
            <h3 className="text-xl font-semibold mb-4">Shipping Address</h3>
            {selectedAddress ? (
              <div className="border p-4 rounded-md bg-gray-100 mb-6 text-sm">
                <p><strong>Name:</strong> {userInfo.fullName}</p>
                <p><strong>Email:</strong> {userInfo.email}</p>
                <p><strong>Mobile:</strong> {mobileNumber}</p>
                <p>
                  <strong>Address:</strong>{" "}
                  {`${selectedAddress.line1 || selectedAddress.address?.line1}, ${selectedAddress.city || selectedAddress.address?.city}, ${selectedAddress.state || selectedAddress.address?.state} - ${selectedAddress.pincode || selectedAddress.address?.pincode}`}
                </p>
              </div>
            ) : (
              <p className="text-red-500">No address selected.</p>
            )}
            <h3 className="text-xl font-semibold mb-4">Payment</h3>
            <button
              className="bg-black text-white w-full py-3 rounded-md"
              onClick={handlePayment}
            >
              Pay Now
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="px-4 py-6 mt-24 bg-[#f2f2f2] min-h-screen overflow-x-hidden">
        <div className="flex flex-col lg:flex-row w-full max-w-6xl mx-auto bg-white border border-slate-100 shadow-2xl rounded-2xl p-4">
          <div className="w-full lg:w-1/3 bg-[#f2f2f2] rounded-xl p-4 shadow-md mb-6 lg:mb-0 lg:mr-4">
            <h2 className="text-lg font-semibold flex justify-between mb-4">
              Order Summary <ShoppingBag size={24} />
            </h2>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <>
                <div className="max-h-60 overflow-y-auto pr-2">
                  {cart.map((item) => (
                    <div key={item._id} className="flex bg-white p-3 rounded-2xl items-center mb-4">
                      <img
                        src={item.productId?.image?.[0] || "/placeholder.png"}
                        alt={item.productId?.name}
                        className="w-14 h-14 rounded mr-3 object-cover"
                      />
                      <div className="text-sm">
                        <p className="font-medium">{item.productId?.name}</p>
                        <div className="flex justify-between mt-1 text-xs">
                          <p>Qty: {item.quantity}</p>
                          <p>₹{item.productId?.realprice * item.quantity}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-sm bg-white p-3 py-5 rounded-2xl pt-2 mt-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex mt-1 justify-between">
                    <span>Shipping</span>
                    <span>₹{SHIPPING_COST.toFixed(2)}</span>
                  </div>
                  <div className="flex border-t pt-2 justify-between font-bold mt-2">
                    <span>Total</span>
                    <span>₹{totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="w-full lg:flex-1 bg-white rounded-xl p-6">
            <div className="flex items-center border-b-2 pb-2 rounded-lg justify-between mb-4 text-sm font-medium">
              <span onClick={() => setStep(1)} className={step === 1 ? "font-bold text-black" : "text-gray-500"}>1. Contact</span>
              <span onClick={() => setStep(2)} className={step === 2 ? "font-bold text-black" : "text-gray-500"}>2. Address</span>
              <span onClick={() => setStep(3)} className={step === 3 ? "font-bold text-black" : "text-gray-500"}>3. Payment</span>
            </div>
            {renderStepContent()}
          </div>
        </div>
      </div>
    </Layout>
  );
}
