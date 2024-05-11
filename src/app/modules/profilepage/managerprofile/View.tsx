import React, { useState } from "react";
import { Button, Modal, Tooltip } from "antd";
import { Flex, Input, Table } from "antd";

import {ProductDetails,AccountOrder} from "../../model/CartOrder/CartModel.ts"
import {getPendingOrder} from "../../../slice/orderSlice/travis/Orderdetails.tsx"
import {useSelector, useDispatch} from "react-redux"
type Props={
    isView:boolean,
    onCloseView:() => void,
    
}

const View = ({ isView, onCloseView }:Props) => {


  const getPendingOrders= useSelector(getPendingOrder) as AccountOrder
   console.log("AccountOrder",getPendingOrders)
  
  const handleOk = () => {
    //setIsModalOpen(false);
    onCloseView();
  };
  const handleCancel = () => {
    // setIsModalOpen(false);
    onCloseView();
  };

 
  
  return (
    <div>
      <Modal
        // title="Basic Modal"
        open={isView}
        onOk={handleOk}
        onCancel={handleCancel}
        width={850}
      >

        <h3 className="pb-4">Order Id:{getPendingOrders?.attributes?.OrderId}</h3>
        
        <table className="table table-striped gy-7 gs-7">
      
		<thead className="bg-light-dark">
			<tr className="fw-semibold fs-6 text-gray-800 border-bottom border-gray-200">
				<th>Name</th>
				<th>SKU</th>
				<th>Description</th>
				<th>Unit Price</th>
				<th>QTY 90</th>
				<th>QTY 88</th>
				<th>TotalPrice</th>
				
			</tr>
		</thead>
		<tbody>
         {getPendingOrders &&
 getPendingOrders?.attributes &&
 getPendingOrders?.attributes.ProductDetails &&
 getPendingOrders?.attributes.ProductDetails.length>0 &&
 getPendingOrders?.attributes.ProductDetails.map((item)=>{
    if(item && item.product && item.product.data && item.product.data.attributes){

        return(
            <tr>
				<td>{item.product.data.attributes.Name}</td>
				<td>{item.product.data.attributes.SKU}</td>
				<td className="w-150px">{item.product.data.attributes.Description}</td>
				<td>{item.UnitPrice}</td>
				<td>{item.Qty90}</td>
				<td>{item.Qty88}</td>
				<td>{item.TotalPrice}</td>
				
			</tr>

      
  
        )
    }
 })



}  
			
			
		</tbody>
	</table>
        
      </Modal>
    </div>
  );
};

export default View;
