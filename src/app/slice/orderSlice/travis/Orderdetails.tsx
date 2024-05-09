import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TravisOrderDetailState {
    totalAmount: number;
  discountAmount: number;
  totalNetBillAmount:number,
  retailerName:string,
  retailerAddres:string,
  retailerCity:string,
  retailerUserId:number,
  retailerId:number,
  pendingOrders:unknown[]
}

const initialState: TravisOrderDetailState = {
    totalAmount:0,
  discountAmount:0,
  totalNetBillAmount:0,
  retailerName:"",
  retailerAddres:"",
  retailerCity:"",
  pendingOrders:[],
  retailerId:0,
  retailerUserId:0
};

const TravisOrderDetailSlice = createSlice({
    name: "travisOrderDetail",
    initialState,
    reducers: {
        addTravisOrderDetails:(state,action)=>{
            const {totalNetBillAmount,retailerName,retailerAddres,retailerCity,retailerId,retailerUserId}=action.payload;
           
            state.retailerName=retailerName;
            state.retailerAddres=retailerAddres;
            state.retailerCity=retailerCity;
            state.retailerId=retailerId;
            state.retailerUserId=retailerUserId;
        }, 
        addPendingOrder:(state, action)=>{
            const {pendingOrders}=action.payload;
            state.pendingOrders=pendingOrders;
        }
    }
});

export const { addTravisOrderDetails ,addPendingOrder} = TravisOrderDetailSlice.actions;

export const getRetailerDetails = (state: { travisOrderDetail: TravisOrderDetailState }) => state.travisOrderDetail;
export const getPendingOrder = (state: { travisOrderDetail: TravisOrderDetailState }) => state.travisOrderDetail.pendingOrders;

export default TravisOrderDetailSlice.reducer;