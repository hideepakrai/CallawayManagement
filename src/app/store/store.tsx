import { configureStore } from "@reduxjs/toolkit";

import UserSliceReducer from "../slice/UserSlice/UserSlice"

export default configureStore({
    reducer: {
        user: UserSliceReducer
    }
})