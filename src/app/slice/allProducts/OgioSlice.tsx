    import { createSlice } from "@reduxjs/toolkit";
    import {OgioBasicModel,OgioBasicModelGraph, OgioModel} from "../../modules/brands/model/ogio/OgioBrandModel"
    import Item from "antd/es/list/Item";

    interface ProductState {
    
        ogio: OgioBasicModel[],
    
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
                    ogioProduct.map((item:OgioBasicModelGraph)=>{

                        const att: OgioModel[] = [];
                        if (item &&
                            item.attributes &&
                            item.attributes.AttributeSet &&
                            Array.isArray(item.attributes.AttributeSet)
                        ) { // Null check here
                            item.attributes.AttributeSet.forEach((attrItems: OgioModel) => {
                                att.push({
                                    ProductType:attrItems.ProductType,
                                    Category:attrItems.Category,
                                    ProductModel:attrItems.ProductModel,
                                    LifeCycle:attrItems.LifeCycle 
                                });
                            });
                        }
                        state.ogio.push({
                            Name: item.attributes.Name,
                        Description: item.attributes.Description,
                        SKU: item.attributes.SKU,
                        StockManagement: item.attributes.StockManagement,
                        StockStatus: item.attributes.StockStatus,
                        MRP: item.attributes.MRP,
                        SalePrice: item.attributes.SalePrice,
                        StockAvailable: item.attributes.StockAvailable,
                        SetType: item.attributes.SetType,
                        ProductType: item.attributes.ProductType,
                        OgiAttributes:att
                    
                        })
                    })
                }
                }
            }
            
        
        }
    );


    export const { addOgioProduct} = OgioSlice.actions;
    export const getOgioProducts = (state: { Ogio: ProductState }): OgioBasicModel[] => {
        return state.Ogio?.ogio || [];
    };
    

    
    export default OgioSlice.reducer;
