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
                        PrimaryImage: item.attributes.PrimaryImage
                    });
                });
            }
        },
    },
});

export const { addCallawayGoodsProduct } = CallawayGoodSlice.actions;

export const selectCallawayGoods = (state: { callawayGoods: ProductState }) => state.callawayGoods.callawayGoods;

export default CallawayGoodSlice.reducer;
