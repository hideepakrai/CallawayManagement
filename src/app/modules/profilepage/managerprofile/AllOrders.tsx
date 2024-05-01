import React,{useEffect, useState} from "react";
import { Table, Tooltip } from "antd";
import Edit from "./Edit";
import View from "./View"
import {getUserAccount} from "../../../slice/UserSlice/UserSlice"
import { useSelector, useDispatch } from "react-redux";
import {UserAccountModel,AllOrderss} from "../../model/useAccount/UserAccountModel"
const AllOrders = () => {
    const [isEdit, setIsEdit] = useState(false);
    const handleEdit = () => {
        setIsEdit(true);
    };
    const handleCloseEdit = () => {
        setIsEdit(false);
    };

     // view
  const [isView, setIsView] = useState(false);
  const handleView = () => {
    setIsView(true);
  };

  const handleCloseView = () => {
    setIsView(false);
  };


const getUserAccounts= useSelector(getUserAccount) as UserAccountModel;
const [allOrders, setAllOrders]= useState<AllOrderss[]>([])  

console.log(getUserAccounts)

  useEffect(()=>{
    if(getUserAccounts &&
        getUserAccounts?.attributes &&
        getUserAccounts?.attributes.orders &&
        getUserAccounts?.attributes.orders
        

    ){
        setAllOrders([getUserAccounts?.attributes.orders])
    }
  },[getUserAccounts])
const column = [
    
    {
        title: "Order Id",
        dataIndex: "orderid",
    },

    {
        title: "Brand",
        dataIndex: "brand",
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

            <span style={{ paddingRight: "9px", borderRight: "1px solid rgb(221, 221, 221)", cursor:"pointer" }} 
              onClick={() => handleEdit()}
            >  
            <Tooltip title="Edit" placement="bottom">   
             <i className="bi bi-pencil-fill" ></i>
            </Tooltip>
            </span> 

            <span style={{ paddingLeft: "7px", paddingRight: "6px", borderRight: "1px solid rgb(221, 221, 221)", cursor:"pointer" 
                
             }}>  
            <Tooltip title="View" placement="bottom">   
            <i className="bi bi-arrow-up-right-square" onClick={handleView}></i>
            </Tooltip>

            </span>

            <span style={{ paddingLeft: "8px", cursor:"pointer" }}> 
            <Tooltip title="View Prodects" placement="bottom"> 
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
        brand:"Callaway",
        retailername: "Manish Gupta",
        date: "10/05/2006 05:05:15 PM	",
        status: "Completed",
        amount: "1800"

    },

    {
        key: "2",
        orderid: "002",
        brand:"Callaway",
        retailername: "Alok Singh",
        date: "08/05/2006 03:05:15 PM",
        status: "Rejected",
        amount: "1750"

    },

    {
        key: "3",
        orderid: "003",
        brand:"Ogio",
        retailername: "Jitendra Gupta	",
        date: "08/05/2006 03:05:15 PM",
        status: "Approved",
        amount: "4569"

    },
    {
        key: "4",
        orderid: "004",
        brand: "Travis Mathew",
        retailername: "Manish Sharma",
        date: "08/05/2006 04:05:15 PM",
        status: "Under Review",
        amount: "1200"

    },

];


    return (
        <>
        <div className="card card-custom mt-3">
            <div className="card-header">
                <h3 className="card-title">All Orders</h3>
            </div>

            <div className="card-body">
                <Table columns={column} dataSource={data} size="middle" />
            </div>
        </div>
         <Edit isEdit={isEdit} onClose={handleCloseEdit} />
         <View isView={isView} onCloseView={handleCloseView} />
         </>
    );
};

export default AllOrders;
