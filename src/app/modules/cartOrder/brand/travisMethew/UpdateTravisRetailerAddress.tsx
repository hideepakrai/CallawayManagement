import React, { useEffect } from 'react'
import { UpdateOrder } from '../../orderApi/OrderAPi';
import { CartModel } from '../../../model/CartOrder/CartModel';
import { getActiveOrdertab } from '../../../../slice/activeTabsSlice/ActiveTabSlice';
import { useSelector } from 'react-redux';
import { getPreOrderId, getTravisRetailerDetail } from '../../../../slice/allProducts/TravisMethewSlice';
import { RetailerModel } from '../../../model/AccountType/retailer/RetailerModel';


type Props = {
    resetAddress:()=>void
}
const UpdateTravisRetailerAddress = ({resetAddress}:Props) => {

    const getActiveOrdertabs= useSelector(getActiveOrdertab)
    const getTravisRetailerDetails= useSelector(getTravisRetailerDetail) as RetailerModel;
    const getPreOrderIds = useSelector(getPreOrderId);
    useEffect(()=>{
        if(getTravisRetailerDetails &&
            getActiveOrdertabs==="Travis"  
        ){
            const   retailer_details={
                name:getTravisRetailerDetails.name,
                gstin:getTravisRetailerDetails.gstin,
                email:getTravisRetailerDetails.email,
                address:getTravisRetailerDetails.address,
                phone:getTravisRetailerDetails.phone
                }
                const now = new Date();
                const formattedTimestamp = now.toISOString();
                const data = {
                    id: getPreOrderIds,
                    order_date: formattedTimestamp,
                    updated_at: formattedTimestamp,
                    retailer_details:JSON.stringify(retailer_details)
            
                  }
                  updateOrder(data)
        }
    },[getActiveOrdertabs,getTravisRetailerDetails,getPreOrderIds])

    const updateOrder = async (data: CartModel) => {
        try {
          const response = await UpdateOrder(data);
          if (response) {
            resetAddress()
          }
    
    
        }
        catch (err) {
          //dispatch(LoadingStop())
          // alert("Error on creating order")
          resetAddress()
    
        }
      }

  return (
    <div></div>
  )
}

export default UpdateTravisRetailerAddress
