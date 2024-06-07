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
                    // const trvs= state.callawayApparel[goodsIndex].TravisAttributes
                      
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
            //else if(goodsIndex===-1){
                    
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
            
      
                   
            //         // state.callawayApparel.push({
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
        },
        updateQuantity90:(state,actions) => {
        
          const {sku, qty90,MRP}=actions.payload;
          const goodsIndex = state.callawayApparel.findIndex(
            (apparelItem) => apparelItem.sku === sku
          );
          if (goodsIndex!== -1) {
            state.callawayApparel[goodsIndex].Quantity90 = qty90;
             
            const quantity88 = state.callawayApparel[goodsIndex]?.Quantity88 ?? 0;
            const quantity90 = state.callawayApparel[goodsIndex]?.Quantity90 ?? 0;
            state.callawayApparel[goodsIndex].TotalQty = quantity88+quantity90;

            
            state.callawayApparel[goodsIndex].Amount = MRP*(quantity88+quantity90)
            state.callawayApparel[goodsIndex].ordered = true;
            const gst=state.callawayApparel[goodsIndex].gst;
             const mrp=state.callawayApparel[goodsIndex].mrp;
             const amount=state.callawayApparel[goodsIndex].Amount;
             if(mrp &&gst && amount){
              const gstdiscount = parseFloat((amount - ((100 * amount) / (100 + gst))).toFixed(2));


            const netbill = parseFloat((amount - ((amount * 22) / 100) - gstdiscount).toFixed(2));

            const lessDiscountAmount = parseFloat(((amount * 22) / 100).toFixed(2));


            const netBillings = parseFloat((amount - (qty90 * gst * mrp / 100)).toFixed(2));

            const finalBillValue = parseFloat((netbill + (gst * netbill / 100)).toFixed(2));

            state.callawayApparel[goodsIndex].LessGST = gstdiscount;
            state.callawayApparel[goodsIndex].LessDiscountAmount = lessDiscountAmount;
            state.callawayApparel[goodsIndex].NetBillings = netBillings;
            state.callawayApparel[goodsIndex].FinalBillValue = finalBillValue;
          } if(goodsIndex!== -1 &&qty90==0 &&quantity88===0) {
            state.callawayApparel[goodsIndex].Quantity90 = 0;
            state.callawayApparel[goodsIndex].Quantity88 = 0;
            state.callawayApparel[goodsIndex].Amount = 0;
            state.callawayApparel[goodsIndex].ordered = false;

        }
     
        
          
          }
        },
        updateQuantity88:(state,actions) => {
          const {sku, qty88,MRP}=actions.payload;
          const goodsIndex = state.callawayApparel.findIndex(
            (apparelItem) => apparelItem.sku === sku
          );
          if (goodsIndex!== -1) {
            state.callawayApparel[goodsIndex].Quantity88 = qty88;
            const quantity88 = state.callawayApparel[goodsIndex]?.Quantity88 ?? 0;
            const quantity90 = state.callawayApparel[goodsIndex]?.Quantity90 ?? 0;
            const total=quantity88+quantity90;
            state.callawayApparel[goodsIndex].TotalQty = quantity88+quantity90;

            //const totalQty = state.callawayApparel[goodsIndex]?.TotalQty ?? 0;
            state.callawayApparel[goodsIndex].Amount = MRP*(quantity88+quantity90)
            state.callawayApparel[goodsIndex].ordered = true;
            const gst=state.callawayApparel[goodsIndex].gst;
            const mrp=state.callawayApparel[goodsIndex].mrp;
            const amount=state.callawayApparel[goodsIndex].Amount;
            if(mrp &&gst && amount){
             const gstdiscount = parseFloat((amount - ((100 * amount) / (100 + gst))).toFixed(2));


           const netbill = parseFloat((amount - ((amount * 22) / 100) - gstdiscount).toFixed(2));

           const lessDiscountAmount = parseFloat(((amount * 22) / 100).toFixed(2));


           const netBillings = parseFloat((amount - (total * gst * mrp / 100)).toFixed(2));

           const finalBillValue = parseFloat((netbill + (gst * netbill / 100)).toFixed(2));

           state.callawayApparel[goodsIndex].LessGST = gstdiscount;
           state.callawayApparel[goodsIndex].LessDiscountAmount = lessDiscountAmount;
           state.callawayApparel[goodsIndex].NetBillings = netBillings;
           state.callawayApparel[goodsIndex].FinalBillValue = finalBillValue;
         } if(goodsIndex!== -1 &&qty88==0 &&quantity90===0) {
           state.callawayApparel[goodsIndex].Quantity90 = 0;
           state.callawayApparel[goodsIndex].Quantity88 = 0;
           state.callawayApparel[goodsIndex].Amount = 0;
           state.callawayApparel[goodsIndex].ordered = false;

       }

          }
        },
        updateApparelQty:(state,action)=>{
          const {apparelProduct}= action.payload
          if(apparelProduct && apparelProduct.length>0){
            apparelProduct.map((newApparel:BasicModelApparel)=>{
              const goodsIndex= state.callawayApparel.findIndex(item=>item.sku==newApparel.sku);
              if(goodsIndex!=-1){
                state.callawayApparel[goodsIndex].stock_88=newApparel.stock_88;
                state.callawayApparel[goodsIndex].stock_90=newApparel.stock_90;
              }
            })
          }
          
         },
         updateReduxData: (state, action) => {
          const { travisProduct } = action.payload;

          if (travisProduct.length>0) {

            travisProduct.map((item:BasicModelApparel)=>{
              const goodsIndex = state.callawayApparel.findIndex(
                (travisItem) => travisItem.sku === item.sku
              );

              if (goodsIndex===-1) {
                state.callawayApparel.push({
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
                        size:travisProduct.size,
                        // style_code:travisProduct.style_code,
                       // length:travisProduct.length,
                        season:travisProduct.season,
                       // line:travisProduct.line,
                        color:travisProduct.color,
                       // color_code:travisProduct.color_code,
                        gender:travisProduct.gender,
                       
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
              else if (goodsIndex!==-1){
                const rdx= state.callawayApparel[goodsIndex];
                state.callawayApparel[goodsIndex].name=item.name!=undefined ?item.name:rdx.name;
                state.callawayApparel[goodsIndex].description=item.description!=undefined ?item.description:rdx.description;
                state.callawayApparel[goodsIndex].mrp=item.mrp!=undefined ?item.mrp:rdx.mrp;
                state.callawayApparel[goodsIndex].category=item.category!=undefined ?item.category:rdx.category;
               // state.callawayApparel[goodsIndex].style_code=item.style_code!=undefined ?item.style_code:rdx.style_code;
                state.callawayApparel[goodsIndex].color=item.color!=undefined ?item.color:rdx.color;
                state.callawayApparel[goodsIndex].gst=item.gst!=undefined ?item.gst:rdx.gst;
                state.callawayApparel[goodsIndex].size=item.size!=undefined ?item.size:rdx.size;
               // state.callawayApparel[goodsIndex].length=item.length!=undefined ?item.length:rdx.length;
                state.callawayApparel[goodsIndex].primary_image_url=item.primary_image_url!=undefined ?item.primary_image_url:rdx.primary_image_url;
                state.callawayApparel[goodsIndex].gallery_images_url=item.gallery_images_url!=undefined ?item.gallery_images_url:rdx.gallery_images_url;
                state.callawayApparel[goodsIndex].stock_90=item.stock_90!=undefined ?item.stock_90:rdx.stock_90;
                state.callawayApparel[goodsIndex].stock_88=item.stock_88!=undefined ?item.stock_88:rdx.stock_88;
                state.callawayApparel[goodsIndex].variation_sku=item.variation_sku!=undefined ?item.variation_sku:rdx.variation_sku;
               
        
              }
            })
              
        
             
            
          }
        }
        ,

    }
    

})

export const {
    resetCallayApparel,
    addCallawayApparelProduct,
    updateQuantity90,
    updateQuantity88,
    updateApparelQty,
    updateReduxData

    
} = CallawayGoodsSlice.actions;
export const getApparelProducts = (state: { callawayApparel: ProductState }): BasicModelApparel[] => {
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

export const getAppaProducts = (state: { callawayApparel: ProductState }): BasicModelApparel[] => {
  return state.callawayApparel?.callawayApparel || [];
};




export default CallawayGoodsSlice.reducer;
