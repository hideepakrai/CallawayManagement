import React, { useEffect, useState } from 'react'

import { useDispatch } from "react-redux";
import { OgioBasicModel } from '../../../../model/ogio/OgioBrandModel';
import { UpDateOgioQty } from '../../api/OgioAPI';
import { updateOgioStock, updateQunatityAfterOrder } from '../../../../../slice/allProducts/OgioSlice';

type Props = {
    allQtyXlxData: OgioBasicModel[];
    resetQtyData: (allresponse: string) => void
}
const OgioUpdateQtyDb = ({ allQtyXlxData, resetQtyData }: Props) => {


    const dispatch = useDispatch()
    useEffect(() => {
        if (allQtyXlxData &&
            allQtyXlxData.length > 0) {
            updateQty(allQtyXlxData)
        }

    }, [allQtyXlxData])


    const updateQty = (allQtyXlxData: OgioBasicModel[]) => {
        const allQtData: OgioBasicModel[] = []
        if (allQtyXlxData && allQtyXlxData.length > 0) {
            allQtyXlxData.map(item => {

                const updateQuantity = {
                    sku: item.sku,
                    stock_90: item.stock_90
                }
                allQtData.push(updateQuantity)
            })
        }
        updateQtyApi(allQtData)
    }


    const updateQtyApi = async (data: OgioBasicModel[]) => {


        try {


            const response = await UpDateOgioQty(data);
            if (response.status == 200 && response.data) {
                dispatch(updateOgioStock({
                    ogioProduct: data
                }))
                resetQtyData(response.data.message)
            }

        } catch (e) {
            alert("Error updating travis stock quantity");
            resetQtyData("")
        }
    }


    return (
        <div></div>
    )
}

export default OgioUpdateQtyDb