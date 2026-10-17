
import React, { useContext, useEffect } from "react";
import NavComponent from "../component/NavComponent";
import Categiries from "../Categiries";
import Card from "../component/Card";
import { food_items } from "../Food";
import { dataContext } from "../contennt/UserContext";
import { RxCross1 } from "react-icons/rx";
import Card2 from "../component/Card2";
import { useSelector } from "react-redux";
import { handleSuccess } from "../component/utill";

function Home() {
  const {
    cate,
    setcate,
    input,
    showCart,
    setshowCart,
  } = useContext(dataContext);

  const items = useSelector((state) => state.cart);

  // Category filtering
  const filter = (category) => {
    if (category === "All") {
      setcate(food_items);
    } else {
      const newlist = food_items.filter(
        (item) => item.food_category === category
      );
      setcate(newlist);
    }
  };

  // Cart calculations
  const subtotal = items.reduce(
    (total, item) => total + item.qty * item.price,
    0
  );

  const deliveryFee = items.length > 0 ? 20 : 0;
  const taxes = (subtotal * 0.5) / 100;
  const total = Math.floor(subtotal + deliveryFee + taxes);

  // Disable background scrolling when cart is open
  useEffect(() => {
    if (showCart) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [showCart]);

  // Close cart with Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setshowCart(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [setshowCart]);

  return (
    <div className="min-h-screen w-full bg-slate-200">

      {/* Navbar */}
      <NavComponent />

      {/* Categories */}
      {!input && (
        <section className="w-full px-3 py-4 sm:px-6 md:py-6">

          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-4 md:grid-cols-5 lg:grid-cols-7">

            {Categiries.map((item, index) => (
              <button
                type="button"
                key={index}
                onClick={() => filter(item.name)}
                className="
                  flex min-h-[105px] flex-col
                  items-center justify-center
                  gap-3 rounded-xl bg-white
                  p-2 text-center shadow-md
                  transition-all duration-200
                  hover:bg-green-100 hover:shadow-lg
                  sm:min-h-[130px] sm:p-4
                  md:min-h-[150px]
                "
              >
                <div className="flex items-center justify-center text-3xl text-green-600 sm:text-4xl">
                  {item.image}
                </div>

                <span className="break-words text-xs font-semibold text-gray-700 sm:text-sm md:text-base">
                  {item.name}
                </span>
              </button>
            ))}

          </div>
        </section>
      )}

      {/* Food Items */}
      <main className="w-full px-3 pb-10 pt-5 sm:px-6 md:px-8">

        {cate.length > 0 ? (
          <div className="grid grid-cols-2 justify-items-center gap-3 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">

            {cate.map((item) => (
              <Card
                key={item.id}
                id={item.id}
                name={item.food_name}
                image={item.food_image}
                price={item.price}
                type={item.food_type}
              />
            ))}

          </div>
        ) : (
          <div className="flex min-h-[200px] items-center justify-center px-4 text-center">
            <h2 className="text-xl font-semibold text-green-600 sm:text-3xl">
              No Dish Found
            </h2>
          </div>
        )}

      </main>

      {/* Cart Overlay */}
      {showCart && (
        <div
          className="fixed inset-0 z-40 bg-black/50"
          onClick={() => setshowCart(false)}
          aria-hidden="true"
        />
      )}

      {/* Cart Sidebar */}
      <aside
        role="dialog"
        aria-modal={showCart}
        aria-label="Shopping cart"
        aria-hidden={!showCart}
        inert={!showCart}
        className={`
          fixed right-0 top-0 z-50
          flex h-[100dvh] w-full
          flex-col bg-white shadow-2xl
          transition-transform duration-300
          sm:w-[420px] md:w-[450px]
          ${showCart ? "translate-x-0" : "translate-x-full"}
        `}
      >

        {/* Cart Header */}
        <header className="flex shrink-0 items-center justify-between border-b border-gray-200 px-4 py-4 sm:px-6">

          <h2 className="text-lg font-bold text-green-600 sm:text-xl">
            Your Cart ({items.length})
          </h2>

          <button
            type="button"
            onClick={() => setshowCart(false)}
            aria-label="Close cart"
            className="rounded-lg p-2 text-green-600 transition hover:bg-gray-100 hover:text-gray-800"
          >
            <RxCross1 className="text-xl" />
          </button>

        </header>

        {/* Cart Content */}
        {items.length > 0 ? (
          <>
            {/* Scrollable Cart Items */}
            <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-3 py-4 sm:px-5">

              {items.map((item) => (
                <Card2
                  key={item.id}
                  name={item.name}
                  price={item.price}
                  image={item.image}
                  id={item.id}
                  qty={item.qty}
                />
              ))}

            </div>

            {/* Cart Summary */}
            <div className="shrink-0 border-t border-gray-200 bg-white px-4 py-4 sm:px-6">

              <div className="space-y-3">

                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-medium text-gray-600 sm:text-base">
                    Subtotal
                  </span>
                  <span className="text-sm font-semibold text-green-600 sm:text-base">
                    ₹{subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-medium text-gray-600 sm:text-base">
                    Delivery Fee
                  </span>
                  <span className="text-sm font-semibold text-green-600 sm:text-base">
                    ₹{deliveryFee.toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-medium text-gray-600 sm:text-base">
                    Taxes (0.5%)
                  </span>
                  <span className="text-sm font-semibold text-green-600 sm:text-base">
                    ₹{taxes.toFixed(2)}
                  </span>
                </div>

              </div>

              {/* Total */}
              <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4">
                <span className="text-lg font-bold text-gray-800 sm:text-xl">
                  Total
                </span>
                <span className="text-lg font-bold text-green-600 sm:text-xl">
                  ₹{total}
                </span>
              </div>

              {/* Place Order Button */}
              <button
                type="button"
                onClick={() => handleSuccess("Your order placed")}
                className="mt-4 w-full rounded-lg bg-green-500 py-3 text-base font-semibold text-white transition-all duration-200 hover:bg-green-600 active:scale-[0.98] sm:text-lg"
              >
                Place Order
              </button>

            </div>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-4 text-center">

            <span className="text-6xl">🛒</span>

            <h3 className="text-xl font-semibold text-gray-700">
              Your Cart is Empty
            </h3>

            <p className="text-sm text-gray-500">
              Add some delicious food to your cart!
            </p>

            <button
              type="button"
              onClick={() => setshowCart(false)}
              className="rounded-lg bg-green-500 px-6 py-3 font-semibold text-white transition hover:bg-green-600"
            >
              Explore Food
            </button>

          </div>
        )}

      </aside>

    </div>
  );
}

export default Home;
