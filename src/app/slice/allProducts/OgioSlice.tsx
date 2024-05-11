import { createSlice } from "@reduxjs/toolkit";
import {OgioBasicModel,OgioBasicModelGraph, OgioModel} from "../../modules/model/ogio/OgioBrandModel"
import Item from "antd/es/list/Item";

interface ProductState {

    ogio: OgioBasicModel[],
    isLoadingStart: boolean;
    uniqueCategories: string[]; 
    uniqueProductType: string[]; 
    uniqueProductModel: string[]; 

}

const initialState: ProductState = {
    ogio: [],
    isLoadingStart:false,
    uniqueCategories:[],
    uniqueProductType:[],
    uniqueProductModel:[],
  

};

const OgioSlice = createSlice({
    name: "Ogio",
    initialState, 
    reducers: {
       resetOgio:(state)=>{
            state.ogio=[];
            state.isLoadingStart=false;      
       },
       startOgioLoading:(state)=>{
        state.isLoadingStart=true;
       },
       stopOgioLoading:(state)=>{
        state.isLoadingStart=false;
       },
       

        addOgioProduct: (state, action) => {
            const { ogioProduct, id } = action.payload;
            const categoriesSet = new Set<string>();
            const productTypeSet = new Set<string>();
            const prodctModelSet = new Set<string>();
           const ogiolength= state.ogio.length;
            if(ogiolength===0){
                if(ogioProduct && ogioProduct.length > 0) {
                    ogioProduct.map((item:OgioBasicModel)=>{
                        state.ogio.push({
                            sku: item.sku,
                            name: item.name,
                            description: item.description,
                            mrp: item.mrp,
                            category: item.category,
                            product_type: item.product_type,
                            product_model: item.product_model,
                            gst: item.gst,
                            brand_id: item.brand_id,
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
                            error:""
                           


                        })
                    })
                }  
            }
            else if(ogiolength>0){
                if(ogioProduct && ogioProduct.length > 0) {
                    ogioProduct.map((item:OgioBasicModel)=>{
                        const ogioIndex= state.ogio.findIndex(prod=>prod.sku===item.sku);
                        if(ogioIndex!==-1) {
                            const stt=state.ogio[ogioIndex]
                            const rdxtt= item.stock_90
                                if(stt ){
                                    const prdstock90=stt.stock_90 // redux
                                    const ltstock90= item.stock_90//latest
                                    const rdxqty90=state.ogio[ogioIndex].Quantity90
                                    if(prdstock90!==ltstock90){
                                        stt.stock_90=ltstock90;
                                     
                                        if(rdxqty90&&ltstock90&&rdxqty90>ltstock90){
                                            state.ogio[ogioIndex].error="quantity is more than Stock";
                                            state.ogio[ogioIndex].Amount=0;
                                            state.ogio[ogioIndex].Discount=0
                                            state.ogio[ogioIndex].NetBillings=0
                                            state.ogio[ogioIndex].FinalBillValue=0
                                            state.ogio[ogioIndex].LessDiscountAmount=0
                                            state.ogio[ogioIndex].LessGST=0

                                        }else
                                        if(ltstock90===0){
                                            state.ogio[ogioIndex].error="quantity is more than Stock";
                                            state.ogio[ogioIndex].Amount=0;
                                            state.ogio[ogioIndex].Discount=0
                                            state.ogio[ogioIndex].NetBillings=0
                                            state.ogio[ogioIndex].FinalBillValue=0
                                            state.ogio[ogioIndex].LessDiscountAmount=0
                                            state.ogio[ogioIndex].LessGST=0
                                        }
                                      
                                       
                                    }
                                }
                           
                        }
                        else if(ogioIndex===-1){
                            if(ogioProduct && ogioProduct.length > 0) {
                                ogioProduct.map((item:OgioBasicModel)=>{
                                    state.ogio.push({
                                        sku: item.sku,
                                        name: item.name,
                                        description: item.description,
                                        mrp: item.mrp,
                                        category: item.category,
                                        product_type: item.product_type,
                                        product_model: item.product_model,
                                        gst: item.gst,
                                        brand_id: item.brand_id,
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
                                        error:""
                                       
        
        
                                    })
                                })
                            } 
                        }



                    })
                }

            }
            
            
            },

            updateNewData:(state,action) => {
            //     const {ogioProduct}= action.payload;
            //     if(ogioProduct){
            // const ogiIndex= state.ogio.findIndex(item=>
            //     item.SKU===ogioProduct.SKU);
            //    if(ogiIndex===-1){


            //     const att: OgioModel[] = [
            //         {
            //             ProductType:ogioProduct.ProductType,
            //             Category:ogioProduct.Category,
            //             ProductModel:ogioProduct.ProductModel,
            //             LifeCycle:ogioProduct.LifeCycle,
            //             Stock90:ogioProduct.Stock90,
            //         }
            //     ];


            //     state.ogio.push({
            //         brand: ogioProduct.brand,
            //     Name: ogioProduct.Name,
            //     Description: ogioProduct.Description,
            //     SKU: ogioProduct.SKU,
            //     Gallery: ogioProduct?.Gallery?.data?.attributes?.formats?.thumbnail?.url,
            //     MRP: ogioProduct.MRP,
            //     SetType: ogioProduct.SetType,
            //     ProductType: ogioProduct.ProductType,
            //     OgiAttributes: att,

            //         TotalQty: 0,
            //         Quantity88: 0,
            //         Quantity90: 0,
            //         Amount: 0

            //     }

            //     )

            //    } else if(ogiIndex!=-1){
            //     if (state.ogio[ogiIndex] &&
            //         state.ogio[ogiIndex].OgiAttributes 
            //         ) {
            //         state.ogio[ogiIndex].Name = ogioProduct.Name !=undefined? ogioProduct.Name : state.ogio[ogiIndex].Name;
            //         state.ogio[ogiIndex].Description =  ogioProduct.Description !=undefined? ogioProduct.Description : state.ogio[ogiIndex].Description;
            //         state.ogio[ogiIndex].MRP =  ogioProduct.MRP !=undefined? ogioProduct.MRP : state.ogio[ogiIndex].MRP;
            //         state.ogio[ogiIndex].GST =  ogioProduct.GST !=undefined? ogioProduct.GST : state.ogio[ogiIndex].GST;
            //          const ogatt=state.ogio[ogiIndex].OgiAttributes;
            //          if(ogatt){
            //            ogatt[0].Stock90 = ogioProduct.Stock90!=undefined? ogioProduct.Stock90 : ogatt[0]?.Stock90
            //            ogatt[0].ProductType = ogioProduct.ProductType!=undefined? ogioProduct.ProductType : ogatt[0]?.ProductType
            //            ogatt[0].Category = ogioProduct.Category!=undefined? ogioProduct.Category : ogatt[0]?.Category
            //            ogatt[0].ProductModel = ogioProduct.ProductModel!=undefined? ogioProduct.ProductModel : ogatt[0]?.ProductModel
            //            ogatt[0].LifeCycle = ogioProduct.LifeCycle!=undefined? ogioProduct.LifeCycle : ogatt[0]?.LifeCycle

            //     }

            //         }
            //    }
              
                
            //        }
        },
        updateQuantity90:(state,actions) => {

            const {sku, qty90,MRP}=actions.payload;
            const ogioIndex = state.ogio.findIndex(
              (ogioItem) => ogioItem.sku === sku
            );
            if (ogioIndex!== -1 &&qty90!==0) {
              state.ogio[ogioIndex].Quantity90 = qty90;
            
              const quantity90 = state.ogio[ogioIndex]?.Quantity90 ?? 0;
              state.ogio[ogioIndex].TotalQty =quantity90;

              
              state.ogio[ogioIndex].Amount = MRP*(quantity90)
              state.ogio[ogioIndex].ordered = true;
               const gst=state.ogio[ogioIndex].gst;
               const mrp=state.ogio[ogioIndex].mrp;
               const amount=state.ogio[ogioIndex].Amount;
               
                if(mrp &&gst && amount){
                    const gstdiscount= (amount)-((100*amount)/(100+gst))
                    const netbill=amount-((amount*22)/100)-(gstdiscount);
                    state.ogio[ogioIndex].LessGST=gstdiscount
                    state.ogio[ogioIndex].LessDiscountAmount=(amount*22)/100;
                    state.ogio[ogioIndex].NetBillings=amount-(qty90*gst*mrp/100);
                    state.ogio[ogioIndex].FinalBillValue=netbill+(gst*netbill/100)
                }
                
            } else if(ogioIndex!== -1 &&qty90==0) {
                state.ogio[ogioIndex].Quantity90 = 0;
                state.ogio[ogioIndex].Amount = 0;
                state.ogio[ogioIndex].ordered = false;

            }
          },
          updateOgioInclusiveDiscount:(state,action)=>{
            const {discount}= action.payload;
            state.ogio.forEach((item=>{
                item.Discount=discount;
                const gst= item.gst||0
                const salP=item.Amount ||0;
                const gstdiscount= (salP)-((100*salP)/(100+gst))
                item.LessGST=gstdiscount;
                item.LessDiscountAmount=(salP*discount)/100;
               const netbill=salP-((salP*discount)/100)-(gstdiscount);
               const totalNetbill=netbill+(gst*netbill/100)
               item.NetBillings=netbill;
               item.FinalBillValue=totalNetbill;
            }))
        },
        updateOgioExclusiveDiscount:(state,action)=>{
            const {discount}=action.payload;
            state.ogio.forEach((item=>{
                item.Discount=discount;
                const gst= item.gst||0
               item.LessGST=0;
                const salP=item.Amount ||0;
                item.LessDiscountAmount=(salP*discount)/100;
               const netbill=salP-((salP*discount)/100);
               const totalNetbill=netbill+(gst*netbill/100)
               item.NetBillings=netbill;
               item.FinalBillValue=totalNetbill;
            }))


        },
        updateOgioFlatDiscount:(state,action)=>{
            const {discount}=action.payload;
            state.ogio.forEach((item=>{
                item.Discount=discount;
               
               item.LessGST=0;
                const salP=item.Amount ||0;
                item.LessDiscountAmount=(salP*discount)/100;
               const netbill=salP-((salP*discount)/100);
               const totalNetbill=netbill;
               item.NetBillings=netbill;
               item.FinalBillValue=totalNetbill;
            }))


        },
        resetOgioOrder:(state)=>{
            
            state.ogio.map(item=>{
                item.Quantity90=0;
                item.TotalQty=0;
                item.Amount=0;
                item.LessGST=0;
                item.LessDiscountAmount=0;
                item.NetBillings=0;
                item.FinalBillValue=0;
                item.Discount=0;
                item.ordered=false;
                item.error="",
                item.ordered=false
            })
        },
        updateQunatityAfterOrder:(state,action)=>{
            const {ogioProduct}= action.payload;
            // const index= state.ogio.findIndex(item=>item.SKU===ogioProduct.SKU);
            // if(index!==-1){
            //     const stt= state.ogio[index].OgiAttributes;
            //     const qty= state.ogio[index].Quantity90;
            //     const currentQty=ogioProduct.Quantity90
            //     if(stt &&currentQty){
            //         const rdxStock=stt[0].Stock90
            //         if(rdxStock){
            //             stt[0].Stock90=rdxStock-currentQty
            //         }
                   
            //     }
            // }

        }


       
    
    }
}
);


export const { addOgioProduct,
    updateNewData,
    updateQuantity90,stopOgioLoading,
    startOgioLoading,resetOgio,
    updateOgioFlatDiscount,
    updateOgioExclusiveDiscount,
    updateOgioInclusiveDiscount,
    resetOgioOrder,
    updateQunatityAfterOrder
} = OgioSlice.actions;
export const getOgioProducts = (state: { Ogio: ProductState }): OgioBasicModel[] => {
    return state.Ogio?.ogio || [];
};
export const getOgioReload = (state: { Ogio: ProductState }): boolean => {
    return state.Ogio?.isLoadingStart;
};

export const getCategory = (state: { Ogio: ProductState }): string[] => {
    return state.Ogio.uniqueCategories || [];
};
export const getProductModel = (state: { Ogio: ProductState }): string[] => {
    return state.Ogio.uniqueProductModel || [];
};
export const getProductType = (state: { Ogio: ProductState }): string[] => {
    return state.Ogio.uniqueProductType || [];
};



export default OgioSlice.reducer;
