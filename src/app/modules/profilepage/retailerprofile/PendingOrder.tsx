import React from "react";

import { Table } from "antd";
import { Tooltip } from 'antd';





const PendingOrder = () => {


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
            render: () => <span
            >  <span style={{ paddingRight: "8px", borderRight: "1px solid rgb(221, 221, 221)", }}>  <Tooltip title="Edit" placement="bottom"> <i className="icon icon-edit"></i></Tooltip></span>
                <span style={{ paddingLeft: "4px" }} > <Tooltip title="View" placement="bottom"
                > <i className="icon icon-map-popup-info" onClick={handleview} ></i></Tooltip>
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
        <div >
            <div className="card card-custom">
                <div className="card-header">
                    <h3 className="card-title">Pending Order</h3>
                </div>

                <div className="card-body ">
                    <Table columns={column} dataSource={data} size="middle"/>
                </div>

            </div>

        </div>



    );
};

export default PendingOrder;
