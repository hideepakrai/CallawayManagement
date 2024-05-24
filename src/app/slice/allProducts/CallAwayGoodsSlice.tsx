import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { start } from "repl";
import { BasicModelGoods } from "../../modules/model/goods/CallawayGoodsModel";
interface ProductState {
    callawayGoods: BasicModelGoods[],
    otherProduct:BasicModelGoods[],
    uniqueCategories: string[]; 
    uniqueProductModel: string[]; 
    uniqueProductType: string[]; 
    isStartLoading : boolean;
    
}

const initialState: ProductState = {
    callawayGoods: [],
    otherProduct:[],
    uniqueCategories:[],
    uniqueProductModel:[],
    uniqueProductType:[],
    isStartLoading:false

};
const CallawayGoodsSlice = createSlice({
    name: "callawayGoods",
    initialState,
    reducers: {
        resetCallayGoods: () => {
        return initialState;
       },
    
        addCallawayGoodsProduct: (state, action) => {
            const { goodsProduct} = action.payload;
            const categoriesSet = new Set<string>();
            const productTypeSet = new Set<string>();
            const productModelSet = new Set<string>();
            const goodsLength= state.callawayGoods.length;
            if(goodsLength===0){
              if (goodsProduct && goodsProduct.length > 0) {
                goodsProduct.forEach((item: BasicModelGoods) => {
                   
                    if (item &&
                        item?.category &&
                        item?.product_model &&
                         item?.product_type)
                     { 

                            categoriesSet.add(item.category);
                            productTypeSet.add(item.product_type);
                            productModelSet.add(item.product_model);
                        
                         
                        
                    }
   
                    if( item.stock_90!=0){
                      state.callawayGoods.push({
                        sku: item.sku,
                        description: item.description,  
                        product_type:item.product_type, 
                        category: item.category,
                        product_model:item.product_model,
                        life_cycle:item.life_cycle,
                        orientation: item.orientation,
                        mrp: item.mrp,
                        gst: item.gst,   
                        primary_image_url: item.primary_image_url,
                        gallery_images_url: item.gallery_images_url,
                        variation_sku: item.variation_sku,
                        stock_90:item.stock_90,    
                        Quantity90:0,     
                        Amount:0,
                        TotalQty:0,
                        LessGST:0,
                        LessDiscountAmount:0,
                        Discount:0,
                        NetBillings:0,
                        FinalBillValue:0,    
                        error90:"",
                        primaryImage:"",
                        secondaryImage:[]
                   
  
                      });
                    }
                 
                   

                    state.uniqueCategories = Array.from(categoriesSet);
                    state.uniqueProductType = Array.from(productTypeSet);
                    state.uniqueProductModel = Array.from(productModelSet);
                });
            }
            }
            else if(goodsLength>0){
              if(goodsProduct && goodsProduct.length > 0) {
                goodsProduct.forEach((item: BasicModelGoods) => {
                  const goodsIndex = state.callawayGoods.findIndex(
                    (items) => items.sku === item.sku
                  );
                  if(goodsIndex!==-1){
                    const trvsRedux=state.callawayGoods[goodsIndex];
                    // const trvs= state.travisMethew[travisIndex].TravisAttributes
                      
                      if(trvsRedux){
                        
                        const rdxStock90=trvsRedux.stock_90;
                        
                        const cusrrentStock90=item.stock_90;
                        if(rdxStock90 &&cusrrentStock90){
                           if(rdxStock90!=cusrrentStock90){
                           
                            trvsRedux.stock_90=cusrrentStock90;
                          }
                          
                          if( trvsRedux.Quantity90&&trvsRedux.Quantity90>cusrrentStock90){
                            trvsRedux.error90="Quantity is more than Stock"
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
      },
        

        // updateReduxData: (state, action) => {
        //     const { travisProduct } = action.payload;

        //     if (travisProduct) {
              
        //         const travisIndex = state.travisMethew.findIndex(
        //           (travisItem) => travisItem.sku === travisProduct.sku
        //         );
          
        //         if (travisIndex===-1) {
        //           state.travisMethew.push({
        //             sku: travisProduct.sku,
        //                   name: travisProduct.name,
        //                   description: travisProduct.description,
        //                   mrp: travisProduct.mrp,
        //                   category: travisProduct.category,
        //                   gst: travisProduct.gst,
        //                   brand_id: travisProduct.brand_id,
        //                   primary_image_url: travisProduct.primary_image_url,
        //                   gallery_images_url: travisProduct.gallery_images_url,
        //                   variation_sku: travisProduct.variation_sku,
        //                   stock_90:travisProduct.stock_90,
        //                   stock_88:travisProduct.stock_88,
        //                   Quantity90:0,
        //                   Quantity88:0,
        //                   Amount:0,
        //                   TotalQty:0,
        //                   LessGST:0,
        //                   LessDiscountAmount:0,
        //                   Discount:0,
        //                   NetBillings:0,
        //                   FinalBillValue:0,
        //                   error88:"",
        //                   error90:"",
                          
        //           })
                

                 
              
        //         } 
        //         else if (travisIndex!==-1){
        //           const rdx= state.travisMethew[travisIndex];
        //           if(travisProduct.name!==undefined){
        //             rdx.name=travisProduct.name
        //           } 
        //            if(travisProduct.description!==undefined){
        //             rdx.description=travisProduct.description
        //           }
        //            if(travisProduct.mrp!==undefined){
        //             rdx.mrp=travisProduct.mrp
        //           }
        //           if(travisProduct.category!==undefined){
        //             rdx.category=travisProduct.category
        //           }
        //           if(travisProduct.season!==undefined){
        //             rdx.season=travisProduct.season
        //           }
        //           if(travisProduct.style_code!==undefined){
        //             rdx.style_code=travisProduct.style_code
        //           }
        //           if(travisProduct.color!==undefined){
        //             rdx.color=travisProduct.color
        //           }
        //           if(travisProduct.gst!==undefined){
        //             rdx.gst=travisProduct.gst
        //           }
        //           if(travisProduct.primary_image_url!==undefined){
        //             rdx.primary_image_url=travisProduct.primary_image_url
        //           }
        //           if(travisProduct.gallery_images_url!==undefined){
        //             rdx.gallery_images_url=travisProduct.gallery_images_url
        //           }
        //           if(travisProduct.gallery_images_url!==undefined){
        //             rdx.gallery_images_url=travisProduct.gallery_images_url
        //           }
        //           if(travisProduct.variation_sku!==undefined){
        //             rdx.variation_sku=travisProduct.variation_sku
        //           }
        //           if(travisProduct.stock_90!==undefined){
        //             rdx.stock_90=travisProduct.stock_90
        //           }
        //           if(travisProduct.stock_88!==undefined){
        //             rdx.stock_88=travisProduct.stock_88
        //           }
                  
                 
                  
                 
                  




        //         }
              
        //     }
        //   }
        //   ,

    //       updateQuantity90:(state,actions) => {
        
    //         const {sku, qty90,MRP}=actions.payload;
    //         const travisIndex = state.travisMethew.findIndex(
    //           (travisItem) => travisItem.sku === sku
    //         );
    //         if (travisIndex!== -1) {
    //           state.travisMethew[travisIndex].Quantity90 = qty90;
               
    //           const quantity88 = state.travisMethew[travisIndex]?.Quantity88 ?? 0;
    //           const quantity90 = state.travisMethew[travisIndex]?.Quantity90 ?? 0;
    //           state.travisMethew[travisIndex].TotalQty = quantity88+quantity90;

              
    //           state.travisMethew[travisIndex].Amount = MRP*(quantity88+quantity90)
    //           state.travisMethew[travisIndex].ordered = true;
    //           const gst=state.travisMethew[travisIndex].gst;
    //            const mrp=state.travisMethew[travisIndex].mrp;
    //            const amount=state.travisMethew[travisIndex].Amount;
    //            if(mrp &&gst && amount){
    //             const gstdiscount = parseFloat((amount - ((100 * amount) / (100 + gst))).toFixed(2));


    //           const netbill = parseFloat((amount - ((amount * 22) / 100) - gstdiscount).toFixed(2));

    //           const lessDiscountAmount = parseFloat(((amount * 22) / 100).toFixed(2));


    //           const netBillings = parseFloat((amount - (qty90 * gst * mrp / 100)).toFixed(2));

    //           const finalBillValue = parseFloat((netbill + (gst * netbill / 100)).toFixed(2));

    //           state.travisMethew[travisIndex].LessGST = gstdiscount;
    //           state.travisMethew[travisIndex].LessDiscountAmount = lessDiscountAmount;
    //           state.travisMethew[travisIndex].NetBillings = netBillings;
    //           state.travisMethew[travisIndex].FinalBillValue = finalBillValue;
    //         } if(travisIndex!== -1 &&qty90==0 &&quantity88===0) {
    //           state.travisMethew[travisIndex].Quantity90 = 0;
    //           state.travisMethew[travisIndex].Quantity88 = 0;
    //           state.travisMethew[travisIndex].Amount = 0;
    //           state.travisMethew[travisIndex].ordered = false;

    //       }
       
          
            
    //         }
    //       },
        
    //       addOtherProduct:(state,action)=>{
    //         state.otherProduct=action.payload;

    //       },
    //       updateOtherQuantity90:(state,actions) => {
          
            
            
    //         const {sku, qty90,MRP}=actions.payload;
    //         const otherIndex = state.otherProduct.findIndex(
    //           (other) => other.SKU === sku
    //         );
    //         if (otherIndex!== -1) {
    //           state.otherProduct[otherIndex].Quantity90 = qty90;
               
    //           const quantity88 = state.otherProduct[otherIndex]?.Quantity88 ?? 0;
    //           const quantity90 = state.otherProduct[otherIndex]?.Quantity90 ?? 0;
    //           state.otherProduct[otherIndex].TotalQty = quantity88+quantity90;

              
    //           state.otherProduct[otherIndex].Amount = MRP*(quantity88+quantity90)
    //           state.otherProduct[otherIndex].ordered = true;
    //           const gst=state.otherProduct[otherIndex].gst;
    //           const mrp=state.otherProduct[otherIndex].mrp;
    //           const amount=state.otherProduct[otherIndex].Amount;
    //           if(mrp &&gst && amount){
    //            const gstdiscount = parseFloat((amount - ((100 * amount) / (100 + gst))).toFixed(2));


    //          const netbill = parseFloat((amount - ((amount * 22) / 100) - gstdiscount).toFixed(2));

    //          const lessDiscountAmount = parseFloat(((amount * 22) / 100).toFixed(2));


    //          const netBillings = parseFloat((amount - (qty90 * gst * mrp / 100)).toFixed(2));

    //          const finalBillValue = parseFloat((netbill + (gst * netbill / 100)).toFixed(2));

    //          state.otherProduct[otherIndex].LessGST = gstdiscount;
    //          state.otherProduct[otherIndex].LessDiscountAmount = lessDiscountAmount;
    //          state.otherProduct[otherIndex].NetBillings = netBillings;
    //          state.otherProduct[otherIndex].FinalBillValue = finalBillValue;
    //        } 
    //        if(otherIndex!== -1 &&qty90==0 &&quantity88===0) {
    //         state.otherProduct[otherIndex].Quantity90 = 0;
    //         state.otherProduct[otherIndex].Quantity88 = 0;
    //         state.otherProduct[otherIndex].Amount = 0;
    //         state.otherProduct[otherIndex].ordered = false;

    //     }


    //         }
    //       },
        
    //       removeOtherProduct:(state)=>{
    //          state.otherProduct=[]
    //       },
    //       updateTravisInclusiveDiscount:(state,action)=>{
    //         const {discount}= action.payload;
    //         state.travisMethew.forEach((item) => {
    //             item.Discount = parseFloat(discount.toFixed(2)); // Set Discount for each item
            
    //             const gst = item.gst||0; // Parse gst to float or default to 0
    //             const salP = item.Amount || 0; // Parse Amount to float or default to 0
            
    //             const gstdiscount = parseFloat((salP - ((100 * salP) / (100 + gst))).toFixed(2));
    //             item.LessGST = gstdiscount;
            
    //             const lessDiscountAmount = parseFloat(((salP * discount) / 100).toFixed(2));

    //             item.LessDiscountAmount = lessDiscountAmount;
            
    //             const netbill = parseFloat((salP - ((salP * discount) / 100) - gstdiscount).toFixed(2));
    //             item.NetBillings = netbill;
            
    //             const totalNetbill = parseFloat((netbill + (gst * netbill / 100)).toFixed(2));
    //             item.FinalBillValue = totalNetbill;
    //         });
    //     },
    //     updaterTravisExclusiveDiscount:(state,action)=>{
    //       const {discount}=action.payload;
    //       state.travisMethew.forEach((item) => {
    //           item.Discount = parseFloat(discount.toFixed(2)); // Set Discount for each item
          
    //           const gst = item.gst || 0; // Parse gst to float or default to 0
    //           const salP = item.Amount || 0; // Parse Amount to float or default to 0
          
    //           item.LessGST = 0; // Initialize LessGST to 0
          
    //           const lessDiscountAmount = parseFloat(((salP * discount) / 100).toFixed(2));
    //           item.LessDiscountAmount = lessDiscountAmount;
          
    //           const netbill = parseFloat((salP - ((salP * discount) / 100)).toFixed(2));
    //           item.NetBillings = netbill;
          
    //           const totalNetbill = parseFloat((netbill + (gst * netbill / 100)).toFixed(2));
    //           item.FinalBillValue = totalNetbill;
    //       });


    //   },
    //   updateTravisFlatDiscount:(state,action)=>{
    //     const {discount}=action.payload;
    //     state.travisMethew.forEach((item) => {
    //         item.Discount = parseFloat(discount.toFixed(2)); // Set Discount for each item
        
    //         item.LessGST = 0; // Initialize LessGST to 0
        
    //         const salP =item.Amount || 0; // Parse Amount to float or default to 0
        
    //         const lessDiscountAmount = parseFloat(((salP * discount) / 100).toFixed(2));
    //         item.LessDiscountAmount = lessDiscountAmount;
        
    //         const netbill = parseFloat((salP - ((salP * discount) / 100)).toFixed(2));
    //         item.NetBillings = netbill;
        
    //         const totalNetbill = parseFloat(netbill.toFixed(2));
    //         item.FinalBillValue = totalNetbill;
    //     });
        


    // },
    //  resetTravisOrder:(state)=>{
    //   state.travisMethew.map(item=>{
    //     item.Quantity90=0;
    //     item.Quantity88=0;
    //     item.Amount=0;
    //     item.ordered=false;
    //     item.LessGST=0;
    //     item.LessDiscountAmount=0;
    //     item.NetBillings=0;
    //     item.FinalBillValue=0;
    //     item.Discount=0;
    //   })
    //  }, 

    //  updatePrimarySeondaryImage:(state,action)=>{

    //   const {sku, primaryImage, secondaryImage}= action.payload;
    //   const travisIndex = state.travisMethew.findIndex(
    //     (travisItem) => travisItem.sku === sku
    //   );

    //       if(travisIndex!=-1){
    //         state.travisMethew[travisIndex].primaryImage=primaryImage;
    //         state.travisMethew[travisIndex].secondaryImage=secondaryImage;
    //       }
    //  }

          

    }
});

export const {
    resetCallayGoods,
    addCallawayGoodsProduct
    
} = CallawayGoodsSlice.actions;
export const getGoodsProducts = (state: { callawayGoods: ProductState }): BasicModelGoods[] => {
    return state.callawayGoods?.callawayGoods || [];
};
export const getOtherProducts = (state: { callawayGoods: ProductState }): BasicModelGoods[] => {
    return state.callawayGoods?.otherProduct || [];
};
export const getCategory = (state: { callawayGoods: ProductState }): string[] => {
    return state.callawayGoods?.uniqueCategories || [];
};
export const getProductModel = (state: { callawayGoods: ProductState }): string[] => {
    return state.callawayGoods?.uniqueProductModel || [];
};
export const getProductType = (state: { callawayGoods: ProductState }): string[] => {
    return state.callawayGoods?.uniqueProductType || [];
};




export default CallawayGoodsSlice.reducer;
