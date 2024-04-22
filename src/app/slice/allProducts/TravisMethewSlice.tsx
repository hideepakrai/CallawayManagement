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
          

    }
});

export const { addTravisProduct ,updateNewData} = TravisMethewSlice.actions;
export const getTravisProducts = (state: { travisMethew: ProductState }): BasicModelTravis[] => {
    return state.travisMethew?.travisMethew || [];
};

export default TravisMethewSlice.reducer;
