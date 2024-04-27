import { createSlice } from "@reduxjs/toolkit";
import {RetailerModel,Retailer,sales_representatives,salesRepresentatives,managers,manager} from "../../modules/model/retailer/RetailerModel"
// Define interface for Redux state
interface RetailerState {
    retailer:RetailerModel[]
}


const RetailerSlice = createSlice({
    name: "retailer",
    initialState: {
       retailer:[]
    } as RetailerState, 
    reducers: {
        addRetailer: (state, action) => {
            state.retailer = action.payload.retailer;
        },
      
    }
});


export const { addRetailer } = RetailerSlice.actions;


export const getRetailers = (state: { retailer: RetailerState }) => state.retailer;

export default RetailerSlice.reducer;
