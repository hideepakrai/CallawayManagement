import React, { useEffect, useState } from "react";
import { Card, Table, Input, Button, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {BasicModelTravis} from "../model/travis/TravisMethewModel"
import {getRetailers} from "../../slice/retailer/RetailerSlice"
import {RetailerModel,Retailer}  from "../model/AccountType/retailer/RetailerModel"
import {getCurrentUser, getUserAccount, getUserRetailer} from "../.../../../slice/UserSlice/UserSlice"
import {RetailerData,UserAccountModel,RetailerModels,retailerData } from "../../modules/model/useAccount/UserAccountModel"
import "./CartHeader.css"
import ProgressCart from "./ProgressCart"

import {addTravisOrderDetails} from "../../slice/orderSlice/travis/Orderdetails"
type Props={
    reviewOrder: ()=>void,
    submitOrder:()=>void
    rejectOrder:()=>void,
    approveorder:()=>void
    completedOrder:()=>void
    note:()=>void
    
   
    
}
const CartHeader = ({reviewOrder,submitOrder,rejectOrder,note,approveorder,completedOrder}:Props) => {
    const dispatch= useDispatch()
    const [isNote, setIsNote] = useState(false);
    const handleNote = () => {
     note()
    };

    const getCurrentUsers= useSelector(getCurrentUser)
 const [isAvailable, setIsAvailable] =useState(false)
 const [isSubmit, setIsSubmit] =useState<boolean>(false)
  const [retailerName, setRetailerName]= useState<string>()
  const [retailerAddres, setRetailerAddress]= useState<string>()
  const [retailerId, setRetailerId]= useState<number>(0)
  const [retailerCity, setRetailerCity]= useState<string>()
  const [retailerUserId, setRetailerUserId]= useState<number>(0)
  const [GST, setGST]= useState<string>()

    const handleReview=()=>{
        
        
        if(retailerId!==0){
            reviewOrder()
            setIsAvailable(true)
        }
        else{
            alert("Please select retailer")
            setIsAvailable(false)
        }
       
    }

    const getUserRetailers= useSelector(getUserRetailer);
    console.log("getUserRetailer",getUserRetailers)
    // const getUserInfos= useSelector(getUserInfo) as RetailerData;
    
    const getUserAccounts= useSelector(getUserAccount) 
    console.log("getUserAccount",getUserAccounts)
     const handleChange=(value:number)=>{
       const allData= getUserRetailers?.filter(retailer=>retailer.id==value)
        console.log("allData",allData)
        if (allData && 
            allData.length>0 &&
            allData[0]?.gstin &&
            allData[0]?.id)  { 
           
            setRetailerAddress(allData[0].address); 
            // setRetailerCity(allData[0]?.attributes?.Location ?? '');
            setGST(allData[0]?.gstin);
            setRetailerId(allData[0]?.id)
            setRetailerName(allData[0]?.name)
            // setRetailerUserId(allData[0]?.user_id)
            dispatch(addTravisOrderDetails({

                retailerAddres: allData[0]?.address,
              
                retailerName: allData[0]?.name ??"",
                retailerId:allData[0]?.id,
                // retailerUserId:allData[0].user_id
              }))

            //   if(allData[0]?.attributes?.users_permissions_user?.data?.id)
            //     setRetailerUserId(allData[0]?.attributes?.users_permissions_user?.data?.id)
        } else {
            
            setRetailerAddress('');
            setRetailerCity('');
            setGST("");
            setRetailerId(0)
            setRetailerName("")
        }
       
        // if( allData.length>0 &&allData[0]?.attributes?.users_permissions_user?.data?.id)
        //  sendRetailerData(allData[0]?.attributes?.users_permissions_user?.data?.id
        // )
     }

    const handleSubmit = () => {
        console.log("sumit")
        setIsSubmit(true)
        submitOrder()
    }

    const handleRejectOrder=()=>{
        rejectOrder()
    }
     
    const handleApproveSubmit=()=>{
        approveorder()
    }

    const handleCompletedOrder=()=>{
        completedOrder()
    }
  return (
    <div>
    <div className='row'>
        <div className='col-12 ' >
            <div className="retailer_select row">
                <div className="col-6">
                    <h4 className=' pt-3 fs-6' style={{ width: "100px", minWidth: "100px" }}>
                        <a>Select Retailer</a>
                    </h4>

                    <Select
                        showSearch
                        placeholder="Select retailer"
                        optionFilterProp="children"
                        className="select-toogle"
                        style={{ marginBottom: 10 }}
                        onChange={handleChange}
                        options={getUserRetailers?.map((item: RetailerModel) => (
                            {
                                label: item.name ?? "",
                                value: item.id
                            }))}
                    />

                </div>
                <div className="mb-4 col-3">
                    <span className=' fs-5 fw-bold ' >
                        Manager
                    </span>

                    <h3 className=' fs-2 user-title' >
                        Shashi Kiran
                    </h3>
                </div>

                <div className="mb-4 col-3">
                    <span className=' fs-5 fw-bold ' >
                        Sales Representative
                    </span>

                    <h3 className=' fs-2 user-title' >
                        Manish Gupta
                    </h3>
                </div>

            </div>

            <div className="retailer_details mb-5 mt-3">
                <span style={{ marginRight: 10, marginTop: "6px" }}>
                    {" "}
                    <a style={{ color: "#000", fontSize: "14px" }}> <span style={{ fontWeight: 600, }}>Address City :</span> {retailerAddres} </a>
                </span>
                <span style={{ width: 100, marginRight: 20, borderRight: "1px solid #ddd", paddingRight: "10px", marginTop: "10px", }}>{retailerCity}</span>
                <span>
                    <a style={{ color: "#000", fontSize: "14px" }}> <span style={{ fontWeight: 600 }}> GSTIN NO. :</span> </a> {GST}
                </span>
            </div>
        </div>

        <div className='col-11 mb-3  pro-bar-list mt-4' >

    <ProgressCart
    checkAvailability={handleReview}
    submitorder={handleSubmit}
    approveOrder={handleApproveSubmit}
    rejectedOrder={handleRejectOrder}
    completedOrder={handleCompletedOrder}
    />

            {/* <span className='mx-3'  >
                <Button className="select-btn">
                    <i style={{ paddingRight: "6px", verticalAlign: "inherit", }}
                        className="bi bi-bag travis-icon"></i>View Pdf</Button>

                        

            </span>
            
        

            {isAvailable && <span className='mx-3'
                onClick={handleSubmit}
            >
                <Button className="select-btn"> <i style={{ paddingRight: "6px", verticalAlign: "inherit", }}
                    className="bi bi-file-earmark-text travis-icon"></i>Submit for Review</Button>
            </span>}


            <span className='mx-3'
                onClick={handleNote}
            >
                <Button className="select-btn mt-3"> <i style={{ paddingRight: "6px", verticalAlign: "inherit", }} className="bi bi-bag-check travis-icon"></i>Approve Order</Button>
            </span>

            <span className='mx-3'
                onClick={handleNote}
            >
                <Button className="select-btn mt-3"> <i style={{ paddingRight: "6px", verticalAlign: "inherit", }} className="bi bi-cart travis-icon"></i>      Reject Order</Button>
            </span>

            <span className='mx-3 '
                onClick={handleNote}
            >
                <Button className="select-btn mt-3"> <i style={{ paddingRight: "6px", verticalAlign: "inherit", }} className="bi bi-pencil-square travis-icon"></i>Add Note</Button>
            </span>

            <span className='mx-3'
                onClick={handleReview}
            >
                <Button className="select-btn mt-3 user-cart-btn"> <i style={{ paddingRight: "6px", verticalAlign: "inherit", }}
                    className="bi bi-file-earmark-text travis-icon"></i>Checking for availability</Button>
            </span> */}

        </div>


    </div>
</div>
  )
}

export default CartHeader