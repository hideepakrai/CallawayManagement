import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {OgioBasicModel,OgioBasicModelGraph,OgioModel} from "../../../modules/model/ogio/OgioBrandModel"

interface OgioState {
    OgioOrder:OgioBasicModel[]
}

const initialState: OgioState = {
    
    OgioOrder:[]
};

const OgioOrderSlice = createSlice({
    name: "OgioOrder",
    initialState,
    reducers: {
        resetOgioOrder:(state)=>{
            return initialState;
        },
        addOgioOrder:(state,action)=>{
            const {OgioOrder,qty90}=action.payload;
            if(OgioOrder ) {
               const index=  state.OgioOrder.findIndex(item=>item.SKU===OgioOrder.SKU);
                   if(index===-1){
                    const att: OgioModel[] = [
                        {
                         
                          ProductType: OgioOrder.OgiAttributes[0].ProductType,
                          Category: OgioOrder.OgiAttributes[0].Category,
                          ProductModel: OgioOrder.OgiAttributes[0].ProductModel || "", // Assuming Gender might be optional
                          LifeCycle: OgioOrder.OgiAttributes[0].LifeCycle,
                          Stock90: OgioOrder.OgiAttributes[0].Stock90,
                        },
                      ];
              
                      state.OgioOrder.push({
                        id:OgioOrder.id,
                        Name: OgioOrder.Name,
                        Description: OgioOrder.Description,
                        SKU: OgioOrder.SKU,
                    
                        MRP: OgioOrder.MRP,
                        GST:OgioOrder.GST,
                        
                        SetType: OgioOrder.SetType,
                        ProductType: OgioOrder.ProductType,
                        OgiAttributes: att,
                        
                        Quantity90:qty90,
                        Amount: (qty90)*OgioOrder.MRP,
                        TotalQty:qty90,
                      
                        LessGST:(((qty90)*OgioOrder.MRP)*.12),
                        Discount: 0,
                        LessDiscountAmount:0,
                        NetBillings:0,
                        FinalBillValue:0,
                      });
                   }else {
                    state.OgioOrder[index].Quantity90=OgioOrder.Quantity90;
                    state.OgioOrder[index].Quantity88=OgioOrder.Quantity88;
                    const qty88=state.OgioOrder[index].Quantity88||0;
                    const qty90=state.OgioOrder[index].Quantity90||0;
                    const MRP=state.OgioOrder[index].MRP||0;
                    state.OgioOrder[index].TotalQty=qty88+qty90
                    state.OgioOrder[index].Amount=MRP*(qty88+qty90);
                    state.OgioOrder[index].ordered=true;
                   }
            }
        },

        removeOgioOrder:(state,action)=>{
            const{ogioOrder,qty90s}= action.payload;
               // eslint-disable-next-line no-debugger
               debugger
            if(qty90s===0){
                const index=  state.OgioOrder.findIndex(item=>item.SKU===ogioOrder.SKU);
                if(index!==-1){
                    state.OgioOrder.splice(index,1);
                }
            }
            else{
                const index=  state.OgioOrder.findIndex(item=>item.SKU===ogioOrder.SKU);
                if(index!==-1){
                    if(state.OgioOrder[index]){
                        
                        state.OgioOrder[index].Quantity90=qty90s;
                        
                        const qty90=state.OgioOrder[index].Quantity90||0;
                        const MRP=state.OgioOrder[index].MRP||0;
                        state.OgioOrder[index].TotalQty=qty90
                        state.OgioOrder[index].Amount=MRP*(qty90);
                        
                    }
                    
                }
            }
       
        },

        

      
    }
})

export const {
    addOgioOrder,
    resetOgioOrder,
    removeOgioOrder
    
     
} = OgioOrderSlice.actions;


export const getOgioOrder = (state: { OgioOrder: OgioState }): OgioBasicModel[] => {
    return state.OgioOrder?.OgioOrder || [];
};

export default OgioOrderSlice.reducer;

