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
        addTravisProduct: (state, action) => {
            const { travisProduct} = action.payload;
            const categoriesSet = new Set<string>();
            const seasonSet = new Set<string>();
            const styleCodesSet = new Set<string>();
            const tarvisLength= state.travisMethew.length;
            if(tarvisLength===0){
              if (travisProduct && travisProduct.length > 0) {
                travisProduct.forEach((item: BasicModelTravis) => {
                   
                    if (item &&
                        item?.category &&
                        item?.season &&
                         item?.style_code)
                     { 

                            categoriesSet.add(item.category);
                            seasonSet.add(item.season);
                            styleCodesSet.add(item.style_code);
                        
                         
                        
                    }

                 
                    state.travisMethew.push({
                      sku: item.sku,
                            name: item.name,
                            description: item.description,
                            mrp: item.mrp,
                            category: item.category,
                            season:item.season,
                            style_code:item.style_code,
                            color: item.color,
                            gst: item.gst,
                            brand_id: item.brand_id,
                            primary_image_url: item.primary_image_url,
                            gallery_images_url: item.gallery_images_url,
                            variation_sku: item.variation_sku,
                            stock_90:item.stock_90,
                            stock_88:item.stock_88,
                            Quantity90:0,
                            Quantity88:0,
                            Amount:0,
                            TotalQty:0,
                            LessGST:0,
                            LessDiscountAmount:0,
                            Discount:0,
                            NetBillings:0,
                            FinalBillValue:0,
                            error88:"",
                            error90:"",
                            
                        
                        

                    });

                    state.uniqueCategories = Array.from(categoriesSet);
                    state.uniqueSeason = Array.from(seasonSet);
                    state.uniqueStyleCode = Array.from(styleCodesSet);
                });
            }
            }
            // else if(tarvisLength>0){
            //   if(travisProduct && travisProduct.length > 0) {
            //     travisProduct.forEach((item: BasicModelTravisGraph) => {
            //       const travisIndex = state.travisMethew.findIndex(
            //         (travisItem) => travisItem.SKU === item.attributes.SKU
            //       );
            //       if(travisIndex!==-1){
            //         const trvsRedux=state.travisMethew[travisIndex];
            //          const trvs= state.travisMethew[travisIndex].TravisAttributes
            //           const cusrrent=item.attributes.AttributeSet;
            //           if(trvs&& cusrrent &&trvsRedux){
            //             const rdxStock88=trvs[0].Stock88;
            //             const rdxStock90=trvs[0].Stock90;
            //             const cusrrentStock88=cusrrent[0].Stock88;
            //             const cusrrentStock90=cusrrent[0].Stock90;
            //             if(rdxStock88&& rdxStock90 &&cusrrentStock88 &&cusrrentStock90){
            //               if(rdxStock88!=cusrrentStock88){
                           
            //                 trvs[0].Stock88=cusrrentStock88;
            //               } if(rdxStock90!=cusrrentStock90){
                           
            //                 trvs[0].Stock90=cusrrentStock90;
            //               }
            //               if( trvsRedux.Quantity88&&trvsRedux.Quantity88>cusrrentStock88){
            //                 trvsRedux.error88="Quantity is more than Stock"
            //               }
            //               if( trvsRedux.Quantity90&&trvsRedux.Quantity90>cusrrentStock90){
            //                 trvsRedux.error90="Quantity is more than Stock"
            //               }
                        

            //             }
            //           }
            //       } else if(travisIndex===-1){
                    
            //         // const att: TravisMathewAttribute[] = [
            //         //   {
            //         //     StyleCode: travisProduct.StyleCode,
            //         //     Length: travisProduct.Length,
            //         //     Category: travisProduct.Category,
            //         //     Season: travisProduct.Season,
            //         //     Line: travisProduct.Line,
            //         //     Color: travisProduct.Color,
            //         //     ColorCode: travisProduct.ColorCode,
            //         //     Size: travisProduct.Size,
            //         //     Gender: travisProduct.Gender || "", 
            //         //     Stock88:travisProduct.Stock88,
            //         //      Stock90:travisProduct.Stock90,
                        
            //         //      // Assuming Gender might be optional
            //         //   },
            //         // ];
            
      
                   
            //         // state.travisMethew.push({
            //         //   brand: travisProduct.brand,
            //         //   Name: travisProduct.Name,
            //         //   Description: travisProduct.Description,
            //         //   SKU: travisProduct.SKU,
            //         //   Gallery: travisProduct?.Gallery?.data?.attributes?.formats?.thumbnail?.url,
            //         //   MRP: travisProduct.MRP,
            //         //   SetType: travisProduct.SetType,
            //         //   ProductType: travisProduct.ProductType,
            //         //   GST: travisProduct.GST,
            //         //   TravisAttributes: att,
      
            //         //       TotalQty: 0,
            //         //       Quantity88: 0,
            //         //       Quantity90: 0,
            //         //       Amount: 0
            //         // });
            //       }

            //     })
                
            //   }
              

               
           
            // }
            
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
                  (travisItem) => travisItem.sku === travisProduct.sku
                );
          
                if (travisIndex===-1) {
                  state.travisMethew.push({
                    sku: travisProduct.sku,
                          name: travisProduct.name,
                          description: travisProduct.description,
                          mrp: travisProduct.mrp,
                          category: travisProduct.category,
                          gst: travisProduct.gst,
                          brand_id: travisProduct.brand_id,
                          primary_image_url: travisProduct.primary_image_url,
                          gallery_images_url: travisProduct.gallery_images_url,
                          variation_sku: travisProduct.variation_sku,
                          stock_90:travisProduct.stock_90,
                          stock_88:travisProduct.stock_88,
                          Quantity90:0,
                          Quantity88:0,
                          Amount:0,
                          TotalQty:0,
                          LessGST:0,
                          LessDiscountAmount:0,
                          Discount:0,
                          NetBillings:0,
                          FinalBillValue:0,
                          error88:"",
                          error90:"",
                          
                  })
                

                 
              
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
