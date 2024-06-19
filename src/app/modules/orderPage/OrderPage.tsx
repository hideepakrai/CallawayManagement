import React, { useState, useEffect } from "react";
import {
  Space,
  Card,
  Divider,
  Form,
  Radio,
  Switch,
  Table,
  Tooltip,
  Breadcrumb,
} from "antd";
import Icon from "@ant-design/icons";
import Edit from "./Edit";
import Notes from "./Notes";
import View from "./View";
import type { TableProps } from 'antd';
import { number } from "yup";
import { ColumnGroupType, ColumnType } from "antd/es/table";
import "./OrderPage.css"

// import CardHeader from "../../../module/cardOrder/CardHeader.tsx"



const OrderPage = () => {
 

  const  handleRefetch =()=>{
    
  }
  const  handleApproveOrder =()=>{

  }
  const  hanldeSubmitOrder =()=>{

  }
  const  handleRejectOrder =()=>{

  }
  const  handleCompletedOrder =()=>{

  }
  const  handleNote =()=>{

  }
  const  handleCheckRetailerDetail =()=>{

  }

  return (
    <>
{/* 
<CardHeader
reviewOrder={handleRefetch}
approveorder={handleApproveOrder}
submitOrder={hanldeSubmitOrder}
rejectOrder={handleRejectOrder}
completedOrder={handleCompletedOrder}
note={handleNote}
checkAvailability={handleCheckRetailerDetail}
/>
        */}
        

     
      
      
      
    </>
  );
};

export default OrderPage;
