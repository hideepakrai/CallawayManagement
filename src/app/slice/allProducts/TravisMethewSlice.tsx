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
    preOrderId:number;
    progressStep:number
    
}

const initialState: ProductState = {
    travisMethew: [],
    otherProduct:[],
    uniqueCategories:[],
    uniqueStyleCode:[],
    uniqueSeason:[],
    isStartLoading:false,
    preOrderId:0,
    progressStep:0,

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
       updateProgressStep:(state, action)=>{
        state.progressStep=action.payload.progressStep;
       },
       addPreOrderId:(state,action)=>{
        state.preOrderId=action.payload.preOrderId;
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
   
                    if(item.stock_88 !=0 || item.stock_90!=0){
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
                              primaryImage:"",
                              secondaryImage:[]
                              
                          
                          
  
                      });
                    }
                 
                   

                    state.uniqueCategories = Array.from(categoriesSet);
                    state.uniqueSeason = Array.from(seasonSet);
                    state.uniqueStyleCode = Array.from(styleCodesSet);
                });
            }
            }
            else if(tarvisLength>0){
              if(travisProduct && travisProduct.length > 0) {
                travisProduct.forEach((item: BasicModelTravis) => {
                  const travisIndex = state.travisMethew.findIndex(
                    (travisItem) => travisItem.sku === item.sku
                  );
                  if(travisIndex!==-1){
                    const trvsRedux=state.travisMethew[travisIndex];
                    // const trvs= state.travisMethew[travisIndex].TravisAttributes
                      
                      if(trvsRedux){
                        const rdxStock88=trvsRedux.stock_88;
                        const rdxStock90=trvsRedux.stock_90;
                        const cusrrentStock88=item.stock_88;
                        const cusrrentStock90=item.stock_90;
                        if(rdxStock88&& rdxStock90 &&cusrrentStock88 &&cusrrentStock90){
                          if(rdxStock88!=cusrrentStock88){
                           
                            trvsRedux.stock_88=cusrrentStock88;
                          } if(rdxStock90!=cusrrentStock90){
                           
                            trvsRedux.stock_90=cusrrentStock90;
                          }
                          if( trvsRedux.Quantity88&&trvsRedux.Quantity88>cusrrentStock88){
                            trvsRedux.error88="Quantity is more than Stock"
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
            
        }
      },
           reloadCategory:(state,action)=>{
            state.uniqueCategories=action.payload.reloadCategory

           },
           reloadStyleCode:(state,action)=>{
            state.uniqueStyleCode=action.payload.reloadStyleCode
           },

        updateReduxData: (state, action) => {
            const { travisProduct } = action.payload;

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
                else if (travisIndex!==-1){
                  const rdx= state.travisMethew[travisIndex];
                  if(travisProduct.name!==undefined){
                    rdx.name=travisProduct.name
                  } 
                   if(travisProduct.description!==undefined){
                    rdx.description=travisProduct.description
                  }
                   if(travisProduct.mrp!==undefined){
                    rdx.mrp=travisProduct.mrp
                  }
                  if(travisProduct.category!==undefined){
                    rdx.category=travisProduct.category
                  }
                  if(travisProduct.season!==undefined){
                    rdx.season=travisProduct.season
                  }
                  if(travisProduct.style_code!==undefined){
                    rdx.style_code=travisProduct.style_code
                  }
                  if(travisProduct.color!==undefined){
                    rdx.color=travisProduct.color
                  }
                  if(travisProduct.gst!==undefined){
                    rdx.gst=travisProduct.gst
                  }
                  if(travisProduct.primary_image_url!==undefined){
                    rdx.primary_image_url=travisProduct.primary_image_url
                  }
                  if(travisProduct.gallery_images_url!==undefined){
                    rdx.gallery_images_url=travisProduct.gallery_images_url
                  }
                  if(travisProduct.gallery_images_url!==undefined){
                    rdx.gallery_images_url=travisProduct.gallery_images_url
                  }
                  if(travisProduct.variation_sku!==undefined){
                    rdx.variation_sku=travisProduct.variation_sku
                  }
                  if(travisProduct.stock_90!==undefined){
                    rdx.stock_90=travisProduct.stock_90
                  }
                  if(travisProduct.stock_88!==undefined){
                    rdx.stock_88=travisProduct.stock_88
                  }
                  
                 
                  
                 
                  




                }
              
            }
          }
          ,

          updateQuantity90:(state,actions) => {
        
            const {sku, qty90,MRP}=actions.payload;
            const travisIndex = state.travisMethew.findIndex(
              (travisItem) => travisItem.sku === sku
            );
            if (travisIndex!== -1) {
              state.travisMethew[travisIndex].Quantity90 = qty90;
               
              const quantity88 = state.travisMethew[travisIndex]?.Quantity88 ?? 0;
              const quantity90 = state.travisMethew[travisIndex]?.Quantity90 ?? 0;
              state.travisMethew[travisIndex].TotalQty = quantity88+quantity90;

              
              state.travisMethew[travisIndex].Amount = MRP*(quantity88+quantity90)
              state.travisMethew[travisIndex].ordered = true;
              const gst=state.travisMethew[travisIndex].gst;
               const mrp=state.travisMethew[travisIndex].mrp;
               const amount=state.travisMethew[travisIndex].Amount;
               if(mrp &&gst && amount){
                const gstdiscount = parseFloat((amount - ((100 * amount) / (100 + gst))).toFixed(2));


              const netbill = parseFloat((amount - ((amount * 22) / 100) - gstdiscount).toFixed(2));

              const lessDiscountAmount = parseFloat(((amount * 22) / 100).toFixed(2));


              const netBillings = parseFloat((amount - (qty90 * gst * mrp / 100)).toFixed(2));

              const finalBillValue = parseFloat((netbill + (gst * netbill / 100)).toFixed(2));

              state.travisMethew[travisIndex].LessGST = gstdiscount;
              state.travisMethew[travisIndex].LessDiscountAmount = lessDiscountAmount;
              state.travisMethew[travisIndex].NetBillings = netBillings;
              state.travisMethew[travisIndex].FinalBillValue = finalBillValue;
            } if(travisIndex!== -1 &&qty90==0 &&quantity88===0) {
              state.travisMethew[travisIndex].Quantity90 = 0;
              state.travisMethew[travisIndex].Quantity88 = 0;
              state.travisMethew[travisIndex].Amount = 0;
              state.travisMethew[travisIndex].ordered = false;

          }
       
          
            
            }
          },
          updateQuantity88:(state,actions) => {
            const {sku, qty88,MRP}=actions.payload;
            const travisIndex = state.travisMethew.findIndex(
              (travisItem) => travisItem.sku === sku
            );
            if (travisIndex!== -1) {
              state.travisMethew[travisIndex].Quantity88 = qty88;
              const quantity88 = state.travisMethew[travisIndex]?.Quantity88 ?? 0;
              const quantity90 = state.travisMethew[travisIndex]?.Quantity90 ?? 0;
              const total=quantity88+quantity90;
              state.travisMethew[travisIndex].TotalQty = quantity88+quantity90;

              //const totalQty = state.travisMethew[travisIndex]?.TotalQty ?? 0;
              state.travisMethew[travisIndex].Amount = MRP*(quantity88+quantity90)
              state.travisMethew[travisIndex].ordered = true;
              const gst=state.travisMethew[travisIndex].gst;
              const mrp=state.travisMethew[travisIndex].mrp;
              const amount=state.travisMethew[travisIndex].Amount;
              if(mrp &&gst && amount){
               const gstdiscount = parseFloat((amount - ((100 * amount) / (100 + gst))).toFixed(2));


             const netbill = parseFloat((amount - ((amount * 22) / 100) - gstdiscount).toFixed(2));

             const lessDiscountAmount = parseFloat(((amount * 22) / 100).toFixed(2));


             const netBillings = parseFloat((amount - (total * gst * mrp / 100)).toFixed(2));

             const finalBillValue = parseFloat((netbill + (gst * netbill / 100)).toFixed(2));

             state.travisMethew[travisIndex].LessGST = gstdiscount;
             state.travisMethew[travisIndex].LessDiscountAmount = lessDiscountAmount;
             state.travisMethew[travisIndex].NetBillings = netBillings;
             state.travisMethew[travisIndex].FinalBillValue = finalBillValue;
           } if(travisIndex!== -1 &&qty88==0 &&quantity90===0) {
             state.travisMethew[travisIndex].Quantity90 = 0;
             state.travisMethew[travisIndex].Quantity88 = 0;
             state.travisMethew[travisIndex].Amount = 0;
             state.travisMethew[travisIndex].ordered = false;

         }
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
              const gst=state.otherProduct[otherIndex].gst;
              const mrp=state.otherProduct[otherIndex].mrp;
              const amount=state.otherProduct[otherIndex].Amount;
              if(mrp &&gst && amount){
               const gstdiscount = parseFloat((amount - ((100 * amount) / (100 + gst))).toFixed(2));


             const netbill = parseFloat((amount - ((amount * 22) / 100) - gstdiscount).toFixed(2));

             const lessDiscountAmount = parseFloat(((amount * 22) / 100).toFixed(2));


             const netBillings = parseFloat((amount - (qty90 * gst * mrp / 100)).toFixed(2));

             const finalBillValue = parseFloat((netbill + (gst * netbill / 100)).toFixed(2));

             state.otherProduct[otherIndex].LessGST = gstdiscount;
             state.otherProduct[otherIndex].LessDiscountAmount = lessDiscountAmount;
             state.otherProduct[otherIndex].NetBillings = netBillings;
             state.otherProduct[otherIndex].FinalBillValue = finalBillValue;
           } 
           if(otherIndex!== -1 &&qty90==0 &&quantity88===0) {
            state.otherProduct[otherIndex].Quantity90 = 0;
            state.otherProduct[otherIndex].Quantity88 = 0;
            state.otherProduct[otherIndex].Amount = 0;
            state.otherProduct[otherIndex].ordered = false;

        }


            }
          },
          updateOtherQuantity88:(state,actions) => {
            const {sku, qty88,MRP}=actions.payload;
            const otherIndex = state.otherProduct.findIndex(
              (travisItem) => travisItem.sku === sku
            );
            if (otherIndex!== -1) {
              state.otherProduct[otherIndex].Quantity88 = qty88;
              const quantity88 = state.otherProduct[otherIndex]?.Quantity88 ?? 0;
              const quantity90 = state.otherProduct[otherIndex]?.Quantity90 ?? 0;
              const total=quantity88+quantity90;
              state.otherProduct[otherIndex].TotalQty = quantity88+quantity90;

              //const totalQty = state.otherProduct.[otherIndex]?.TotalQty ?? 0;
              state.otherProduct[otherIndex].Amount = MRP*(quantity88+quantity90)
              state.otherProduct[otherIndex].ordered = true;
              const gst=state.otherProduct[otherIndex].gst;
              const mrp=state.otherProduct[otherIndex].mrp;
              const amount=state.otherProduct[otherIndex].Amount;
              if(mrp &&gst && amount){
                const gstdiscount = parseFloat((amount - ((100 * amount) / (100 + gst))).toFixed(2));
 
 
              const netbill = parseFloat((amount - ((amount * 22) / 100) - gstdiscount).toFixed(2));
 
              const lessDiscountAmount = parseFloat(((amount * 22) / 100).toFixed(2));
 
 
              const netBillings = parseFloat((amount - (total * gst * mrp / 100)).toFixed(2));
 
              const finalBillValue = parseFloat((netbill + (gst * netbill / 100)).toFixed(2));
 
              state.otherProduct[otherIndex].LessGST = gstdiscount;
              state.otherProduct[otherIndex].LessDiscountAmount = lessDiscountAmount;
              state.otherProduct[otherIndex].NetBillings = netBillings;
              state.otherProduct[otherIndex].FinalBillValue = finalBillValue;
            }
            if(otherIndex!== -1 &&qty88==0 &&quantity90===0) {
              state.otherProduct[otherIndex].Quantity90 = 0;
              state.otherProduct[otherIndex].Quantity88 = 0;
              state.otherProduct[otherIndex].Amount = 0;
              state.otherProduct[otherIndex].ordered = false;
 
          }
            }
          },
          removeOtherProduct:(state)=>{
             state.otherProduct=[]
          },
          updateTravisInclusiveDiscount:(state,action)=>{
            const {discount}= action.payload;
            state.travisMethew.forEach((item) => {
                item.Discount = parseFloat(discount.toFixed(2)); // Set Discount for each item
            
                const gst = item.gst||0; // Parse gst to float or default to 0
                const salP = item.Amount || 0; // Parse Amount to float or default to 0
            
                const gstdiscount = parseFloat((salP - ((100 * salP) / (100 + gst))).toFixed(2));
                item.LessGST = gstdiscount;
            
                const lessDiscountAmount = parseFloat(((salP * discount) / 100).toFixed(2));

                item.LessDiscountAmount = lessDiscountAmount;
            
                const netbill = parseFloat((salP - ((salP * discount) / 100) - gstdiscount).toFixed(2));
                item.NetBillings = netbill;
            
                const totalNetbill = parseFloat((netbill + (gst * netbill / 100)).toFixed(2));
                item.FinalBillValue = totalNetbill;
            });
        },
        updaterTravisExclusiveDiscount:(state,action)=>{
          const {discount}=action.payload;
          state.travisMethew.forEach((item) => {
              item.Discount = parseFloat(discount.toFixed(2)); // Set Discount for each item
          
              const gst = item.gst || 0; // Parse gst to float or default to 0
              const salP = item.Amount || 0; // Parse Amount to float or default to 0
          
              item.LessGST = 0; // Initialize LessGST to 0
          
              const lessDiscountAmount = parseFloat(((salP * discount) / 100).toFixed(2));
              item.LessDiscountAmount = lessDiscountAmount;
          
              const netbill = parseFloat((salP - ((salP * discount) / 100)).toFixed(2));
              item.NetBillings = netbill;
          
              const totalNetbill = parseFloat((netbill + (gst * netbill / 100)).toFixed(2));
              item.FinalBillValue = totalNetbill;
          });


      },
      updateTravisFlatDiscount:(state,action)=>{
        const {discount}=action.payload;
        state.travisMethew.forEach((item) => {
            item.Discount = parseFloat(discount.toFixed(2)); // Set Discount for each item
        
            item.LessGST = 0; // Initialize LessGST to 0
        
            const salP =item.Amount || 0; // Parse Amount to float or default to 0
        
            const lessDiscountAmount = parseFloat(((salP * discount) / 100).toFixed(2));
            item.LessDiscountAmount = lessDiscountAmount;
        
            const netbill = parseFloat((salP - ((salP * discount) / 100)).toFixed(2));
            item.NetBillings = netbill;
        
            const totalNetbill = parseFloat(netbill.toFixed(2));
            item.FinalBillValue = totalNetbill;
        });
        


    },
     resetTravisOrder:(state)=>{
      state.travisMethew.map(item=>{
        item.Quantity90=0;
        item.Quantity88=0;
        item.Amount=0;
        item.ordered=false;
        item.LessGST=0;
        item.LessDiscountAmount=0;
        item.NetBillings=0;
        item.FinalBillValue=0;
        item.Discount=0;

      })
     }, 

     updatePrimarySeondaryImage:(state,action)=>{

      const {sku, primaryImage, secondaryImage}= action.payload;
      const travisIndex = state.travisMethew.findIndex(
        (travisItem) => travisItem.sku === sku
      );

          if(travisIndex!=-1){
            state.travisMethew[travisIndex].primaryImage=primaryImage;
            state.travisMethew[travisIndex].secondaryImage=secondaryImage;
          }
     },
     updateTravisQty:(state,action)=>{
      const {allQtyTravis}= action.payload
      if(allQtyTravis && allQtyTravis.length>0){
        allQtyTravis.map((item:BasicModelTravis)=>{
          const travisIndex= state.travisMethew.findIndex(trvis=>trvis.sku==item.sku);
          if(travisIndex!=-1){
            state.travisMethew[travisIndex].stock_88=item.stock_88;
            state.travisMethew[travisIndex].stock_90=item.stock_90;
          }
        })
      }
      
     }

          

    }
});

export const {
    resetTravisProduct,
     addTravisProduct 
    ,updateReduxData,
    updateQuantity90,
    updateQuantity88,
    addOtherProduct,
    updateOtherQuantity90,
    updateOtherQuantity88,
    removeOtherProduct,
    reloadTravisProduct,
    reloadCategory,
    reloadStyleCode,startTravisLoading,stopTravisLoading,
    updateTravisInclusiveDiscount,updaterTravisExclusiveDiscount,
    updateTravisFlatDiscount,
    resetTravisOrder,
    updatePrimarySeondaryImage,
    updateTravisQty,
    addPreOrderId,
    updateProgressStep
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
    return state.travisMethew?.isStartLoading|| false;
};
export const getPreOrderId = (state: { travisMethew: ProductState }): number => {
    return state.travisMethew?.preOrderId||0;
    
};
export const getPregressStep = (state: { travisMethew: ProductState }): number => {
    return state.travisMethew?.progressStep|| 0;
    
};



export default TravisMethewSlice.reducer;
