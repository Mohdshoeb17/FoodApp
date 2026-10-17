
import React from "react";
import { LuLeafyGreen } from "react-icons/lu";
import { GiChickenOven } from "react-icons/gi";
import { useDispatch } from "react-redux";
import { AddItem } from "../redux/cartSlice";
import { toast } from "react-toastify";

function Card(props) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      AddItem({
        id: props.id,
        name: props.name,
        price: props.price,
        image: props.image,
        qty: 1,
      })
    );

    toast.success("Item Added");
  };

  return (
    <div
      className="
        w-full
        max-w-[320px]
        sm:max-w-[280px]
        bg-white
        p-3 sm:p-4
        rounded-xl
        flex flex-col
        gap-3
        shadow-md
        border-2 border-transparent
        hover:border-green-500
        hover:shadow-xl
        transition-all duration-300
        h-full
      "
    >

      {/* Food Image */}
      <div className="w-full aspect-[4/3] overflow-hidden rounded-lg">
        <img
          src={props.image}
          alt={props.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Food Name */}
      <h2 className="text-base sm:text-xl font-semibold text-gray-800 line-clamp-2">
        {props.name}
      </h2>

      {/* Price and Food Type */}
      <div className="flex justify-between items-center gap-2">

        <span className="text-green-600 font-bold text-sm sm:text-lg">
          ₹{props.price}
        </span>

        <div className="flex items-center gap-1 text-green-600 font-semibold">
          {props.type === "veg" ? (
            <LuLeafyGreen className="text-lg sm:text-xl" />
          ) : (
            <GiChickenOven className="text-lg sm:text-xl" />
          )}

          <span className="text-xs sm:text-base capitalize">
            {props.type}
          </span>
        </div>
      </div>

      {/* Add To Cart Button */}
      <button
        type="button"
        onClick={handleAddToCart}
        className="
          w-full
          mt-auto
          bg-green-400
          py-2 sm:py-3
          rounded-lg
          text-sm sm:text-lg
          font-semibold
          text-gray-800
          hover:bg-green-500
          active:scale-95
          transition-all duration-200
        "
      >
        Add to Dish
      </button>

    </div>
  );
}

export default Card;
