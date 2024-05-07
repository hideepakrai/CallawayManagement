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
            const {travisOrder,qty90,qty88}=action.payload;
            if(travisOrder ) {
               const index=  state.TravisOrder.findIndex(item=>item.SKU===travisOrder.SKU);
                   if(index===-1){
                    const att: TravisMathewAttribute[] = [
                        {
                          StyleCode: travisOrder.TravisAttributes[0].StyleCode,
                          Length: travisOrder.TravisAttributes[0].Length,
                          Category: travisOrder.TravisAttributes[0].Category,
                          Season: travisOrder.TravisAttributes[0].Season,
                          Line: travisOrder.TravisAttributes[0].Line,
                          Color: travisOrder.TravisAttributes[0].Color,
                          ColorCode: travisOrder.TravisAttributes[0].ColorCode,
                          Size: travisOrder.TravisAttributes[0].Size,
                          Gender: travisOrder.TravisAttributes[0].Gender || "", // Assuming Gender might be optional
                          Stock88: travisOrder.TravisAttributes[0].Stock88,
                          Stock90: travisOrder.TravisAttributes[0].Stock90,
                        },
                      ];
              
                      state.TravisOrder.push({
                        id:travisOrder.id,
                        Name: travisOrder.Name,
                        Description: travisOrder.Description,
                        SKU: travisOrder.SKU,
                         GST:travisOrder.GST,
                        MRP: travisOrder.MRP,
                       
                        
                        SetType: travisOrder.SetType,
                        ProductType: travisOrder.ProductType,
                        TravisAttributes: att,
                        Quantity88:qty88,
                        Quantity90:qty90,
                        Amount: (qty88+qty90)*travisOrder.MRP,
                        TotalQty: qty88+qty90,
                        
                        LessGST:(((qty88+qty90)*travisOrder.MRP)*.12),
                        Discount:22,
                        LessDiscountAmount:((qty88+qty90)*travisOrder.MRP)*.22,
                        NetBillings:(((qty88+qty90)*travisOrder.MRP)*.22)-(((qty88+qty90)*travisOrder.MRP)*.12),
                        FinalBillValue:(((qty88+qty90)*travisOrder.MRP)*.22)-(((qty88+qty90)*travisOrder.MRP)*.12)+((((qty88+qty90)*travisOrder.MRP)*.22)-(((qty88+qty90)*travisOrder.MRP)*.12)*.12),
                      });
                   }else {
                    state.TravisOrder[index].Quantity90=travisOrder.Quantity90;
                    state.TravisOrder[index].Quantity88=travisOrder.Quantity88;
                    const qty88=state.TravisOrder[index].Quantity88||0;
                    const qty90=state.TravisOrder[index].Quantity90||0;
                    const MRP=state.TravisOrder[index].MRP||0;
                    state.TravisOrder[index].TotalQty=qty88+qty90
                    state.TravisOrder[index].Amount=MRP*(qty88+qty90);
                    state.TravisOrder[index].ordered=true;
                   }
            }
        },


        updateTravisOrder:(state,action)=>{
            const{travisOrder,qtys88,qtys90}= action.payload;
            const index=  state.TravisOrder.findIndex(item=>item.SKU===travisOrder.SKU);
            if(index!==-1){
                if(state.TravisOrder[index]){
                    state.TravisOrder[index].Quantity88=qtys88;
                    state.TravisOrder[index].Quantity90=qtys90;
                    const qty88=state.TravisOrder[index].Quantity88||0;
                    const qty90=state.TravisOrder[index].Quantity90||0;
                    const MRP=state.TravisOrder[index].MRP||0;
                    state.TravisOrder[index].TotalQty=qty88+qty90
                    state.TravisOrder[index].Amount=MRP*(qty88+qty90);
                    
                }
                
            }

        },

        removeTravisOrder:(state,action)=>{
            const{travisOrder,qty88s,qty90s}= action.payload;
               // eslint-disable-next-line no-debugger
               debugger
            if(qty88s===0 && qty90s===0){
                const index=  state.TravisOrder.findIndex(item=>item.SKU===travisOrder.SKU);
                if(index!==-1){
                    state.TravisOrder.splice(index,1);
                }
            }
            else{
                const index=  state.TravisOrder.findIndex(item=>item.SKU===travisOrder.SKU);
                if(index!==-1){
                    if(state.TravisOrder[index]){
                        state.TravisOrder[index].Quantity88=qty88s;
                        state.TravisOrder[index].Quantity90=qty90s;
                        const qty88=state.TravisOrder[index].Quantity88||0;
                        const qty90=state.TravisOrder[index].Quantity90||0;
                        const MRP=state.TravisOrder[index].MRP||0;
                        state.TravisOrder[index].TotalQty=qty88+qty90
                        state.TravisOrder[index].Amount=MRP*(qty88+qty90);
                        
                    }
                    
                }
            }
       
        },

            resetTravisOrder:(state,action)=>{
                const{travis}= action.payload
                state.TravisOrder=[]
            }
            ,
            updateInclusiveDiscount:(state,action)=>{
                const {discount}= action.payload;
                state.TravisOrder.forEach((item=>{
                    item.Discount=discount;
                    const gst= item.GST||0
                    const salP=item.Amount ||0;
                    const gstdiscount= (salP)-((100*salP)/(100+gst))
                    item.LessGST=gstdiscount;
                    item.LessDiscountAmount=(salP*discount)/100;
                   const netbill=salP-((salP*discount)/100)-(gstdiscount);
                   const totalNetbill=netbill+(gst*netbill/100)
                   item.NetBillings=netbill;
                   item.FinalBillValue=totalNetbill;
                }))
            },

            updateExclusiveDiscount:(state,action)=>{
                const {discount}=action.payload;
                state.TravisOrder.forEach((item=>{
                    item.Discount=discount;
                    const gst= item.GST||0
                   item.LessGST=0;
                    const salP=item.Amount ||0;
                    item.LessDiscountAmount=(salP*discount)/100;
                   const netbill=salP-((salP*discount)/100);
                   const totalNetbill=netbill+(gst*netbill/100)
                   item.NetBillings=netbill;
                   item.FinalBillValue=totalNetbill;
                }))


            },
            updateFlatDiscount:(state,action)=>{
                const {discount}=action.payload;
                state.TravisOrder.forEach((item=>{
                    item.Discount=discount;
                   
                   item.LessGST=0;
                    const salP=item.Amount ||0;
                    item.LessDiscountAmount=(salP*discount)/100;
                   const netbill=salP-((salP*discount)/100);
                   const totalNetbill=netbill;
                   item.NetBillings=netbill;
                   item.FinalBillValue=totalNetbill;
                }))


            }
        ,addGoodsOrder:(state,action)=>{
            const {goodsOrder,qty90,qty88}=action.payload;
            if(goodsOrder ) {
               const index=  state.Goodsorder.findIndex(item=>item.SKU===goodsOrder.SKU);
                   if(index===-1){
                    const att: GoodsAttributes[] = [
                        {
                            ProductType: goodsOrder.GoodsAttributes[0].GoodsAttributes,
                            ProductModel: goodsOrder.GoodsAttributes[0].ProductModel,
                          Category: goodsOrder.GoodsAttributes[0].Category,
                          Orientation: goodsOrder.GoodsAttributes[0].Orientation,
                          LifeCycle: goodsOrder.GoodsAttributes[0].LifeCycle,
                          
                        },
                      ];
              
                      state.Goodsorder.push({
                        Name: goodsOrder.Name,
                        Description: goodsOrder.Description,
                        SKU: goodsOrder.SKU,
                        StockManagement: goodsOrder.StockManagement,
                        StockStatus: goodsOrder.StockStatus,
                        MRP: goodsOrder.MRP,
                    
                        Stock88: goodsOrder.Stock88,
                        Stock90: goodsOrder.Stock90,
                        SetType: goodsOrder.SetType,
                        ProductType: goodsOrder.ProductType,
                        GoodsAttributes: att,
                        Quantity88:qty88,
                        Quantity90:qty90,
                        Amount: (qty88+qty90)*goodsOrder.MRP,
                        TotalQty: qty88+qty90,
                      });
                   }else {
                    state.Goodsorder[index].Quantity90=goodsOrder.Quantity90;
                    state.Goodsorder[index].Quantity88=goodsOrder.Quantity88;
                    const qty88=state.Goodsorder[index].Quantity88||0;
                    const qty90=state.Goodsorder[index].Quantity90||0;
                    const MRP=state.Goodsorder[index].MRP||0;
                    state.Goodsorder[index].TotalQty=qty88+qty90
                    state.Goodsorder[index].Amount=MRP*(qty88+qty90);
                    state.Goodsorder[index].ordered=true;
                   }
            }
        }
    }
})

export const {
    addTravisOrder,
    resetOrder,
    addGoodsOrder,
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

