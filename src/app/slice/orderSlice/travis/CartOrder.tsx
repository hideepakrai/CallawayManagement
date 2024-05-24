import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {BasicModelTravis,TravisMathewAttribute} from "../../../modules/model/travis/TravisMethewModel"
import {BasicModelGoods,GoodsAttributes} from "../../../modules/model/goods/CallawayGoodsModel"

interface ProductState {
    TravisOrder: BasicModelTravis[];
    Goodsorder:BasicModelGoods[]
}

const initialState: ProductState = {
    TravisOrder: [],
    Goodsorder:[]
};

const OrderSlice = createSlice({
    name: "Order",
    initialState,
    reducers: {
        resetOrder:(state)=>{
            return initialState;
        },
        addTravisOrder:(state,action)=>{
        
        },


        updateTravisOrder:(state,action)=>{
            
        },

        removeTravisOrder:(state,action)=>{
           
           
        },

            resetTravisOrder:(state,action)=>{
                const{travis}= action.payload
                state.TravisOrder=[]
            }
            ,
            updateInclusiveDiscount:(state,action)=>{
               
            },

            updateExclusiveDiscount:(state,action)=>{
               


            },
            updateFlatDiscount:(state,action)=>{
                


            }
       
    }
})

export const {
    addTravisOrder,
    resetOrder,

    resetTravisOrder,
    updateInclusiveDiscount,
    updateExclusiveDiscount,
    updateFlatDiscount,updateTravisOrder,
    removeTravisOrder
     
} = OrderSlice.actions;

export const getTravisOrder = (state: { Order: ProductState }): BasicModelTravis[] => {
    return state.Order?.TravisOrder || [];
};
export const getGoodsOrder = (state: { Order: ProductState }): BasicModelGoods[] => {
    return state.Order?.Goodsorder || [];
};

export default OrderSlice.reducer;

