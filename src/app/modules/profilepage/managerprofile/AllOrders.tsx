import React, { useState, useRef, useEffect } from "react";
import { Card, Table, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
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
import SoftGoodsExpandedRowRender from "../table/SoftGoodsExpandedRowRender.tsx";
import HardGoodsExpandedRowRender from "../table/HardGoodExpandedRowRender.tsx";
import SoftGoodPdfPrintOrder from "../pdfformate/SoftGoodPdfPrintOrder.tsx";
import DeleteOrder from "./DeleteOrder.tsx";
import { LoadingStop } from "../../../slice/loading/LoadingSlice.tsx";

const AllOrders = () => {
    const [status, setStatus] = useState<string>("");
    const [orderId, setOrderId] = useState<number | undefined>(undefined);
    const [isEdit, setIsEdit] = useState(false);
    const tableRef = useRef(null);
    const getUserOrder = useSelector(getUserOrders) as AccountOrder[];
    const [allPending, setAllPendingOrder] = useState<AccountOrder[]>([]);
    const[ selectedOrder, setSelectedOrder]= useState<CartModel>()
    const dispatch= useDispatch()

    // Get all pending orders
    useEffect(() => {
        const allpend: AccountOrder[] = [];
        if (getUserOrder && getUserOrder.length > 0) {
            getUserOrder.forEach(item => {
                if (item.status === "complete" ||item.status === "Complete") {
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

  const handleEdit = (record:CartModel) => {
        if (record) {
            setIsEdit(true);
            setSelectedOrder(record)
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
                        brandName = "Callaway";
                        break;
                    case 2:
                        brandName = "Callaway";
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
            title: "Retailer name  ",
            dataIndex: "retailer_name",
            width: 150,
        },
        {
            title: "Order date",
            dataIndex: "created_at",
            width: 130,
            render: (value) => {
                const date = new Date(value);
                
                // Options for the date part
                const dateCall: Intl.DateTimeFormatOptions = { 
                    weekday: 'short', 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric',
                    timeZone: 'Asia/Kolkata'
                };
        
                // Options for the time part
                const timeCall: Intl.DateTimeFormatOptions = { 
                    hour: '2-digit', 
                    minute: '2-digit', 
                    second: '2-digit', 
                    hour12: true, 
                    timeZone: 'Asia/Kolkata' 
                };
        
                const formattedDate = date.toLocaleDateString('en-US', dateCall);
                const formattedTime = date.toLocaleTimeString('en-US', timeCall);
        
                //return `${formattedDate}  ${formattedTime}`;
                return(<div className="datecalllist">

                  <span className="dateCall"> {formattedDate}  </span>
                  <span className="timeCall text-gray-600"> {formattedTime}  </span>

                  </div>

                )
            },
        },
        {
            title: "Last Update",
            dataIndex: "updated_at",
            width: 115,
            render: (value) => {
                const date = new Date(value);
                
                // Options for the date part
                const dateCall: Intl.DateTimeFormatOptions = { 
                    weekday: 'short', 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric',
                    timeZone: 'Asia/Kolkata'
                };
        
                // Options for the time part
                const timeCall: Intl.DateTimeFormatOptions = { 
                    hour: '2-digit', 
                    minute: '2-digit', 
                    second: '2-digit', 
                    hour12: true, 
                    timeZone: 'Asia/Kolkata' 
                };
        
                const formattedDate = date.toLocaleDateString('en-US', dateCall);
                const formattedTime = date.toLocaleTimeString('en-US', timeCall);
        
                //return `${formattedDate}  ${formattedTime}`;
                return(<div className="datecalllist">

                  <span className="dateCall"> {formattedDate}  </span>
                  <span className="timeCall text-gray-600"> {formattedTime}  </span>

                  </div>

                )
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
                                onClick={() => handleEdit(record)}
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
                 case 1:
                    return <HardGoodsExpandedRowRender allarray={record.items ?? ""} id={record.id ?? 0} />;
                case 2:
                    return <SoftGoodsExpandedRowRender allarray={record.items ?? ""} id={record.id ?? 0} />;
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
    const [isSoftGood, setIsSoftGood] = useState<boolean>(false);
    const [isOgio, setIsOgio] = useState<boolean>(false);
    const handleDownload = (record: AccountOrder) => {
        setRecordPdf(null);
        setIsTravis(false);
        setIsOgio(false);
        if (record.brand_id === 3) {
            setIsOgio(false);
            setIsSoftGood(false)
            setIsTravis(true);
            setRecordPdf(record);
        } else if (record.brand_id === 4) {
            setIsOgio(true);
            setIsTravis(false);
            setIsSoftGood(false)
            setRecordPdf(record);
        }
        else if (record.brand_id === 2 ||record.brand_id==1) {
            setIsOgio(false);
            setIsTravis(false);
            setIsSoftGood(true)
            setRecordPdf(record);
        }
    };

    const handleResetTravis = () => {
        setIsTravis(false);
        setRecordPdf(null);
        setIsOgio(false);
    };


    const handleResetSoftGood=()=>{
        setIsTravis(false);
        setRecordPdf(null);
        setIsOgio(false);
        setIsSoftGood(false)
    } 
    
const [isDeleteOrder, setIsDeleteOder]= useState<boolean>(false)
const handleDeleteOrder=()=>{
    setIsDeleteOder(true)

}

const [order_id, setOrder_id] = useState<number | undefined>(undefined);
const handleResetDeleteOrder=()=>{
    setIsDeleteOder(false)
    setOrder_id(undefined)
    dispatch(LoadingStop())
    setIsEdit(false)

    
}
       return (
        <div className="cart-table mb-10 mt-3 mx-4">
            <Card className="cart-order-section" title="Completed Orders">
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
// scroll={{ x: "100%", y: "auto" }}
                    pagination={{
                        position: ['topRight', 'bottomRight'], // Positions pagination at the top and bottom
                        defaultPageSize: 20
                      }}
                />
            </Card>

           {selectedOrder && <Edit 
             selectedOrder={selectedOrder}
            isEdit={isEdit} 
            onClose={handleCloseEdit} 
            changeStatus={handleUpdateStatus}
            deletedYes={handleDeleteOrder}
            />}

            {status != null && orderId !== undefined && <UpdateStatus status={status} orderId={orderId} note={""} resetOrder={function (): void {
                   throw new Error("Function not implemented.");
               } } />}

            {isTravis && recordPdf && <TravisPdfPrintOrder recordPdf={recordPdf} resetTravisPdf={handleResetTravis} />}
            {isOgio && recordPdf && <OgioPdfPrintOrder recordPdf={recordPdf} resetOgioPdf={handleResetTravis} />}
            {isSoftGood && recordPdf && <SoftGoodPdfPrintOrder 
            recordPdf={recordPdf}    
             resetSoftGoodPdf={handleResetSoftGood} />}

{isDeleteOrder &&order_id &&
            <DeleteOrder
            orderId={order_id}
            resetDeleteOrder={handleResetDeleteOrder}
            />}
        </div>
    );
};

export default AllOrders;
