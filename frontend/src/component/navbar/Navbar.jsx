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
        className={`w-full shadow-sm bg-white z-20 transition-transform duration-300 ${showNavbar ? "translate-y-0" : "-translate-y-full"
          } sticky top-0`}
      >
        <div className="container mx-auto lg:px-50 relative">
          <div className="flex items-center justify-between py-4">
            <div className="md:hidden">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-2xl text-black"
              >
                {menuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
            {!isAdmin && (
              <div className="lg:flex items-center space-x-2 max-w-xs flex-1 justify-center">
                <SearchBar />
              </div>
            )}
            <div className="flex-1 text-center lg:flex-none">
              <Link to="/" className="text-xl font-bold tracking-wide">
                BELLAVITA<sup>®</sup>
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <div className="relative">
                <button
                  onClick={() => setIsCartOpen(true)}
                  className={`${user && !isAdmin ? "" : "invisible"} relative`}
                  title="Open Cart"
                >
                  <i className="fa-solid fa-cart-shopping text-2xl px-4 mt-1"></i>
                  {cartCount > 0 && (
                    <span className="absolute -top-2 right-2 bg-black text-white text-xs rounded-full px-1">
                      {cartCount}
                    </span>
                  )}
                </button>
              </div>
              <div className="relative">
                <button
                  onClick={() => setIsWishlistOpen(true)}
                  className={`${user && !isAdmin ? "" : "invisible"} relative`}
                  title="Open Wishlist"
                >
                  <FaHeart className="text-2xl mt-1" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1.5 -right-1 bg-black text-white text-xs rounded-full px-1">
                      {wishlistCount}
                    </span>
                  )}
                </button>
              </div>
              <Link
                to="/myorderspage"
                className={`${user && !isAdmin ? "" : "invisible"} text-sm hover:underline px-2`}
              >
                <i className="fa-solid fa-box text-2xl"></i>
              </Link>
              {user ? (
                <button
                  onClick={logoutUser}
                  className="bg-black text-white px-4 py-1 rounded-full text-sm hover:bg-gray-800 transition-colors duration-200"
                >
                  Logout
                </button>
              ) : (
                <Link to="/signup">
                  <i className="fa-solid fa-user text-2xl px-4"></i>
                </Link>
              )}
              {isAdmin && (
                <Link
                  to="/AdminDashboard"
                  className="bg-black text-white px-4 py-1 rounded-full text-sm hover:bg-gray-800 transition-colors duration-200 flex items-center gap-2"
                >
                  <i className="fa-solid fa-user-shield"></i>
                  Admin
                </Link>
              )}
            </div>
          </div>
          {!isAdmin && (
            <nav className="hidden md:flex justify-center space-x-8 text-xs font-medium py-2">
              <Link to="/allproduct" className={navLinkClass("/allproduct")}>Shop All</Link>
              <Link to="/BestSellers" className={navLinkClass("/BestSellers")}>BESTSELLERS</Link>
              <Link to="/perfumes" className={navLinkClass("/perfumes")}>PERFUMES</Link>
              <Link to="/bathbody" className={navLinkClass("/bathbody")}>Bath & Body</Link>
              <Link to="/newarrivals" className={navLinkClass("/newarrivals")}>NEW ARRIVALS</Link>
              <Link to="/gifting" className={navLinkClass("/gifting")}>GIFTING</Link>
            </nav>
          )}
          {menuOpen && (
            <div className="md:hidden bg-white shadow-md border-t" role="menu">
              <ul className="flex flex-col items-center space-y-4 p-6 text-sm font-medium">
                {!isAdmin && (
                  <>
                    <Link to="/allproduct" className={navLinkClass("/allproduct")}>Shop All</Link>
                    <Link to="/BestSellers" className={navLinkClass("/BestSellers")}>BESTSELLERS</Link>
                    <Link to="/perfumes" className={navLinkClass("/perfumes")}>PERFUMES</Link>
                    <Link to="/bathbody" className={navLinkClass("/bathbody")}>Bath & Body</Link>
                    <Link to="/newarrivals" className={navLinkClass("/newarrivals")}>NEW ARRIVALS</Link>
                    <Link to="/gifting" className={navLinkClass("/gifting")}>GIFTING</Link>
                  </>
                )}

                {user && !isAdmin && (
                  <Link to="/myorders" className="text-gray-700 hover:underline">My Orders</Link>
                )}

                {isAdmin && (
                  <Link to="/AdminDashboard" className="text-gray-700 hover:underline">Admin Dashboard</Link>
                )}

                {user ? (
                  <button onClick={logoutUser} className="text-black font-semibold">Logout</button>
                ) : (
                  <Link to="/signup">Sign Up / Login</Link>
                )}
              </ul>
            </div>
          )}
        </div>
      </header>
      {!isAdmin && (
        <BottomNav
          onOpenCart={() => setIsCartOpen(true)}
          onOpenWishlist={() => setIsWishlistOpen(true)}
          cartCount={cartCount}
          wishlistCount={wishlistCount}
          user={user}
          onLogout={logoutUser}
        />
      )}
      <CartPage isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <Wishlist isOpen={isWishlistOpen} onClose={() => setIsWishlistOpen(false)} />
    </>
  );
}
