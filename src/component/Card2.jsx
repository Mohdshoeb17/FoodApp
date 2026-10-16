import React from 'react'
import image1 from "../assets/image1.avif"
import { RiDeleteBin5Line } from "react-icons/ri";
import { useDispatch } from 'react-redux';
import { DecrementQty, IncrementQty, RemoveItem } from '../redux/cartSlice';
import { toast } from 'react-toastify';

function Card2({name,id ,price,image,qty}) {
  let dispatch=useDispatch()
  
  return (
    <div className='w-full h-[120px] p-2 shadow-lg  bg-slate-100 flex justify-between  items-center '>
      <div className='w-[60%] h-full flex '>
        <div className='w-[80%] h-full overflow-hidden rounded'>
            <img className='h-full object-cover rounded' src={image} alt="" />
        </div>
        <div className='w-[40%] h-full flex flex-col gap-2 items-center justify-center '>
           <div className='text-lg font-bold w-[100%]'>{name}</div>
           <div className='w-[100%] h-[35px] flex items-center rounded-lg overflow-hidden shadow-lg border-2 border-green-400 font-semibold  '>
            <button className='h-full w-[30%] bg-white flex justify-center items-center hover:bg-slate-200 ' onClick={()=>{
             if(qty>1) {dispatch(DecrementQty(id))}
             else{
              1
             }
              }}>-</button>
            <span className='w-[40%] h-full bg-slate-300 flex justify-center items-center'>{qty}</span>
            <button className='h-full w-[30%] bg-white flex justify-center items-center hover:bg-slate-200' onClick={()=>{dispatch(IncrementQty(id))}}>+</button>
           </div>
        </div>
      </div>
      <div className=' flex flex-col justify-start items-end gap-5 '>
        <span className='text-xl text-green-400 font-semibold'>Rs {price} /-</span>
        <RiDeleteBin5Line className='text-xl text-red-400 cursor-pointer' onClick={()=>{dispatch(RemoveItem(id))}} />
      </div>
    </div>
  )
  }

export default Card2
