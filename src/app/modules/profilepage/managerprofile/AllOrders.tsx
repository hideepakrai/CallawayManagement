import React, { useState, useRef, useEffect } from "react";
import { Card, Table, Tooltip } from "antd";
import { useSelector } from "react-redux";
import type { TableColumnsType } from "antd";
import { getUserOrders } from "../../../slice/UserSlice/UserSlice";
import { BasicModelTravis } from "../../model/travis/TravisMethewModel";
import { AccountOrder, CartModel } from "../../model/CartOrder/CartModel";
import "./AllPendingOrder.css";
import Edit from "./Edit";
import UpdateStatus from "./UpdateStatus.tsx";
import OrderPdfFormate from "../../cartOrder/orderPdf/OrderPdfFormate.tsx";
import TravisPdfPrintOrder from "../pdfformate/TravisPdfPrintOrder.tsx";
import OgioPdfPrintOrder from "../pdfformate/OgioPdfPrintOrder.tsx";
import TravisExpandedRowRender from "../table/TravisExpandedRowRender.tsx";
import OgioExpandedRowRender from "../table/OgioExpandedRowRender.tsx";

const AllOrders = () => {
    const [status, setStatus] = useState<string>("");
    const [orderId, setOrderId] = useState<number | undefined>(undefined);
    const [isEdit, setIsEdit] = useState(false);
    const tableRef = useRef(null);
    const getUserOrder = useSelector(getUserOrders) as AccountOrder[];
    const [allPending, setAllPendingOrder] = useState<AccountOrder[]>([]);

    // Get all pending orders
    useEffect(() => {
        const allpend: AccountOrder[] = [];
        if (getUserOrder && getUserOrder.length > 0) {
            getUserOrder.forEach(item => {
                if (item.status !== "Pending") {
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

    const [expandedKeys, setExpandedKeys] = useState<number | null>(null);

    const handleExpand = (expanded: boolean, record: CartModel) => {
        setExpandedRowKeys([]);
        setExpandedKeys(null);
        if (record && record.items && record.items.length > 0 && record.id && expanded) {
            const allarray = JSON.parse(record.items);
            setExpandedRowKeys(allarray);
            setExpandedKeys(record.id);
        } else {
            setExpandedRowKeys([]);
            setExpandedKeys(null);
        }
    };

    const columns: TableColumnsType<CartModel> = [
        {
            title: "Order Id",
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
                switch (value) {
                    case 1:
                        brandName = "Callaway Hardgoods";
                        break;
                    case 2:
                        brandName = "Callaway Apparel";
                        break;
                    case 3:
                        brandName = "Travis Mathew";
                        break;
                    case 4:
                        brandName = "Ogio";
                        break;
                    default:
                        brandName = "Unknown Brand";
                }
                return <span>{brandName}</span>;
            },
        },
        {
            title: "Retailer name",
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
            render(value, record, index) {
                const discount = parseFloat(value);
                return discount.toFixed(2);
            },
        },
        {
            title: "Amount",
            dataIndex: "total_value",
            width: 100,
        },
        {
            title: "Status",
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
                            ></i>
                        </Tooltip>
                        <Tooltip title="Edit" placement="bottom">
                            <span
                                style={{ paddingRight: "5px", paddingLeft: "6px", borderRight: "1px solid rgb(221, 221, 221)", cursor: "pointer" }}
                                onClick={() => handleEdit(record.id)}
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
        if (record && record.brand_id) {
            switch (record.brand_id) {
                case 3:
                    return <TravisExpandedRowRender allarray={record.items ?? ""} id={record.id ?? 0} />;
                case 4:
                    return <OgioExpandedRowRender allarray={record.items ?? ""} id={record.id ?? 0} />;
                default:
                    return <div>No detailed view available</div>;
            }
        }
        return null;
    };

    const [recordPdf, setRecordPdf] = useState<AccountOrder | null>(null);
    const [isTravis, setIsTravis] = useState<boolean>(false);
    const [isOgio, setIsOgio] = useState<boolean>(false);
    const handleDownload = (record: AccountOrder) => {
        setRecordPdf(null);
        setIsTravis(false);
        setIsOgio(false);
        if (record.brand_id === 3) {
            setIsOgio(false);
            setIsTravis(true);
            setRecordPdf(record);
        } else if (record.brand_id === 4) {
            setIsOgio(true);
            setIsTravis(false);
            setRecordPdf(record);
        }
    };

    const handleResetTravis = () => {
        setIsTravis(false);
        setRecordPdf(null);
        setIsOgio(false);
    };

    return (
        <div className="cart-table">
            <Card title="All Orders">
                <Table<CartModel>
                    ref={tableRef}
                    className="cart-table-profile pb-3"
                    columns={columns}
                    dataSource={allPending.map((item) => ({ ...item, key: item.id! }))}
                    expandable={{
                        expandedRowRender,
                        onExpand: (expanded, record) => handleExpand(expanded, record),
                    }}
                    bordered
                    size="middle"
                    pagination={false}
                />
            </Card>

            <Edit isEdit={isEdit} onClose={handleCloseEdit} changeStatus={handleUpdateStatus} />

            {status != null && orderId !== undefined && <UpdateStatus status={status} orderId={orderId} />}

            {isTravis && recordPdf && <TravisPdfPrintOrder recordPdf={recordPdf} resetTravisPdf={handleResetTravis} />}
            {isOgio && recordPdf && <OgioPdfPrintOrder recordPdf={recordPdf} resetOgioPdf={handleResetTravis} />}
        </div>
    );
};

export default AllOrders;
