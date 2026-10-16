import React, { useContext, useEffect } from 'react'
import { MdFastfood } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { FiShoppingBag } from "react-icons/fi";
import { dataContext } from '../contennt/UserContext';
import { food_items } from '../Food';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

function NavComponent() {
  let { input, setinput, cate, setcate, showCart, setshowCart, user, setUser } = useContext(dataContext)
  console.log(user);
  
  const items = useSelector(state => state.cart)
  const navigate = useNavigate()

  // search filter
  useEffect(() => {
    let newlist = food_items.filter((item) =>
      item.food_name.toLowerCase().includes(input.toLowerCase())
    )
    setcate(newlist)
  }, [input])

  // logout handler
    const handleLogout=(e)=>{
      // const user=useContext(dataContext())
      // console.log(user);
      localStorage.removeItem('token')
      localStorage.removeItem('loggedInUser')
      setTimeout(()=>{
       navigate('/login')
      },1000)
      handleSuccess('User Logout')
    }

  return (
    <div className='w-full h-[100px] flex justify-between items-center px-1 md:px-8'>
      {/* Logo */}
      <div className='p-3 bg-white flex items-center justify-center rounded-md shadow-xl'>
        <MdFastfood className=' md:w-[30px] md:h-[30px] text-green-500' />
      </div>

      {/* Search */}
      <form
        className='w-[50%] md:w-[70%] h-[45px] md:h-[60px] bg-white flex items-center px-5 gap-5 rounded-md shadow-md'
        onSubmit={(e) => e.preventDefault()}
      >
        <FaSearch className='text-green-500 w-[20px] h-[20px]' />
        <input
          className='outline-none  md:py-2 w-full text-[16px] md:text-xl'
          type="text"
          placeholder='search'
          onChange={(e) => setinput(e.target.value)}
          value={input}
        />
      </form>

      {/* Signup / Logout */}
      <div className='  md:text-[20px]'>
        {user ?  (<div>
                <button onClick={handleLogout} className='bg-green-600 md:px-3  py-1  md:py-2 text-white font-semibold'>logout</button>
               {/* <ToastContainer/> */}
            </div>
         ): (
          <Link to='/login'>
            <button className='bg-green-00 px-3 py-1 md:py-2 text-white font-semibold'>
              Login
            </button>
          </Link>
        )}
      </div>

      {/* Cart */}
      <div
        className='w-[40px] h-[40px] md:w-[55px] md:h-[55px] bg-white flex items-center justify-center rounded-md shadow-xl relative'
        onClick={() => setshowCart(true)}
      >
        <span className='absolute top-0 right-2 text-green-500 font-bold  text-[14px] md:text-[18px] cursor-pointer'>
          {items.length}
        </span>
        <FiShoppingBag className=' md:w-[30px] md:h-[30px] text-green-500' />
      </div>
    </div>
  )
}

export default NavComponent
