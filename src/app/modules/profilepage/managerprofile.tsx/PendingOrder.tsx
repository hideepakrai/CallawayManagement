import React, { useState } from "react";

import { Table } from "antd";
import { Tooltip } from 'antd';
import Edit from "../managerprofile.tsx/action/Edit";




const PendingOrder = () => {
    const [isEdit, setIsEdit] = useState(false);
    const handleEdit = () => {
        setIsEdit(true);
    };
    const handleCloseEdit = () => {
        setIsEdit(false);
    };


    const handleview = () => {
        console.log("I am here");

    };

    const column = [
        {
            title: " Order Id ",
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
                <span>
                    <span style={{ paddingRight: "9px", borderRight: "1px solid rgb(221, 221, 221)", cursor: "pointer" }}
                        onClick={() => handleEdit()}
                    >

                        <Tooltip title="Edit" placement="bottom">
                            <i className="bi bi-pencil-fill" ></i>
                        </Tooltip>
                    </span>

                    <span style={{ paddingLeft: "7px", paddingRight: "6px", borderRight: "1px solid rgb(221, 221, 221)", cursor: "pointer" }}>

                        <Tooltip title="Edit" placement="bottom">
                            <i className="bi bi-pencil-fill" ></i>
                        </Tooltip>
                    </span>

                    <span style={{ paddingLeft: "8px", cursor: "pointer" }}  >
                        <Tooltip title="View" placement="bottom">

                            <i className="bi bi-box-arrow-up-right " onClick={handleview}></i>
                        </Tooltip>
                    </span>



                </span>,
        },
    ];
    const data = [
        {
            key: "1",
            orderid: "001",
            retailername: "Manish Gupta",
            date: "10/05/2006 05:10:15 PM",
            amount: "₹1800",
            status: "Completed"


        },

        {
            key: "2",
            orderid: "004",
            retailername: "Manish Sharma",
            date: "08/05/2006 04:05:15 PM	",
            amount: "₹1200",
            status: "Under Review"
        },




    ];

    return (
        <>
            <div >
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
        </>
    );
};

export default PendingOrder;
