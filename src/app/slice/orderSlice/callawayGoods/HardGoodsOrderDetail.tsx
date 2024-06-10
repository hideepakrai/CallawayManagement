import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface HardGoodsOrderDetailState {
    totalAmount: number;
  discountAmount: number;
  totalNetBillAmount:number,
  retailerName:string,
  retailerAddres:string,
  retailerCity:string,
  retailerUserId:number,
  retailerId:number,
  pendingOrders:unknown[],
  retailersGst:string,
  retailerEmail:string
  retailerPhone:number,

}

const initialState: HardGoodsOrderDetailState = {
    totalAmount:0,
  discountAmount:0,
  totalNetBillAmount:0,
  retailerName:"",
  retailerAddres:"",
  retailerCity:"",
  pendingOrders:[],
  retailerId:0,
  retailerUserId:0,
  retailersGst:"",
  retailerEmail:"",
  retailerPhone:0
};

const HardGoodsOrderDetailSlice = createSlice({
    name: "HardGoodsOrderDetail",
    initialState,
    reducers: {
        addHardGoodsOrderDetails:(state,action)=>{
            const {totalNetBillAmount,retailerName,retailerAddres,retailerCity,retailerId,retailerUserId,retailerGSt,retailerEmail,retailerPhone}=action.payload;
           
            state.retailerName=retailerName;
            state.retailerAddres=retailerAddres;
            state.retailerCity=retailerCity;
            state.retailerId=retailerId;
            state.retailerUserId=retailerUserId;
            state.retailersGst=retailerGSt;
            state.retailerEmail=retailerEmail,
            state.retailerPhone=retailerPhone;
        }, 
        addPendingOrder:(state, action)=>{
            const {pendingOrders}=action.payload;
            state.pendingOrders=pendingOrders;
        }
    }
});

export const { addHardGoodsOrderDetails ,addPendingOrder} = HardGoodsOrderDetailSlice.actions;

export const getRetailerDetails = (state: { travisOrderDetail: HardGoodsOrderDetailState }) => state.travisOrderDetail;
export const getPendingOrder = (state: { travisOrderDetail: HardGoodsOrderDetailState }) => state.travisOrderDetail.pendingOrders;

export default HardGoodsOrderDetailSlice.reducer;