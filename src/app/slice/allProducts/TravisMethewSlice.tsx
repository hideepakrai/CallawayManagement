import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { BasicModelTravis, BasicModelTravisGraph, TravisMathewAttribute ,ImageType} from "../../modules/model/travis/TravisMethewModel";
import {ExcelModelTravis} from "../../modules/model/travis/TravisExcel"
interface ProductState {
    travisMethew: BasicModelTravis[],
    
}

const initialState: ProductState = {
    travisMethew: [],

};
const TravisMethewSlice = createSlice({
    name: "travisMethew",
    initialState,
    reducers: {
       resetTravisProduct: () => {
        return initialState;
       }
       ,

        addTravisProduct: (state, action:PayloadAction<{ travisProduct: BasicModelTravisGraph[], id: string }>) => {
            const { travisProduct, id } = action.payload;
            // eslint-disable-next-line no-debugger
            debugger
            if (travisProduct && travisProduct.length > 0) {
                travisProduct.forEach((item: BasicModelTravisGraph) => {
                    const att: TravisMathewAttribute[] = [];
                    if (item &&
                        item.attributes &&
                        item.attributes.AttributeSet &&
                        Array.isArray(item.attributes.AttributeSet)
                    ) { // Null check here
                        item.attributes.AttributeSet.forEach((attrItems: TravisMathewAttribute) => {
                            att.push({
                                StyleCode: attrItems.StyleCode,
                                Length: attrItems.Length,
                                Category: attrItems.Category,
                                Season: attrItems.Season,
                                Line: attrItems.Line,
                                Color: attrItems.Color,
                                ColorCode: attrItems.ColorCode,
                                Size:attrItems.Size,
                                Stock88:attrItems.Stock88,
                                Stock90:attrItems.Stock90,
                            });
                        });
                    }

                    
                    state.travisMethew.push({
                      id:item.id,
                       brand: item.attributes.brand,
                        Name: item.attributes.Name,
                        Description: item.attributes.Description,
                        SKU: item.attributes.SKU,
                        SalePrice: item.attributes.SalePrice,
                      
                        SetType: item.attributes.SetType,
                        ProductType: item.attributes.ProductType,
                        TravisAttributes: att,
                       
                        TotalQty: 0,
                        Quantity88: 0,
                        Quantity90: 0,
                        Amount: 0
                    });
                });
            }
        },

        updateNewData: (state, action) => {
            const { travisProduct, id } = action.payload;
            
            
            if (travisProduct) {
              
                const travisIndex = state.travisMethew.findIndex(
                  (travisItem) => travisItem.SKU === travisProduct.SKU
                );
          
                if (travisIndex===-1) {
                
                  const att: TravisMathewAttribute[] = [
                    {
                      StyleCode: travisProduct.StyleCode,
                      Length: travisProduct.Length,
                      Category: travisProduct.Category,
                      Season: travisProduct.Season,
                      Line: travisProduct.Line,
                      Color: travisProduct.Color,
                      ColorCode: travisProduct.ColorCode,
                      Size: travisProduct.Size,
                      Gender: travisProduct.Gender || "", 
                      Stock88:travisProduct.Stock88,
                       Stock90:travisProduct.Stock90,// Assuming Gender might be optional
                    },
                  ];
          

                 
                  state.travisMethew.push({
                    brand: travisProduct.brand,
                    Name: travisProduct.Name,
                    Description: travisProduct.Description,
                    SKU: travisProduct.SKU,
                    Gallery: travisProduct?.Gallery?.data?.attributes?.formats?.thumbnail?.url,
                    SalePrice: travisProduct.SalePrice,
                    SetType: travisProduct.SetType,
                    ProductType: travisProduct.ProductType,
                    TravisAttributes: att,

                        TotalQty: 0,
                        Quantity88: 0,
                        Quantity90: 0,
                        Amount: 0
                  });
                }
              
            }
          }
          ,

          updateQuantity90:(state,actions) => {
            // eslint-disable-next-line no-debugger
            debugger
            
            const {sku, qty90,MRP}=actions.payload;
            const travisIndex = state.travisMethew.findIndex(
              (travisItem) => travisItem.SKU === sku
            );
            if (travisIndex!== -1) {
              state.travisMethew[travisIndex].Quantity90 = qty90;
               
              const quantity88 = state.travisMethew[travisIndex]?.Quantity88 ?? 0;
              const quantity90 = state.travisMethew[travisIndex]?.Quantity90 ?? 0;
              state.travisMethew[travisIndex].TotalQty = quantity88+quantity90;

              
              state.travisMethew[travisIndex].Amount = MRP*(quantity88+quantity90)
              state.travisMethew[travisIndex].ordered = true;
            }
          },
          updateQuantity88:(state,actions) => {
            const {sku, qty88,MRP}=actions.payload;
            const travisIndex = state.travisMethew.findIndex(
              (travisItem) => travisItem.SKU === sku
            );
            if (travisIndex!== -1) {
              state.travisMethew[travisIndex].Quantity88 = qty88;
              const quantity88 = state.travisMethew[travisIndex]?.Quantity88 ?? 0;
              const quantity90 = state.travisMethew[travisIndex]?.Quantity90 ?? 0;
              state.travisMethew[travisIndex].TotalQty = quantity88+quantity90;

              //const totalQty = state.travisMethew[travisIndex]?.TotalQty ?? 0;
              state.travisMethew[travisIndex].Amount = MRP*(quantity88+quantity90)
              state.travisMethew[travisIndex].ordered = true;
            }
          },
          

    }
});

export const {
    resetTravisProduct,
     addTravisProduct 
    ,updateNewData,
    updateQuantity90,
    updateQuantity88
} = TravisMethewSlice.actions;
export const getTravisProducts = (state: { travisMethew: ProductState }): BasicModelTravis[] => {
    return state.travisMethew?.travisMethew || [];
};

export default TravisMethewSlice.reducer;
