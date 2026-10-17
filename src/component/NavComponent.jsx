
import React, { useContext, useEffect } from "react";
import { MdFastfood } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { FiShoppingBag } from "react-icons/fi";
import { dataContext } from "../contennt/UserContext";
import { food_items } from "../Food";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function NavComponent() {
  const {
    input,
    setinput,
    setcate,
    showCart,
    setshowCart,
    user,
    setUser,
  } = useContext(dataContext);

  const items = useSelector((state) => state.cart);
  const navigate = useNavigate();

  // Search filter
  useEffect(() => {
    const newlist = food_items.filter((item) =>
      item.food_name.toLowerCase().includes(input.toLowerCase())
    );
    setcate(newlist);
  }, [input, setcate]);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="w-full bg-gray-50 px-4 py-4 md:px-8">
      <div className="flex flex-wrap items-center justify-between gap-y-4 md:flex-nowrap md:gap-6">

        {/* Logo */}
        <Link
          to="/"
          className="order-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white shadow-md md:h-14 md:w-14"
        >
          <MdFastfood className="text-2xl text-green-500 md:text-3xl" />
        </Link>

        {/* Search Bar */}
        <form
          className="order-4 flex h-12 w-full items-center gap-3 rounded-lg bg-white px-4 shadow-md md:order-2 md:h-14 md:min-w-0 md:flex-1"
          onSubmit={(e) => e.preventDefault()}
        >
          <FaSearch className="shrink-0 text-lg text-green-500" />

          <input
            type="text"
            placeholder="Search food..."
            value={input}
            onChange={(e) => setinput(e.target.value)}
            className="w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-gray-400 md:text-lg"
          />
        </form>

        {/* Login / Logout */}
        <div className="order-2 ml-auto shrink-0 md:order-3 md:ml-0">
          {user ? (
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700 md:px-5 md:py-3 md:text-base"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="inline-block rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700 md:px-5 md:py-3 md:text-base"
            >
              Login
            </Link>
          )}
        </div>

        {/* Cart */}
        <button
          type="button"
          aria-label={`Open cart with ${items.length} items`}
          onClick={() => setshowCart(true)}
          className="order-3 relative flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white shadow-md md:order-4 md:h-14 md:w-14"
        >
          <FiShoppingBag className="text-2xl text-green-500 md:text-3xl" />

          {items.length > 0 && (
            <span className="absolute -right-1 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-green-600 px-1 text-xs font-bold text-white">
              {items.length}
            </span>
          )}
        </button>

      </div>
    </nav>
  );
}

export default NavComponent;
