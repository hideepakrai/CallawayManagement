import React, { useState, useRef, useEffect } from "react";
import { Card, Table, Tooltip } from "antd";
import { useSelector } from "react-redux";
import type { TableColumnsType } from "antd";
import { getUserOrders } from "../../../slice/UserSlice/UserSlice";
import { BasicModelTravis } from "../../model/travis/TravisMethewModel";
import { AccountOrder, CartModel } from "../../model/CartOrder/CartModel";
import "./AllPendingOrder.css";
import Edit from "./Edit";
import UpdateStatus from "./UpdateStatus";
import OrderPdfFormate from "../../cartOrder/orderPdf/OrderPdfFormate";
import { isNull } from "util";
import TravisPdfPrintOrder from "../pdfformate/TravisPdfPrintOrder";

const AllPendingOrder = () => {
    const [status, setStatus] = useState<string>("");
    const [orderId, setOrderId] = useState<number>();
    const [isEdit, setIsEdit] = useState(false);
    const tableRef = useRef(null);
    const getUserOrder = useSelector(getUserOrders) as AccountOrder[];
    const [allPending, setAllPendingOrder] = useState<AccountOrder[]>([]);

    // get All pending orders
    useEffect(() => {
        const allpend: AccountOrder[] = [];
        if (getUserOrder && getUserOrder.length > 0) {
            getUserOrder.forEach(item => {
                if (item.status != "Complete") {
                    allpend.push(item);
                }
            });
        }
        setAllPendingOrder(allpend);
    }, [getUserOrder]);

    const [expandedRowKeys, setExpandedRowKeys] = useState<BasicModelTravis[]>([]);

    const handleUpdateStatus = (status: string) => {
        setStatus(status);
    };

    const handleEdit = (id: number | undefined) => {
        if (id !== undefined) {
            setIsEdit(true);
            setOrderId(id);
        }
    };

    const handleCloseEdit = () => {
        setIsEdit(false);
    };

    const handleExpand = (record: CartModel) => {
        if (record && record.items && record.items.length > 0 && record.id) {
            const allarray = JSON.parse(record.items);
            setExpandedRowKeys(allarray);
        }
    };

    const columns: TableColumnsType<CartModel> = [
        {
            title: "Order Id ",
            dataIndex: "id",
            width: 50,
        },
        {
            title: 'Brand',
            dataIndex: 'brand_id',
            key: 'brand_id',
            width: 100,
            render: (value) => {
                let brandName;
                if (value === 3) {
                    brandName = "Travis Mathew";
                } else {
                    brandName = "Ogio"; // Default value or other brand name
                }

                return <span>{brandName}</span>; // Render the brand name inside a span
            },
        },
        {
            title: "Retailer name ",
            dataIndex: "retailer_name",
            width: 150,
        },

        {
            title: "Order date",
            dataIndex: "created_at",
            width: 150,
            render: (value) => {
                const date = new Date(value);
                return date.toUTCString();
            },
        },

        {
            title: "Last Update",
            dataIndex: "updated_at",
            width: 100,
            render: (value) => {
                const date = new Date(value);
                return date.toUTCString();
            },
        },

      

        
        {
            title: "Discount",
            dataIndex: "discount_amount",
            width: 100,
        },


        {
            title: "Amount",
            dataIndex: "total_value",
            width: 100,
        },

        {
            title: "Status	",
            dataIndex: "status",
            width: 100,

        },


        {
            title: "Action",
            width: 70,
            render: (_, record) => (
                <>
                    <span>
                        <Tooltip title="Download" placement="bottom">
                            <i
                                className="bi bi-download"
                                style={{
                                    paddingRight: "9px",
                                    borderRight: "1px solid rgb(221, 221, 221)",
                                    cursor: "pointer",
                                }}
                                onClick={() => handleDownload(record)}
                            ></i>
                        </Tooltip>
                        <Tooltip title="View" placement="bottom">
                            <i
                                className="bi bi-box-arrow-up-right"
                                style={{
                                    paddingLeft: "7px",
                                    paddingRight: "6px",
                                    borderRight: "1px solid rgb(221, 221, 221)",
                                    cursor: "pointer",
                                }}
                                onClick={() => handleExpand(record)}
                            ></i>
                        </Tooltip>
                        <Tooltip title="Edit" placement="bottom">
                            <span
                                style={{ paddingRight: "5px", paddingLeft: "6px", borderRight: "1px solid rgb(221, 221, 221)", cursor: "pointer" }}
                                onClick={() => handleEdit(record.id)} // Pass the id directly to handleEdit
                            >
                                <i className="bi bi-pencil-fill"></i>
                            </span>
                        </Tooltip>
                    </span>
                </>
            ),
        },
    ];



    const expandedRowRender = (record: CartModel) => {
        const subcolumns: TableColumnsType<BasicModelTravis> = [
            {
                title: "SKU ",
                dataIndex: "sku",
                key: "sku",
                width: 390,
                fixed: "left",
            },
            {
                title: "Style",
                dataIndex: "style_code",
                key: "style_code",
                width: 200,
            },
            {
                title: "Size",
                dataIndex: "size",
                key: "size",
                width: 170,
            },
            {
                title: "Qty88",
                dataIndex: "stock_88",
                key: "stock_88",
                width: 150,
                fixed: "right",
            },
            {
                title: "Qty90",
                dataIndex: "stock_90",
                key: "stock_90",
                width: 150,
                fixed: "right",
            },
            {
                title: "Qty",
                dataIndex: "TotalQty",
                key: "TotalQty",
                width: 50,
                fixed: "right",
            },
            {
                title: "MRP",
                dataIndex: "mrp",
                key: "mrp",
                width: 80,
                fixed: "right",
            },
            {
                title: "Amount",
                dataIndex: "Amount",
                key: "Amount",
                width: 100,
                fixed: "right",
            },
        ];

        return (
            <Table
                className="table-profile"
                columns={subcolumns}
                dataSource={expandedRowKeys.map((item) => ({
                    ...item,
                    key: item.sku,
                }))}
                pagination={false}
                size="middle"
            />
        );
    };

    const [recordPdf, setRecordPdf] = useState<AccountOrder | null>(null);
     const [isTravis, setIsTravis]= useState<boolean>(false);
     const [isOgio, setIsOgio]= useState<boolean>(false);
     const [isOrder, setIsOrder]= useState<boolean>(false);
    const handleDownload = (record: AccountOrder) => {
        console.log("record: " , record)
        setRecordPdf(null)
        setIsTravis(false)
        setIsOgio(false)
        if(record.brand_id  &&record.brand_id===3){
            setIsOgio(false)
            setIsTravis(true)
        setRecordPdf(record);
    } 
    else if(record.brand_id && record.brand_id===4){
        setIsOgio(true)
            setIsTravis(false)
        setRecordPdf(record);
    }
    }

   
    
    const handleRecordPdf=()=>{
        setRecordPdf(null)
    }

    const handleResetTravis=()=>{
        setIsTravis(false)
        setRecordPdf(null)
    }
    return (
        <>
            <div className="cart-table mb-5">
                <Card title="Pending Orders ">
                    <Table<CartModel>
                        ref={tableRef}
                        className="cart-table-profile pb-6"
                        columns={columns}
                        dataSource={allPending.map((item) => ({
                            ...item,
                            key: item.id !== undefined ? item.id : -1, // Ensure key is always a number
                        }))}
                        expandable={{
                            expandedRowRender,
                            onExpand: (expanded, record) => handleExpand(record),
                        }}
                        bordered
                        size="middle"
                        pagination={false}
                    />
                </Card>

                <Edit
                    isEdit={isEdit}
                    onClose={handleCloseEdit}
                    changeStatus={handleUpdateStatus}
                />

                {status != null && orderId && (
                    <UpdateStatus
                        status={status}
                        orderId={orderId}
                    />
                )}
            </div>
            {/* {recordPdf && <OrderPdfFormate
                recordPdf={recordPdf}
                resetSelectedRow={handleRecordPdf}
            />} */}

            { isTravis &&
            recordPdf &&
            <TravisPdfPrintOrder
            recordPdf={recordPdf}
            resetTravisPdf={handleResetTravis}
            />
            }

            
        </>
    );
};

export default AllPendingOrder;
