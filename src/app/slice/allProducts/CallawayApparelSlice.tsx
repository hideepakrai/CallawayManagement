import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { start } from "repl";
import { BasicModelGoods } from "../../modules/model/goods/CallawayGoodsModel";
import { BasicModelApparel } from "../../modules/model/apparel/CallawayApparelModel";
interface ProductState {
    callawayApparel: BasicModelApparel[],
    otherProduct:BasicModelApparel[],
    uniqueCategories: string[]; 
    uniqueSeries: string[]; 
    uniquetype: string[]; 
    isStartLoading : boolean;
    
}

const initialState: ProductState = {
    callawayApparel: [],
    otherProduct:[],
    uniqueCategories:[],
    uniqueSeries:[],
    uniquetype:[],
    isStartLoading:false

};
const CallawayGoodsSlice = createSlice({
    name: "callawayApparel",
    initialState,
    reducers: {
        resetCallayApparel: () => {
        return initialState;
       },
    
        addCallawayApparelProduct: (state, action) => {
            const { apparelProduct} = action.payload;
            const categoriesSet = new Set<string>();
            const seriesSet = new Set<string>();
            const typeSet = new Set<string>();
            const apparelLength= state.callawayApparel.length;
            if(apparelLength===0){
              if (apparelProduct && apparelProduct.length > 0) {
                apparelProduct.forEach((item: BasicModelApparel) => {
                   
                    if (item &&
                        item?.category &&
                        item?.series &&
                         item?.type)
                     { 

                            categoriesSet.add(item.category);
                            seriesSet.add(item.series);
                            typeSet.add(item.type);
                        
                         
                        
                    }
   
                    if( item.stock_90!=0){
                      state.callawayApparel.push({
                        sku: item.sku,
                        description: item.description,  
                        mrp: item.mrp,
                        gst: item.gst, 
                        color: item.color,
                        size:item.size,
                        category: item.category,
                        gender: item.gender,
                        series: item.series,
                        type: item.type,
                        style_id: item.style_id,
                        sleeves: item.sleeves,
                        season: item.season,

                        primary_image_url: item.primary_image_url,
                        gallery_images_url: item.gallery_images_url,
                        variation_sku: item.variation_sku,
                        stock_90:item.stock_90,    
                        stock_88:item.stock_88,    
                        Quantity90:0,     
                        Amount:0,
                        TotalQty:0,
                        LessGST:0,
                        LessDiscountAmount:0,
                        Discount:0,
                        NetBillings:0,
                        FinalBillValue:0,    
                        error90:"",
                        error88:"",
                        primaryImage:"",
                        secondaryImage:[]
                   
  
                      });
                    }
                 
                   

                    state.uniqueCategories = Array.from(categoriesSet);
                    state.uniqueSeries = Array.from(seriesSet);
                    state.uniquetype = Array.from(typeSet);
                });
            }
            }
            else if(apparelLength>0){
              if(apparelProduct && apparelProduct.length > 0) {
                apparelProduct.forEach((item: BasicModelApparel) => {
                  const goodsIndex = state.callawayApparel.findIndex(
                    (items) => items.sku === item.sku
                  );
                  if(goodsIndex!==-1){
                    const trvsRedux=state.callawayApparel[goodsIndex];
                    // const trvs= state.travisMethew[travisIndex].TravisAttributes
                      
                      if(trvsRedux){
                        
                        const rdxStock90=trvsRedux.stock_90;
                        const rdxStock88=trvsRedux.stock_88;
                        
                        const cusrrentStock90=item.stock_90;
                        const cusrrentStock88=item.stock_88;
                        if(rdxStock90 &&cusrrentStock90 &&rdxStock88 &&cusrrentStock88){
                           if(rdxStock90!=cusrrentStock90){
                           
                            trvsRedux.stock_90=cusrrentStock90;
                          }
                           if(rdxStock88!=cusrrentStock88){
                           
                            trvsRedux.stock_88=cusrrentStock88;
                          }
                          
                          if( trvsRedux.Quantity90&&trvsRedux.Quantity90>cusrrentStock90){
                            trvsRedux.error90="Quantity is more than Stock"
                          }
                          if( trvsRedux.Quantity88&&trvsRedux.Quantity88>cusrrentStock88){
                            trvsRedux.error88="Quantity is more than Stock"
                          }

                        }
                      }
              } 
            
            })
          }
            //else if(travisIndex===-1){
                    
            //         // const att: TravisMathewAttribute[] = [
            //         //   {
            //         //     StyleCode: goodsProduct.StyleCode,
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
            
        }
        }
    }
})

export const {
    resetCallayApparel,
    addCallawayApparelProduct
    
} = CallawayGoodsSlice.actions;
export const getGoodsProducts = (state: { callawayApparel: ProductState }): BasicModelApparel[] => {
    return state.callawayApparel?.callawayApparel || [];
};
export const getOtherProducts = (state: { callawayApparel: ProductState }): BasicModelApparel[] => {
    return state.callawayApparel?.otherProduct || [];
};
export const getCategory = (state: { callawayApparel: ProductState }): string[] => {
    return state.callawayApparel?.uniqueCategories || [];
};
export const getSeries = (state: { callawayApparel: ProductState }): string[] => {
    return state.callawayApparel?.uniqueSeries || [];
};
export const getType = (state: { callawayApparel: ProductState }): string[] => {
    return state.callawayApparel?.uniquetype || [];
};




export default CallawayGoodsSlice.reducer;
