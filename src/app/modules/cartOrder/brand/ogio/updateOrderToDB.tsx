import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOgioProducts, updateOgioStock } from '../../../../slice/allProducts/OgioSlice'
import { UpdateStockQuantity } from '../../../brands/ogio/api/OgioAPI';
import { OgioBasicModel } from '../../../model/ogio/OgioBrandModel';


type props = {
    resetUpdateData: (updatedate: string) => void
}


const UpdateOrderToDB = ({ resetUpdateData }: props) => {
  const dispatch= useDispatch()
    const [isUpdating, setIsUpdating] = useState(false);
    const getOgioProduct = useSelector(getOgioProducts);
    const [updatestock, setUpdateStock] = useState<OgioBasicModel[]>([])
    useEffect(() => {
        const newOgio: OgioBasicModel[] = [];
        if (getOgioProduct &&
            getOgioProduct.length > 0) {
         
            getOgioProduct.map(item => {
                if (item.ordered && item.error == "") {

                    if (
                        item.stock_90 !== undefined &&
                        item.Quantity90 !== undefined && // Add null check here
                        item.Quantity90 !== null// Add null check here
                    ) {
                        const data = {
                            sku: item.sku,
                            stock_90: item.stock_90 - item.Quantity90,
                           
                        };
                        newOgio.push(data);
                    }

                }
            })
            setUpdateStock(newOgio)
        }

    }, [getOgioProduct])

    // call API function

    useEffect(() => {
        if (updatestock &&
            updatestock.length > 0 &&
            !isUpdating) {

            updateStock(updatestock)
        }


    }, [updatestock])


    const updateStock = async (allData: OgioBasicModel[]) => {
        try {

            const response = await UpdateStockQuantity(allData)


            if(response && response.status===200)
            console.log("ogio qty ipdate response", response)
            if (response.status == 200 && response.data) {
                dispatch(updateOgioStock({
                    ogioProduct: allData
                }))
                resetUpdateData(response.data.message)}
            
        } catch (error) {
            resetUpdateData("")
        }
    }

    return (
        <div></div>
    )
}

export default UpdateOrderToDB