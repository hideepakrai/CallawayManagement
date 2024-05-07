import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { BasicModelTravis, BasicModelTravisGraph, TravisMathewAttribute ,ImageType} from "../../modules/model/travis/TravisMethewModel";
import {ExcelModelTravis} from "../../modules/model/travis/TravisExcel"
import { start } from "repl";
interface ProductState {
    travisMethew: BasicModelTravis[],
    otherProduct:BasicModelTravis[],
    uniqueCategories: string[]; 
    uniqueStyleCode: string[]; 
    uniqueSeason: string[]; 
    isStartLoading : boolean;
    
}

const initialState: ProductState = {
    travisMethew: [],
    otherProduct:[],
    uniqueCategories:[],
    uniqueStyleCode:[],
    uniqueSeason:[],
    isStartLoading:false

};
const TravisMethewSlice = createSlice({
    name: "travisMethew",
    initialState,
    reducers: {
       resetTravisProduct: () => {
        return initialState;
       },
       startTravisLoading:(state)=>{
        state.isStartLoading = true
       },
       stopTravisLoading:(state)=>{
         state.isStartLoading = false
       },
       
       reloadTravisProduct:(state, action)=>{
        state.travisMethew=action.payload.reloadTravis
       
       },
        addTravisProduct: (state, action:PayloadAction<{ travisProduct: BasicModelTravisGraph[], id: string }>) => {
            const { travisProduct, id } = action.payload;
            const categoriesSet = new Set<string>();
            const seasonSet = new Set<string>();
            const styleCodesSet = new Set<string>();
            if (travisProduct && travisProduct.length > 0) {
                travisProduct.forEach((item: BasicModelTravisGraph) => {
                    const att: TravisMathewAttribute[] = [];
                    if (item &&
                        item.attributes &&
                        item.attributes.AttributeSet &&
                        Array.isArray(item.attributes.AttributeSet)
                    ) { // Null check here

                   
                        item?.attributes?.AttributeSet?.forEach((attrItems: TravisMathewAttribute) => {
                          if (attrItems?.Category && attrItems?.Season && attrItems?.StyleCode) {
                            categoriesSet.add(attrItems?.Category);
                            seasonSet.add(attrItems?.Season);
                            styleCodesSet.add(attrItems?.StyleCode);
                        }
                            att.push({
                                StyleCode: attrItems?.StyleCode,
                                Length: attrItems?.Length,
                                Category: attrItems?.Category,
                                Season: attrItems?.Season,
                                Line: attrItems?.Line,
                                Color: attrItems?.Color,
                                ColorCode: attrItems?.ColorCode,
                                Size:attrItems?.Size,
                                Stock88:attrItems?.Stock88,
                                Stock90:attrItems?.Stock90,
                            });
                        });
                    }

                 
                    state.travisMethew.push({
                      id:item.id,
                       brand: item.attributes.brand,
                        Name: item.attributes.Name,
                        Description: item.attributes.Description,
                        SKU: item.attributes.SKU,
                        MRP: item.attributes.MRP,
                        Gallery: item.attributes?.Gallery,
                        SetType: item.attributes.SetType,
                        ProductType: item.attributes.ProductType,
                        TravisAttributes: att,
                        products:item.attributes?.products,
                        TotalQty: 0,
                        Quantity88: 0,
                        Quantity90: 0,
                        Amount: 0,
                        





                    });

                    state.uniqueCategories = Array.from(categoriesSet);
                    state.uniqueSeason = Array.from(seasonSet);
                    state.uniqueStyleCode = Array.from(styleCodesSet);
                });
            }
        },
           reloadCategory:(state,action)=>{
            state.uniqueCategories=action.payload.reloadCategory

           },
           reloadStyleCode:(state,action)=>{
            state.uniqueStyleCode=action.payload.reloadStyleCode
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
                       Stock90:travisProduct.Stock90,
                      
                       // Assuming Gender might be optional
                    },
                  ];
          

                 
                  state.travisMethew.push({
                    brand: travisProduct.brand,
                    Name: travisProduct.Name,
                    Description: travisProduct.Description,
                    SKU: travisProduct.SKU,
                    Gallery: travisProduct?.Gallery?.data?.attributes?.formats?.thumbnail?.url,
                    MRP: travisProduct.MRP,
                    SetType: travisProduct.SetType,
                    ProductType: travisProduct.ProductType,
                    GST: travisProduct.GST,
                    TravisAttributes: att,

                        TotalQty: 0,
                        Quantity88: 0,
                        Quantity90: 0,
                        Amount: 0
                  });
                } else{
                  state.travisMethew[travisIndex].Name=travisProduct.Name!=null ? travisProduct.name:state.travisMethew[travisIndex].Name;
                  state.travisMethew[travisIndex].Description=travisProduct.Description!=null ? travisProduct.Description:state.travisMethew[travisIndex].Description;
                  state.travisMethew[travisIndex].MRP=travisProduct.MRP!=null ? travisProduct.MRP:state.travisMethew[travisIndex].MRP;
                  state.travisMethew[travisIndex].GST=travisProduct.GST!=null ? travisProduct.GST:state.travisMethew[travisIndex].GST;
                      const trs=state.travisMethew[travisIndex]?.TravisAttributes

                    if( trs){
                      trs[0].StyleCode=travisProduct.StyleCode!=null ? travisProduct.StyleCode:trs[0].StyleCode;
                      trs[0].Length=travisProduct.Length!=null ? travisProduct.Length:trs[0].Length;
                      trs[0].Category=travisProduct.Category!=null ? travisProduct.Category:trs[0].Category;
                      trs[0].Season=travisProduct.Season!=null ? travisProduct.Season:trs[0].Season;
                      trs[0].Line=travisProduct.Line!=null ? travisProduct.Line:trs[0].Line;
                      trs[0].Color=travisProduct.Color!=null ? travisProduct.Color:trs[0].Color;
                      trs[0].ColorCode=travisProduct.ColorCode!=null ? travisProduct.ColorCode:trs[0].ColorCode;
                      trs[0].Gender=travisProduct.Gender!=null ? travisProduct.Gender:trs[0].Gender;
                      trs[0].Stock88=travisProduct.Stock88!=null ? travisProduct.Stock88:trs[0].Stock88;
                      trs[0].Stock90=travisProduct.Stock90!=null ? travisProduct.Stock90:trs[0].Stock90;
                      trs[0].Size=travisProduct.Size!=null ? travisProduct.Size:trs[0].Size;
                      
                    }
                  


                }
              
            }
          }
          ,

          updateQuantity90:(state,actions) => {
          
            
            
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
          addOtherProduct:(state,action)=>{
            state.otherProduct=action.payload;

          },
          updateOtherQuantity90:(state,actions) => {
          
            
            
            const {sku, qty90,MRP}=actions.payload;
            const otherIndex = state.otherProduct.findIndex(
              (other) => other.SKU === sku
            );
            if (otherIndex!== -1) {
              state.otherProduct[otherIndex].Quantity90 = qty90;
               
              const quantity88 = state.otherProduct[otherIndex]?.Quantity88 ?? 0;
              const quantity90 = state.otherProduct[otherIndex]?.Quantity90 ?? 0;
              state.otherProduct[otherIndex].TotalQty = quantity88+quantity90;

              
              state.otherProduct[otherIndex].Amount = MRP*(quantity88+quantity90)
              state.otherProduct[otherIndex].ordered = true;
            }
          },
          updateOtherQuantity88:(state,actions) => {
            const {sku, qty88,MRP}=actions.payload;
            const otherIndex = state.otherProduct.findIndex(
              (travisItem) => travisItem.SKU === sku
            );
            if (otherIndex!== -1) {
              state.otherProduct[otherIndex].Quantity88 = qty88;
              const quantity88 = state.otherProduct[otherIndex]?.Quantity88 ?? 0;
              const quantity90 = state.otherProduct[otherIndex]?.Quantity90 ?? 0;
              state.otherProduct[otherIndex].TotalQty = quantity88+quantity90;

              //const totalQty = state.otherProduct.[otherIndex]?.TotalQty ?? 0;
              state.otherProduct[otherIndex].Amount = MRP*(quantity88+quantity90)
              state.otherProduct[otherIndex].ordered = true;
            }
          },
          removeOtherProduct:(state)=>{
             state.otherProduct=[]
          }

          

    }
});

export const {
    resetTravisProduct,
     addTravisProduct 
    ,updateNewData,
    updateQuantity90,
    updateQuantity88,
    addOtherProduct,
    updateOtherQuantity90,
    updateOtherQuantity88,
    removeOtherProduct,
    reloadTravisProduct,
    reloadCategory,
    reloadStyleCode,startTravisLoading,stopTravisLoading
} = TravisMethewSlice.actions;
export const getTravisProducts = (state: { travisMethew: ProductState }): BasicModelTravis[] => {
    return state.travisMethew?.travisMethew || [];
};
export const getOtherProducts = (state: { travisMethew: ProductState }): BasicModelTravis[] => {
    return state.travisMethew?.otherProduct || [];
};
export const getCategory = (state: { travisMethew: ProductState }): string[] => {
    return state.travisMethew?.uniqueCategories || [];
};
export const getStyleCode = (state: { travisMethew: ProductState }): string[] => {
    return state.travisMethew?.uniqueStyleCode || [];
};
export const getTravisStartLoading = (state: { travisMethew: ProductState }): boolean => {
    return state.travisMethew?.isStartLoading;
};



export default TravisMethewSlice.reducer;
