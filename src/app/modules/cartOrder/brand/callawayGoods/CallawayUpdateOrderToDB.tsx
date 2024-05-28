import React, { useEffect, useState } from 'react'
import { UseDispatch, useSelector } from 'react-redux'
import { getOgioProducts } from '../../../../slice/allProducts/OgioSlice'
import { UpdateStockQuantity } from '../../../brands/ogio/api/OgioAPI';
import { BasicModelTravis, BasicModelTravisGraph, ImageType } from "../../../model/travis/TravisMethewModel"
import { getTravisProducts, getOtherProducts } from "../../../../slice/allProducts/TravisMethewSlice"

type props = {
    resetUpdateOrder: () => void
}


const CallawayUpdateOrderToDB = ({ resetUpdateOrder }: props) => {


    const getTravisProduct = useSelector(getTravisProducts);
    const [updatestock, setUpdateStock] = useState<BasicModelTravis[]>([])
    useEffect(() => {
        if (getTravisProduct &&
            getTravisProduct.length > 0) {
            const newData: BasicModelTravis[] = [];
            getTravisProduct.map(item => {
                if (item.ordered && item.error88 == "" && item.error90 === "") {

                    if (item.stock_90 && item.Quantity90) {
                        const data = {
                            sku: item.sku,
                            stock_90: item.stock_90 - item.Quantity90
                        }
                        newData.push(data)
                    }

                }
            })
            setUpdateStock(newData)
        }

    }, [getTravisProduct])

    // call API function

    useEffect(() => {
        if (updatestock &&
            updatestock.length > 0) {

            //updateStock(updatestock)
        }


    }, [updatestock])




    return (
        <div></div>
    )
}

export default CallawayUpdateOrderToDB