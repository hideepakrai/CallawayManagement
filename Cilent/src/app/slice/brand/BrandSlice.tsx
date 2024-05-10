import { createSlice } from "@reduxjs/toolkit";
import {BrandModel}  from "../../modules/model/brand/AllBrands"

interface BrandState {
    allBrands:BrandModel
}

const BrandSlice = createSlice({
    name: "brands",
    initialState: {
        allBrands: [],
       
    } as BrandState, 
    reducers: {
        addBrands: (state, action) => {
            state.allBrands = action.payload.brands;
      
        }
    }
});

export const { addBrands } = BrandSlice.actions;

export const getAllBrands = (state: { brands: BrandState }) => state.brands.allBrands;

export default BrandSlice.reducer;