import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { BasicModelTravis, BasicModelTravisGraph, TravisMathewAttribute } from "../../modules/brands/model/travis/TravisMethewModel";
import {ExcelModelTravis} from "../../modules/brands/model/travis/TravisExcel"
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
                                Size:attrItems.Size
                            });
                        });
                    }
                    state.travisMethew.push({
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
                        TravisAttributes: att,
                        StockAvailable88:item.attributes.StockAvailable88,
                        StockAvailable90:item.attributes.StockAvailable90,
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
            // eslint-disable-next-line no-debugger
            debugger
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
                      Gender: travisProduct.Gender || "", // Assuming Gender might be optional
                    },
                  ];
          
                  state.travisMethew.push({
                    Name: travisProduct.Name,
                    Description: travisProduct.Description,
                    SKU: travisProduct.SKU,
                    StockManagement: travisProduct.StockManagement,
                    StockStatus: travisProduct.StockStatus,
                    RegularPrice: travisProduct.RegularPrice,
                    SalePrice: travisProduct.SalePrice,
                    StockAvailable: travisProduct.StockAvailable,
                    SetType: travisProduct.SetType,
                    ProductType: travisProduct.ProductType,
                    TravisAttributes: att,
                  });
                }
              
            }
          }
          ,

          updateQuantity90:(state,actions) => {
            const {sku, qty90,RegularPrice}=actions.payload;
            const travisIndex = state.travisMethew.findIndex(
              (travisItem) => travisItem.SKU === sku
            );
            if (travisIndex!== -1) {
              state.travisMethew[travisIndex].Quantity90 = qty90;
             
              const quantity88 = state.travisMethew[travisIndex]?.Quantity88 ?? 0;
              const quantity90 = state.travisMethew[travisIndex]?.Quantity90 ?? 0;
              const costPrice = state.travisMethew[travisIndex]?.RegularPrice ?? 0;
              state.travisMethew[travisIndex].TotalQty = quantity88+quantity90
              state.travisMethew[travisIndex].RegularPrice = RegularPrice*costPrice
            }
          },
          updateQuantity88:(state,actions) => {
            const {sku, qty88}=actions.payload;
            const travisIndex = state.travisMethew.findIndex(
              (travisItem) => travisItem.SKU === sku
            );
            if (travisIndex!== -1) {
              state.travisMethew[travisIndex].Quantity88 = qty88;
              const quantity88 = state.travisMethew[travisIndex]?.Quantity88 ?? 0;
              const quantity90 = state.travisMethew[travisIndex]?.Quantity90 ?? 0;
              
              state.travisMethew[travisIndex].TotalQty = quantity88+quantity90
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
