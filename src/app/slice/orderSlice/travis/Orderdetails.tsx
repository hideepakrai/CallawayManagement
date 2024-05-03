import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TravisOrderDetailState {
    totalAmount: number;
  discountAmount: number;
  totalNetBillAmount:number,
  retailerName:string,
  retailerAddres:string,
  retailerCity:string,
  pendingOrders:unknown[]
}

const initialState: TravisOrderDetailState = {
    totalAmount:0,
  discountAmount:0,
  totalNetBillAmount:0,
  retailerName:"",
  retailerAddres:"",
  retailerCity:"",
  pendingOrders:[]
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
        }, 
        addPendingOrder:(state, action)=>{
            const {pendingOrders}=action.payload;
            state.pendingOrders=pendingOrders;
        }
    }
});

export const { addTravisOrderDetails ,addPendingOrder} = TravisOrderDetailSlice.actions;

export const getTravisOrderDetails = (state: { travisOrderDetail: TravisOrderDetailState }) => state.travisOrderDetail;
export const getPendingOrder = (state: { travisOrderDetail: TravisOrderDetailState }) => state.travisOrderDetail.pendingOrders;

export default TravisOrderDetailSlice.reducer;