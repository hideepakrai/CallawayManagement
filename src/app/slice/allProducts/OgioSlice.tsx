    import { createSlice } from "@reduxjs/toolkit";
    import {OgioBasicModel,OgioBasicModelGraph, OgioModel} from "../../modules/model/ogio/OgioBrandModel"
    import Item from "antd/es/list/Item";

    interface ProductState {
    
        ogio: OgioBasicModel[],
        isLoadingStart: boolean
    
    }


    const OgioSlice = createSlice({
        name: "Ogio",
        initialState: {
        
            ogio:[],
            isLoadingStart:false
        } as ProductState, 
        reducers: {
           resetOgio:(state)=>{
                state.ogio=[];
                state.isLoadingStart=false;      
           },
           startOgioLoading:(state)=>{
            state.isLoadingStart=true;
           },
           stopOgioLoading:(state)=>{
            state.isLoadingStart=false;
           },
           

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
                       GST: item.attributes.GST,
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
                    state.ogio[ogiIndex].Name = ogioProduct.Name !=null? ogioProduct.Name : state.ogio[ogiIndex].Name;
                    state.ogio[ogiIndex].Description =  ogioProduct.Description !=null? ogioProduct.Description : state.ogio[ogiIndex].Description;
                    state.ogio[ogiIndex].MRP =  ogioProduct.MRP !=null? ogioProduct.MRP : state.ogio[ogiIndex].MRP;
                    state.ogio[ogiIndex].GST =  ogioProduct.GST !=null? ogioProduct.GST : state.ogio[ogiIndex].GST;
                     const ogatt=state.ogio[ogiIndex].OgiAttributes;
                     if(ogatt){
                       ogatt[0].Stock90 = ogioProduct.Stock90!=null? ogioProduct.Stock90 : ogatt[0]?.Stock90
                       ogatt[0].ProductType = ogioProduct.ProductType!=null? ogioProduct.ProductType : ogatt[0]?.ProductType
                       ogatt[0].Category = ogioProduct.Category!=null? ogioProduct.Category : ogatt[0]?.Category
                       ogatt[0].ProductModel = ogioProduct.ProductModel!=null? ogioProduct.ProductModel : ogatt[0]?.ProductModel
                       ogatt[0].LifeCycle = ogioProduct.LifeCycle!=null? ogioProduct.LifeCycle : ogatt[0]?.LifeCycle

                }

                    }
                    
                       }
            },
            updateQuantity90:(state,actions) => {

                const {sku, qty90,MRP}=actions.payload;
                const ogioIndex = state.ogio.findIndex(
                  (ogioItem) => ogioItem.SKU === sku
                );
                if (ogioIndex!== -1) {
                  state.ogio[ogioIndex].Quantity90 = qty90;
                
                  const quantity90 = state.ogio[ogioIndex]?.Quantity90 ?? 0;
                  state.ogio[ogioIndex].TotalQty =quantity90;
    
                  
                  state.ogio[ogioIndex].Amount = MRP*(quantity90)
                  state.ogio[ogioIndex].ordered = true;
                }
              },

  
           
        
        }
    }
    );


    export const { addOgioProduct,updateNewData,
        updateQuantity90,stopOgioLoading,startOgioLoading,resetOgio} = OgioSlice.actions;
    export const getOgioProducts = (state: { Ogio: ProductState }): OgioBasicModel[] => {
        return state.Ogio?.ogio || [];
    };
    export const getOgioReload = (state: { Ogio: ProductState }): boolean => {
        return state.Ogio?.isLoadingStart;
    };
    

    
    export default OgioSlice.reducer;
