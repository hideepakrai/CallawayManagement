import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BasicModelApparel } from '../../../../model/apparel/CallawayApparelModel'
import { updateApparelQty } from '../../../../../slice/allProducts/CallawayApparelSlice';
import { UpDateTravisQty } from '../../../../brands/travisMethew/api/UpdateProductData';
import { UpDateApparelQty } from '../../../../brands/callAway/apparel/api/UpdateProductData';

type props = {
    allApparel:BasicModelApparel[];
    resetUpdateData: (updatedate: string) => void
   
}


const UpdateApparelQtyInDB = ({ resetUpdateData,allApparel }: props) => {

    const dispatch = useDispatch()
    
    const [updatestock, setUpdateStock] = useState<BasicModelApparel[]>([])
    const [isUpdating, setIsUpdating] = useState(false);
    useEffect(() => {
        
        const newApparel: BasicModelApparel[] = [];
        if (allApparel && allApparel.length > 0) {
            allApparel.forEach(item => {
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
                        newApparel.push(data);
                    }
                }
            });
        }

        if (newApparel.length > 0 && !isUpdating) {
            // Check if there's data to update and no update process is ongoing
            updateQtyApi(newApparel);
        }
        // updateQtyApi(newtravis);
    }, [allApparel]);





    const updateQtyApi = async (data: BasicModelApparel[]) => {

        try {

            setIsUpdating(true);
            const response = await UpDateApparelQty(data);
           console.log("response update apparel qty",response)
                        
            if (response.status == 200 && response.data) {
                dispatch(updateApparelQty({
                    apparelProduct: data
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

export default UpdateApparelQtyInDB