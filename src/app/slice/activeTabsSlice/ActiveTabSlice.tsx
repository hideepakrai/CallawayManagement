import { createSlice } from "@reduxjs/toolkit";

interface ProductState {

   activeOrderTab:string,
   isActiveTab:boolean
}


const initialState: ProductState = {
   
    activeOrderTab:"",
    isActiveTab:true
};

const ActiveTabSlice = createSlice({
    name: "activeOrderTab",
    initialState, 
    reducers: {
        setActiveOrderTab:(state,action)=>{
            state.activeOrderTab=action.payload.activeOrderTab
        },
        setFisttimeTab:(state, action)=>{
            state.isActiveTab=action.payload.activetab
        }, resetActive:(state)=>{
            state.activeOrderTab="",
            state.isActiveTab=true
        }
    }
});


export const { setActiveOrderTab ,setFisttimeTab,resetActive} = ActiveTabSlice.actions;

export const getActiveOrdertab = (state: { activeOrderTab: ProductState }): string => {
    return state.activeOrderTab.activeOrderTab || "";
};
export const getActivetab = (state: { activeOrderTab: ProductState }): boolean => {
    return state.activeOrderTab.isActiveTab || false;
};

export default ActiveTabSlice.reducer;