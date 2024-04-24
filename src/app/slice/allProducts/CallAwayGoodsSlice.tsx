import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BasicModelGoodsGraph, GoodsAttributes,BasicModelGoods } from "../../modules/brands/model/goods/CallawayGoodsModel";

interface ProductState {
    callawayGoods: BasicModelGoods[];
}

const initialState: ProductState = {
    callawayGoods: [],
};

const CallawayGoodSlice = createSlice({
    name: "callawayGoods",
    initialState,
    reducers: {
        resetCallayGoods: () =>{
            return initialState;
        },
        addCallawayGoodsProduct: (state, action: PayloadAction<{ goodsProduct: BasicModelGoodsGraph[], id: string }>) => {
            const { goodsProduct } = action.payload;
            if (goodsProduct && goodsProduct.length > 0) {
                goodsProduct.forEach((item:BasicModelGoodsGraph) => {
                    const att: GoodsAttributes[] = [];
                    if (item &&
                        item.attributes &&
                        item.attributes.AttributeSet &&
                        Array.isArray(item.attributes.AttributeSet)
                       ) { // Null check here
                        item.attributes.AttributeSet.forEach((attrItem: GoodsAttributes) => {
                            att.push({
                                ProductType: attrItem.ProductType,
                                ProductModel: attrItem.ProductModel,
                                Category: attrItem.Category,
                                Orientation: attrItem.Orientation,
                                LifeCycle: attrItem.LifeCycle,
                            });
                        });
                    }
                    state.callawayGoods.push({
                        brand: item.attributes.brand,
                        Name: item.attributes.Name,
                        Description: item.attributes.Description,
                        SKU: item.attributes.SKU,
                        StockManagement: item.attributes.StockManagement,
                        StockStatus: item.attributes.StockStatus,
                        RegularPrice: item.attributes.RegularPrice,
                        SalePrice: item.attributes.SalePrice,
                        StockAvailable: item.attributes.StockAvailable,
                        SetType: item.attributes.SetType,
                        ProductType: item.attributes.ProductType,
                        GoodsAttributes: att,
                        Gallery:item.attributes.Gallery,
                        PrimaryImage: item.attributes.PrimaryImage,
                        StockAvailable88:item.attributes.StockAvailable88===null? 0:item.attributes.StockAvailable88,
                        StockAvailable90:item.attributes.StockAvailable90===null?0:item.attributes.StockAvailable90,
                        TotalQty: 0,
                        Quantity88: 0,
                        Quantity90: 0,
                        Amount: 0
                    });
                });
            }
        },
        updateGoodsQuantity90:(state,action)=>{
            const {sku, qty90,RegularPrice}=action.payload;
            const goodsIndex = state.callawayGoods.findIndex(
              (goodsItem) => goodsItem.SKU === sku
            );
            if (goodsIndex!== -1) {
              state.callawayGoods[goodsIndex].Quantity90 = qty90;
             
              const quantity88 = state.callawayGoods[goodsIndex]?.Quantity88 ?? 0;
              const quantity90 = state.callawayGoods[goodsIndex]?.Quantity90 ?? 0;
              state.callawayGoods[goodsIndex].TotalQty = quantity88+quantity90;

              
              state.callawayGoods[goodsIndex].Amount = RegularPrice*(quantity88+quantity90)
              state.callawayGoods[goodsIndex].ordered = true;
            }

        },
        updateGoodsQuantity88:(state,action)=>{
            const {sku, qty88,RegularPrice}=action.payload;
            const goodsIndex = state.callawayGoods.findIndex(
              (goodsItem) => goodsItem.SKU === sku
            );
            if (goodsIndex!== -1) {
              state.callawayGoods[goodsIndex].Quantity88 = qty88;
              const quantity88 = state.callawayGoods[goodsIndex]?.Quantity88 ?? 0;
              const quantity90 = state.callawayGoods[goodsIndex]?.Quantity90 ?? 0;
              state.callawayGoods[goodsIndex].TotalQty = quantity88+quantity90;
              state.callawayGoods[goodsIndex].Amount = RegularPrice*(quantity88+quantity90)
              state.callawayGoods[goodsIndex].ordered = true;
            }
          },
        }
    
});

export const { 
    addCallawayGoodsProduct,
    resetCallayGoods,
    updateGoodsQuantity90,
    updateGoodsQuantity88

 } = CallawayGoodSlice.actions;

export const selectCallawayGoods = (state: { callawayGoods: ProductState }) => state.callawayGoods.callawayGoods;

export default CallawayGoodSlice.reducer;
