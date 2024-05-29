import { createSlice } from "@reduxjs/toolkit";

interface ProductState {

   activeOrderTab:string
}


const initialState: ProductState = {
   
    activeOrderTab:""
};

const ActiveTabSlice = createSlice({
    name: "activeOrderTab",
    initialState, 
    reducers: {
        setActiveOrderTab:(state,action)=>{
            state.activeOrderTab=action.payload.activeOrderTab
        }
    }
});


export const { setActiveOrderTab } = ActiveTabSlice.actions;

export const getActiveOrdertab = (state: { activeOrderTab: ProductState }): string => {
    return state.activeOrderTab.activeOrderTab || "";
};

export default ActiveTabSlice.reducer;