import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
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
        const response = await axios.get(Api.currentUser.url, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const fetchedAddresses = response.data.addresses || [];
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
      const response = await axios.post(
        Api.saveAddress.url,
        {
          fullName,
          email,
          line1: address.line1,
          city: address.city,
          state: address.state,
          pincode: address.pincode,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      const savedAddresses = response.data.addresses;
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
      toast.error("Failed to save address");
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
    <div className="max-w-2xl mx-auto px-4">
      <h3 className="text-xl font-semibold mb-4">Shipping Address</h3>

      {showForm ? (
        <form onSubmit={handleSaveAddress} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full border border-black p-2 rounded"
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-black p-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="Address Line (House No, Street, Area)"
            value={address.line1}
            onChange={(e) =>
              setAddress({ ...address, line1: e.target.value })
            }
            className="w-full border border-black p-2 rounded"
            required
          />
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="City"
              value={address.city}
              onChange={(e) =>
                setAddress({ ...address, city: e.target.value })
              }
              className="w-full border border-black p-2 rounded"
              required
            />
            <input
              type="text"
              placeholder="State"
              value={address.state}
              onChange={(e) =>
                setAddress({ ...address, state: e.target.value })
              }
              className="w-full border border-black p-2 rounded"
              required
            />
            <input
              type="text"
              placeholder="Pincode"
              value={address.pincode}
              onChange={(e) =>
                setAddress({ ...address, pincode: e.target.value })
              }
              className="w-full border border-black p-2 rounded"
              required
            />
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="bg-gray-200 text-black flex-1 py-3 rounded-md"
            >
              Choose from Saved Addresses
            </button>
            <button
              type="submit"
              className="bg-black text-white flex-1 py-3 rounded-md flex items-center justify-center gap-2"
            >
              Save and Continue <ArrowRight size={16} />
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          <button
            onClick={() => setShowForm(true)}
            className="w-full border border-black p-3 rounded-md text-center hover:bg-gray-50"
          >
            + Add a new address
          </button>

          {addresses.length > 0 ? (
            <div className="space-y-4">
              {addresses.map((addr, index) => (
                <div
                  key={index}
                  className="border border-gray-200 p-4 rounded-md cursor-pointer hover:border-black"
                  onClick={() => handleSelectAddress(addr)}
                >
                  <p className="font-medium">{addr.fullName}</p>
                  <p>{addr.line1}</p>
                  <p>
                    {addr.city}, {addr.state}, {addr.pincode}
                  </p>
                  <p className="text-gray-600">{addr.email}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center py-4 text-gray-500">
              You don’t have any saved addresses yet. Please add a new address to
              continue.
            </p>
          )}

          <button
            onClick={() => setStep(1)}
            className="bg-gray-200 text-black w-full py-3 rounded-md mt-4"
          >
            Back
          </button>
        </div>
      )}
    </div>
  );
}

