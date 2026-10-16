import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import  {ToastContainer} from 'react-toastify'
import { handleError, handleSuccess } from '../component/utill'
import { useContext } from 'react'
import { dataContext } from '../contennt/UserContext'


    const Login = () => {

      const data =useContext(dataContext)
      
      
      
    const [loginInfo,setloginInfo]=useState({email:'',password:''})
    const handleChange=(e)=>{
   const {name,value}=e.target;
    const copyloginInfo={...loginInfo};
    copyloginInfo[name]=value;
    setloginInfo(copyloginInfo)
    }
    const navigate=useNavigate()
    const handleLogin=async(e)=>{
        e.preventDefault();
        const {name,email,password}=loginInfo;
        if(!email||!password)
        {
            return handleError('email or password are requaired')
        }
           try {
  const url = 'http://localhost:8000/auth/login';
  const response = await fetch(url, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(loginInfo)
  });
  const result = await response.json();
  const {success,message,jwtToken,name,error}=result;
  console.log(success);
  
  if(success){
    handleSuccess(message);
    localStorage.setItem('token',jwtToken)
    localStorage.setItem('loggedInUser',name)
    setTimeout(()=>{
    navigate('/')
    },1000)
  }else if(error){
    const details=error?.details[0].message;
    handleError(details)
  }
  else if(!success){
    handleError(message)
  }
  console.log(result);
  data.setUser(result)
  
} catch (error) {
  console.error("Signup request failed:", error);
}
 }  
  return (
   <div className='w-screen h-screen flex justify-center items-center'>
     <div className='container '>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
       
        <div>
            <label htmlFor="email">email</label>
            <input onChange={handleChange} type="email" name="email"  placeholder='Enter your email...' value={loginInfo.email}/>
        </div>
        <div>
            <label htmlFor="password">Password</label>
            <input onChange={handleChange} type="password" name="password"  placeholder='Enter your password.....' value={loginInfo.password}/>
        </div>
        <button>Login</button>
        <span>Does't have an account ? <Link to='/signup'>Signup</Link></span>
      </form>
      <ToastContainer/>
    </div>
   </div>
  )
}

export default Login
