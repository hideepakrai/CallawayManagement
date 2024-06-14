import React, { useState } from "react";

import { Table, Tooltip } from "antd";
import Edit from "./Edit";
// import View from "./View"
import { getUserOrders } from "../../../slice/UserSlice/UserSlice"
import { useSelector, useDispatch } from "react-redux";
import { UserAccountModel, AllOrderss } from "../../model/useAccount/UserAccountModel"
import { Card } from "react-bootstrap";
import { ProductDetails, CartModel, AccountOrder } from "../../model/CartOrder/CartModel.ts"
import { addPendingOrder } from "../../../slice/orderSlice/travis/Orderdetails.tsx"
import UpdateStatus from "./UpdateStatus.tsx";
import "./PendingOrder.css"
const PendingOrder = () => {

    const dispatch = useDispatch()
    const getUserOrder = useSelector(getUserOrders) as AccountOrder[]
    const [orderId, setOrderId] = useState<number>()
    const [isEdit, setIsEdit] = useState(false);
    const handleEdit = (id: number | undefined) => {
        if (id !== undefined) {
            setIsEdit(true);
            setOrderId(id)
        }
    };

    const handleCloseEdit = () => {
        setIsEdit(false);
    };

    // view

    const [allProducts, setAllProducts] = useState<AccountOrder>()
    const [isView, setIsView] = useState(false);
    const handleView = (allProduct: unknown) => {
        setIsView(true);
        //setAllProducts(allProduct);

        dispatch(addPendingOrder({
            pendingOrders: allProduct
        }))

    };

    const handleCloseView = () => {
        setIsView(false);
    };


    const handleview = () => {

    };

    const [status, setStatus] = useState<string>("")
    const handleUpdateStatus = (status: string) => {
        setStatus(status)
    }

    return (
        <>

            <Card>
                <div className="table-responsive mb-6">
                    <label><h3 className="mx-6 my-7">Pending Order </h3></label>


                    <table className="table table-striped gy-7 gs-7 table-order"  >

                        <thead className="table-head-order" >
                            <tr className="fw-semibold fs-6 text-gray-800 border-bottom border-gray-200">
                                <th>Order Id </th>
                                <th>Brand</th>
                                <th>Retailer Name </th>
                                <th>Date</th>
                                <th>Amount</th>
                                <th>Action </th>
                            </tr>
                        </thead>
                        <tbody>
                            {getUserOrder &&
                                getUserOrder?.length > 0 &&
                                getUserOrder?.map((item) => {
                                    if (item && item.status === "Pending") {

                                        return (
                                            <tr>
                                                <td>{item.id}</td>
                                                <td>{item.brand_id === 4 ? "Ogio" : "TravisMathew"}</td>
                                                <td>{item.retailer_id}</td>
                                                {/* <td>{item.created_at}</td> */}
                                                <td>
                                                    <div className='d-flex justify-content-start flex-column'>
                                                        <a href='#' className='text-gray-900 fw-bold text-hover-primary fs-6'>
                                                            24-05-2024
                                                        </a>
                                                        <span className='text-muted fw-semibold text-muted d-block fs-7'>
                                                            T06:01:16.000Z
                                                        </span>
                                                    </div>
                                                </td>

                                                <td>{item.total_value}</td>

                                                <td>
                                                    <span>

                                                        <span style={{ paddingRight: "9px", borderRight: "1px solid rgb(221, 221, 221)", cursor: "pointer" }}
                                                        // onClick={() => handleEdit(item.id)}
                                                        >
                                                            <Tooltip title="Download" placement="bottom">
                                                                <i className="bi bi-download"></i>
                                                            </Tooltip>
                                                        </span>
                                                        <span style={{ paddingLeft: "7px", paddingRight: "6px", borderRight: "1px solid rgb(221, 221, 221)", cursor: "pointer" }}
                                                            onClick={() => handleView(item)}
                                                        >
                                                            <Tooltip title="View" placement="bottom">
                                                                {/* <i className="bi bi-arrow-up-right-square"></i> */}
                                                                <i className="bi bi-box-arrow-up-right"></i>
                                                            </Tooltip>
                                                        </span>


                                                        <span style={{ paddingRight: "5px", paddingLeft: "6px", borderRight: "1px solid rgb(221, 221, 221)", cursor: "pointer" }}
                                                            onClick={() => handleEdit(item.id)}

                                                        >
                                                            <Tooltip title="Edit" placement="bottom">
                                                                <i className="bi bi-pencil-fill" ></i>
                                                            </Tooltip>
                                                        </span>








                                                    </span>
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

            {/* <View
                isView={isView}

                onCloseView={handleCloseView}
            /> */}
            <Edit
                isEdit={isEdit}

                onClose={handleCloseEdit}
                changeStatus={handleUpdateStatus}
            />


            {status != null && orderId &&
                <UpdateStatus
                    status={status}
                    orderId={orderId}
                />}


        </>
    );
};

export default PendingOrder;
