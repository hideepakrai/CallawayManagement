import React, { useState } from "react";

import { Table, Tooltip } from "antd";
import Edit from "./Edit";
import View from "./View"
import {getUserAccount} from "../../../slice/UserSlice/UserSlice"
import { useSelector, useDispatch } from "react-redux";
import {UserAccountModel,AllOrderss} from "../../model/useAccount/UserAccountModel"
import { Card } from "react-bootstrap";
import {ProductDetails,CartModel,AccountOrder} from "../../model/CartOrder/CartModel.ts"
import {addPendingOrder} from "../../../slice/orderSlice/travis/Orderdetails.tsx"
import UpdateStatus from "./UpdateStatus.tsx";

const AllOrder = () => {
    
    const dispatch= useDispatch()
    const getUserAccounts= useSelector(getUserAccount) as UserAccountModel;
  const [orderId, setOrderId]= useState<number>()
    const [isEdit, setIsEdit] = useState(false);
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
            
<Card>
<div className="table-responsive">
<label>Pending Order</label>
	<table className="table table-striped gy-7 gs-7">
      
		<thead>
			<tr className="fw-semibold fs-6 text-gray-800 border-bottom border-gray-200">
				<th>Order Id</th>
				<th>Brand</th>
				<th>Retailer Name</th>
				<th>Date</th>
				<th>Amount</th>
				<th>Action</th>
			</tr>
		</thead>
		<tbody>
        {getUserAccounts &&
 getUserAccounts?.attributes &&
 getUserAccounts?.attributes.orders &&
 getUserAccounts?.attributes.orders.data&& 
 getUserAccounts?.attributes.orders.data.length>0 &&
 getUserAccounts?.attributes.orders.data.map((item)=>{
    if(item && item.attributes && item.attributes.Status==="Pending"){

        return(
            <tr>
				<td>{item.attributes.OrderId}</td>
				<td>{item.attributes.Brand}</td>
				<td>{item.attributes?.retailer?.data?.attributes?.Name}</td>
				<td>{item.attributes.createdAt}</td>
				<td>{item.attributes?.Amount}</td>
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
