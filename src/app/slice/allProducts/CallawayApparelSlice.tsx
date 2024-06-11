import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { start } from "repl";
import { BasicModelApparel } from "../../modules/model/apparel/CallawayApparelModel";
import { RetailerModel } from "../../modules/model/AccountType/retailer/RetailerModel";
import { NoteModel } from "../../modules/model/noteModel/NoteModel";
interface ProductState {
    callawayApparel: BasicModelApparel[],
    otherProduct:BasicModelApparel[],
    uniqueCategories: string[]; 
    uniqueSeries: string[]; 
    uniquetype: string[]; 
    isStartLoading : boolean;
    softgoodRetailerDetails:RetailerModel[],
    note:NoteModel[];
    preOrderId:number;
    progressStep:number,

    
}

const initialState: ProductState = {
    callawayApparel: [],
    otherProduct:[],
    uniqueCategories:[],
    uniqueSeries:[],
    uniquetype:[],
    isStartLoading:false,
    preOrderId:0,
    progressStep:0,
    softgoodRetailerDetails:[],
    note:[],

};
const CallawayGoodsSlice = createSlice({
    name: "callawayApparel",
    initialState,
    reducers: {
        resetCallayApparel: () => {
        return initialState;
       },
       updateProgressStep:(state, action)=>{
        state.progressStep=action.payload.progressStep;
       },
       addPreOrderId:(state,action)=>{
        state.preOrderId=action.payload.preOrderId;
       },
       addsoftgoodReatailerDetails: (state, action)=>{
        const {retailerDetails}= action.payload;
        state.softgoodRetailerDetails=retailerDetails
    },
    addSoftGoodNote:(state,action)=>{
      state.note.push(action.payload.note)
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
   
                    if( item.stock_90!=0 ||item.stock_88!=0){
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
                  sku: item.sku,
                        name: item.name,
                        description: item.description,
                        mrp: item.mrp,
                        category: item.category,
                        gst: item.gst,
                        brand_id: item.brand_id,
                        style_id:item.style_id,
                        primary_image_url: item.primary_image_url,
                        gallery_images_url: item.gallery_images_url,
                        variation_sku: item.variation_sku,
                        stock_90:item.stock_90,
                        stock_88:item.stock_88,
                        size:item.size,
                        // style_code:item.style_code,
                       // length:item.length,
                        season:item.season,
                       // line:item.line,
                        color:item.color,
                       // color_code:item.color_code,
                        gender:item.gender,
                        series:item.series,
                        type:item.type,
                        sleeves:item.sleeves,
          
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
                state.callawayApparel[goodsIndex].brand_id=item.brand_id!=undefined ?item.brand_id:rdx.brand_id;
                state.callawayApparel[goodsIndex].style_id=item.style_id!=undefined ?item.style_id:rdx.style_id;
                state.callawayApparel[goodsIndex].series=item.series!=undefined ?item.series:rdx.series;
                state.callawayApparel[goodsIndex].type=item.type!=undefined ?item.type:rdx.type;
                state.callawayApparel[goodsIndex].sleeves=item.sleeves!=undefined ?item.sleeves:rdx.sleeves;





               
        
              }
            })
              
        
             
            
          }
        }
        ,
        updateApparelInclusiveDiscount:(state,action)=>{
          const {discount}= action.payload;
          state.callawayApparel.forEach((item) => {
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
      updaterApparelExclusiveDiscount:(state,action)=>{
        const {discount}=action.payload;
        state.callawayApparel.forEach((item) => {
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
    updateApparelFlatDiscount:(state,action)=>{
      const {discount}=action.payload;
      state.callawayApparel.forEach((item) => {
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
  resetSoftGoods:(state)=>{
    
      state.callawayApparel.map(item=>{
        item.Quantity90=0;
        item.Quantity88=0;
        item.Amount=0;
        item.ordered=false;
        item.LessGST=0;
        item.LessDiscountAmount=0;
        item.NetBillings=0;
        item.FinalBillValue=0;
        item.Discount=0;

      });
      state.softgoodRetailerDetails=[];
      state.otherProduct=[];
      state.note=[]
    
     
  }

    }
    

})

export const {
    resetCallayApparel,
    addCallawayApparelProduct,
    updateQuantity90,
    updateQuantity88,
    updateApparelQty,
    updateReduxData,
    addPreOrderId,
    addsoftgoodReatailerDetails,
    updateProgressStep,
    addSoftGoodNote,
    updateApparelInclusiveDiscount,
    updaterApparelExclusiveDiscount,
    updateApparelFlatDiscount,
    resetSoftGoods


    
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

export const getSoftgoodRetailerDetail = (state: { callawayApparel: ProductState }): RetailerModel[] => {
  return state.callawayApparel?.softgoodRetailerDetails|| [];
  
};
export const getPreOrderId = (state: { callawayApparel: ProductState }): number => {
  return state.callawayApparel?.preOrderId|| 0;
  
};
export const getApparelNote = (state: { callawayApparel: ProductState }): NoteModel[] => {
  return state.callawayApparel?.note|| [];
}
export const getApparelProgress = (state: { callawayApparel: ProductState }): number=> {
  return state.callawayApparel?.progressStep|| 0;
  
};



export default CallawayGoodsSlice.reducer;
