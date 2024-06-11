import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { start } from "repl";
import { BasicModelGoods } from "../../modules/model/goods/CallawayGoodsModel";

import { RetailerModel } from "../../modules/model/AccountType/retailer/RetailerModel";
import { NoteModel } from "../../modules/model/noteModel/NoteModel";

interface ProductState {
    callawayGoods: BasicModelGoods[],
    otherProduct:BasicModelGoods[],
    uniqueCategories: string[]; 
    uniqueProductModel: string[]; 
    uniqueProductType: string[]; 
    isStartLoading : boolean;
    hardGoodsRetailerDetails:RetailerModel[],
    preOrderId:number;
    note:NoteModel[];
    progressStep:number,


    
}

const initialState: ProductState = {
    callawayGoods: [],
    otherProduct:[],
    uniqueCategories:[],
    uniqueProductModel:[],
    uniqueProductType:[],
    isStartLoading:false,
    hardGoodsRetailerDetails:[],
    preOrderId:0,
    note:[],
    progressStep:0,




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
   
                    if( item.stock_88!=0){
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
                        
                        const rdxStock90=trvsRedux.stock_88;
                        
                        const cusrrentStock90=item.stock_88;
                        if(rdxStock90 &&cusrrentStock90){
                           if(rdxStock90!=cusrrentStock90){
                           
                            trvsRedux.stock_88=cusrrentStock90;
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
        //                   stock_88:travisProduct.stock_88,
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
        //           if(travisProduct.stock_88!==undefined){
        //             rdx.stock_88=travisProduct.stock_88
        //           }
        //           if(travisProduct.stock_88!==undefined){
        //             rdx.stock_88=travisProduct.stock_88
        //           }
                  
                 
                  
                 
                  




        //         }
              
        //     }
        //   }
        //   ,

          updateQuantity90:(state,actions) => {
        
            const {sku, qty90,MRP}=actions.payload;
            const goodsIndex = state.callawayGoods.findIndex(
              (goodsItem) => goodsItem.sku === sku
            );
            if (goodsIndex!== -1) {
              state.callawayGoods[goodsIndex].Quantity90 = qty90;
               
      
              const quantity90 = state.callawayGoods[goodsIndex]?.Quantity90 ?? 0;
              state.callawayGoods[goodsIndex].TotalQty = quantity90;

              
              state.callawayGoods[goodsIndex].Amount = MRP*(quantity90)
              state.callawayGoods[goodsIndex].ordered = true;
              const gst=state.callawayGoods[goodsIndex].gst;
               const mrp=state.callawayGoods[goodsIndex].mrp;
               const amount=state.callawayGoods[goodsIndex].Amount;
               if(mrp &&gst && amount){
                const gstdiscount = parseFloat((amount - ((100 * amount) / (100 + gst))).toFixed(2));


              const netbill = parseFloat((amount - ((amount * 22) / 100) - gstdiscount).toFixed(2));

              const lessDiscountAmount = parseFloat(((amount * 22) / 100).toFixed(2));


              const netBillings = parseFloat((amount - (qty90 * gst * mrp / 100)).toFixed(2));

              const finalBillValue = parseFloat((netbill + (gst * netbill / 100)).toFixed(2));

              state.callawayGoods[goodsIndex].LessGST = gstdiscount;
              state.callawayGoods[goodsIndex].LessDiscountAmount = lessDiscountAmount;
              state.callawayGoods[goodsIndex].NetBillings = netBillings;
              state.callawayGoods[goodsIndex].FinalBillValue = finalBillValue;
            } if(goodsIndex!== -1 &&qty90==0 ) {
             
              state.callawayGoods[goodsIndex].Quantity88 = 0;
              state.callawayGoods[goodsIndex].Amount = 0;
              state.callawayGoods[goodsIndex].ordered = false;

          }
       
          
            
            }
          },
        
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

    updateGoodsQty:(state,action)=>{
      const {allQtyGoods} = action.payload;
      if(allQtyGoods && allQtyGoods.length>0){
        allQtyGoods.map((item:BasicModelGoods)=>{
          const goodsIndex= state.callawayGoods.findIndex(goods=>goods.sku==item.sku);
          if(goodsIndex!=-1){
            state.callawayGoods[goodsIndex].stock_88=item.stock_88;
          }
          
        })
      }
      
      
    },
    updateReduxData: (state, action) => {
      const { travisProduct } = action.payload;

      if (travisProduct.length>0) {

        travisProduct.map((item:BasicModelGoods)=>{
          const goodsIndex = state.callawayGoods.findIndex(
            (travisItem) => travisItem.sku === item.sku
          );
      // eslint-disable-next-line no-debugger
      //debugger
          if (goodsIndex===-1) {
            state.callawayGoods.push({
              sku: item.sku,
                    name: item.name,
                    description: item.description,
                    mrp: item.mrp,
                    category: item.category,
                    gst: item.gst,
                    brand_id: item.brand_id,
                    primary_image_url: item.primary_image_url,
                    gallery_images_url: item.gallery_images_url,
                    variation_sku: item.variation_sku,
                    stock_88:item.stock_88,
                   // stock_88:item.stock_88,
                   // size:item.size,
               
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
                    product_type:item.product_type,
                    product_model:item.product_model,
                    orientation:item.orientation,
                    
            })
        

           
        
          } 
          else if (goodsIndex!==-1){
            const rdx= state.callawayGoods[goodsIndex];
            state.callawayGoods[goodsIndex].name=item.name!=undefined ?item.name:rdx.name;
            state.callawayGoods[goodsIndex].description=item.description!=undefined ?item.description:rdx.description;
            state.callawayGoods[goodsIndex].mrp=item.mrp!=undefined ?item.mrp:rdx.mrp;
            state.callawayGoods[goodsIndex].category=item.category!=undefined ?item.category:rdx.category;
           // state.callawayGoods[goodsIndex].style_code=item.style_code!=undefined ?item.style_code:rdx.style_code;
           // state.callawayGoods[goodsIndex].color=item.color!=undefined ?item.color:rdx.color;
            state.callawayGoods[goodsIndex].gst=item.gst!=undefined ?item.gst:rdx.gst;
           // state.callawayGoods[goodsIndex].size=item.size!=undefined ?item.size:rdx.size;
           // state.callawayGoods[goodsIndex].length=item.length!=undefined ?item.length:rdx.length;
            state.callawayGoods[goodsIndex].primary_image_url=item.primary_image_url!=undefined ?item.primary_image_url:rdx.primary_image_url;
            state.callawayGoods[goodsIndex].gallery_images_url=item.gallery_images_url!=undefined ?item.gallery_images_url:rdx.gallery_images_url;
            state.callawayGoods[goodsIndex].stock_88=item.stock_88!=undefined ?item.stock_88:rdx.stock_88;
            state.callawayGoods[goodsIndex].stock_88=item.stock_88!=undefined ?item.stock_88:rdx.stock_88;
            state.callawayGoods[goodsIndex].variation_sku=item.variation_sku!=undefined ?item.variation_sku:rdx.variation_sku;
            state.callawayGoods[goodsIndex].product_type=item.product_type!=undefined ?item.product_type:rdx.product_type;
            state.callawayGoods[goodsIndex].product_model=item.product_model!=undefined ?item.product_model:rdx.product_model;
            state.callawayGoods[goodsIndex].orientation=item.orientation!=undefined ?item.orientation:rdx.orientation;



           
    
          }
        })
          
    
         
        
      }
    },

    
    addHardGoodsReatailerDetails: (state, action)=>{
      const {retailerDetails}= action.payload;
      state.hardGoodsRetailerDetails=retailerDetails
  },
  
  addHardGoodsNote:(state,action)=>{
    state.note.push(action.payload.note)
   },
   addPreOrderId:(state,action)=>{
    state.preOrderId=action.payload.preOrderId;
   },
   updateProgressStep:(state, action)=>{
    state.progressStep=action.payload.progressStep;
   },

   updaterHardGoodsExclusiveDiscount:(state,action)=>{
    const {discount}=action.payload;
    state.callawayGoods.forEach((item) => {
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

updateHardGoodsFlatDiscount:(state,action)=>{
  const {discount}=action.payload;
  state.callawayGoods.forEach((item) => {
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


updateHardGoodsInclusiveDiscount:(state,action)=>{
  const {discount}= action.payload;
  state.callawayGoods.forEach((item) => {
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


          

    }
});

export const {
    resetCallayGoods,
    addCallawayGoodsProduct,
    updateQuantity90,
    updateGoodsQty,
    updateReduxData,
    addHardGoodsReatailerDetails,
    addHardGoodsNote,
    addPreOrderId,
    updateProgressStep,
    updaterHardGoodsExclusiveDiscount,
    updateHardGoodsInclusiveDiscount,
    updateHardGoodsFlatDiscount,
    
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
export const getHardGoodsProducts = (state: { callawayGoods: ProductState }): BasicModelGoods[] => {
  return state.callawayGoods?.callawayGoods || [];
};

export const getHardGoodsRetailerDetail = (state: { callawayGoods: ProductState }): RetailerModel[] => {
  return state.callawayGoods?.hardGoodsRetailerDetails|| [];
  
};
export const getPreOrderId = (state: { callawayGoods: ProductState }): number => {
  return state.callawayGoods?.preOrderId||0;
  
};
export const getHardGoodsNote = (state: { callawayGoods: ProductState }): NoteModel[] => {
  return state.callawayGoods?.note|| [];
  
};

export const getHardGoodsProgress = (state: { callawayGoods: ProductState }): number => {
  return state.callawayGoods?.progressStep|| 0;
  
};









export default CallawayGoodsSlice.reducer;
