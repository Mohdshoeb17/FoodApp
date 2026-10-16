import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import  {ToastContainer} from 'react-toastify'
import { handleError, handleSuccess } from '../component/utill'



const Signup = () => {
    const [signupInfo,setsignupInfo]=useState({name:'',email:'',password:''})
    const handleChange=(e)=>{
   const {name,value}=e.target;
    const copysignupInfo={...signupInfo};
    copysignupInfo[name]=value;
    setsignupInfo(copysignupInfo)
    }
    const navigate=useNavigate()
    const handleSignup=async(e)=>{
        e.preventDefault();
        const {name,email,password}=signupInfo;
        if(!name||!email||!password)
        {
            return handleError('name,email or password are requaired')
        }
      
           try {
  const url = 'http://localhost:8000/auth/signup';
  const response = await fetch(url, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(signupInfo)
  });
  const result = await response.json();
  const {success,message,error}=result;
  console.log(success);
  
  if(success){
    handleSuccess(message);
    setTimeout(()=>{
    navigate('/login')
    },1000)
  }else if(error){
    const details=error?.details[0].message;
    handleError(details)
  }
  else if(!success){
    handleError(message)
  }
  console.log(result);
} catch (error) {
  console.error("Signup request failed:", error);
}

 
 }
    
  return (
   <div className='w-screen h-screen flex justify-center items-center'>

    <div className='container'>
      <h1>Signup </h1>
      <form onSubmit={handleSignup}>
        <div>
            <label htmlFor="name">Name</label>
            <input onChange={handleChange} type="text" name="name" id="" autoFocus placeholder='Enter your name...' value={signupInfo.value}/>
        </div>
        <div>
            <label htmlFor="email">email</label>
            <input onChange={handleChange} type="email" name="email"  placeholder='Enter your email...' value={signupInfo.email}/>
        </div>
        <div>
            <label htmlFor="password">Password</label>
            <input onChange={handleChange} type="password" name="password"  placeholder='Enter your password.....' value={signupInfo.password}/>
        </div>
        <button>Signup</button>
        <span>Already have an account ? <Link to='/login'>Login</Link></span>
      </form>
      <ToastContainer/>
    </div>
    </div>
  )
}

export default Signup
