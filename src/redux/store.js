import { configureStore } from "@reduxjs/toolkit";
import combineReducers from './../../node_modules/redux/src/combineReducers';
import cartSlice from "./cartSlice"
 export const store=configureStore({
    reducer:{
        cart:cartSlice
    }
 })