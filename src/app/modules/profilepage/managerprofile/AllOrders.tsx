import React, { useEffect, useState } from "react";

import { Table, Tooltip } from "antd";
import Edit from "./Edit";
import View from "./View"
import {getUserAccount, getUserOrders} from "../../../slice/UserSlice/UserSlice"
import { useSelector, useDispatch } from "react-redux";
import {UserAccountModel,AllOrderss} from "../../model/useAccount/UserAccountModel"
import { Card } from "react-bootstrap";
import {ProductDetails,CartModel,AccountOrder} from "../../model/CartOrder/CartModel.ts"
import {addPendingOrder} from "../../../slice/orderSlice/travis/Orderdetails.tsx"
import UpdateStatus from "./UpdateStatus.tsx";

import { GetAllUserOrders } from "../../../api/order/OrederApi.ts";
const AllOrder = () => {
     
    const getUserAccounts= useSelector(getUserAccount)



  
    const dispatch= useDispatch()
    const getUserOrder= useSelector(getUserOrders) as AccountOrder[];
    console.log("getUserOrder",getUserOrder)
    const [orderId, setOrderId]= useState<number>()

    const [isEdit, setIsEdit] = useState(false);
     
   
    
    // getAll Orders
    
    const handleEdit = (id: number | undefined) => {
        if (id !== undefined) {
            setIsEdit(true);
            setOrderId(id)
        }
    };
    const handleCloseEdit = () => {
        setIsEdit(false);
    };

     // view

     const [allProducts, setAllProducts]= useState<AccountOrder>()
  const [isView, setIsView] = useState(false);
  const handleView = (allProduct:unknown) => {
    setIsView(true);
  console.log(allProduct)
  //setAllProducts(allProduct);

  dispatch(addPendingOrder({
    pendingOrders:allProduct
  }))
   
  };

  const handleCloseView = () => {
    setIsView(false);
  };


    const handleview = () => {
        console.log("I am here");

    };

  const[status, setStatus]= useState<string>("")
    const handleUpdateStatus=(status:string) => {
        console.log(status)
        setStatus(status)
    }
    
    return (
        <>
            
<Card className="mt-6">
<div className="table-responsive mb-6">
<label><h3 className="mx-6 my-7">All Order</h3></label>

	<table className="table table-striped gy-7 gs-7" style={{width:"96%", margin:"0 auto", }}>
      
		<thead style={{backgroundColor:"#f5f5f5"}} >
			<tr className="fw-semibold fs-6 text-gray-800 border-bottom border-gray-200">
				<th>Order Id</th>
				<th>Brand</th>
				<th>Retailer Name</th>
				<th>Status</th>
				<th>Date</th>
				<th>Amount</th>
				<th>Action</th>
			</tr>
		</thead>
		<tbody>
        {getUserOrder &&
 getUserOrder?.length>0 &&
 getUserOrder?.map((item)=>{
    if(item && item.status!=="Pending"){

        return(
            <tr>
				<td>{item?.id}</td>
				<td>{item?.brand_id==4?"Ogio":"Travis Mathew"}</td>
				<td>{item.retailer_id}</td>
				<td>{item.status}</td>
				<td>{item.created_at}</td>
				<td>{item.total_value}</td>
				<td>
                <span>
                   <span style={{ paddingRight: "9px", borderRight: "1px solid rgb(221, 221, 221)", cursor: "pointer" }}
                      onClick={() => handleEdit(item.id)}
                    >

                        <Tooltip title="Edit" placement="bottom">
                            <i className="bi bi-pencil-fill" ></i>
                        </Tooltip>
                    </span>

                    <span style={{ paddingLeft: "7px", paddingRight: "6px", borderRight: "1px solid rgb(221, 221, 221)", cursor: "pointer" }}
                    onClick={() => handleView(item)}

                    >

                        <Tooltip title="View" placement="bottom">
                        <i className="bi bi-arrow-up-right-square"></i>
                        </Tooltip>
                    </span>

                    <span style={{ paddingLeft: "8px", cursor: "pointer" }}  >
                        <Tooltip title="View Prodects" placement="bottom">

                            <i className="bi bi-box-arrow-up-right " ></i>
                       </Tooltip>
                   </span>



               </span>,
                </td>
			</tr>
  
        )
    }
 })



}
			
			
		</tbody>
	</table>
</div>

</Card>

<View 
isView={isView}

 onCloseView={handleCloseView} 
 /> 
<Edit 
isEdit={isEdit} 

onClose={handleCloseEdit} 
changeStatus={handleUpdateStatus}
/>



        </>
    );
};

export default AllOrder;
