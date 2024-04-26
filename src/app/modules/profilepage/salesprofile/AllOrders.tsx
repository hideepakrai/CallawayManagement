import React from "react";

import { Table,Tooltip } from "antd";

const column = [
  {
    title: "Order Id",
    dataIndex: "orderid",
  },

  {
    title: "Retailer Name",
    dataIndex: "retailername",
  },

  
  {
    title: "Date",
    dataIndex: "date",
  },
 


  {
    title: "Amount",
    dataIndex: "amount",
  },

  {
    title: "Status",
    dataIndex: "status",
  },

  
   


  {
    title: "Action",
    dataIndex: "action",
    key: 'x',
    render: () => 
      <div> 
    <span style={{ paddingRight: "9px", borderRight: "1px solid rgb(221, 221, 221)", cursor:"pointer" }}>  
    <Tooltip title="Edit" placement="bottom">   
     <i className="bi bi-pencil-fill" ></i>
    </Tooltip>
    </span> 

    <span style={{ paddingLeft: "8px", cursor:"pointer"}}> 
    <Tooltip title="View" placement="bottom"> 

    <i className="bi bi-box-arrow-up-right" ></i>
    </Tooltip>
    </span>
</div>,
    
  },
  
];

const data = [
  {
    key: "1",
    orderid: "001",
    retailername:"Ashok Sharma",
    date:"06/09/2003 05:05:15 PM	",
    status:"Completed",
    amount:"1230"
  
  },

  {
    key: "2",
    orderid: "002",
    retailername: "Vishal Singh",
    date:"12/12/2004 03:05:15 PM",
    status:"Rejected",
    amount:"1780"
  
  },

  {
    key: "3",
    orderid: "003",
    retailername: "Ankit Kumar",
    date:"15/01/2015 03:05:15 PM",
    status:"Approved",
    amount:"5043"
  
  },
  {
    key: "4",
    orderid: "004",
    retailername: "Jitendra Kumar",
    date:"12/08/2013 02:05:15 PM",
    status:"Under Review",
    amount:"1500"
  
  },
  
];

const AllOrders = () => {
  return (
  

    <div className="card card-custom mt-3">
    <div className="card-header">
        <h3 className="card-title">All Orders</h3>
    </div>

    <div className="card-body">
        <Table columns={column} dataSource={data} size="middle" />
    </div>
</div>

  );
};

export default AllOrders;
