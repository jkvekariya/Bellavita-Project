import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Api from "../../Apis/backendApi";
import { FaSearch, FaTimes } from "react-icons/fa";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    const fetchResults = async () => {
      setLoading(true);
      try {
        const { url, method } = Api.searchProduct(query);
        const response = await fetch(url, { method });
        const contentType = response.headers.get("Content-Type");

        if (!response.ok || !contentType.includes("application/json")) {
          throw new Error("Invalid response");
        }

        const data = await response.json();
        setResults(data);
        setShowDropdown(true);
      } catch (err) {
        console.error("Search error:", err);
        setResults([]);
        setShowDropdown(false);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounce = setTimeout(fetchResults, 300);
    return () => clearTimeout(delayDebounce);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
        setActiveIndex(-1);
        if (window.innerWidth <= 425) {
          setMobileSearchOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    const handleKeyEscape = (e) => {
      if (e.key === "Escape") {
        setShowDropdown(false);
        setActiveIndex(-1);
        if (window.innerWidth <= 425) {
          setMobileSearchOpen(false);
        }
      }
    };
    document.addEventListener("keydown", handleKeyEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyEscape);
    };
  }, []);

  const handleKeyDown = (e) => {
    if (!showDropdown) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prevIndex) => (prevIndex + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prevIndex) => (prevIndex - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      if (activeIndex >= 0 && activeIndex < results.length) {
        const selectedProduct = results[activeIndex];
        navigate(`/productinfo/${selectedProduct._id}`);
        setQuery("");
        setShowDropdown(false);
        setMobileSearchOpen(false);
      }
    }
  };

  const toggleMobileSearch = () => {
    setMobileSearchOpen((prev) => !prev);
    if (!mobileSearchOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setShowDropdown(false);
      setActiveIndex(-1);
      setQuery("");
    }
  };

  return (
    <div className="relative w-full max-w-xl group">
      <div className="relative flex items-center w-full bg-[#f8f8f8] border border-gray-200 rounded-full transition-all duration-300 focus-within:bg-white focus-within:border-black focus-within:shadow-md">
        <FaSearch className="ml-5 text-gray-400 group-focus-within:text-black transition-colors" />
        <input
          type="text"
          placeholder="SEARCH LUXURY PERFUMES..."
          className="w-full bg-transparent px-4 py-2.5 outline-none text-xs md:text-sm tracking-widest font-['Jost'] text-black placeholder-gray-400"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            if (query.length >= 2 && results.length > 0) {
              setShowDropdown(true);
            }
          }}
          onKeyDown={handleKeyDown}
          ref={inputRef}
          autoComplete="off"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="mr-4 text-gray-400 hover:text-black"
          >
            <FaTimes />
          </button>
        )}
      </div>

      {showDropdown && results.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute left-0 right-0  bg-white border border-gray-200 rounded-md shadow-lg z-30 max-h-150 w-150 overflow-y-auto"
        >
          {results.map((product, index) => (
            <div
              key={product._id}
              className={`flex items-center p-2 cursor-pointer hover:bg-gray-100 ${index === activeIndex ? "bg-gray-100" : ""
                }`}
              onClick={() => {
                navigate(`/productinfo/${product._id}`);
                setQuery("");
                setShowDropdown(false);
                setMobileSearchOpen(false);
              }}
            >
              <img
                src={product.image?.[0] || "/placeholder.jpg"}
                alt={product.name}
                className="w-12 h-12 object-cover rounded mr-3"
              />
              <span className="text-sm text-gray-700">{product.name}</span>
            </div>
          ))}
        </div>
      )}

      {loading && (
        <div className="absolute right-3 top-2 text-gray-400 text-sm">Searching...</div>
      )}
    </div>
  );
};

export default SearchBar;
