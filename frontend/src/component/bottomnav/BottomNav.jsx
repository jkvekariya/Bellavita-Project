import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaHeart, FaShoppingCart, FaUser, FaBox, FaSignOutAlt } from "react-icons/fa";
import { MdStore } from "react-icons/md";

export default function BottomNav({ onOpenCart, onOpenWishlist, cartCount, wishlistCount, user, onLogout }) {
  const location = useLocation();

  const navItems = [
    {
      to: "/",
      label: "HOME",
      icon: <FaHome />,
      type: "link",
    },
    {
      label: "WISHLIST",
      icon: <FaHeart />,
      type: "button",
      onClick: onOpenWishlist,
      count: wishlistCount,
    },
    {
      to: "/allproduct",
      label: "SHOP",
      icon: <MdStore />,
      type: "link",
    },
    {
      label: "CART",
      icon: <FaShoppingCart />,
      type: "button",
      onClick: onOpenCart,
      count: cartCount,
    },
  ];

  if (user) {
    navItems.push(
      {
        to: "/myorderspage",
        label: "MY ORDERS",
        icon: <FaBox />,
        type: "link",
      },
      {
        label: "LOGOUT",
        icon: <FaSignOutAlt />,
        type: "button",
        onClick: onLogout,
      }
    );
  } else {
    navItems.push({
      to: "/signup",
      label: "ACCOUNT",
      icon: <FaUser />,
      type: "link",
    });
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-md border-t border-gray-200 z-50 md:hidden flex justify-between px-2 py-2">
      {navItems.map((item, index) => {
        if (item.type === "link") {
          return (
            <Link
              key={index}
              to={item.to}
              className={`flex flex-col items-center text-xs ${location.pathname === item.to ? "text-black font-medium" : "text-gray-600"
                }`}
            >
              <div className="relative text-lg">
                {item.icon}
                {item.count > 0 && (
                  <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full px-1">
                    {item.count}
                  </span>
                )}
              </div>
              <span className="mt-1">{item.label}</span>
            </Link>
          );
        } else if (item.type === "button") {
          return (
            <button
              key={index}
              onClick={item.onClick}
              className="relative flex flex-col items-center text-xs text-gray-600 focus:outline-none"
              aria-label={item.label}
              type="button"
            >
              <div className="relative text-lg">
                {item.icon}
                {item.count > 0 && (
                  <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full px-1">
                    {item.count}
                  </span>
                )}
              </div>
              <span className="mt-1">{item.label}</span>
            </button>
          );
        }
        return null;
      })}
    </nav>
  );
}
