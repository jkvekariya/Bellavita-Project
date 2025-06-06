import React, { useState, useEffect, useRef } from 'react';

const FilterSortBar = ({ products, onFilteredSorted }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [availability, setAvailability] = useState({ inStock: false, outOfStock: false });
  const [priceRange, setPriceRange] = useState([0, 1699]);
  const [productType, setProductType] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState('');

  const dropdownRef = useRef(null);
  const filterRef = useRef(null);
  const productSectionRef = useRef(null);

  const toggleCheckbox = (type) => {
    setAvailability({ ...availability, [type]: !availability[type] });
  };

  const handleClear = () => {
    setAvailability({ inStock: false, outOfStock: false });
    setPriceRange([0, 1699]);
    setProductType('');
    setSelectedSort('');
    onFilteredSorted(products);
  };

  const handleApply = () => setShowFilters(false);

  const handleFilterClick = () => {
    setShowFilters((prev) => {
      const newState = !prev;
      if (newState) {
        setTimeout(() => {
          productSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
      return newState;
    });
  };

  const sortProducts = (items, sortType) => {
    const sorted = [...items];
    switch (sortType) {
      case 'best-selling': return sorted.sort((a, b) => b.reviews - a.reviews);
      case 'price-low': return sorted.sort((a, b) => a.discountprice - b.discountprice);
      case 'price-high': return sorted.sort((a, b) => b.discountprice - a.discountprice);
      case 'date-old': return sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      case 'date-new': return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      default: return items;
    }
  };

  const filterProducts = (items) => {
    return items.filter((product) => {
      if (availability.inStock && !product.inStock) return false;
      if (availability.outOfStock && product.inStock) return false;
      if (product.discountprice < priceRange[0] || product.discountprice > priceRange[1]) return false;
      if (productType && product.type !== productType) return false;
      return true;
    });
  };

  useEffect(() => {
    const filtered = filterProducts(products);
    const sorted = selectedSort ? sortProducts(filtered, selectedSort) : filtered;
    onFilteredSorted(sorted);
  }, [availability, priceRange, productType, selectedSort, products]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setDropdownOpen(false);
      if (filterRef.current && !filterRef.current.contains(e.target)) setShowFilters(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="w-full relative">
      <div ref={dropdownRef} className="flex flex-wrap sm:flex-nowrap  items-center border border-black w-full sm:w-fit text-sm font-semibold z-10">
        <button className="bg-black text-white px-4 py-2 uppercase tracking-widest w-full sm:w-auto" onClick={handleFilterClick}>
          Filter <span className="ml-1">+</span>
        </button>

        <div className="relative w-full sm:w-auto">
          <button
            onClick={() => showFilters ? setShowFilters(false) : setDropdownOpen(!dropdownOpen)}
            className="relative overflow-hidden px-4 py-2 text-sm tracking-widest uppercase group flex items-center justify-between w-full"
          >
            <span className="relative z-10 text-black group-hover:text-white flex justify-between items-center w-full">
              Sort By
              <svg className="w-4 h-4 ml-20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </span>
            <span className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-0"></span>
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 bg-white shadow-md w-full sm:w-48 z-50">
              {[
                { label: 'Best Selling', value: 'best-selling' },
                { label: 'Price, Low to High', value: 'price-low' },
                { label: 'Price, High to Low', value: 'price-high' },
                { label: 'Date, Old to New', value: 'date-old' },
                { label: 'Date, New to Old', value: 'date-new' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setDropdownOpen(false);
                    setSelectedSort(option.value);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm hover:text-slate-600 flex items-center gap-2 ${selectedSort === option.value ? 'font-medium' : 'text-gray-700'}`}
                >
                  {selectedSort === option.value && <span className="w-2 h-[1px] bg-gray-700 inline-block"></span>}
                  <span className={selectedSort === option.value ? 'text-gray-500' : ''}>{option.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {!showFilters &&
        (availability.inStock || availability.outOfStock || productType || priceRange[0] > 0 || priceRange[1] < 1699) && (
          <div className="mt-2 flex flex-wrap gap-4 items-center text-sm text-black">
            <button onClick={handleClear} className="hover:underline flex items-center gap-1">
              <span>✕</span> Clear all
            </button>
            {(priceRange[0] > 0 || priceRange[1] < 1699) && (
              <div className="flex items-center gap-1 text-gray-500">
                <span>✕</span> ₹{priceRange[0]} – ₹{priceRange[1]}
              </div>
            )}
          </div>
        )}

      {showFilters && (
        <div
          ref={filterRef}
          className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl bg-white shadow-[0_4px_10px_rgba(0,0,0,0.2)] absolute z-20 left-0 right-0 mx-auto"
        >
          <div>
            <h3 className="text-sm font-semibold mb-2">Availability</h3>
            <button className="text-xs underline text-gray-500 mb-2" onClick={() => setAvailability({ inStock: false, outOfStock: false })}>
              Reset
            </button>
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm">
                <input type="checkbox" checked={availability.inStock} onChange={() => toggleCheckbox('inStock')} />
                <span>In stock</span>
              </label>
              <label className="flex items-center space-x-2 text-sm">
                <input type="checkbox" checked={availability.outOfStock} onChange={() => toggleCheckbox('outOfStock')} />
                <span>Out of stock</span>
              </label>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-2">Price</h3>
            <button className="text-xs underline text-gray-500 mb-2" onClick={() => setPriceRange([0, 1699])}>
              Reset
            </button>
            <div className="space-y-4">
              <input
                type="range"
                min={0}
                max={1699}
                value={priceRange[0]}
                onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
                className="w-full h-1"
              />
              <input
                type="range"
                min={0}
                max={1699}
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
                className="w-full h-1"
              />
              <div className="text-sm">Price: ₹{priceRange[0]} – ₹{priceRange[1]}</div>
            </div>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-sm font-semibold mb-2">Product Type</h3>
            <button className="text-xs underline text-gray-500 mb-2" onClick={() => setProductType('')}>
              Reset
            </button>
            <label className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                checked={productType === 'attar'}
                onChange={() => setProductType(productType === 'attar' ? '' : 'attar')}
              />
              <span>Attar</span>
            </label>
          </div>

          <div className="md:col-span-2 flex items-center justify-between mt-4">
            <button onClick={handleApply} className="bg-black text-white px-8 py-2 uppercase text-sm">
              Apply
            </button>
            <button onClick={handleClear} className="text-sm text-black underline">
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterSortBar;
