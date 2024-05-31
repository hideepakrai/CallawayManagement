import React, { useEffect } from 'react'
import { getActiveOrdertab } from '../../../../slice/activeTabsSlice/ActiveTabSlice';
import { useSelector } from 'react-redux';
import { getOgioRetailerDetail, getPreOrderId } from '../../../../slice/allProducts/OgioSlice';
import { RetailerModel } from '../../../model/AccountType/retailer/RetailerModel';
import { CartModel } from '../../../model/CartOrder/CartModel';
import { UpdateOrder } from '../../orderApi/OrderAPi';



type Props = {
    resetOgioAddress:()=>void
}
const UpdateOgioRetailerAddress = ({resetOgioAddress}:Props) => {
    const getActiveOrdertabs= useSelector(getActiveOrdertab)
    const getOgioRetailerDetails= useSelector(getOgioRetailerDetail) as RetailerModel;
    const getPreOrderIds = useSelector(getPreOrderId);


    useEffect(()=>{
        if(getOgioRetailerDetails &&
            getActiveOrdertabs==="Ogio"  
        ){
            const   retailer_details={
                name:getOgioRetailerDetails.name,
                gstin:getOgioRetailerDetails.gstin,
                email:getOgioRetailerDetails.email,
                address:getOgioRetailerDetails.address,
                phone:getOgioRetailerDetails.phone
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
    },[getActiveOrdertabs,getOgioRetailerDetails,getPreOrderIds])


    const updateOrder = async (data: CartModel) => {
        try {
          const response = await UpdateOrder(data);
          if (response) {
            resetOgioAddress()
          }
    
    
        }
        catch (err) {
          //dispatch(LoadingStop())
          // alert("Error on creating order")
          resetOgioAddress()
    
        }
      }
  return (
    <div></div>
  )
}

export default UpdateOgioRetailerAddress