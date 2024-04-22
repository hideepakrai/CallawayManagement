    import { createSlice } from "@reduxjs/toolkit";
    import {BasicModel,BasicModelGraph, OgioModel} from "../../modules/brands/model/OgioBrandModel"
    import Item from "antd/es/list/Item";

    interface ProductState {
    
        ogio: BasicModel[],
    
    }


    const OgioSlice = createSlice({
        name: "Ogio",
        initialState: {
        
            ogio:[]
        } as ProductState, 
        reducers: {
           
            addOgioProduct: (state, action) => {
                const { ogioProduct, id } = action.payload;
               
                if(ogioProduct && ogioProduct.length > 0) {
                    ogioProduct.map((item:BasicModelGraph)=>{
                        state.ogio.push({
                            Name: item.attributes.Name,
                        Description: item.attributes.Description,
                        SKU: item.attributes.SKU,
                        StockManagement: item.attributes.StockManagement,
                        StockStatus: item.attributes.StockStatus,
                        RegularPrice: item.attributes.RegularPrice,
                        SalePrice: item.attributes.SalePrice,
                        StockAvailable: item.attributes.StockAvailable,
                        SetType: item.attributes.SetType,
                        ProductType: item.attributes.ProductType,
                    
                    
                        })
                    })
                }
                }
            }
            
        
        }
    );


    export const { addOgioProduct} = OgioSlice.actions;
    export const getOgioProducts = (state: { Ogio: ProductState }): BasicModel[] => {
        return state.Ogio?.ogio || [];
    };
    

    
    export default OgioSlice.reducer;
