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
            const {OgioOrder,qty90,qty88}=action.payload;
            if(OgioOrder ) {
               const index=  state.OgioOrder.findIndex(item=>item.SKU===OgioOrder.SKU);
                   if(index===-1){
                    const att: OgioModel[] = [
                        {
                         
                          ProductType: OgioOrder.TravisAttributes[0].ProductType,
                          Category: OgioOrder.TravisAttributes[0].Category,
                          ProductModel: OgioOrder.TravisAttributes[0].ProductModel || "", // Assuming Gender might be optional
                          LifeCycle: OgioOrder.TravisAttributes[0].LifeCycle,
                          Stock90: OgioOrder.TravisAttributes[0].Stock90,
                        },
                      ];
              
                      state.OgioOrder.push({
                        id:OgioOrder.id,
                        Name: OgioOrder.Name,
                        Description: OgioOrder.Description,
                        SKU: OgioOrder.SKU,
                    
                        MRP: OgioOrder.MRP,
                       
                        
                        SetType: OgioOrder.SetType,
                        ProductType: OgioOrder.ProductType,
                        OgiAttributes: att,
                        Quantity88:qty88,
                        Quantity90:qty90,
                        Amount: (qty88+qty90)*OgioOrder.MRP,
                        TotalQty: qty88+qty90,
                        GST:12,
                        LessGST:(((qty88+qty90)*OgioOrder.MRP)*.12),
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


        

      
    }
})

export const {
    addOgioOrder,
    resetOgioOrder
     
} = OgioOrderSlice.actions;


export const getOgioOrder = (state: { ogioOrder: OgioState }): OgioBasicModel[] => {
    return state.ogioOrder?.OgioOrder || [];
};

export default OgioOrderSlice.reducer;

