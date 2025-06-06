import React, { createContext, useEffect, useState } from "react";
import Api from "../../Apis/backendApi";
import axios from "axios";

const Context = createContext();

const ContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [user, setUser] = useState(null);

  const fetchCartCount = async () => {
    try {
      const res = await fetch(Api.getCartItemCount.url, {
        method: Api.getCartItemCount.method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      if (res.ok) setCartCount(data.count || 0);
    } catch (err) {
      console.error("Failed to fetch cart count:", err);
    }
  };

  const fetchWishlistCount = async () => {
    try {
      const res = await fetch(Api.getWishlistItemCount.url, {
        method: Api.getWishlistItemCount.method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      if (res.ok) setWishlistCount(data.count || 0);
    } catch (err) {
      console.error("Failed to fetch wishlist count:", err);
    }
  };

  const fetchCurrentUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setUser(null);
        return;
      }

      const response = await fetch(Api.currentUser.url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data);
      } else {
        setUser(null);
        localStorage.removeItem("token");
      }
    } catch (error) {
      console.error("Fetch current user error:", error);
      setUser(null);
      localStorage.removeItem("token");
    }
  };


  const addToCart = (product) => {
    const existingItem = cartItems.find(item => item._id === product._id);
    if (existingItem) {
      const updated = cartItems.map(item =>
        item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updated);
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const addToWishlist = (product) => {
    const exists = wishlistItems.find(item => item._id === product._id);
    if (!exists) {
      setWishlistItems([...wishlistItems, product]);
    }
  };

  useEffect(() => {
    const total = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(total);
  }, [cartItems]);

  useEffect(() => {
    setWishlistCount(wishlistItems.length);
  }, [wishlistItems]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchQuery.trim()) {
        axios(Api.searchProducts(searchQuery))
          .then(res => setSearchResults(res.data))
          .catch(err => console.error(err));
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);


  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <Context.Provider
      value={{
        cartItems,
        addToCart,
        wishlistItems,
        addToWishlist,
        user,
        setUser, 
        fetchCurrentUser, 
        searchQuery,
        setSearchQuery,
        searchResults,
        cartCount,
        setCartCount,
        fetchCartCount,
        wishlistCount,
        setWishlistCount,
        fetchWishlistCount,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
      }}
    >

      {children}
    </Context.Provider>
  );
};
export { ContextProvider };
export default Context;
