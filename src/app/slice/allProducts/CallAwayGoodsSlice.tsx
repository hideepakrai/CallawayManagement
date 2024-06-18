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
                        mrp: item.mrp!== undefined ? parseFloat(String(item.mrp)) : 0.0,
                        gst: item.gst !== undefined ? parseFloat(String(item.gst)) : 0.0,
                        primary_image_url: item.primary_image_url,
                        gallery_images_url: item.gallery_images_url,
                        variation_sku: item.variation_sku,
                        stock_88:item.stock_88,    

                        Quantity88:0,     
                        Amount:0,
                        TotalQty:0,
                        LessGST:0,
                        LessDiscountAmount:0,
                        Discount:22,
                        NetBillings:0,
                        FinalBillValue:0,    
                        error88:"",
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
                          
                          if( trvsRedux.Quantity88&&trvsRedux.Quantity88>cusrrentStock90){
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
            //         //       Quantity88: 0,
            //         //       Amount: 0
            //         // });
            //       }

            //     })
                
            //   }
              

               
           
            // }
            
        }
      },
        



          updateQuantity88:(state,actions) => {
        
            const {sku, qty90,MRP}=actions.payload;
            const goodsIndex = state.callawayGoods.findIndex(
              (goodsItem) => goodsItem.sku === sku
            );
            if (goodsIndex!== -1) {
              state.callawayGoods[goodsIndex].Quantity88 = qty90;
               
      
              const quantity90 = state.callawayGoods[goodsIndex]?.Quantity88 ?? 0;
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
               
                    Quantity88:0,
                
                    Amount:0,
                    TotalQty:0,
                    LessGST:0,
                    LessDiscountAmount:0,
                    Discount:0,
                    NetBillings:0,
                    FinalBillValue:0,
                    error88:"",
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
resetHardGoodsOrder:(state)=>{
  state.callawayGoods.map(item=>{
    item.Quantity88=0;
    item.Quantity88=0;
    item.Amount=0;
    item.ordered=false;
    item.LessGST=0;
    item.LessDiscountAmount=0;
    item.NetBillings=0;
    item.FinalBillValue=0;
    item.Discount=0;

  });
  state.hardGoodsRetailerDetails=[];
  state.otherProduct=[];
  state.note=[]
 }, 
 addHardGoodsLocalStorage:(state,action)=>{
  state.callawayGoods= action.payload.goods
 }


          

    }
});

export const {
    resetCallayGoods,
    addCallawayGoodsProduct,
    updateQuantity88,
    updateGoodsQty,
    updateReduxData,
    addHardGoodsReatailerDetails,
    addHardGoodsNote,
    addPreOrderId,
    updateProgressStep,
    updaterHardGoodsExclusiveDiscount,
    updateHardGoodsInclusiveDiscount,
    updateHardGoodsFlatDiscount,
    resetHardGoodsOrder,
    addHardGoodsLocalStorage
    
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
