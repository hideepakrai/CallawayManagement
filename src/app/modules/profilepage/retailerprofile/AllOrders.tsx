import React from "react";
import { Table, Tooltip } from "antd";
const column = [
    //   {
    //     title: "Order Id",
    //     dataIndex: "orderid",
    //   },

    //   {
    //     title: "Status",
    //     dataIndex: "status",
    //   },

    //   {
    //     title: "Retailer",
    //     dataIndex: "Retailer",
    //   },
    //   {
    //     title: "Manager",
    //     dataIndex: "Manager",
    //   },
    //   {
    //     title: "Amount",
    //     dataIndex: "amount",
    //   },
    //   {
    //     title: "Date",
    //     dataIndex: "date",
    //   },


    //   {
    //     title: "Action",
    //     dataIndex: "action",
    //     key: 'x',
    //     render: () => <span> <span style={{paddingRight:"8px",  borderRight:"1px solid rgb(221, 221, 221)",}}>  <Tooltip   title="Edit" placement="bottom"> <i  class="icon icon-edit"></i></Tooltip></span> <span style={{padding:"0px 6px", }}> <Tooltip title="View" placement="bottom"> <i class="icon icon-map-popup-info"></i></Tooltip></span>

    //     {/* <span style={{paddingLeft:"1px" }}> <Tooltip title="Note" placement="bottom"> <i class="icon icon-copy"></i></Tooltip></span> */}
    //     </span> ,

    //   },

    // ];

    // const data = [
    //   {
    //     key: "1",
    //     orderid: "001",
    //     status: "Approved",
    //     Retailer: "Retailer 1",
    //     Manager: "Manish Gupta",
    //     date:"10/05/2006 05:10:15 PM",
    //     amount:"1800"

    //   },

    //   {
    //     key: "2",
    //     orderid: "002",
    //     status: "Completed",
    //     Retailer: "Retailer 2",
    //     Manager: "Alok Singh",
    //     date:"08/05/2006 03:05:15 PM",
    //     amount:"1750"

    //   },

    //    {
    //     key: "3",
    //     orderid: "004",
    //     status: "Rejected",
    //     Retailer: "Retailer 3",
    //     Manager: "Manish Sharma",
    //     date:"08/05/2006 04:05:15 PM",
    //     amount:"1200"

    //   },
    // ];

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
        render: () => <span> <span style={{ paddingRight: "8px", borderRight: "1px solid rgb(221, 221, 221)", }}>  <Tooltip title="Edit" placement="bottom"> <i className="icon icon-edit"></i></Tooltip></span> <span style={{ paddingLeft: "4px", }}> <Tooltip title="View" placement="bottom"> <i className="icon icon-map-popup-info"></i></Tooltip></span>

            {/* <span style={{paddingLeft:"4px" }}> <Tooltip title="View" placement="bottom"> <i class="icon icon-copy"></i></Tooltip></span> */}
        </span>,

    },

];

const data = [
    {
        key: "1",
        orderid: "001",
        retailername: "Manish Gupta",
        date: "10/05/2006 05:05:15 PM	",
        status: "Completed",
        amount: "1800"

    },

    {
        key: "2",
        orderid: "002",
        retailername: "Alok Singh",
        date: "08/05/2006 03:05:15 PM",
        status: "Rejected",
        amount: "1750"

    },

    {
        key: "3",
        orderid: "003",
        retailername: "Jitendra Gupta	",
        date: "08/05/2006 03:05:15 PM",
        status: "Approved",
        amount: "4569"

    },
    {
        key: "4",
        orderid: "004",
        retailername: "Manish Sharma",
        date: "08/05/2006 04:05:15 PM",
        status: "Under Review",
        amount: "1200"

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
