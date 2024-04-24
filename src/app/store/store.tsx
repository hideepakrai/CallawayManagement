import { configureStore } from "@reduxjs/toolkit";

import UserSliceReducer from "../slice/UserSlice/UserSlice" // user infomation

import OgioReducer from "../slice/allProducts/OgioSlice";
import TravisMethewReducer from "../slice/allProducts/TravisMethewSlice"

import CallAwayGoodsReducer from "../slice/allProducts/CallAwayGoodsSlice"

import CartReducer  from "../slice/orderSlice/CartOrder"
export default configureStore({


    reducer: {
        user: UserSliceReducer,
        Ogio: OgioReducer,
        travisMethew: TravisMethewReducer,
        callawayGoods:CallAwayGoodsReducer,
        Order:CartReducer,
    }
})