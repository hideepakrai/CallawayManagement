import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TravisOrderDetailState {
    totalAmount: number;
  discountAmount: number;
  totalNetBillAmount:number,
  retailerName:string,
  retailerAddres:string,
  retailerCity:string,
}

const initialState: TravisOrderDetailState = {
    totalAmount:0,
  discountAmount:0,
  totalNetBillAmount:0,
  retailerName:"",
  retailerAddres:"",
  retailerCity:""
};

const TravisOrderDetailSlice = createSlice({
    name: "travisOrderDetail",
    initialState,
    reducers: {
        addTravisOrderDetails:(state,action)=>{
            const {totalNetBillAmount,retailerName,retailerAddres,retailerCity}=action.payload;
           
            state.retailerName=retailerName;
            state.retailerAddres=retailerAddres;
            state.retailerCity=retailerCity;
        }
    }
});

export const { addTravisOrderDetails } = TravisOrderDetailSlice.actions;

export const getTravisOrderDetails = (state: { travisOrderDetail: TravisOrderDetailState }) => state.travisOrderDetail;

export default TravisOrderDetailSlice.reducer;