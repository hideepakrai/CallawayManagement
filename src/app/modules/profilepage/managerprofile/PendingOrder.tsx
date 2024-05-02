import React, { useState } from "react";

import { Table, Tooltip } from "antd";
import Edit from "./Edit";
import View from "./View"
import {getUserAccount} from "../../../slice/UserSlice/UserSlice"
import { useSelector, useDispatch } from "react-redux";
import {UserAccountModel,AllOrderss} from "../../model/useAccount/UserAccountModel"
import { Card } from "react-bootstrap";



const PendingOrder = () => {
    const getUserAccounts= useSelector(getUserAccount) as UserAccountModel;

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


    const handleview = () => {
        console.log("I am here");

    };

    // const column = [
    //     {
    //         title: " Order Id ",
    //         dataIndex: "orderid",
    //     },

    //     {
    //         title: "Brand",
    //         dataIndex: "brand",
    //     },

    //     {
    //         title: "Retailer Name",
    //         dataIndex: "retailername",
    //     },
    //     {
    //         title: "Date",
    //         dataIndex: "date",
    //     },


    //     {
    //         title: "Amount",
    //         dataIndex: "amount",
    //     },
    //     {
    //         title: "Status",
    //         dataIndex: "status",
    //     },


    //     {
    //         title: "Action",
    //         dataIndex: "action",
    //         key: 'x',
    //         render: () =>
    //             <span>
    //                 <span style={{ paddingRight: "9px", borderRight: "1px solid rgb(221, 221, 221)", cursor: "pointer" }}
    //                     onClick={() => handleEdit()}
    //                 >

    //                     <Tooltip title="Edit" placement="bottom">
    //                         <i className="bi bi-pencil-fill" ></i>
    //                     </Tooltip>
    //                 </span>

    //                 <span style={{ paddingLeft: "7px", paddingRight: "6px", borderRight: "1px solid rgb(221, 221, 221)", cursor: "pointer" }}
    //                  onClick={() => handleView()}
    //                 >

    //                     <Tooltip title="View" placement="bottom">
    //                     <i className="bi bi-arrow-up-right-square"></i>
    //                     </Tooltip>
    //                 </span>

    //                 <span style={{ paddingLeft: "8px", cursor: "pointer" }}  >
    //                     <Tooltip title="View Prodects" placement="bottom">

    //                         <i className="bi bi-box-arrow-up-right " ></i>
    //                     </Tooltip>
    //                 </span>



    //             </span>,
    //     },
    // ];
    // const data = [
    //     {
    //         key: "1",
    //         orderid: "001",
    //         brand:"Ogio",
    //         retailername: "Manish Gupta",
    //         date: "10/05/2006 05:10:15 PM",
    //         amount: "₹1800",
    //         status: "Completed"


    //     },

    //     {
    //         key: "2",
    //         orderid: "004",
    //         brand:"Travis Mathew",
    //         retailername: "Manish Sharma",
    //         date: "08/05/2006 04:05:15 PM	",
    //         amount: "₹1200",
    //         status: "Under Review"
    //     },

    // ];

    return (
        <>
            {/* <div >
                <div className="card card-custom">
                    <div className="card-header">
                        <h3 className="card-title">Pending Order </h3>
                    </div>

                    <div className="card-body ">
                        <Table columns={column} dataSource={data} size="middle" />
                    </div>

                </div>



            </div>

            <Edit isEdit={isEdit} onClose={handleCloseEdit} />



<View isView={isView} onCloseView={handleCloseView} /> */}

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
				<td>Edinburgh</td>
				<td>{item.attributes.createdAt}</td>
				<td>2011/04/25</td>
				<td>
                <span>
                   <span style={{ paddingRight: "9px", borderRight: "1px solid rgb(221, 221, 221)", cursor: "pointer" }}
                      onClick={() => handleEdit()}
                    >

                        <Tooltip title="Edit" placement="bottom">
                            <i className="bi bi-pencil-fill" ></i>
                        </Tooltip>
                    </span>

                    <span style={{ paddingLeft: "7px", paddingRight: "6px", borderRight: "1px solid rgb(221, 221, 221)", cursor: "pointer" }}
                     onClick={() => handleView()}
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


        </>
    );
};

export default PendingOrder;
