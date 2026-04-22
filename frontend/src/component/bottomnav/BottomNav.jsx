import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function BottomNav({ onOpenCart, onOpenWishlist, cartCount, wishlistCount, user, onLogout }) {
  const location = useLocation();

  const navItems = [
    {
      to: "/",
      label: "HOME",
      icon: <i className="fa-solid fa-house"></i>,
      type: "link",
    },
    {
      label: "WISHLIST",
      icon: <i className="fa-solid fa-heart"></i>,
      type: "button",
      onClick: onOpenWishlist,
      count: wishlistCount,
    },
    {
      to: "/allproduct",
      label: "SHOP",
      icon: <i className="fa-solid fa-shop"></i>,
      type: "link",
    },
    {
      label: "CART",
      icon: <i className="fa-solid fa-cart-shopping"></i>,
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
        icon: <i className="fa-solid fa-box"></i>,
        type: "link",
      },
      {
        label: "LOGOUT",
        icon: <i className="fa-solid fa-right-from-bracket"></i>,
        type: "button",
        onClick: onLogout,
      }
    );
  } else {
    navItems.push({
      to: "/signup",
      label: "ACCOUNT",
      icon: <i className="fa-solid fa-user"></i>,
      type: "link",
    });
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.05)] border-t border-gray-200 z-50 md:hidden flex justify-between px-2 py-2 overflow-x-auto min-w-full">
      {navItems.map((item, index) => {
        if (item.type === "link") {
          return (
            <Link
              key={index}
              to={item.to}
              className={`flex flex-col items-center justify-center text-[10px] sm:text-xs px-2 flex-shrink-0 ${location.pathname === item.to ? "text-black font-bold" : "text-black font-medium"
                }`}
            >
              <div className="relative text-lg sm:text-xl mb-1">
                {item.icon}
                {item.count > 0 && (
                  <span className="absolute -top-2 -right-3 bg-black text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center">
                    {item.count}
                  </span>
                )}
              </div>
              <span className="mt-0.5 tracking-wider uppercase whitespace-nowrap">{item.label}</span>
            </Link>
          );
        } else if (item.type === "button") {
          return (
            <button
              key={index}
              onClick={item.onClick}
              className="relative flex flex-col items-center justify-center text-[10px] sm:text-xs text-black font-medium focus:outline-none px-2 flex-shrink-0"
              aria-label={item.label}
              type="button"
            >
              <div className="relative text-lg sm:text-xl mb-1">
                {item.icon}
                {item.count > 0 && (
                  <span className="absolute -top-2 -right-3 bg-black text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center">
                    {item.count}
                  </span>
                )}
              </div>
              <span className="mt-0.5 tracking-wider uppercase whitespace-nowrap">{item.label}</span>
            </button>
          );
        }
        return null;
      })}
    </nav>
  );
}
