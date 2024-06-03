import React, { useEffect, useState } from "react";
import { Card, Table, Input, Button, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BasicModelTravis } from "../model/travis/TravisMethewModel"
import { getRetailers } from "../../slice/retailer/RetailerSlice"
import { RetailerModel, Retailer } from "../model/AccountType/retailer/RetailerModel"
import { getCurrentUser, getUserAccount, getUserProfile, getUserRetailer } from "../.../../../slice/UserSlice/UserSlice"
import { RetailerData, UserAccountModel, RetailerModels, retailerData } from "../../modules/model/useAccount/UserAccountModel"
import "./CartHeader.css"
import ProgressCart from "./ProgressCart"

import { addTravisOrderDetails } from "../../slice/orderSlice/travis/Orderdetails"
import { getActiveOrdertab } from "../../slice/activeTabsSlice/ActiveTabSlice";
import { addTravisReatailerDetails, getTravisRetailerDetail } from "../../slice/allProducts/TravisMethewSlice";
import { addOgioReatailerDetails, getOgioRetailerDetail } from "../../slice/allProducts/OgioSlice";
import UpdateTravisRetailerAddress from "./brand/travisMethew/UpdateTravisRetailerAddress";
import UpdateOgioRetailerAddress from "./brand/ogio/UpdateOgioRetailerAddress";
type Props = {
    reviewOrder: () => void,
    submitOrder: () => void
    rejectOrder: () => void,
    approveorder: () => void
    completedOrder: () => void
    note: () => void



}
const CartHeader = ({ reviewOrder, submitOrder, rejectOrder, note, approveorder, completedOrder }: Props) => {
    const dispatch = useDispatch()
    const [isNote, setIsNote] = useState(false);
   
   const getUserProfiles= useSelector(getUserProfile)
    const getCurrentUsers = useSelector(getCurrentUser)
    const [isAvailable, setIsAvailable] = useState(false)
    const [isSubmit, setIsSubmit] = useState<boolean>(false)
    const [retailerName, setRetailerName] = useState<string>()
    const [retailerAddres, setRetailerAddress] = useState<string>()
    const [retailerId, setRetailerId] = useState<number|null>(null)
    const [retailerCity, setRetailerCity] = useState<string>()
    const [retailerUserId, setRetailerUserId] = useState<number>(0)
    const [GST, setGST] = useState<string>()
    const [salesRepName, setSalesRepName] = useState<string>()
    const [MangerName, setManagerName] = useState<string>("")
    const [isTravis, setIsTravis] = useState<boolean>(false)
    const [isOgio, setIsOgio] = useState<boolean>(false)
    useEffect(()=>{
        if(getUserProfiles && getUserProfiles.length > 0){
            getUserProfiles.map(item=>{
                if(item.role==="Sales Representative"){
                    setSalesRepName(item.name)
                } 
                 if(item.role==="Manager" && item.name){
                    setManagerName(item.name)

                 }
            })

            if(getCurrentUsers && getCurrentUsers.role==="Manager" &&getCurrentUsers.name){
                setManagerName(getCurrentUsers.name)
            }
            if(getCurrentUsers && getCurrentUsers.role==="Retailer"){
                // eslint-disable-next-line no-debugger
                debugger
                if(getCurrentUsers.address &&getCurrentUsers.gstin && getCurrentUsers.id && getCurrentUsers.name){
                    setRetailerAddress(getCurrentUsers.address);
                    setGST(getCurrentUsers.gstin);
                    setRetailerId(getCurrentUsers.id)
                    setRetailerName(getCurrentUsers.name)
                    dispatch(addTravisReatailerDetails({
                        retailerDetails:getCurrentUsers
                    }))
                }
               

            }
        }
      
    },[getUserProfiles,getCurrentUsers])
    
    const handleReview = () => {


        if (retailerId !== 0) {
            reviewOrder()
            setIsAvailable(true)
        }
        else {
            alert("Please select retailer")
            setIsAvailable(false)
        }

    }

    const getUserRetailers = useSelector(getUserRetailer);
  const getActiveOrdertabs= useSelector(getActiveOrdertab)
    const getUserAccounts = useSelector(getUserAccount)
    const handleChange = (value: number) => {
        const allData = getUserRetailers?.filter(retailer => retailer.id == value)
        if (allData &&
            allData.length > 0 &&
            allData[0]?.gstin &&
            allData[0]?.id) {

            // setRetailerAddress(allData[0].address);
            // // setRetailerCity(allData[0]?.attributes?.Location ?? '');
            // setGST(allData[0]?.gstin);
            // setRetailerId(allData[0]?.id)
            // setRetailerName(allData[0]?.name)
            // // setRetailerUserId(allData[0]?.user_id)
            dispatch(addTravisOrderDetails({

                retailerAddres: allData[0]?.address,
                retailersGSt:allData[0]?.gstin,
                retailerName: allData[0]?.name ?? "",
                retailerId: allData[0]?.id,
                retailerEmail:allData[0]?.email,
                retailerPhone:allData[0]?.phone
                // retailerUserId:allData[0].user_id
            }))

            if(getActiveOrdertabs==="Travis"){
                dispatch(addTravisReatailerDetails({
                    retailerDetails:allData[0]
                }))
                setIsTravis(true)
            }

            else   if(getActiveOrdertabs==="Ogio"){
                dispatch(addOgioReatailerDetails({
                    retailerDetails:allData[0]
                }))
                setIsOgio(true)
            }

          
        } else {

            setRetailerAddress('');
            setRetailerCity('');
            setGST("");
            setRetailerId(null)
            setRetailerName("")
        }

        // if( allData.length>0 &&allData[0]?.attributes?.users_permissions_user?.data?.id)
        //  sendRetailerData(allData[0]?.attributes?.users_permissions_user?.data?.id
        // )
    }


    // manage retailer Address
 const getTravisRetailerDetails= useSelector(getTravisRetailerDetail) as RetailerModel;
 const getOgioRetailerDetails= useSelector(getOgioRetailerDetail) as RetailerModel;

// set active tab adddress of retailer

 useEffect(()=>{
    setRetailerAddress('');
    setRetailerCity('');
    setGST("");
    setRetailerId(null)
    setRetailerName("")
    
if(getActiveOrdertabs==='Travis' &&getTravisRetailerDetails &&getTravisRetailerDetails){

    console.log("getTravisRetailerDetails",getTravisRetailerDetails)
     if(getTravisRetailerDetails.address &&
        getTravisRetailerDetails.name &&getTravisRetailerDetails.id){
            setRetailerAddress(getTravisRetailerDetails.address);
            setGST(getTravisRetailerDetails.gstin);
            setRetailerId(getTravisRetailerDetails.id)
            setRetailerName(getTravisRetailerDetails.name)
        }
   

}
 else if(getActiveOrdertabs==='Ogio' &&getOgioRetailerDetails ){

    console.log("getOgioRetailerDetails",getOgioRetailerDetails)
     if(getOgioRetailerDetails.address &&
        getOgioRetailerDetails.name &&getOgioRetailerDetails.id){
            setRetailerAddress(getOgioRetailerDetails.address);
            setGST(getOgioRetailerDetails.gstin);
            setRetailerId(getOgioRetailerDetails.id)
            setRetailerName(getOgioRetailerDetails.name)
        }
   

} else {
    setRetailerAddress('');
    setRetailerCity('');
    setGST("");
    setRetailerId(null)
    setRetailerName("")
}
 },[getActiveOrdertabs,getTravisRetailerDetails,getOgioRetailerDetails])



    const handleSubmit = () => {
        setIsSubmit(true)
        submitOrder()
    }

    const handleRejectOrder = () => {
        rejectOrder()
    }

    const handleApproveSubmit = () => {
        approveorder()
    }

    const handleCompletedOrder = () => {
        completedOrder()
    }

    const handleNote=()=>{
        note()

    }

    const handleResetTravisAddress=()=>{
   setIsTravis(false)
    }
    const handleResetOgioAddress=()=>{
        setIsOgio(false)
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
                                value={retailerId}
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
                             {MangerName}
                            </h3>
                        </div>

                        <div className="mb-4 col-3">
                            <span className=' fs-5 fw-bold ' >
                                Sales Representative
                            </span>

                            <h3 className=' fs-2 user-title' >
                               {salesRepName}
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
                        note={handleNote}
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
           { isTravis &&
           <UpdateTravisRetailerAddress
           resetAddress={handleResetTravisAddress}
           />}

            {    isOgio &&<UpdateOgioRetailerAddress
            resetOgioAddress={handleResetOgioAddress}
                    />}
        </div>
    )
}

export default CartHeader