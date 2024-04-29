import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface LoadingState {
    isLoading: boolean;
 }
const initialState= {
   isLoading:false
};

const LoadingSlice = createSlice({
    name: "loading",
    initialState,
    reducers: {
        LoadingStart:(state)=>{
            state.isLoading=true;
        },
        LoadingStop:(state)=>{
            state.isLoading=false;
        }
    }
}
);


export const {LoadingStart,LoadingStop}= LoadingSlice.actions;
export const getLoading = (state: LoadingState): boolean => {
    return state.isLoading;
};

export default LoadingSlice.reducer;