import React, { useEffect, useState } from 'react'
import { BasicModelApparel } from "../../../../../model/apparel/CallawayApparelModel"
import { UpDateApparelQty} from '../../api/UpdateProductData'
import { useDispatch } from "react-redux"
import {updateApparelQty} from '../../../../../../slice/allProducts/CallawayApparelSlice'

type Props = {
    allXlxData: BasicModelApparel[];
    resetQtyData: (allresponse: string) => void
}
const ApparelUpdateQtyDb = ({ allXlxData, resetQtyData }: Props) => {

    const dispatch = useDispatch()
    useEffect(() => {
        if (allXlxData &&
            allXlxData.length > 0) {
            updateQty(allXlxData)
        }


    }, [allXlxData])
    console.log("db",allXlxData)

    const updateQty = (allQtyXlxData: BasicModelApparel[]) => {
        const allQtData: BasicModelApparel[] = []
        if (allQtyXlxData && allQtyXlxData.length > 0) {
            allQtyXlxData.map(item => {

                const updateQuantity = {
                    sku: item.sku,
                    stock_88: item.stock_88,
                    stock_90: item.stock_90
                }
                allQtData.push(updateQuantity)
            })
        }
        updateQtyApi(allQtData)
    }

    const updateQtyApi = async (data: BasicModelApparel[]) => {


        try {


            const response = await UpDateApparelQty(data);
            if (response.status == 200 && response.data) {
                dispatch(updateApparelQty({
                    apparelProduct: data
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

export default ApparelUpdateQtyDb