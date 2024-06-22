import React, { useEffect, useState } from "react";
import { Card, Table, Input, Button, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";



import { getRetailers } from "../../slice/retailer/RetailerSlice"
import { RetailerModel, Retailer } from "../model/AccountType/retailer/RetailerModel"
import { getCurrentUser, getUserAccount, getUserProfile, getUserRetailer } from "../.../../../slice/UserSlice/UserSlice"
import { RetailerData, UserAccountModel, RetailerModels, retailerData } from "../../modules/model/useAccount/UserAccountModel"
import "./CartHeader.css"
import ProgressCart from "./ProgressCart"

import { addTravisOrderDetails } from "../../slice/orderSlice/travis/Orderdetails"
import { addHardGoodsOrderDetails } from "../../slice/orderSlice/callawayGoods/HardGoodsOrderDetail"

import { getActiveOrdertab } from "../../slice/activeTabsSlice/ActiveTabSlice";

import { addTravisReatailerDetails, addTravisSalesrepDetails, addTravismanagerDetails, getTravisRetailerDetail } from "../../slice/allProducts/TravisMethewSlice";
import { addOgioReatailerDetails,addOgioManagerDetails, getOgioRetailerDetail, addOgioSalesrepDetails } from "../../slice/allProducts/OgioSlice";
import { addHardGoodsManagerDetails, addHardGoodsReatailerDetails, addHardGoodsSalesrepDetails, getHardGoodsRetailerDetail } from "../../slice/allProducts/CallAwayGoodsSlice.tsx";

import UpdateTravisRetailerAddress from "./brand/travisMethew/UpdateTravisRetailerAddress";
import UpdateOgioRetailerAddress from "./brand/ogio/UpdateOgioRetailerAddress";
import { addSoftGoodManagerDetails, addSoftGoodSalesrepDetails, addsoftgoodReatailerDetails, getSoftgoodRetailerDetail } from "../../slice/allProducts/CallawayApparelSlice.tsx";
import UpdatesoftGoodsRetailerAddress from "./brand/CallawayApparal/UpdatesoftGoodsRetailerAddress.tsx";
import UpdateHardGoodsRetailerAddress from "./brand/callawayGoods/UpdateHardGoodsRetailerAddress.tsx";
type Props = {
    reviewOrder: () => void,
    submitOrder: () => void
    rejectOrder: () => void,
    approveorder: () => void
    completedOrder: () => void
    note: () => void
    checkAvailability: () => void



}
const CartHeader = ({ reviewOrder, submitOrder, rejectOrder, note, approveorder, completedOrder, checkAvailability }: Props) => {
    const dispatch = useDispatch()
    const [isNote, setIsNote] = useState(false);

    const getUserProfiles = useSelector(getUserProfile)
    const getCurrentUsers = useSelector(getCurrentUser)
    const [isAvailable, setIsAvailable] = useState(false)
    const [isSubmit, setIsSubmit] = useState<boolean>(false)
    const [retailerName, setRetailerName] = useState<string>()
    const [retailerAddres, setRetailerAddress] = useState<string>()
    const [retailerId, setRetailerId] = useState<number | null>(null)

    const [retailerCity, setRetailerCity] = useState<string>()
    const [retailerUserId, setRetailerUserId] = useState<number>(0)
    const [GST, setGST] = useState<string>()
    const [salesRepName, setSalesRepName] = useState<string>()
    const [salesRep_Name, setSalesRep_Name] = useState<string>()
    const [MangerName, setManagerName] = useState<string>("")
    const [manger_name, setManager_Name] = useState<string>("")
    const [isTravis, setIsTravis] = useState<boolean>(false)
    const [isOgio, setIsOgio] = useState<boolean>(false)
    const [isApparel, setIsApparel] = useState<boolean>(false)
    const [isHard, setIsHard] = useState<boolean>(false)
    console.log("cardheader")
    useEffect(() => {

        if (getUserProfiles && getUserProfiles.length > 0) {
            getUserProfiles.map(item => {
                if (item.role === "Sales Representative") {
                    setSalesRep_Name(item.name)
                }
                if (item.role === "Manager" && item.name) {
                    setManager_Name(item.name)

                }
            })

         
// manager
            if(getCurrentUsers && getCurrentUsers.role==="Manager" &&getCurrentUsers.name){
                setManager_Name(getCurrentUsers.name)
                console.log("e",getCurrentUsers.name)
               
            }
            if(getCurrentUsers && getCurrentUsers.role==="Sales Representative" &&getCurrentUsers.name){
                setSalesRep_Name(getCurrentUsers.name)
            }
          
            if(getCurrentUsers && getCurrentUsers.role==="Retailer"){

                if (getCurrentUsers.address && getCurrentUsers.gstin && getCurrentUsers.id && getCurrentUsers.name) {
                    setRetailerAddress(getCurrentUsers.address);
                    setGST(getCurrentUsers.gstin);
                    setRetailerId(getCurrentUsers.id)
                    setRetailerName(getCurrentUsers.name)
                    dispatch(addTravisReatailerDetails({
                        retailerDetails: getCurrentUsers
                    }))
                }


            }
        }

    }, [getUserProfiles, getCurrentUsers])

    const handleReview = () => {
        checkAvailability()

     

    }

    const getUserRetailers = useSelector(getUserRetailer);
    const getActiveOrdertabs = useSelector(getActiveOrdertab)
    const getUserAccounts = useSelector(getUserAccount)

const[retailers, setRetailers]= useState<RetailerModel[]>([])
const[managers, setManagers]=useState<RetailerModel[]>([])
const[salesrep,setSalesrep]=useState<RetailerModel[]>([])
    useEffect(()=>{
        const ret:RetailerModel[]= []
        const man:RetailerModel[]= []
        const sal:RetailerModel[]= []


    if(getUserRetailers && getUserRetailers.length>0){

        getUserRetailers.map((item)=>{
            if(item.role==="Retailer"){
                
                ret.push(item)

            }

            if(item.role==="Manager"){
                man.push(item)

            }
            if(item.role==="Sales Representative"){
                
                sal.push(item)

            }



        })
    }
    setRetailers(ret)
    setManagers(man)
    setSalesrep(sal)

    },[getUserRetailers])

    
    const handleChange = (value: number) => {
        

        const allData = retailers?.filter(retailer => retailer.id == value)
        if (allData &&
            allData.length > 0 &&
            allData[0]?.gstin &&
            allData[0]?.id) {

            setRetailerAddress(allData[0].address);
            // setRetailerCity(allData[0]?.attributes?.Location ?? '');
            setGST(allData[0]?.gstin);
            setRetailerId(allData[0]?.id)
            setRetailerName(allData[0]?.name)
           

            if (getActiveOrdertabs === "travis") {
                dispatch(addTravisReatailerDetails({
                    retailerDetails: allData[0]
                }))
                setIsTravis(true)
            }

            else if (getActiveOrdertabs === "ogio") {
                dispatch(addOgioReatailerDetails({
                    retailerDetails: allData[0]
                }))
                setIsOgio(true)
            }
            else if (getActiveOrdertabs === "softgood") {
                dispatch(addsoftgoodReatailerDetails({
                    retailerDetails: allData[0]
                }))
                setIsApparel(true)
            }

            else if (getActiveOrdertabs === "hardgood") {
                //console.log("addhard",addHardGoodsReatailerDetails)
                dispatch(addHardGoodsReatailerDetails({
                    retailerDetails: allData[0]
                }))
                setIsHard(true)
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



    
    const handleChangeManager = (value:string) => {
        //console.log("manf",value)
        
        
     setManagerName(value)

    }

    useEffect(()=>{
        setManagerName("")
        if(getActiveOrdertabs && MangerName){
            if (getActiveOrdertabs === "travis") {
                dispatch(addTravismanagerDetails(
                {
                    managerDetails: MangerName                }
                ))        
                setIsTravis(true)
                setManagerName(MangerName)
            }

            else if (getActiveOrdertabs === "ogio") {
                dispatch(addOgioManagerDetails({
                    managerDetails: MangerName 
                }))
                setIsOgio(true)
                setManagerName(MangerName)

            }
            else if (getActiveOrdertabs === "softgood") {
                dispatch(addSoftGoodManagerDetails({
                    managerDetails: MangerName
                }))
                setIsApparel(true)
                setManagerName(MangerName)

            }

            else if (getActiveOrdertabs === "hardgood") {
                //console.log("addhard",addHardGoodsReatailerDetails)
                dispatch(addHardGoodsManagerDetails({
                    managerDetails:MangerName
                }))
                setIsHard(true)
                setManagerName(MangerName)

            }

        }

   
    },[getActiveOrdertabs,MangerName])


    const handleChangeSalesrep = (value:string) => {
        //console.log("sales",value)
        
        
        setSalesRepName(value)

    }

    useEffect(()=>{
        setSalesRepName("")
        if(getActiveOrdertabs && salesRepName){
            if (getActiveOrdertabs === "travis") {
                dispatch(addTravisSalesrepDetails(
                {
                    salesrepDetails: salesRepName                }
                ))        
                setIsTravis(true)
                setSalesRepName(salesRepName)
            }

            else if (getActiveOrdertabs === "ogio") {
                dispatch(addOgioSalesrepDetails({
                    salesrepDetails: salesRepName 
                }))
                setIsOgio(true)
                setSalesRepName(salesRepName)

            }
            else if (getActiveOrdertabs === "softgood") {
                dispatch(addSoftGoodSalesrepDetails({
                    salesrepDetails: salesRepName
                }))
                setIsApparel(true)
                setSalesRepName(salesRepName)

            }

            else if (getActiveOrdertabs === "hardgood") {
                //console.log("addhard",addHardGoodsReatailerDetails)
                dispatch(addHardGoodsSalesrepDetails({
                    salesrepDetails:salesRepName
                }))
                setIsHard(true)
                setSalesRepName(salesRepName)

            }

        }

   
    },[getActiveOrdertabs,salesRepName])



    // manage retailer Address
    const getTravisRetailerDetails = useSelector(getTravisRetailerDetail) as RetailerModel;
    const getOgioRetailerDetails = useSelector(getOgioRetailerDetail) as RetailerModel;
    const getSoftgoodRetailerDetails = useSelector(getSoftgoodRetailerDetail) as RetailerModel;
    const getHardGoodsRetailerDetails = useSelector(getHardGoodsRetailerDetail) as RetailerModel;

    // set active tab adddress of retailer

    useEffect(() => {
        setRetailerAddress('');
        setRetailerCity('');
        setGST("");
        setRetailerId(null)
        setRetailerName("")
                // 
        if (getActiveOrdertabs === 'travis' && getTravisRetailerDetails) {

            console.log("getTravisRetailerDetails", getTravisRetailerDetails)
            if (getTravisRetailerDetails.address &&
                getTravisRetailerDetails.name && getTravisRetailerDetails.id) {
                setRetailerAddress(getTravisRetailerDetails.address);
                setGST(getTravisRetailerDetails.gstin);
                setRetailerId(getTravisRetailerDetails.id)
                setRetailerName(getTravisRetailerDetails.name)
            }


        }
        else if (getActiveOrdertabs === 'ogio' && getOgioRetailerDetails) {

            console.log("getOgioRetailerDetails", getOgioRetailerDetails)
            if (getOgioRetailerDetails.address &&
                getOgioRetailerDetails.name && getOgioRetailerDetails.id) {
                setRetailerAddress(getOgioRetailerDetails.address);
                setGST(getOgioRetailerDetails.gstin);
                setRetailerId(getOgioRetailerDetails.id)
                setRetailerName(getOgioRetailerDetails.name)
            }
        }
        else if (getActiveOrdertabs === 'softgood' && getSoftgoodRetailerDetails) {

            console.log("getSoftRetailerDetails", getSoftgoodRetailerDetails)
            if (getSoftgoodRetailerDetails.address &&
                getSoftgoodRetailerDetails.name && getSoftgoodRetailerDetails.id) {
                setRetailerAddress(getSoftgoodRetailerDetails.address);
                setGST(getSoftgoodRetailerDetails.gstin);
                setRetailerId(getSoftgoodRetailerDetails.id)
                setRetailerName(getSoftgoodRetailerDetails.name)
            }


        }

        else if (getActiveOrdertabs === 'hardgood' && getHardGoodsRetailerDetails) {

            console.log("getHardRetailerDetails", getHardGoodsRetailerDetails)
            if (getHardGoodsRetailerDetails.address &&
                getHardGoodsRetailerDetails.name && getHardGoodsRetailerDetails.id) {
                setRetailerAddress(getHardGoodsRetailerDetails.address);
                setGST(getHardGoodsRetailerDetails.gstin);
                setRetailerId(getHardGoodsRetailerDetails.id)
                setRetailerName(getHardGoodsRetailerDetails.name)
            }


        }




        else {
            setRetailerAddress('');
            setRetailerCity('');
            setGST("");
            setRetailerId(null)
            setRetailerName("")
        }
    }, [getActiveOrdertabs, getTravisRetailerDetails, getOgioRetailerDetails, getHardGoodsRetailerDetails, getSoftgoodRetailerDetails])



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

    const handleNote = () => {
        note()

    }

    const handleResetTravisAddress = () => {
        setIsTravis(false)
    }
    const handleResetOgioAddress = () => {
        setIsOgio(false)
    }

    const handleResetHardGoodsAddress = () => {
        setIsHard(false)
    }


    const handleResetAvailable = () => {
        setIsAvailable(false);
    }
    const handleResetApparelAddress = () => {
        setIsApparel(false)
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
                                options={retailers?.map((item: RetailerModel) => (
                                    {
                                        label: item.name ?? "",
                                        value: item.id
                                    }))}
                            />

                        </div>



                        <div className="col-3">


                           
                            {getCurrentUsers && getCurrentUsers.role==="Admin"?(
                                <>
                                 <h4 className=' pt-3 fs-6' style={{ width: "100px", minWidth: "100px" }}>
                                <a>Select Manager</a>
                            </h4> 
                                <Select
                                showSearch
                                placeholder="Select manager"
                                optionFilterProp="children"
                                className="select-toogle"
                                style={{ marginBottom: 5 }}
                                onChange={handleChangeManager}
                               value={MangerName}

                                options={managers?.map((item: RetailerModel) => (
                                    {
                                        label: item.name ?? "",
                                        value: item.name
                                    }))}

                                
                            />
                             </>

                            ):( 
                                <>
                                 <h4 className=' pt-3 fs-6' style={{ width: "100px", minWidth: "100px" }}>
                                <a>Manager</a>
                            </h4> 
                            
                            <h3 className=' fs-2 user-title' >
                                {manger_name}
                                
                               </h3> 
                               </>
                               )}

                           
                                                   
                                
                                                
                        </div>
                    
                        <div className="mb-4 col-3">
                         
                        {getCurrentUsers && getCurrentUsers.role==="Admin"?(
                                <>
                                 <h4 className=' pt-3 fs-6' style={{ width: "50px", minWidth: "100px" }}>
                                <a>Select salesRepName</a>
                            </h4> 
                                <Select
                                showSearch
                                placeholder="Select salesRepName"
                                optionFilterProp="children"
                                className="select-toogle"
                                style={{ marginBottom: 2 }}
                                onChange={handleChangeSalesrep}
                              value={salesRepName}

                                options={salesrep?.map((item: RetailerModel) => (
                                    {
                                        label: item.name ?? "",
                                        value: item.name
                                    }))}

                                
                            />
                             </>

                            ):( 
                                <>
                                 <h4 className=' pt-3 fs-6' style={{ width: "100px", minWidth: "100px" }}>
                                <a>Sales Rep Name</a>
                            </h4> 
                            
                            
                            <h3 className=' fs-2 user-title' >
                                {salesRep_Name}
                            </h3>
                               </>
                               )}







                            {/* <span className=' fs-5 fw-bold ' >
                                Sales Representative
                            </span>
                           
                            <select className="form-select select-dro" data-control="select2" data-placeholder="Select an option">
                                <option value="1">Mukesh Gupta</option>
                                <option value="2">Ankur </option>
                                <option value="3">Manish Sharma </option>
                            </select>
                           
                     
                            <h3 className=' fs-2 user-title' >
                                {salesRepName}
                            </h3> 
                             */}
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
                        resetAvailable={handleResetAvailable}
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

            {isTravis &&
                <UpdateTravisRetailerAddress
                    resetAddress={handleResetTravisAddress}
                />}



            {isOgio && <UpdateOgioRetailerAddress
                resetOgioAddress={handleResetOgioAddress}
            />}

            {/* update apparel / soft good retailer address */}
            {isApparel && <UpdatesoftGoodsRetailerAddress
                resetApparelAddress={handleResetApparelAddress}
            />}

            {isHard && <UpdateHardGoodsRetailerAddress
                resetHardGoodsAddress={handleResetHardGoodsAddress}
            />}
        </div>
    )
}

export default CartHeader