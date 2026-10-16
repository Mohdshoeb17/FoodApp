import React, { useContext, useEffect, useState } from 'react'
import NavComponent from '../component/NavComponent'
import Categiries from '../Categiries'
import Card from '../component/Card'
import { food_items } from './../Food';
import { dataContext } from '../contennt/UserContext';
import { RxCross1 } from "react-icons/rx";
import Card2 from '../component/Card2';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { handleError, handleSuccess } from '../component/utill'
import {   useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
function Home() {
  const navigate=useNavigate()
 const [loggedInUser,setloggedInUser]=useState('')
  useEffect(()=>{
  setloggedInUser(localStorage.getItem('loggedInUser'))
  })
  // const handleLogout=(e)=>{
  //   // const user=useContext(dataContext())
  //   // console.log(user);
  //   localStorage.removeItem('token')
  //   localStorage.removeItem('loggedInUser')
  //   setTimeout(()=>{
  //    navigate('/login')
  //   },1000)
  //   handleSuccess('User Logout')
  // }
  let {cate ,setcate,input,showCart,setshowCart}=useContext(dataContext)
  
  function filter(categery){
    console.log(categery);
    
     if(categery=="All")
     {
        setcate(food_items);
     }else{
         let newlist=food_items.filter((item)=>( item.food_category===categery))
         setcate(newlist);
     }
  }

 
 let items=useSelector(state=>state.cart)
  let subtotal=items.reduce((total,item)=>total+item.qty*item.price,0)
  let deliveryFee=20;
  let taxes=subtotal*0.5/100;
  let total= Math.floor(subtotal+deliveryFee+taxes);
   
  
  return (
    <div className='w-full min-h-[100vh] bg-slate-200'>
      <NavComponent/>
      {!input? <div className='flex flex-wrap justify-center items-center gap-6'>
        {Categiries.map((item,ind)=>{
        return <div key={ind} className='w-[140px] h-[150px] bg-white p-5 flex flex-col  items-start gap-5 text-xl font-semibold text-gray-600 rounded-lg shadow-lg hover:bg-green-200 cursor-pointer transition-all duration-200' onClick={()=>filter(item.name)}>
            {item.image}
            {item.name}
          </div>
          })}
           </div> :null}
            
            <div className='w-full flex flex-wrap gap-5 justify-center items-center  pt-8 pb-8 px-5 '>
            {cate.length>1 ?cate.map((item,ind)=>(
       <Card key={ind} id={item.id} name={item.food_name} image={item.food_image}   price={item.price}    type={item.food_type} />)):<div className='text-5xl text-green-500 font-semibold mt-10 '>
                 No Dis Found
      </div>}
    </div>
         
     <div className={` w-full md:w-[50vh] h-[100%] fixed top-0 right-0 bg-white shadow-md p-6 transition-all duration-500 flex flex-col  overflow-auto ${showCart ? "translate-x-0":"translate-x-full"} `}>
      <header className='flex justify-between  w[100%]  '>
        <span className='text-green-500 font-semibold text-[18px] '>Order Item</span>
        <RxCross1 className= '  w-[20px] h-[30px] text-green-500 font-bold   cursor-pointer hover:text-gray-800' onClick={function(){setshowCart(false)}} />
      </header>

      {items.length>0?
       <> <div className='w-full mt-7 flex flex-col gap-5 justify-center'>
        {items.map((item,ind)=>{
        return  <Card2 key={ind} name={item.name}  price={item.price} image={item.image} id={item.id} qty={item.qty} />
        })}
      
      </div> 
      <div className='w-full border-t-2 border-gray-400 mt-7 flex flex-col gap-4 p-8 border-b-2  ' >
       <div className='w-full flex justify-between items-center'>
        <span className='text-lg text-gray-600 font-semibold'>Subtotal</span>
        <span className='text-lg text-green-600 font-semibold'>Rs {subtotal} /-</span>
       </div>
      
       <div className='w-full flex justify-between items-center'>
        <span className='text-lg text-gray-600 font-semibold'>Delivary Fee</span>
        <span className='text-lg text-green-600 font-semibold'>Rs {deliveryFee}/-</span>
       </div>
      <div className='w-full flex justify-between items-center'>
        <span className='text-lg text-gray-600 font-semibold'>Taxes</span>
        <span className='text-lg text-green-600 font-semibold'>Rs {taxes}/-</span>
      </div>
      </div> 
       <div className='w-full flex justify-between items-center p-8'>
        <span className='text-2xl text-gray-600 font-semibold'>Total</span>
        <span className='text-2xl text-green-600 font-semibold'>Rs {total}/-</span>
      </div>
      <div className='w-full flex justify-center'>
      <button className= 'w-[80%] bg-green-400 p-2 rounded-md text-xl font-semibold text-gray-700 hover:bg-green-600 transition-all duration-200 ' onClick={function(){
     return handleSuccess('Your order placed')
      }}>Place Order</button>
      </div>
      </> :<div className='text-2xl text-green-500 text-center font-semibold mt-10 underline'>Empty Cart</div> }
  
   </div>

   {/*  */}
   
    
  </div>
)
}

export default Home
