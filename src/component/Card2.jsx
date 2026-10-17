
import React from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import {
  DecrementQty,
  IncrementQty,
  RemoveItem,
} from "../redux/cartSlice";

function Card2({ name, id, price, image, qty }) {
  const dispatch = useDispatch();

  const handleDecrement = () => {
    if (qty > 1) {
      dispatch(DecrementQty(id));
    }
  };

  const handleIncrement = () => {
    dispatch(IncrementQty(id));
  };

  const handleRemove = () => {
    dispatch(RemoveItem(id));
  };

  return (
    <div className="flex w-full items-center gap-3 rounded-xl bg-slate-100 p-3 shadow-md sm:gap-4 sm:p-4">

      {/* Food Image */}
      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg sm:h-28 sm:w-28">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Food Details */}
      <div className="flex min-w-0 flex-1 flex-col gap-3">

        {/* Name */}
        <h3 className="break-words text-sm font-bold text-gray-800 sm:text-lg">
          {name}
        </h3>

        {/* Quantity Controls */}
        <div className="flex h-9 w-24 items-center overflow-hidden rounded-lg border border-green-400 bg-white shadow-sm sm:h-10 sm:w-28">

          <button
            type="button"
            onClick={handleDecrement}
            disabled={qty <= 1}
            className="flex h-full w-1/3 items-center justify-center text-lg font-semibold transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-40"
          >
            -
          </button>

          <span className="flex h-full w-1/3 items-center justify-center bg-slate-200 text-sm font-semibold">
            {qty}
          </span>

          <button
            type="button"
            onClick={handleIncrement}
            className="flex h-full w-1/3 items-center justify-center text-lg font-semibold transition hover:bg-slate-200"
          >
            +
          </button>

        </div>
      </div>

      {/* Price & Delete */}
      <div className="flex shrink-0 flex-col items-end justify-between self-stretch py-1">

        <span className="text-sm font-bold text-green-600 sm:text-xl">
          ₹{price}
        </span>

        <button
          type="button"
          onClick={handleRemove}
          aria-label={`Remove ${name} from cart`}
          className="rounded-lg p-2 text-red-500 transition hover:bg-red-50 hover:text-red-600"
        >
          <RiDeleteBin5Line className="text-xl sm:text-2xl" />
        </button>

      </div>
    </div>
  );
}

export default Card2;
