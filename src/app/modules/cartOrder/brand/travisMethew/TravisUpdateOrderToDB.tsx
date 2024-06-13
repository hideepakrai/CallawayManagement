import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { getOgioProducts } from '../../../../slice/allProducts/OgioSlice'
// import { UpdateStockQuantity } from '../../../brands/ogio/api/OgioAPI';
import { BasicModelTravis, BasicModelTravisGraph, ImageType } from "../../../model/travis/TravisMethewModel"
import { getTravisProducts, getOtherProducts, updateTravisQty } from "../../../../slice/allProducts/TravisMethewSlice"
import { UpDateTravisQty } from '../../../brands/travisMethew/api/UpdateProductData';

type props = {
    resetUpdateData: (updatedate: string) => void
}


const TravisUpdateOrderToDB = ({ resetUpdateData }: props) => {

    const dispatch = useDispatch()
    const getTravisProduct = useSelector(getTravisProducts);
    const [updatestock, setUpdateStock] = useState<BasicModelTravis[]>([])
    const [isUpdating, setIsUpdating] = useState(false);
    useEffect(() => {
        const newtravis: BasicModelTravis[] = [];
        if (getTravisProduct && getTravisProduct.length > 0) {
            getTravisProduct.forEach(item => {
                if (item.ordered && item.error88 === "" && item.error90 === "") {
                    if (
                        item.stock_90 !== undefined &&
                        item.Quantity90 !== undefined && // Add null check here
                        item.stock_88 !== undefined &&
                        item.Quantity88 !== undefined && // Add null check here
                        item.Quantity88 !== null &&
                        item.Quantity90 !== null// Add null check here
                    ) {
                        const data = {
                            sku: item.sku,
                            stock_90: item.stock_90 - item.Quantity90,
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
    }, [getTravisProduct]);





    const updateQtyApi = async (data: BasicModelTravis[]) => {

        try {

            setIsUpdating(true);
            const response = await UpDateTravisQty(data);
            if (response.status == 200 && response.data) {
                dispatch(updateTravisQty({
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

export default TravisUpdateOrderToDB