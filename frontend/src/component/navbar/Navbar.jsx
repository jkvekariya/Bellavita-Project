import React, { useContext, useState, useEffect } from "react";
import { FaHeart, FaBars, FaTimes } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Context from "../context/Context";
import SearchBar from "../searchbar/SearchBar";
import BottomNav from "../../component/bottomnav/BottomNav";
import toast from "react-hot-toast";
import CartPage from "../pages/cart/CartPage";
import Wishlist from "../wishlist/Wishlist";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const {
    cartCount,
    setCartCount,
    wishlistCount,
    setWishlistCount,
    user,
    setUser,
    isCartOpen,
    setIsCartOpen,
    isWishlistOpen,
    setIsWishlistOpen,
  } = useContext(Context);

  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setShowNavbar(window.scrollY <= lastScrollY);
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    setIsCartOpen(false);
    setIsWishlistOpen(false);
  }, [location.pathname]);

  const navLinkClass = (path) =>
    `relative uppercase tracking-widest px-1 pb-1
     ${location.pathname === path ? "text-black font-medium" : "text-gray-700"}
     after:block after:h-[1px] after:bg-gray-400
     after:scale-x-0 hover:after:scale-x-100
     after:transition-transform after:duration-300 after:origin-left
     ${location.pathname === path ? "after:scale-x-100" : "after:scale-x-0"}`;

  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    if (typeof setUser === "function") setUser(null);
    if (typeof setCartCount === "function") setCartCount(0);
    if (typeof setWishlistCount === "function") setWishlistCount(0);
    toast.success("Logout successful");
    if (location.pathname !== "/") navigate("/");
  };

  const isAdmin = user?.role === "ADMIN";

  return (
    <>
      <header
        className={`w-full shadow-md bg-white z-20 transition-transform duration-300 ${showNavbar ? "translate-y-0" : "-translate-y-full"
          } sticky top-0 px-6 md:px-12 lg:px-24`}
      >
        <div className="container mx-auto">
          <div className="flex items-center justify-between py-5 gap-8">
            {/* Left: Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="text-xl md:text-2xl font-bold tracking-[0.2em] font-['Jost']">
                BELLAVITA
              </Link>
            </div>

            {/* Middle: Premium Search box */}
            <div className="hidden lg:flex flex-1 justify-center max-w-2xl mx-auto">
              <SearchBar />
            </div>

            {/* Right: Icons and Logo */}
            <div className="flex items-center space-x-4 md:space-x-8">
              {user ? (
                <>
                  {/* Profile Icon */}
                  <Link
                    to="/myorderspage"
                    className="transition-transform hover:scale-110"
                    title="My Profile"
                  >
                    <i className="fa-solid fa-user text-xl md:text-1xl"></i>
                  </Link>

                  {/* Wishlist Icon */}
                  <button
                    onClick={() => setIsWishlistOpen(true)}
                    className="relative transition-transform hover:scale-110"
                    title="Wishlist"
                  >
                    <FaHeart className="text-xl md:text-1xl" />
                    {wishlistCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-bold">
                        {wishlistCount}
                      </span>
                    )}
                  </button>

                  {/* Cart Icon */}
                  <button
                    onClick={() => setIsCartOpen(true)}
                    className="relative transition-transform hover:scale-110"
                    title="Cart"
                  >
                    <i className="fa-solid fa-cart-shopping text-xl md:text-1xl"></i>
                    {cartCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-bold">
                        {cartCount}
                      </span>
                    )}
                  </button>

                  {/* Logout Button */}
                  <button
                    onClick={logoutUser}
                    className="border border-black text-black px-4 md:px-5 py-2 rounded-full text-[10px] md:text-xs hover:bg-black hover:text-white transition-all font-['Jost'] uppercase tracking-widest"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/signup" className="transition-transform hover:scale-110 flex items-center gap-2">
                  <i className="fa-solid fa-user text-xl md:text-2xl"></i>
                </Link>
              )}

              {/* Right Logo identifier as requested */}
              <div className="hidden xl:block border-l border-gray-200 pl-4 md:pl-8">
                <Link to="/" className="text-xs font-bold tracking-widest font-['Jost'] uppercase opacity-60 hover:opacity-100 transition-opacity">
                  LUXURY
                </Link>
              </div>
            </div>
          </div>
          <nav className="hidden md:flex justify-center space-x-8 text-xs font-medium py-2">
            <Link to="/" className={navLinkClass("/")}>HOME</Link>
            <Link to="/allproduct" className={navLinkClass("/allproduct")}>Shop All</Link>

            <Link to="/BestSellers" className={navLinkClass("/BestSellers")}>BESTSELLERS</Link>
            <Link to="/perfumes" className={navLinkClass("/perfumes")}>PERFUMES</Link>
            <Link to="/bathbody" className={navLinkClass("/bathbody")}>Bath & Body</Link>
            <Link to="/newarrivals" className={navLinkClass("/newarrivals")}>NEW ARRIVALS</Link>
            <Link to="/gifting" className={navLinkClass("/gifting")}>GIFTING</Link>
          </nav>
          {menuOpen && (
            <div className="md:hidden bg-white shadow-md border-t" role="menu">
              <ul className="flex flex-col items-center space-y-4 p-6 text-sm font-medium">
                <>
                  <Link to="/" className={navLinkClass("/")} onClick={() => setMenuOpen(false)}>HOME</Link>
                  <Link to="/allproduct" className={navLinkClass("/allproduct")} onClick={() => setMenuOpen(false)}>Shop All</Link>
                  <Link to="/BestSellers" className={navLinkClass("/BestSellers")} onClick={() => setMenuOpen(false)}>BESTSELLERS</Link>
                  <Link to="/perfumes" className={navLinkClass("/perfumes")} onClick={() => setMenuOpen(false)}>PERFUMES</Link>
                  <Link to="/bathbody" className={navLinkClass("/bathbody")} onClick={() => setMenuOpen(false)}>Bath & Body</Link>
                  <Link to="/newarrivals" className={navLinkClass("/newarrivals")} onClick={() => setMenuOpen(false)}>NEW ARRIVALS</Link>
                  <Link to="/gifting" className={navLinkClass("/gifting")} onClick={() => setMenuOpen(false)}>GIFTING</Link>
                </>

                {user && (
                  <>
                    <Link to="/myorderspage" className="text-gray-700 hover:underline" onClick={() => setMenuOpen(false)}>My Orders</Link>
                    <Link to="/myqueries" className="text-gray-700 hover:underline" onClick={() => setMenuOpen(false)}>My Inquiries</Link>
                  </>
                )}

                {user ? (
                  <button onClick={() => { logoutUser(); setMenuOpen(false); }} className="text-black font-semibold">Logout</button>
                ) : (
                  <Link to="/signup" onClick={() => setMenuOpen(false)}>Sign Up / Login</Link>
                )}
              </ul>
            </div>
          )}
        </div>
      </header>
      <BottomNav
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        cartCount={cartCount}
        wishlistCount={wishlistCount}
        user={user}
        onLogout={logoutUser}
      />
      <CartPage isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <Wishlist isOpen={isWishlistOpen} onClose={() => setIsWishlistOpen(false)} />
    </>
  );
}
