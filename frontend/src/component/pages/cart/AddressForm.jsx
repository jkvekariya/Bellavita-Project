import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import Api from "../../../Apis/backendApi";

export default function AddressSelection({
  setStep,
  setSelectedAddress,
  setUserInfo,
}) {
  const [showForm, setShowForm] = useState(true);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState({
    line1: "",
    city: "",
    state: "",
    pincode: "",
  });

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await fetch(Api.currentUser.url, {
          method: Api.currentUser.method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
        });

        if (!response.ok) throw new Error("Failed to fetch addresses");

        const data = await response.json();
        const fetchedAddresses = data.addresses || [];
        setAddresses(fetchedAddresses);
        if (fetchedAddresses.length === 0) {
          setShowForm(true);
        }
      } catch (error) {
        console.error("Error fetching addresses:", error);
        toast.error("Failed to load addresses");
      } finally {
        setLoading(false);
      }
    };
    fetchAddresses();
  }, []);

  const handleSaveAddress = async (e) => {
    e.preventDefault();
    if (
      !fullName ||
      !email ||
      !address.line1 ||
      !address.city ||
      !address.state ||
      !address.pincode
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You are not logged in");
        return;
      }

      const response = await fetch(Api.saveAddress.url, {
        method: Api.saveAddress.method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          fullName,
          email,
          line1: address.line1,
          city: address.city,
          state: address.state,
          pincode: address.pincode,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to save address");
      }

      const savedAddresses = data.addresses;
      const newAddress = savedAddresses[savedAddresses.length - 1];

      setAddresses(savedAddresses);
      setSelectedAddress({
        fullName: newAddress.fullName,
        email: newAddress.email,
        address: {
          line1: newAddress.line1,
          city: newAddress.city,
          state: newAddress.state,
          pincode: newAddress.pincode,
        },
      });
      setUserInfo({ fullName: newAddress.fullName, email: newAddress.email });
      toast.success("Address saved and selected for delivery");
      setStep(3);
    } catch (error) {
      console.error("Error saving address:", error);
      toast.error(error.message || "Failed to save address");
    }
  };

  const handleSelectAddress = (addr) => {
    setSelectedAddress({
      fullName: addr.fullName,
      email: addr.email,
      address: {
        line1: addr.line1,
        city: addr.city,
        state: addr.state,
        pincode: addr.pincode,
      },
    });
    setUserInfo({ fullName: addr.fullName, email: addr.email });
    setStep(3);
  };

  if (loading) {
    return <div className="text-center py-8">Loading addresses...</div>;
  }

  return (
    <div className="max-w-xl mx-auto py-2">
      <h3 className="text-xl font-bold font-['Jost'] mb-6 text-gray-900">
        Shipping Address
      </h3>

      {showForm ? (
        <form onSubmit={handleSaveAddress} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full border border-gray-300 p-3.5 rounded-md outline-none focus:border-black transition-colors"
              required
            />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 p-3.5 rounded-md outline-none focus:border-black transition-colors"
              required
            />
          </div>
          <input
            type="text"
            placeholder="Address Line (House No, Street, Area)"
            value={address.line1}
            onChange={(e) =>
              setAddress({ ...address, line1: e.target.value })
            }
            className="w-full border border-gray-300 p-3.5 rounded-md outline-none focus:border-black transition-colors"
            required
          />
          <div className="grid grid-cols-3 gap-3">
            <input
              type="text"
              placeholder="City"
              value={address.city}
              onChange={(e) =>
                setAddress({ ...address, city: e.target.value })
              }
              className="w-full border border-gray-300 p-3.5 rounded-md outline-none focus:border-black transition-colors"
              required
            />
            <input
              type="text"
              placeholder="State"
              value={address.state}
              onChange={(e) =>
                setAddress({ ...address, state: e.target.value })
              }
              className="w-full border border-gray-300 p-3.5 rounded-md outline-none focus:border-black transition-colors"
              required
            />
            <input
              type="text"
              placeholder="Pincode"
              value={address.pincode}
              onChange={(e) =>
                setAddress({ ...address, pincode: e.target.value })
              }
              className="w-full border border-gray-300 p-3.5 rounded-md outline-none focus:border-black transition-colors"
              required
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="bg-gray-100 text-gray-800 flex-1 py-3.5 rounded-md hover:bg-gray-200 transition-colors font-medium border border-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-black text-white flex-1 py-3.5 rounded-md flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors font-medium"
            >
              Save & Continue <ArrowRight size={18} />
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-5">
          {addresses.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {addresses.map((addr, index) => (
                <div
                  key={index}
                  className="relative group border border-gray-200 p-5 rounded-lg cursor-pointer hover:border-black hover:shadow-md transition-all bg-white"
                  onClick={() => handleSelectAddress(addr)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-gray-900">{addr.fullName}</h4>
                    <span className="text-xs font-semibold bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      Deliver Here
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{addr.line1}</p>
                  <p className="text-sm text-gray-600 mb-2">
                    {addr.city}, {addr.state} - {addr.pincode}
                  </p>
                  <p className="text-xs text-gray-500">{addr.email}</p>

                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
              <p className="text-gray-500 mb-4">No saved addresses found.</p>
              <button
                onClick={() => setShowForm(true)}
                className="bg-black text-white px-6 py-2 rounded-md text-sm hover:bg-gray-800"
              >
                Add New Address
              </button>
            </div>
          )}

          {addresses.length > 0 && (
            <button
              onClick={() => setShowForm(true)}
              className="w-full border border-dashed border-gray-400 p-4 rounded-lg text-center hover:bg-gray-50 hover:border-black text-gray-600 font-medium transition-all flex items-center justify-center gap-2"
            >
              <i className="fa-solid fa-plus text-sm"></i> Add a new address
            </button>
          )}

          <button
            onClick={() => setStep(1)}
            className="text-gray-500 w-full py-2 hover:text-black hover:underline transition-colors text-sm"
          >
            &larr; Back to Contact Info
          </button>
        </div>
      )}

      {/* Trust Badges - Step 2 */}
      <div className="grid grid-cols-3 gap-3 mt-10 border-t border-gray-100 pt-6">
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
}

