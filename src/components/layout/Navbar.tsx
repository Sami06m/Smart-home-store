import { useState } from "react";
import { Heart, Menu, Search, ShoppingCart, User, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartItemCount } from "../../features/cart/cartSlice";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Categories", path: "/categories" },
    { name: "Deals", path: "/deals" },
  ];

  const cartItemCount = useSelector(selectCartItemCount);
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-bold tracking-tight text-slate-900"
        >
          Smart<span className="text-blue-600">Home</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive
                    ? "text-blue-600"
                    : "text-slate-600 hover:text-blue-600"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-1">
          {/* Search */}
          <button
            type="button"
            aria-label="Search"
            className="hidden rounded-full p-2.5 text-slate-600 transition hover:bg-slate-100 hover:text-blue-600 sm:flex"
          >
            <Search size={20} strokeWidth={1.8} />
          </button>

          {/* Wishlist */}
          <button
            type="button"
            aria-label="Wishlist"
            className="hidden rounded-full p-2.5 text-slate-600 transition hover:bg-slate-100 hover:text-blue-600 sm:flex"
          >
            <Heart size={20} strokeWidth={1.8} />
          </button>

          {/* Cart */}
          <button
            type="button"
            aria-label="Shopping cart"
            className="relative rounded-full p-2.5 text-slate-600 transition hover:bg-slate-100 hover:text-blue-600"
          >
            <ShoppingCart size={20} strokeWidth={1.8} />

            <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-blue-600 px-1 text-[10px] font-semibold text-white">
              {cartItemCount}
            </span>
          </button>

          {/* Account */}
          <button
            type="button"
            aria-label="Account"
            className="hidden rounded-full p-2.5 text-slate-600 transition hover:bg-slate-100 hover:text-blue-600 sm:flex"
          >
            <User size={20} strokeWidth={1.8} />
          </button>

          {/* Mobile Menu */}
          <button
            type="button"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="rounded-full p-2.5 text-slate-700 transition hover:bg-slate-100 lg:hidden"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="border-t border-slate-100 bg-white lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-3 sm:px-6">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
