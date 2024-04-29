    import { createSlice } from "@reduxjs/toolkit";
    import {OgioBasicModel,OgioBasicModelGraph, OgioModel} from "../../modules/model/ogio/OgioBrandModel"
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
                                    LifeCycle:attrItems.LifeCycle,
                                    Stock90:attrItems.Stock90,
                                    
                                });
                            });
                        }
                        state.ogio.push({
                        id:item.id,
                        brand:item.attributes.brand,
                        Name: item.attributes.Name,
                        Description: item.attributes.Description,
                        SKU: item.attributes.SKU,
        
                        SalePrice: item.attributes.SalePrice,
                        SetType: item.attributes.SetType,
                       
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
