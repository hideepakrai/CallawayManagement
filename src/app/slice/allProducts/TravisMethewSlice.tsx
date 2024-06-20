import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { BasicModelTravis, BasicModelTravisGraph, TravisMathewAttribute ,ImageType} from "../../modules/model/travis/TravisMethewModel";
import {ExcelModelTravis} from "../../modules/model/travis/TravisExcel"
import { start } from "repl";
import { RetailerModel } from "../../modules/model/AccountType/retailer/RetailerModel";
import { NoteModel } from "../../modules/model/noteModel/NoteModel";





interface ProductState {
    travisMethew: BasicModelTravis[],
    otherProduct:BasicModelTravis[],
    uniqueCategories: string[]; 
    uniqueStyleCode: string[]; 
    uniqueFamily: string[]; 
    uniqueSeason: string[]; 
    isStartLoading : boolean;
    preOrderId:number;
    progressStep:number,
    isUploadImge:boolean,
    travisRetailerDetails:RetailerModel[],
    note:NoteModel[];
    iSubmitModel:boolean,
    travisManagerDetails:string,
    
}


const initialState: ProductState = {
    travisMethew: [],
    otherProduct:[],
    uniqueCategories:[],
    uniqueStyleCode:[],
    uniqueSeason:[],
    uniqueFamily:[],
    isStartLoading:false,
    preOrderId:0,
    progressStep:0,
    isUploadImge:false,
    travisRetailerDetails:[],
    note:[],
    iSubmitModel:false,
    travisManagerDetails:"",
  

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
       addTravisLocalStorage:(state,action)=>{  
          state.travisMethew=action.payload.travis
       },
       stopTravisLoading:(state)=>{
         state.isStartLoading = false
       },
       startUploadTravisImage:(state)=>{
        state.isUploadImge = true
       },
       addTravisNote:(state,action)=>{
        state.note.push(action.payload.note)
       },
       stopUploadTravisImage:(state)=>{
        state.isUploadImge = false
       },
       submitModel:(state,action)=>{
        state.iSubmitModel= action.payload.isSubmitModel
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
            const familySet = new Set<string>();
            const tarvisLength= state.travisMethew.length;
             // eslint-disable-next-line no-debugger
             debugger
            if(tarvisLength===0){
              if (travisProduct && travisProduct.length > 0) {
                travisProduct.forEach((item: BasicModelTravis) => {
                   
                    if (item &&
                        item?.category &&
                        item?.season &&
                         item?.style_code &&
                        item.family
                      ) 
                     { 

                            categoriesSet.add(item.category);
                            seasonSet.add(item.season);
                            styleCodesSet.add(item.style_code);
                            familySet.add(item.family)
                         
                        
                    }
   
                    if(item.stock_88|| item.stock_90 ||item.stock_88===0 || item.stock_90===0){
                      state.travisMethew.push({
                        sku: item.sku,
                              name: item.name,
                              description: item.description,
                              mrp: item.mrp,
                              category: item.category,
                              season:item.season,
                              style_code:item.style_code,
                              color: item.color,
                              color_code:item.color_code,
                              gst: item.gst,
                              size:item.size,
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
                              Discount:22,
                              NetBillings:0,
                              FinalBillValue:0,
                              error88:"",
                              error90:"",
                              primaryImage:"",
                              secondaryImage:[],
                              family:item.family,
                              has_image:item.has_image,
                              expansion:[]
                              
                          
                          
  
                      });
                    }
                 
                   

                    state.uniqueCategories = Array.from(categoriesSet);
                    state.uniqueSeason = Array.from(seasonSet);
                    state.uniqueStyleCode = Array.from(styleCodesSet);
                    state.uniqueFamily = Array.from(familySet);
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
                            trvsRedux.stock_88=cusrrentStock88;
                            trvsRedux.error88="Quantity is more than Stock"
                          }
                          if( trvsRedux.Quantity90&&trvsRedux.Quantity90>cusrrentStock90){
                            trvsRedux.error90="Quantity is more than Stock"
                             trvsRedux.stock_90=cusrrentStock90
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
        // state.travisMethew.map((item:BasicModelTravis)=>{
        //   createExpansion(sku: item.sku, variation_sku: item.variation_sku );
        // })
      },
    // const   createExpansion= (sku, variation_sku ) => {
       
        
    //         const expansionArray:BasicModelTravis[]=[];
    //         const travisIndex= state.travisMethew.findIndex(skus=>skus.sku===sku)
    //         const stringVar = variation_sku.split(',').map((item:string) => item.trim());
    //         if (stringVar.length > 0 && travisIndex!=-1) {
  
    //     stringVar.map((varSku:string) => {
    //       const travisdata= state.travisMethew.find(items=>items.sku===varSku);
    //       if(travisdata){
    //         expansionArray.push(travisdata)
    //       }
  
    //     })
    //     if(travisIndex!=-1){
    //       state.travisMethew[travisIndex].expansion=expansionArray
    //     }
        
    //    }
  
            
  
    //   },
           reloadCategory:(state,action)=>{
            state.uniqueCategories=action.payload.reloadCategory

           },
           reloadStyleCode:(state,action)=>{
            state.uniqueStyleCode=action.payload.reloadStyleCode
           },

        updateReduxData: (state, action) => {
            const { travisProduct } = action.payload;

            if (travisProduct.length>0) {

              travisProduct.map((item:BasicModelTravis)=>{
                const travisIndex = state.travisMethew.findIndex(
                  (travisItem) => travisItem.sku === item.sku
                );
                 
                if (travisIndex===-1) {
                  state.travisMethew.push({
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
                          stock_90:item.stock_90,
                          stock_88:item.stock_88,
                          size:item.size,
                          style_code:item.style_code,
                          length:item.length,
                          season:item.season,
                          line:item.line,
                          color:item.color,
                          color_code:item.color_code,
                          gender:item.gender,
                         
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
                  state.travisMethew[travisIndex].name=item.name!=undefined ?item.name:rdx.name;
                  state.travisMethew[travisIndex].description=item.description!=undefined ?item.description:rdx.description;
                  state.travisMethew[travisIndex].mrp=item.mrp!=undefined ?item.mrp:rdx.mrp;
                  state.travisMethew[travisIndex].category=item.category!=undefined ?item.category:rdx.category;
                  state.travisMethew[travisIndex].style_code=item.style_code!=undefined ?item.style_code:rdx.style_code;
                  state.travisMethew[travisIndex].color=item.color!=undefined ?item.color:rdx.color;
                  state.travisMethew[travisIndex].gst=item.gst!=undefined ?item.gst:rdx.gst;
                  state.travisMethew[travisIndex].size=item.size!=undefined ?item.size:rdx.size;
                  state.travisMethew[travisIndex].length=item.length!=undefined ?item.length:rdx.length;
                  state.travisMethew[travisIndex].primary_image_url=item.primary_image_url!=undefined ?item.primary_image_url:rdx.primary_image_url;
                  state.travisMethew[travisIndex].gallery_images_url=item.gallery_images_url!=undefined ?item.gallery_images_url:rdx.gallery_images_url;
                  state.travisMethew[travisIndex].stock_90=item.stock_90!=undefined ?item.stock_90:rdx.stock_90;
                  state.travisMethew[travisIndex].stock_88=item.stock_88!=undefined ?item.stock_88:rdx.stock_88;
                  state.travisMethew[travisIndex].variation_sku=item.variation_sku!=undefined ?item.variation_sku:rdx.variation_sku;
                 
          
                }
              })
                
          
               
              
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
            const otherIndex=state.otherProduct.findIndex(item=>item.sku===sku);
          
            if(otherIndex!=-1){
              state.otherProduct[otherIndex].Quantity90=qty90;
              const quantity88 = state.otherProduct[otherIndex]?.Quantity88 ?? 0;
              state.otherProduct[otherIndex].TotalQty = quantity88+qty90;
              state.otherProduct[otherIndex].Amount = MRP*(quantity88+qty90)
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
             
           } 
           if(qty88>=quantity88){
            state.travisMethew[travisIndex].error88=""
           }
           if(travisIndex!== -1 &&qty88==0 &&quantity90===0) {
             state.travisMethew[travisIndex].Quantity90 = 0;
             state.travisMethew[travisIndex].Quantity88 = 0;
             state.travisMethew[travisIndex].Amount = 0;
             state.travisMethew[travisIndex].ordered = false;

         }
            }
            const otherIndex=state.otherProduct.findIndex(item=>item.sku===sku);
            if(otherIndex!==-1){
              state.otherProduct[otherIndex].Quantity88=qty88;
              const quantity90 = state.otherProduct[otherIndex]?.Quantity90 ?? 0;
              state.otherProduct[otherIndex].TotalQty = quantity90+qty88;
              state.otherProduct[otherIndex].Amount = MRP*(quantity90+qty88)
            }
          },
          addOtherProduct:(state,action)=>{
            state.otherProduct=action.payload;

          },
          updateOtherQuantity90:(state,actions) => {
 
            const {sku, qty90,MRP}=actions.payload;
            const otherIndex = state.otherProduct.findIndex(
              (other) => other.sku === sku
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

    addTravisReatailerDetails: (state, action)=>{
        const {retailerDetails}= action.payload;
        state.travisRetailerDetails=retailerDetails
    },
    addTravismanagerDetails: (state, action)=>{
      const {managerDetails}= action.payload;
      state.travisManagerDetails=managerDetails
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

      });
      state.travisRetailerDetails=[];
      state.otherProduct=[];
      state.note=[]
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
      
     },


    importTravisProduct:(state,action)=>{
      const { travisProduct } = action.payload;

            if (travisProduct.length>0) {

              travisProduct.map((item:BasicModelTravis)=>{
                const travisIndex = state.travisMethew.findIndex(
                  (travisItem) => travisItem.sku === item.sku
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
                          size:travisProduct.size,
                          style_code:travisProduct.style_code,
                          length:travisProduct.length,
                          season:travisProduct.season,
                          line:travisProduct.line,
                          color:travisProduct.color,
                          color_code:travisProduct.color_code,
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
                else if (travisIndex!==-1){
                  const rdx= state.travisMethew[travisIndex];
                  state.travisMethew[travisIndex].name=item.name!=undefined ?item.name:rdx.name;
                  state.travisMethew[travisIndex].description=item.description!=undefined ?item.description:rdx.description;
                  state.travisMethew[travisIndex].mrp=item.mrp!=undefined ?item.mrp:rdx.mrp;
                  state.travisMethew[travisIndex].category=item.category!=undefined ?item.category:rdx.category;
                  state.travisMethew[travisIndex].style_code=item.style_code!=undefined ?item.style_code:rdx.style_code;
                  state.travisMethew[travisIndex].color=item.color!=undefined ?item.color:rdx.color;
                  state.travisMethew[travisIndex].gst=item.gst!=undefined ?item.gst:rdx.gst;
                  state.travisMethew[travisIndex].size=item.size!=undefined ?item.size:rdx.size;
                  state.travisMethew[travisIndex].length=item.length!=undefined ?item.length:rdx.length;
                  state.travisMethew[travisIndex].primary_image_url=item.primary_image_url!=undefined ?item.primary_image_url:rdx.primary_image_url;
                  state.travisMethew[travisIndex].gallery_images_url=item.gallery_images_url!=undefined ?item.gallery_images_url:rdx.gallery_images_url;
                  state.travisMethew[travisIndex].stock_90=item.stock_90!=undefined ?item.stock_90:rdx.stock_90;
                  state.travisMethew[travisIndex].stock_88=item.stock_88!=undefined ?item.stock_88:rdx.stock_88;
                  state.travisMethew[travisIndex].variation_sku=item.variation_sku!=undefined ?item.variation_sku:rdx.variation_sku;
                 
          
                }
              })
                
          
               
              
            }

     },
  updateCheckAvailability:(state,action)=>{
    const {sku,qty}= action.payload;
    const travisIndex = state.travisMethew.findIndex(
      (travisItem) => travisItem.sku === sku
    );
    if( travisIndex !== -1){
      const qty88= state.travisMethew[travisIndex].Quantity88??0;

      if(qty<qty88){
        state.travisMethew[travisIndex].error88="Out of Stock";
        state.travisMethew[travisIndex].stock_88=qty;
      }
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
    updateProgressStep,
    stopUploadTravisImage,
    startUploadTravisImage,
    addTravisReatailerDetails,
    addTravisNote,
    submitModel,
    importTravisProduct,
    addTravisLocalStorage,
    addTravismanagerDetails,

    updateCheckAvailability
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
export const getTravisProgressStep = (state: { travisMethew: ProductState }): number => {
    return state.travisMethew?.progressStep|| 0;
    
};
export const getTravisFamily = (state: { travisMethew: ProductState }): string[] => {
    return state.travisMethew?.uniqueFamily|| [];
    
};
export const getTravisuploadImage = (state: { travisMethew: ProductState }): boolean => {
    return state.travisMethew?.isUploadImge|| false;
    
};
export const getTravisRetailerDetail = (state: { travisMethew: ProductState }): RetailerModel[] => {
    return state.travisMethew?.travisRetailerDetails|| [];
    
};
export const getTravisNote = (state: { travisMethew: ProductState }): NoteModel[] => {
    return state.travisMethew?.note|| [];
    
};
export const getSubmitModel = (state: { travisMethew: ProductState }): boolean => {
    return state.travisMethew?.iSubmitModel|| false;
    
};

export const getaddTravismanagerDetails =(state: { travisMethew: ProductState }): string => {
  return state.travisMethew?.travisManagerDetails|| "";
  
};



export default TravisMethewSlice.reducer;
