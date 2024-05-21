import React, { useState, useRef } from "react";
import { Card, Table, Tooltip } from "antd";
import { useSelector } from "react-redux";
import type { TableColumnsType } from "antd";
import { getUserOrders } from "../../../slice/UserSlice/UserSlice";
import { BasicModelTravis } from "../../model/travis/TravisMethewModel";
import { AccountOrder, CartModel } from "../../model/CartOrder/CartModel";
import "./AllPendingOrder.css";
import Edit from "./Edit";
import UpdateStatus from "./UpdateStatus.tsx";

const AllPendingOrder = () => {
    const [status, setStatus] = useState<string>("");
    const [orderId, setOrderId] = useState<number>();
    const [isEdit, setIsEdit] = useState(false);
    const tableRef = useRef(null);
    const getUserOrder = useSelector(getUserOrders) as AccountOrder[];
    const [expandedRowKeys, setExpandedRowKeys] = useState<BasicModelTravis[]>([]);

    const handleUpdateStatus = (status: string) => {
        console.log(status);
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
        console.log("handleExpand", record);
        if (record && record.items && record.items.length > 0 && record.id) {
            const allarray = JSON.parse(record.items);
            setExpandedRowKeys(allarray);
        }
    };

    const columns: TableColumnsType<CartModel> = [
        {
            title: "Order Id",
            dataIndex: "id",
            width: 100,
        },
        {
            title: "Brand",
            dataIndex: "brand_id",
            width: 100,
        },
        {
            title: "Retailer name",
            dataIndex: "retailer_id",
            width: 100,
        },
        {
            title: "Order date",
            dataIndex: "created_at",
            width: 100,
        },
        {
            title: "Amount",
            dataIndex: "total_value",
            width: 100,
        },
        {
            title: "Action",
            width: 100,
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
                                }}></i>
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
                                onClick={() => handleExpand(record)}></i>
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
                dataSource={expandedRowKeys?.map((item) => ({
                    ...item,
                    key: item.sku,
                }))}
                pagination={false}
                size="middle"
            />
        );
    };

    return (
        <div className="cart-table">
            <Card>
                <Table<CartModel>
                    ref={tableRef}
                    className="cart-table-profile"
                    columns={columns}
                    dataSource={getUserOrder.map((item) => ({ ...item, key: item.id }))}
                    
                    expandable={{
                        expandedRowRender,
                        onExpand: (expanded, record) => handleExpand(record),
                    }}

                    bordered
                    size="middle"
                    scroll={{ x: "100%", y: "auto" }}
                    pagination={{
                        position: ["topRight", "bottomRight"],
                        defaultPageSize: 20,
                    }}
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
    );
};

export default AllPendingOrder;