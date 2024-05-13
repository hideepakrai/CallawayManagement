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

            updateData:(state,action) => {
                const {ogioProduct}= action.payload;
              if(ogioProduct && ogioProduct.length > 0) {
                    ogioProduct.map((item:OgioBasicModel)=>{
                 
                    const ogioIndex= state.ogio.findIndex(rdx=>rdx.sku===item.sku);
                    if(ogioIndex==-1){
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
                    } else if(ogioIndex!=-1){
                        const stt=state.ogio[ogioIndex];
                        state.ogio[ogioIndex].name=item.name!=undefined ?item.name:stt.name;
                        state.ogio[ogioIndex].description=item.description!=undefined ?item.description:stt.description;
                        state.ogio[ogioIndex].mrp=item.mrp!=undefined ?item.mrp:stt.mrp;
                        state.ogio[ogioIndex].category=item.category!=undefined ?item.category:stt.category;
                        state.ogio[ogioIndex].product_type=item.product_type!=undefined ?item.product_type:stt.product_type;
                        state.ogio[ogioIndex].product_model=item.product_model!=undefined ?item.product_model:stt.product_model;
                        state.ogio[ogioIndex].gst=item.gst!=undefined ?item.gst:stt.gst;
                        state.ogio[ogioIndex].brand_id=item.brand_id!=undefined ?item.brand_id:stt.brand_id;
                        state.ogio[ogioIndex].primary_image_url=item.primary_image_url!=undefined ?item.primary_image_url:stt.primary_image_url;
                        state.ogio[ogioIndex].gallery_images_url=item.gallery_images_url!=undefined ?item.gallery_images_url:stt.gallery_images_url;
                        state.ogio[ogioIndex].variation_sku=item.variation_sku!=undefined ?item.variation_sku:stt.variation_sku;
                        state.ogio[ogioIndex].stock_90=item.stock_90!=undefined ?item.stock_90:stt.stock_90;
                        state.ogio[ogioIndex].Quantity90=0;
                        state.ogio[ogioIndex].Amount=0;
                        state.ogio[ogioIndex].TotalQty=0;
                        state.ogio[ogioIndex].LessGST=0;
                        state.ogio[ogioIndex].LessDiscountAmount=0;
                        state.ogio[ogioIndex].Discount=0;
                        state.ogio[ogioIndex].FinalBillValue=0;
                        state.ogio[ogioIndex].error="";
                        state.ogio[ogioIndex].NetBillings=0

                    }
                 })
              }
                 
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
            const index= state.ogio.findIndex(item=>item.SKU===ogioProduct.SKU);
            if(index!==-1){
                const stt= state.ogio[index].stock_90;
                const qty= state.ogio[index].Quantity90;
                const currentQty=ogioProduct.Quantity90
                if(stt &&currentQty){
                   state.ogio[index].stock_90=stt-currentQty;
                   state.ogio[index].Quantity90=0;
                   state.ogio[index].TotalQty=0;
                   state.ogio[index].Amount=0;
                   state.ogio[index].LessGST=0;
                   state.ogio[index].LessDiscountAmount=0;
                   state.ogio[index].NetBillings=0;
                   state.ogio[index].FinalBillValue=0;
                   state.ogio[index].Discount=0;
                   state.ogio[index].ordered=false;
                   state.ogio[index].error="";
                   
                }
            }

        }


       
    
    }
}
);


export const { addOgioProduct,
    updateData,
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
