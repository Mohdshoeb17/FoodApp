import React from 'react'
import image1 from "../assets/image1.avif"
import { LuLeafyGreen } from "react-icons/lu";
import { GiChickenOven } from "react-icons/gi";
import { useDispatch } from 'react-redux';
import { AddItem } from '../redux/cartSlice';
import { toast } from 'react-toastify';


function Card(props) {
  let dispatch=useDispatch()
  return (
    <div className='w-[280px] h-[400px] bg-white p-4 rounded-lg flex flex-col gap-3  shadow-lg  hover:border-2 border-green-500 '>
       <div className='w-[100%] h-[60%] overflow-hidden rounded-lg'>
        <img className='object-cover ' src={props.image} alt="" />
       </div> 
       <div className='text-2xl font-semibold'>
         {props.name}
       </div>
       <div className='flex justify-between items-center'>
     <div className='text-green-500 font-bold text-lg'> Rs {props.price}/-</div>
      <div className=' text-green-500 font-bold flex justify-center items-center gap-2'>{props.type=="veg" ? <LuLeafyGreen /> :<GiChickenOven />}<span className=' text-lg'>{props.type}</span></div>
       </div>
       <button  className='bg-green-300 p-2 rounded-md text-xl font-semibold text-gray-700 hover:bg-green-400 transition-all duration-200 ' onClick={function(){dispatch(AddItem({id:props.id ,name:props.name,price:props.price ,image:props.image,qty:1})); toast.success("Item Added")}}>Add to dish</button>
    </div>
  )
}

export default Card
