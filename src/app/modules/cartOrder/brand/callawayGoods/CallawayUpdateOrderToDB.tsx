import React, { useEffect, useState } from 'react'
import {  useDispatch, useSelector } from 'react-redux'
// import { getOgioProducts } from '../../../../slice/allProducts/OgioSlice'
// import { UpdateStockQuantity } from '../../../brands/ogio/api/OgioAPI';
import { BasicModelGoods, BasicModelGoodsGraph, ImageType } from "../../../model/goods/CallawayGoodsModel"
import { getGoodsProducts, getOtherProducts, updateGoodsQty } from "../../../../slice/allProducts/CallAwayGoodsSlice"
import { UpDateGoodsQty } from '../../../brands/callAway/goods/api/UpdateProductData'

type props = {
    resetUpdateData: (updatedate: string) => void
}


const CallawayUpdateOrderToDB = ({ resetUpdateData }: props) => {
    const dispatch = useDispatch()
    const getGoodsProduct = useSelector(getGoodsProducts);
    const [updatestock, setUpdateStock] = useState<BasicModelGoods[]>([])
    const [isUpdating, setIsUpdating] = useState(false);
    useEffect(() => {
        const newtravis: BasicModelGoods[] = [];
        if (getGoodsProduct && getGoodsProduct.length > 0) {
            getGoodsProduct.forEach(item => {
                if (item.ordered && item.error88 === "" ) {
                    if (
                       
                        item.stock_88 !== undefined &&
                        item.Quantity88 !== undefined && // Add null check here
                        item.Quantity88 !== null 
                    ) {
                        const data = {
                            sku: item.sku,
                            stock_88: item.stock_88 - item.Quantity88
                        };
                        newtravis.push(data);
                    }
                }
            });
        }

        if (newtravis.length > 0 && !isUpdating) {
            // Check if there's data to update and no update process is ongoing
            updateQtyApi(newtravis);
        }
        // updateQtyApi(newtravis);
    }, [getGoodsProduct]);





    const updateQtyApi = async (data: BasicModelGoods[]) => {

        try {

            setIsUpdating(true);
            const response = await UpDateGoodsQty(data);
            if (response.status == 200 && response.data) {
                dispatch(updateGoodsQty({
                    allQtyTravis: data
                }))
                resetUpdateData(response.data.message)
            }

        } catch (e) {
            alert("Error updating travis stock quantity");
            resetUpdateData("")
        }
    }


    return (
        <div></div>
    )
}

export default CallawayUpdateOrderToDB