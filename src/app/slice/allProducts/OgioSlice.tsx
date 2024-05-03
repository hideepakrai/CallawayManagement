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
                        //brand:item.attributes.brand,
                        Name: item.attributes.Name,
                        Description: item.attributes.Description,
                        SKU: item.attributes.SKU,
        
                        MRP: item.attributes.MRP,
                        SetType: item.attributes.SetType,
                       
                        OgiAttributes:att
                    
                        })
                    })
                }
                },

                updateNewData:(state,action) => {
                    const {ogioProduct}= action.payload;
                    if(ogioProduct){
                const ogiIndex= state.ogio.findIndex(item=>
                    item.SKU===ogioProduct.SKU);
                   if(ogiIndex===-1){


                    const att: OgioModel[] = [
                        {
                            ProductType:ogioProduct.ProductType,
                            Category:ogioProduct.Category,
                            ProductModel:ogioProduct.ProductModel,
                            LifeCycle:ogioProduct.LifeCycle,
                            Stock90:ogioProduct.Stock90,
                        }
                    ];


                    state.ogio.push({
                        brand: ogioProduct.brand,
                    Name: ogioProduct.Name,
                    Description: ogioProduct.Description,
                    SKU: ogioProduct.SKU,
                    Gallery: ogioProduct?.Gallery?.data?.attributes?.formats?.thumbnail?.url,
                    MRP: ogioProduct.MRP,
                    SetType: ogioProduct.SetType,
                    ProductType: ogioProduct.ProductType,
                    OgiAttributes: att,

                        TotalQty: 0,
                        Quantity88: 0,
                        Quantity90: 0,
                        Amount: 0

                    }

                    )

                   } else if (state.ogio[ogiIndex] &&
                    state.ogio[ogiIndex].OgiAttributes 
                    ) {
                    state.ogio[ogiIndex].MRP = ogioProduct.MRP;
                     const ogatt=state.ogio[ogiIndex].OgiAttributes;
                     if(ogatt){
                       ogatt[0].Stock90 = ogioProduct.Stock90

                }

                    }
                    
                       }
            },

  
           
        
        }
    }
    );


    export const { addOgioProduct,updateNewData} = OgioSlice.actions;
    export const getOgioProducts = (state: { Ogio: ProductState }): OgioBasicModel[] => {
        return state.Ogio?.ogio || [];
    };
    

    
    export default OgioSlice.reducer;
