import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { BasicModelTravis, BasicModelTravisGraph, TravisMathewAttribute } from "../../modules/brands/model/travis/TravisMethewModel";

interface ProductState {
    travisMethew: BasicModelTravis[],
}

const TravisMethewSlice = createSlice({
    name: "travisMethew",
    initialState: {
        travisMethew: []
    } as ProductState,
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
                        // item.attributes.AttributeSet.forEach((attrItems: TravisMathewAttribute) => {
                        //     att.push({
                        //         StyleCode: attrItems.StyleCode,
                        //         Length: attrItems.Length,
                        //         Category: attrItems.Category,
                        //         Season: attrItems.Season,
                        //         Line: attrItems.Line,
                        //         Color: attrItems.Color,
                        //         ColorCode: attrItems.ColorCode,
                        //     });
                        // });
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
    }
});

export const { addTravisProduct } = TravisMethewSlice.actions;
export const getTravisProducts = (state: { travisMethew: ProductState }): BasicModelTravis[] => {
    return state.travisMethew?.travisMethew || [];
};

export default TravisMethewSlice.reducer;
