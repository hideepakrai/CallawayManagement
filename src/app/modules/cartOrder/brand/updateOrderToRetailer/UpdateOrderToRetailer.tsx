import axios from 'axios'
import React from 'react'





type Props={
  retailerId:number,
  orderId:number
}

const UpdateOrderToRetailer = ({retailerId,orderId}:Props) => {


const updateOrderToRetailer=async()=>{
  try{
    const res=await axios.post(`${process.env.REACT_APP_API_URL}/api/order/update-order-to-retailer`,{
      retailerId,
      orderId
    })
   
  }catch(err) {
    console.log(err)
  }
}

  return (
    <div>UpdateOrder</div>
  )
}

export default UpdateOrderToRetailer
