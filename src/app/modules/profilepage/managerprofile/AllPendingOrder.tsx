import React, { useState, useRef, useEffect } from "react";
import { Card, Table, Tooltip } from "antd";
import { useSelector, useDispatch } from "react-redux";
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
import OgioPdfPrintOrder from "../pdfformate/OgioPdfPrintOrder";
import TravisExpandedRowRender from "../table/TravisExpandedRowRender.tsx";
import OgioExpandedRowRender from "../table/OgioExpandedRowRender.tsx";
import SoftGoodsExpandedRowRender from "../table/SoftGoodsExpandedRowRender.tsx";
import HardGoodsExpandedRowRender from "../table/HardGoodExpandedRowRender.tsx";
import SoftGoodPdfPrintOrder from "../pdfformate/SoftGoodPdfPrintOrder.tsx";
import { LoadingStop } from "../../../slice/loading/LoadingSlice.tsx";
import DeleteOrder from "./DeleteOrder.tsx";


const AllPendingOrder = () => {
    const [status, setStatus] = useState<string | undefined>(undefined);
    const [orderId, setOrderId] = useState<number>();
    const [isEdit, setIsEdit] = useState(false);
    const tableRef = useRef(null);
    const dispatch= useDispatch()
    const getUserOrder = useSelector(getUserOrders) as AccountOrder[];
    const [allPending, setAllPendingOrder] = useState<AccountOrder[]>([]);
    const[ selectedOrder, setSelectedOrder]= useState<CartModel>()
    // get All pending orders
    useEffect(() => {
        const allpend: AccountOrder[] = [];
        if (getUserOrder && getUserOrder.length > 0) {
            getUserOrder.forEach(item => {
                if (item.status != "Complete" ) {
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

    const [order_id, setOrder_id] = useState<number | undefined>(undefined);
    const [note, setnotes] = useState<string | undefined>(undefined);
    const handleEdit = (record:CartModel) => {
        if (record && record.id &&record.id!=undefined && record.note) {
            setOrder_id(record.id)
            setIsEdit(true);
            setSelectedOrder(record)
            setnotes(record.note)
        }
    };


    const handleResetOrder=()=>{
        dispatch(LoadingStop())
        setOrder_id(undefined);
        setStatus(undefined);
        setnotes(undefined);
    }

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
            title: "Retailer Name ",
            dataIndex: "retailer_details",
            width: 150,
            render:(value, record)=>{
               
             
                  

                    if (value !== "") {
                        const retailer = JSON.parse(value);
                        return (
                            <p className="pt-4" style={{fontSize:"14px"}}>{retailer.name}</p>
                        );
                    }
            
                    return "no record"
            }
        },

        // {
        //     title: "Order date",
        //     dataIndex: "created_at",
        //     width: 150,
        //     render: (value) => {
        //         const date = new Date(value);
        //         return date.toUTCString();
        //     },
        // },
        {
            title: "Order Date",
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
            width: 110,
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
        },


        {
            title: "Amount",
            dataIndex: "total_value",
            width: 100,
        },

        // {
        //     title: "Status	",
        //     dataIndex: "status",
        //     width: 100,
        //     render: (value, record) => {
        //         const valSub = value
        //         console.log("c",value)
        //         return(
        //          valSub
               
                   
        //         )
        //     }

        // },
        {
            title: "Status",
            dataIndex: "status",
            width: 100,
            render: (value, record) => {
                const valSub = value;
              //  console.log("c", value);
        
                if (valSub === "submitted") {
                    return "Submitted";
                }
        
                return valSub;
            }
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
{/*                         
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
                        </Tooltip> */}


                        <Tooltip title="Edit" placement="bottom">
                            <span
                                style={{ paddingRight: "5px", paddingLeft: "6px", borderRight: "1px solid rgb(221, 221, 221)", cursor: "pointer" }}
                                onClick={() => handleEdit(record)} // Pass the id directly to handleEdit
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
     const [isTravis, setIsTravis]= useState<boolean>(false);
     const [isSoftGood, setIsSoftGood]= useState<boolean>(false);
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
            setIsSoftGood(false)
        setRecordPdf(record);
    } 
    else if(record.brand_id && record.brand_id===4){
        setIsOgio(true)
            setIsTravis(false)
            setIsSoftGood(false)
        setRecordPdf(record);
    }
    else if(record.brand_id && record.brand_id===2 ||record.brand_id===1){
        setIsOgio(false)
            setIsTravis(false)
            setIsSoftGood(true)
        setRecordPdf(record);
    }
    }

   
    
    const handleRecordPdf=()=>{
        setRecordPdf(null)
    }

    const handleResetTravis=()=>{
        setIsTravis(false)
        setRecordPdf(null)
        setIsOgio(false)
    }

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
const handleResetDeleteOrder=()=>{
    setIsDeleteOder(false)
    setOrder_id(undefined)
    dispatch(LoadingStop())
    setIsEdit(false)

    
}
    return (
        <>
            <div className="cart-table mb-10 mt-3 mx-4">
                <Card className="cart-order-section" title="Pending Orders ">
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
                        // scroll={{ x: "100%", y: "auto" }}
                        pagination={{
                            position: ['topRight', 'bottomRight'], // Positions pagination at the top and bottom
                            defaultPageSize: 200,
                            showTotal: (total) => <span className="ant-pagination-total-text ">Total <span className='total-page '> <i> {total} </i></span> items</span>,
                             showSizeChanger: true, // Show page size changer
                            pageSizeOptions: ['100', '200', '300', '400', '500', '600', '1000'], // Page size options
                          }}

                    />
                    
                </Card>

             { selectedOrder && <Edit
                    isEdit={isEdit}
                    selectedOrder={selectedOrder}
                    onClose={handleCloseEdit}
                    changeStatus={handleUpdateStatus}
                    deletedYes={handleDeleteOrder}
                />}

                {status != null && order_id && note && (
                    <UpdateStatus
                        status={status}
                        orderId={order_id}
                        note={note}
                        resetOrder={handleResetOrder}
                    />
                )}
            </div>

            {/* delete order */}
            {isDeleteOrder &&order_id &&
            <DeleteOrder
            orderId={order_id}
            resetDeleteOrder={handleResetDeleteOrder}
            />}
          

            { isTravis &&
            recordPdf &&
            <TravisPdfPrintOrder
            recordPdf={recordPdf}
            resetTravisPdf={handleResetTravis}
            />
            }
            { isOgio &&
            recordPdf &&
            <OgioPdfPrintOrder
            recordPdf={recordPdf}
            resetOgioPdf={handleResetTravis}
            />
            }
           {isSoftGood && recordPdf && <SoftGoodPdfPrintOrder 
            recordPdf={recordPdf}    
             resetSoftGoodPdf={handleResetSoftGood} />}

            
        </>
    );
};

export default AllPendingOrder;
