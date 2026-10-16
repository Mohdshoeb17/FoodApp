import React from 'react'
import Home from './pages/Home'
import {ToastContainer} from "react-toastify" ;
import { Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Login from './component/Login';
import NavComponent from './component/NavComponent';
import Signup from './component/Signup';
function App() {
  return (
    <div>
       
        <Routes>
        <Route  path='/' element={ <Home/>} />
        <Route  path='/login' element={ <Login/>} /> 
        <Route  path='/signup' element={ <Signup/>} /> 
        </Routes> 
  
 <ToastContainer 
        position="top-right"
        autoClose={3000}  // Auto dismiss after 3 seconds
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      
    </div>
  )
}

export default App
